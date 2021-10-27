import Profile from "../models/profile.js";
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: 'dx0rf8u0t',
    api_key: '139615721185489',
    api_secret: '1sF_yZtY4apzyxFCjOGxmv2wdok'
});

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
function reverseString(str) {
    return str.split("").reverse().join("");
}
const getPublicId = (str) => {
    str = reverseString(str);
    let count = 0;
    let start=0;
    for (let i = 0; i < str.length; i++) {
        if(str[i]=='.') start=i+1;
        if (str[i] === '/') break;
        count++;
    }
    let req = str.substr(start, count-start);
    req = reverseString(req);
    return req;
}
export const editProfile = (req, res) => {
    const username = req.params.id;
    let image = req.body.image;
    image = getPublicId(image);
    cloudinary.v2.uploader.destroy(image, function (error, result) {
        console.log(result, error)
    });
    Profile.findOneAndUpdate({username:username}, req.body.data)
        .then(() => res.status(200).json({ doc: "Editing done" }))
        .catch(err => res.status(404).json({ doc: err }))
}
