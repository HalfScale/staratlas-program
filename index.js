const { updateData } = require('./date-service');
(() => {
    console.log("Executing ship resupply");
    updateData();
    setInterval(() => {
        updateData();
    }, 30000);
})();