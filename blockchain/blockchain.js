const cryptoHash = require("./cryptoHash");
const Block = require("./first_bc");  // Correct file name
const pubsub=require('./publishSub')

class Blockchain {
    constructor() {
        this.chain = [Block.gensis()];  // Ensuring genesis block is correct
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length - 1],
            data,
        });
        this.chain.push(newBlock);
    }

    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            console.error("The incoming chain is not longer");
            return;
        }
        if (!Blockchain.isValidChain(chain)) {
            console.error("The incoming chain is not valid");
            return;
        }
        console.log("Replacing chain with", chain);
        this.chain = chain;
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.gensis())) {  // Compare the correct genesis block
            console.error("Genesis block mismatch");
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, prev_hash, hash, data, difficulty, nonce } = chain[i];
            const realLastHash = chain[i - 1].hash;
            const lastDifficulty = chain[i - 1].difficulty;

            if (prev_hash !== realLastHash) {
                console.error("Last hash mismatch");
                return false;
            }

            const validatedHash = cryptoHash(timestamp, prev_hash, data, nonce, difficulty);
            if (hash !== validatedHash) {
                console.error("Hash mismatch");
                return false;
            }

            if (Math.abs(lastDifficulty - difficulty) > 1) {
                console.error("Difficulty adjustment error");
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;
