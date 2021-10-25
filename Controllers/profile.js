import Profile from "../models/profile.js";

export const getProfile = (req, res) => {
    const username = req.params.id;
    Profile.findOne({ username: username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            res.status(200).json({ message: "Profile found", doc: doc });
        }
        else {
            res.send({ message: "Profile not found", doc: doc })
        }
    })
}
export const editProfile = (req, res) => {
    const username = req.params.id;
    
    Profile.findOneAndUpdate({username:username}, req.body)
        .then(() => res.status(200).json({ doc: "Editing done" }))
        .catch(err => res.status(404).json({ doc: err }))
}