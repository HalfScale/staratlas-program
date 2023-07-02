const { Connection, Transaction, sendAndConfirmTransaction } = require('@solana/web3.js');
const { createRefeedInstruction, createRearmInstruction, createRefuelInstruction, createRepairInstruction } = require('@staratlas/factory')
const constants = require('./constants');

const {
    CONNECTION_STRING,
    keypair,
    tokenOwnerPublickey,
    playerPublicKey,
    programId,
    food,
    arms,
    fuel,
    toolkit
} = constants;

const connection = new Connection(CONNECTION_STRING);

const reSupply = async (ship) => {

    const foodInstruction = await createRefeedInstruction(
        connection,
        tokenOwnerPublickey,
        playerPublicKey,
        ship.foodQuantity,
        ship.mintAddress,
        food.mint,
        food.tokenAccount,
        programId
    );

    const rearmInstruction = await createRearmInstruction(
        connection,
        tokenOwnerPublickey,
        playerPublicKey,
        ship.armsQuantity,
        ship.mintAddress,
        arms.mint,
        arms.tokenAccount,
        programId
    );

    const refuelInstruction = await createRefuelInstruction(
        connection,
        tokenOwnerPublickey,
        playerPublicKey,
        ship.fuelQuantity,
        ship.mintAddress,
        fuel.mint,
        fuel.tokenAccount,
        programId
    );

    const repairInstruction = await createRepairInstruction(
        connection,
        tokenOwnerPublickey,
        playerPublicKey,
        ship.toolkitQuantity,
        ship.mintAddress,
        toolkit.mint,
        toolkit.tokenAccount,
        programId
    );

    // add multiple instruction in one transaction
    const transaction = new Transaction();
    transaction.add(foodInstruction);
    transaction.add(rearmInstruction);
    transaction.add(refuelInstruction);
    transaction.add(repairInstruction);

    const result = await sendAndConfirmTransaction(connection, transaction, [keypair]);

    // console.log('resupply success')
    let response = {
        name: ship.name,
        shipAddress: ship.mintAddress.toString()
    };
    response.message = result;
    console.log('response', response);
    return response;
}

module.exports = {
    reSupply
}