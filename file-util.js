const fs = require('fs');

const info = (text) => {
    fs.appendFile('logs.txt', `[${new Date().toLocaleString()}] ${text}\n`, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

const writeResupplyDates = (mappedResupplyDates) => {
    fs.writeFile('stored_date.txt', JSON.stringify(mappedResupplyDates), (err) => {
        if (err) {
            console.error(err);
        }
    });
}

const readResupplyDates = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('stored_date.txt', 'utf-8', (err, storedDate) => {
            if (err) {
                reject(err);
            } else {
                resolve(storedDate);
            }
        });
    });
};

module.exports = {
    info,
    writeResupplyDates,
    readResupplyDates
}