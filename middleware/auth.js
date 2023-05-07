

const jwt = require("jsonwebtoken")

//front end tarafında gelen tokenleri bir yere kaydetmek gerekir. genelde cookies veya local storage kaydedilir.

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1] // token genelde "Bearer ndfjlfndsjfsdf..." şeklinde gelir. req.headers.authorization "Bearer ndfjlfndsjfsdf..." ifadesidir.split ile [Bearer, ndfjlfndsjfsdf...] haline gelir ve token = ndfjlfndsjfsdf... olur
        let decodedData

        if (token) { //kişi daha önceden giriş yaptıysa
            decodedData = jwt.verify(token, process.env.SECRET_TOKEN) //token doğru kişiye ait mi
            req.userId = decodedData?.id //userIdye decodedData içindeki id (varsa) atanır
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth