const authModel = require("../models/auth")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// authentication

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body 
        const user = await authModel.findOne({ email }) 

        if (user) { 
            res.status(500).json({ msg: "bu email hesabi kullanimda" })
        }
        if (password.length < 6) {
            res.status(500).json({ msg: "parola 6 karakterden küçük olamaz" })
        }

        const hashedPass = await bcrypt.hash(password, 12) //parolanın güvenliğini sağlamak için hashlemek gerekli

        const newUser = await authModel.create({ username, email, password: hashedPass }) //veritabanı üzerinden yeni bir user oluşturulur. MongoDB otomatik olarak newuser için 24 karakterli id atar.

        const registerToken = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, { expiresIn: "1h" })// jwt token kimlik doğrulama işlemlerinde kullanılan bir standarttır ve kullanıcının kimliği hakkında bilgi içerir, ancak bu bilgiler bir şifreleme anahtarı olan "secret token" ile şifrelenir. Yani bu anahtarın gizli kalması önemlidir. Ayrıca platform bağımsızdır. ilk parametre, token içinde depolanacak olan kullanıcının kimliğini belirtir. İkinci parametre SECRET_TOKEN'ı içerir. Son parametre olan expiresIn, token'ın ne kadar süre geçerli olacağını belirtir.

        res.status(201).json({
            statu: "ok",
            newUser,
            registerToken
        })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const login = async (req, res) => { 
    try {
        const { email, password } = req.body
        const user = await authModel.findOne({ email })

        if (!user) {
            res.status(500).json({ msg: "böyle bir kullanici bulunamadi" })
        }

        const comparePass = await bcrypt.compare(password, user.password) 

        if (!comparePass) {
            res.status(500).json({ msg: "parola yanlis" })
        }

        const loginToken = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: "1h" }) 

        res.status(201).json({
            statu: "ok",
            user,
            loginToken
        })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = {register, login}