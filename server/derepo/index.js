
var { URIDB } = require("../core");



var mongoose = require("mongoose");



let dbURI = URIDB


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

////////////////mongodb connected disconnected events///////////////////////////////////////////////

mongoose.connection.on("connected", () => { // MONGODB Connected
    console.log("Mongoose connected");
})


mongoose.connection.on("disconnected", () => {
    console.log("MONGODB disconnected");
    process.exit(1);
});

mongoose.connection.on("error", (err) => {
    console.log("MongoDB disconnected due to : " + err);
    process.exit(1);
});

process.on("SIGINT", () => {
    console.log("App is terminating");
    mongoose.connection.close(() => {
        console.log("MONGODB disconnected");
        process.exit(0);
    })

})

var productSchema = new mongoose.Schema({
    productName: String,
    productDescription: String,
    productImage: String,
    productPrice: Number,
    isActive : Boolean,
    stock : String,
})

var productModel = mongoose.model('products' , productSchema);

var userSchema = new mongoose.Schema({
    userEmail: String,
    userName: String,
    userPassword: String,
    userAddress: String,
    userPhone: String,
    roll: String,
});
var userModel = mongoose.model("users", userSchema);



var otpSchema = new mongoose.Schema({
    "userEmail": String,
    "otp": String,
    "createdOn": { "type": Date, "default": Date.now },
});
var otpModel = mongoose.model("otp", otpSchema);

var collection = mongoose.Schema({
    cart: Array,
    total: String,
    userEmail: String,
    status: String,
    phoneNo: String,
    address: String,
    remarks: String,
    "createdOn": { "type": Date, "default": Date.now },
})

var order = mongoose.model("order", collection);



module.exports = {
    userModel: userModel,
    otpModel: otpModel,
    order: order,
    productModel : productModel,
}