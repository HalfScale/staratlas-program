const fs = require('fs');
const ships = require('./ships');
const { reSupply } = require('./resupply-service');
const fileUtil = require('./file-util');
const Constants = require('./constants');

const currentDate = new Date();

const updateData = async() => {

    // Read the stored date from the file
    const storedDate = await fileUtil.readResupplyDates();
    console.log('storedDate', storedDate);
    let shipLastUpdate = {};
    const shipsArray = [ships.pearceX4, ships.pearceX5, ships.vzusOpod];
    const currentDateToISO = currentDate.toISOString();

    shipsArray.forEach(ship => {
        shipLastUpdate[ship.mintAddress] = currentDateToISO;
    });

    if (!storedDate || storedDate === null) {
        fileUtil.info('Initialize resupply ship');
        shipsArray.forEach(ship => addToQueue(ship, shipLastUpdate));
    } else {
        shipLastUpdate = JSON.parse(storedDate);
        shipsArray.forEach(async(ship) => {
            const lastUpdate = shipLastUpdate[ship.mintAddress];
            const elapsedDays = (currentDate - new Date(lastUpdate)) / Constants.DAY;
            resupplyShipByElapsedDay(shipLastUpdate, elapsedDays, ship);
        });
    }
}

const resupplyShipByElapsedDay = async(shipLastUpdate, elapsedDays, ship) => {
    console.log(`${ship.name} elapsed days: ${elapsedDays}`);
    if (elapsedDays >= 0.8 && ship.name === ships.pearceX4.name) {
        addToQueue(ship, shipLastUpdate);
    } else if (elapsedDays >= 1.8 && ship.name === ships.pearceX5.name) {
        addToQueue(ship, shipLastUpdate);
    } else if (elapsedDays >= 2.8 && ship.name === ships.vzusOpod.name) {
        addToQueue(ship, shipLastUpdate);
    }
}

const queue = [];
const timer = new Map();

const addToQueue = async(ship, shipLastUpdate) => {
    if (!timer.has(ship.id)) {
        timer.set(ship.id, Date.now());
        queue.push(ship);
        processQueue(shipLastUpdate);
    } else {
        const timeDifference = Date.now() - timer.get(ship.id);
        if (timeDifference > 10000) { // 10 sec
            timer.set(ship.id, Date.now());
            queue.push(ship);
            processQueue(shipLastUpdate);
        } else {
            fileUtil.info(`Too many requests for ${ship.name}, retrying in ${5000 - timeDifference} milliseconds`);
            setTimeout(() => {
                addToQueue(ship, shipLastUpdate);
            }, 60000 - timeDifference);
        }
    }
};

const processQueue = async(shipLastUpdate) => {
    if (queue.length === 0) return; //return if no ships is available
    const ship = queue.shift();
    console.log('processQueue ship', ship);
    console.log('processQueue shipLastUpdate', shipLastUpdate);
    try {
        const response = await reSupply(ship);
        fileUtil.info(`Successfully resupplied: ${response.name} => ${response.message}`);
        shipLastUpdate[ship.mintAddress] = currentDate.toISOString();
        fileUtil.writeResupplyDates(shipLastUpdate);
        timer.delete(ship.id);
        processQueue(shipLastUpdate);
    } catch (error) {
        console.info('error', error);
        fileUtil.info(`Error thrown: ${error.name}: ${error.message}`);
    }
};

module.exports = {
    updateData
};