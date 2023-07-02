const { PublicKey } = require('@solana/web3.js');
const pearceX4 = {
    name: 'pearceX4',
    mintAddress: new PublicKey('2iMhgB4pbdKvwJHVyitpvX5z1NBNypFonUgaSAt9dtDt'),
    foodQuantity: 13840,
    armsQuantity: 38110,
    fuelQuantity: 32090,
    toolkitQuantity: 28880
};

const pearceX5 = {
    name: 'pearceX5',
    mintAddress: new PublicKey('267DbhCypYzvTqv72ZG5UKHeFu56qXFsuoz3rw832eC5'),
    foodQuantity: 13840,
    armsQuantity: 38110,
    fuelQuantity: 32090,
    toolkitQuantity: 28880
}

const vzusOpod = {
    name: 'vzusOpod',
    mintAddress: new PublicKey('9czEqEZ4EkRt7N3HWDcw9qqwys3xRRjGdbn8Jhk8Khwj'),
    foodQuantity: 13840,
    armsQuantity: 38110,
    fuelQuantity: 32090,
    toolkitQuantity: 28880
}

module.exports = {
    pearceX4,
    pearceX5,
    vzusOpod
}