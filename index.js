import process from "process";

process.stdin.on("data", (data) => {
    const res = data.toString("utf8").split("").reverse().join("");
    process.stdout.write(res + "\n");
});
