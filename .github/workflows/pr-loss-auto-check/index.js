const losses = require("./russian-losses.json");
const current = losses[0];
const prev = losses[1];

const assert = (key, upper) => {
    const currentCount = current[key];
    const prevCount = prev[key];
    const diffCount = currentCount - prevCount;

    console.log(`Validating '${key}' value of ${currentCount} - ${prevCount} (${diffCount} difference).`)
    if (diff < 0 || diff > upper) {
        throw new Error(`Difference of ${diffCount} for '${key}' falls outside of bounds 0,${upper}.`);
    }
};

assert("personnel", 5000);
assert("artillery", 1);
assert("fixedWingAircraft", 250);
assert("rotoryWingAircraft", 250);
assert("tanks", 250);
assert("afvs", 250);
assert("rocketSystems", 250);
assert("airDefense", 250);
assert("ships", 50);
assert("submarines", 50);
assert("unarmoredVehicles", 250);
assert("specialEquipment", 250);
assert("uavs", 1000);
assert("missiles", 1000);

console.log("All validations have completed successfully.");
