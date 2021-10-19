import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = (req, res) => {
    const userData = req.body;
    User.find({ 'username': userData.username }, (err, doc) => {
        if (err) res.status(200).send("Some error occured");
        if (doc.length > 0) {
            bcrypt.compare(userData.password, doc[0].password, (err, res2) => {
                if (res2) {
                    req.session.user = doc;
                    const id = doc[0].id;
                    const token = jwt.sign({ id }, "secretCode", {
                        expiresIn: 60 * 60 * 24 * 7,
                    })

                    res.status(200).json({
                        auth: true, token: token, message: "Authentication Successful"
                    });
                }
                else {
                    res.status(200).send({ auth: false, message: "Wrong username/password" });
                }
            })
        }
        else
            return res.status(200).json({ auth: false, message: "User doens't exist" });

    })

}
export const registerUser = (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send({ auth: false, message: "user already exists" });
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                email:req.body.email
            });
            await newUser.save((err, doc) => {
                req.session.user = doc;
                const id = doc.id;
                const token = jwt.sign({ id }, "secretCode", {
                    expiresIn: 60 * 60 * 24 * 7,
                })

                res.status(200).json({
                    auth: true, token: token, message: "Authentication Successful"
                });
            });

        }
    })
}

export const getUser = (req, res) => {
    User.findById({ _id: req.userId }, (err, doc) => {
        if (err) throw err;
        if (!doc) res.send({ auth: false, message: "User deleted from database" });
        else {
            res.send({ auth: true, message: "Verification successful", username: doc.username })
        }
    })
}

export const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) res.status(200).json({ auth: false, message: "Need token" });
    else {
        jwt.verify(token, "secretCode", (err, decoded) => {
            if (err) {
                res.send({ auth: false, message: "Authentication failed" });
            }
            else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}