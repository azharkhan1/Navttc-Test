var PORT = process.env.PORT || 5000;
var SERVER_SECRET = process.env.SECRET || "12ka4";
var POSTSECRET = process.env.POSTSECRET || "615220ad-ba36-42e4-9160-dc88ec19fa5e";
var URIDB = process.env.URIDB  || 'mongodb+srv://azhar:azhar@mongodb.xd2iy.mongodb.net/testDB?retryWrites=true&w=majority'



module.exports = {
    PORT : PORT,
    SERVER_SECRET : SERVER_SECRET,
    POSTSECRET : POSTSECRET,
    URIDB : URIDB, 
}
