import Coin from '../models/Coin.js';

export const addCoin = async (req, res) => {
    const newCoin = new Coin({
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
        publisher: req.body.publisher
    });
    return await newCoin.save((err,doc)=>{res.status(200).json(doc)});
}

export const getCoin = (req, res) => {

    Coin.find({}, async (err, doc) => {
        if (err) throw err;
        if (doc) {

            res.status(200).json({ message: "Image found", doc: doc });
        }
        else {
            res.send({ message: "Coin not available", doc: doc })
        }
    })
}

export const getUserCoin = (req, res) => {
    Coin.find({username: req.params.id}, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            res.status(200).json({ message: "Image found", doc: doc });
        }
        else {
            res.send({ message: "Coin not available", doc: doc })
        }
    })
}