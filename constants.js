const { PublicKey, Keypair } = require('@solana/web3.js');
const bs58 = require('bs58');

const CONNECTION_STRING = 'https://api.mainnet-beta.solana.com';

const DAY = (1000 * 60 * 60 * 24);

const keypair = Keypair.fromSecretKey(
    bs58.decode(
        "<keypair>"
        )
);

const tokenOwnerPublickey = new PublicKey(
    '<tokenOwnerPublickey>'
);

const playerPublicKey = new PublicKey(
    '<playerPublicKey>'
);

const programId = new PublicKey(
    '<programId>'
);

const food = {
    mint: new PublicKey('<mintaddress>'),
    tokenAccount: new PublicKey('<tokenaccount>')
};

const arms = {
    mint: new PublicKey('<armsmint>'),
    tokenAccount: new PublicKey('<tokenAccount>')
};

const fuel = {
    mint: new PublicKey('<fuelmint>'),
    tokenAccount: new PublicKey('<tokenAccount>')
};

const toolkit = {
    mint: new PublicKey('<toolkitmint>'),
    tokenAccount: new PublicKey('<tokenAccount>')
};

module.exports = {
    DAY,
    CONNECTION_STRING,
    keypair,
    tokenOwnerPublickey,
    playerPublicKey,
    programId,
    food,
    arms,
    fuel,
    toolkit
};