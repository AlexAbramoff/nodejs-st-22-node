const csv = require("csvtojson");
const fs = require("fs");

const csvFile = fs.createReadStream("./nodejs-hw1-ex1.csv");
const txtFile = fs.createWriteStream("./nodejs-hw1-ex1.txt");

try {
    csv({
        delimiter: ";",
        checkType: true,
        ignoreColumns: /Amount/i,
        colParser: {
            Price: (item) => {
                return +item.replace(",", ".");
            },
        },
    })
        .fromStream(
            csvFile.on("error", (err) => {
                console.log(err);
            })
        )
        .subscribe((data) => {
            return new Promise((resolve, reject) => {
                const elemKeys = Object.keys(data);
                for (let i = 0; i < elemKeys.length; i++) {
                    data[elemKeys[i].toLowerCase()] = data[elemKeys[i]];
                    delete data[elemKeys[i]];
                }
                resolve();
            });
        })
        .pipe(
            txtFile.on("error", (err) => {
                console.log(err);
            })
        );
} catch (error) {
    console.log(error);
}
