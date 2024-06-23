const express = require("express");
const Blockchain = require("./blockchain");
const bodyParser = require("body-parser");
const PubSub = require('./publishSub');
const request = require('request');

const dPORT = 3000;
const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });
const ROOT_NODE_ADDRESS = `http://localhost:${dPORT}`;

setTimeout(() => {
    pubsub.broadcastChain();
}, 1000);

app.use(express.json());
app.use(bodyParser.json());

app.post("/api/mine", (req, res) => {
    const { data } = req.body;
    blockchain.addBlock({ data });
    pubsub.broadcastChain(); // Broadcast the new chain
    res.redirect("/api/block");
});

app.get("/api/block", (req, res) => {
    console.log(blockchain.chain);
    res.json(blockchain.chain);
});

const synChain = () => {
    request({ url: `${ROOT_NODE_ADDRESS}/api/block` }, (error, response, body) => {
       
        if (error) {
            console.error(`Failed to fetch chain from ${ROOT_NODE_ADDRESS}:`, error);
            return;
        }
        if (response.statusCode === 200) {
            const root_Chain = JSON.parse(body);
            console.log("replace chain on sync with", root_Chain);
            blockchain.replaceChain(root_Chain);
        }
    });
};

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = dPORT + Math.ceil(Math.random() * 1000);
}
const PORT = PEER_PORT || dPORT;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    if (PORT !== dPORT) {
        synChain();
    }
});
