const fs = require("fs");

const JSON_FILE_LOCATION = "./NkpdJSON.json";

function write(json) {
    fs.writeFile(JSON_FILE_LOCATION, JSON.stringify(json), () => {
        console.log("File saved");
    });
}

function read() {
    if (!fs.existsSync(JSON_FILE_LOCATION)) {
        throw new Error("File does not exist! Create the file first!");
    }

    const data = fs.readFileSync(JSON_FILE_LOCATION);
    return JSON.parse(data.toString());
}

module.exports = { write, read };
