const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/giris", async (req, res) => {

    try {

        const { username, password } = req.body;
        const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: "1h" });

        if (!password || !username) {
            return res.status(400).json("veri ekleyiniz");
        }

        if (process.env.USER_NAME == username && process.env.PASSWORD == password) {
            return res.status(200).json({ token });
        }
        else {
            return res.status(400).json({ message: "hata şifreniz veya adınız yanlış" });
        }
    } catch (error) {
        return res.status(200).json({ message: "hata", error: error.message });

    }
});


module.exports = router;

