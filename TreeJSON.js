const xlsx = require("read-excel-file/node");
const jsonFile = require("./FileJSON.js");

function create(path) {
    const tree = {};

    xlsx(path).then((rows) => {
        for (let i = 1; i < rows.length; i++) {
            addNode(tree, rows[i][1], rows[i][2], 0);
        }
        jsonFile.write(tree);
    });
}

function addNode(tree, code, name, level) {
    if (code.length === level) {
        tree.name = name;
        return;
    }

    if (level === 4) {
        tree[code] = { name };
        return;
    }

    const str = code.slice(0, level + 1);

    if (!tree[str]) {
        tree[str] = {};
    }

    addNode(tree[str], code, name, level + 1);
}

function findByCode(code) {
    var tree;

    try {
        tree = jsonFile.read();
    } catch (err) {
        console.error(err);
        return;
    }

    const result = searchByCode(tree, code, 0);

    return result;
}

function searchByCode(tree, code, level) {
    if (code.length === level) {
        return tree;
    }

    if (level === 4) {
        return tree[code];
    }

    const str = code.slice(0, level + 1);
    return searchByCode(tree[str], code, level + 1);
}

function findByName(name) {
    var tree;

    try {
        tree = jsonFile.read();
    } catch (err) {
        console.error(err);
        return;
    }

    const result = [];
    searchByName(tree, name, result);
    return result;
}

function searchByName(tree, name, result) {
    for (let key in tree) {
        if (key != "name") {
            searchByName(tree[key], name, result);
        }
    }

    if (tree.name && tree.name.toLowerCase().includes(name.toLowerCase())) {
        result.push(tree.name);
    }
}

module.exports = { create, findByCode, findByName };
