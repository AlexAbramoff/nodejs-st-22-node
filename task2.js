const csv = require("csvtojson");
const fs = require("fs");

const csvFile = fs.createReadStream("./nodejs-hw1-ex1.csv");
const txtFile = fs.createWriteStream("./nodejs-hw1-ex1.txt");

try {
    csv({
        delimiter: ";",
        checkType: true,
    })
        .fromStream(csvFile)
        .subscribe((data) => {
            return new Promise((resolve, reject) => {
                const elemKeys = Object.keys(data);
                for (let i = 0; i < elemKeys.length; i++) {
                    if (elemKeys[i] === "Price") {
                        data[elemKeys[i]] = +data[elemKeys[i]].replace(
                            ",",
                            "."
                        );
                    }
                    data[elemKeys[i].toLowerCase()] = data[elemKeys[i]];
                    delete data[elemKeys[i]];
                }
                resolve();
            });
        })
        .pipe(txtFile);
} catch (error) {
    console.error(error);
}
