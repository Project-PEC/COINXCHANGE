import Review from '../models/Review.js';

export const addReview = async (req, res) => {
    const newReview = new Review({
        coinId: req.body.coinId,
        rating: req.body.rating,
        text: req.body.text,
        user: req.body.user,
        publisher: req.body.publisher
    });
    return await newReview.save((err, doc) => { res.status(200).json(doc) });
}

export const getReview = async (req, res) => {
    Review.find( {coinId:req.params.coinId}, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            res.status(200).json({ message: "review found", doc: doc });
        }
        else {
            res.send({ message: "review not available", doc: doc })
        }
    })
}
