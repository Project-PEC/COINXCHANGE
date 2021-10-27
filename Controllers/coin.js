import Coin from '../models/coin.js';


export const getCoin = (req, res) => {
    
    Coin.find({ }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            
            res.status(200).json({ message: "Image found", doc: doc });
        }
        else {
            res.send({ message: "Coin not available", doc: doc })
        }
    })
}