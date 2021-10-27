import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Profile from '../models/profile.js';

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
                        auth: true, token: token, message: userData.username + " logged in successfully"
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
    User.find({ $or: [{ username: req.body.username, email: req.body.email }] }, async (err, doc) => {
        if (err) throw err;
        if (doc.length>0) res.send({ auth: false, message: "email/username already in use" });
        else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email
            });
            const newProfile = new Profile({
                username: req.body.username,
                email: req.body.email,
                Coins:[],
                image:"data:image/png;base64,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"
            });
            await newProfile.save();
            await newUser.save((err, doc) => {
                req.session.user = doc;
                const id = doc.id;
                const token = jwt.sign({ id }, "secretCode", {
                    expiresIn: 60 * 60 * 24 * 7,
                })

                res.status(200).json({
                    auth: true, token: token, message: req.body.username + " successfully registered"
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


