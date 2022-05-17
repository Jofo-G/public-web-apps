const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const fs = require("fs");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/enquiries", (req, res) => {
  res.sendFile("/database/enquiries.json", { root: "./" });
});

app.get("/form", (req, res) => {
  res.sendFile("/database/form.json", { root: "./" });
});

app.post("/enquiries", (req, res) => {
  filePath = __dirname + "/database/enquiries.json";
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.status(505).send(err.message);
    }

    var json = JSON.parse(data);
    json.push(req.body);

    fs.writeFile(filePath, JSON.stringify(json), (err) => {
      if (err) {
        res.status(505).send(err.message);
      }
    });
  });
  res.status(200).send("Successfully updated file");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
