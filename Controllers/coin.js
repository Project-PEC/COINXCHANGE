import Coin from '../models/coin.js';
import Review from '../models/review.js';

export const addCoin = async (req, res) => {
    const newCoin = new Coin({
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
        publisher: req.body.publisher,
        location: req.body.location
    });
    return await newCoin.save((err, doc) => { res.status(200).json(doc) });
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
    Coin.find({ _id: req.params.id }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            res.status(200).json({ message: "Image found", doc: doc });
        }
        else {
            res.send({ message: "Coin not available", doc: doc })
        }
    })
}
export const getCoinOfUser=(req,res)=>{
    Coin.find({ publisher: req.params.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            res.status(200).json({ message: "Image found", doc: doc });
        }
        else {
            res.send({ message: "Coin not available", doc: doc })
        }
    })
}
export const editCoinByPublisher = async(req, res) => {
    try {
        const x = await Coin.findByIdAndUpdate(req.body._id,req.body);
        res.status(200).json({doc:x});
    }
    catch(err) {
        console.log(err);
    }
}

export const editCoin = async(req, res) => {
    try {
        const x = await Coin.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({doc:x});
    }
    catch(err) {
        console.log(err);
    }
}

export const deleteCoin = async(req, res) => {
    try {
        await Coin.deleteOne({_id:req.params.id});
        await Review.deleteMany({coinId:req.params.id});
        res.status(200).json({doc:"Coin deleted successfully!"});
    }
    catch(err) {
        console.log(err);
    }
}