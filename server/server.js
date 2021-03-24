var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken
var cookieParser = require("cookie-parser");
var path = require("path");
var socketIo = require("socket.io");
var authRoutes = require("./routes/auth");

var http = require("http");

var { SERVER_SECRET, PORT } = require("./core");
var { userModel, order, productModel } = require("./derepo");


// To Send files
const fs = require('fs')
const multer = require("multer");
const admin = require("firebase-admin");

const storage = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`)
    }
})
var upload = multer({ storage: storage })

var serviceAccount = require("./firebase/firebase.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://webmobile-48ab0.firebaseio.com"
});

const bucket = admin.storage().bucket("gs://webmobile-48ab0.appspot.com");





var app = express();
var server = http.createServer(app);
var io = socketIo(server, {
    cors: ["http://localhost:3000", 'https://shopappnavtc.herokuapp.com/']
});

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:3000", 'https://shopappnavtc.herokuapp.com/'],
    credentials: true,
}));

app.use(cookieParser());






app.use("/", express.static(path.resolve(path.join(__dirname, "../Web/build"))));

app.use("/auth", authRoutes);



app.use(function (req, res, next) {
    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }
    jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodedData) {
        if (!err) {
            const issueDate = decodedData.iat * 1000; // 1000 miliseconds because in js ms is in 16 digits
            const nowDate = new Date().getTime();
            const diff = nowDate - issueDate; // 86400,000

            if (diff > 3000000) { // expire after 5 min (in milis)
                res.status(401).send("token expired")
                res.clearCookie();
            }

            else { // issue new token
                var token = jwt.sign({
                    id: decodedData.id,
                    userName: decodedData.userName,
                    userEmail: decodedData.userEmail,
                    userPhone: decodedData.userPhone,
                    userAddress: decodedData.userAddress,
                    roll: decodedData.roll,
                }, SERVER_SECRET)
                res.cookie('jToken', token, {
                    maxAge: 86_400_000,
                    httpOnly: true
                });
                req.body.jToken = decodedData;
                req.headers.jToken = decodedData;
                next();
            }

        } else {
            res.status(401).send("invalid token")
        }
    });
})

app.get("/profile", (req, res, next) => {
    userModel.findById(req.body.jToken.id, "userName userEmail userAddress userPhone roll",

        function (err, doc) {
            if (!err) {
                res.send({
                    profile: doc
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })
});

app.get('/getproducts', (req, res, next) => {
    productModel.find({}, (err, products) => {
        if (!err) {
            console.log('products are=>', products);
            res.send({
                products: products,
            })
        }
        else {
            res.send({
                message: 'an error occured'
            })
        }
    })
})


app.delete('/delete-product', (req, res, next) => {

    productModel.findById(req.body.id, {}, (err, data) => {
        if (!err) {
            data.remove();
            res.status(200).send({
                message: 'succesfully deleted'
            })
        }
        else {
            res.status(500).send({
                message: 'something went wrong'
            })
        }
    })
})


app.post('/update-product', (req, res, next) => {

    productModel.findById(req.body.id, {}, (err, data) => {
        if (!err) {
            data.updateOne(
                {
                    productName: req.body.productName,
                    productPrice: req.body.productPrice,
                    productDescription: req.body.productDescription
                }
                , (err, updated) => {
                    if (!err) {
                        res.status(200).send({
                            message: 'succesfully updated'
                        })
                    }
                    else {
                        res.status(500).send({
                            message: 'some error occoured'
                        })
                    }
                })
        }
    })
})




app.post('/uploadProduct', upload.any(), (req, res, next) => {


    bucket.upload(
        req.files[0].path,
        function (err, file, apiResponse) {
            if (!err) {
                // console.log("api resp: ", apiResponse);

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 

                        productModel.create({
                            productName: req.body.productName,
                            productPrice: req.body.productPrice,
                            productImage: urlData[0],
                            productDescription: req.body.productDescription,
                            isActive: true,
                        }).then((productCreated) => {
                            res.send({
                                message: "product has been created",
                                productCreated: productCreated,
                            })
                        }).catch((err) => {
                            res.send({
                                message: "an error occured",
                            })
                        })
                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }
                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send({
                    message: "an error occured",
                });
            }
        });


})

app.post("/logout", (req, res, next) => {
    res.cookie('jToken', "", {
        maxAge: 86_400_000,
        httpOnly: true
    });
    res.clearCookie();
    res.send("logout succesfully");
})

app.use((req, res, next) => {
    res.redirect('/');

})



server.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})