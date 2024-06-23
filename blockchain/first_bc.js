const { gensis, Mining_rate } = require("./gen");
const cryptoHash = require("./cryptoHash");

class Block {
    constructor({ timestamp, hash, prev_hash, data, difficulty, nonce }) {
        this.timestamp = timestamp;
        this.hash = hash;
        this.prev_hash = prev_hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static gensis() {
        return new this(gensis);  // Ensuring genesis method returns the correct block
    }

    static mineBlock({ prevBlock, data }) {
        let hash, timestamp;
        const prev_hash = prevBlock.hash;
        let { difficulty } = prevBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: prevBlock, timestamp });
            hash = cryptoHash(timestamp, prev_hash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({
            timestamp,
            prev_hash,
            data,
            hash,
            nonce,
            difficulty
        });
    }

    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;
        if (difficulty < 1) return 1;
        const difference = timestamp - originalBlock.timestamp;
        if (difference > Mining_rate) return difficulty - 1;
        return difficulty + 1;
    }
}

module.exports = Block;
