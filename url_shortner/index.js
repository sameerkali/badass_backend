const express = require("express");
const urlRouter = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const app = express();
const Port = 8001;

connectToMongoDB("mongodb://localhost:27017/url_shortner").then(
  () => console.log("MONGODB CONNECTED")
);

app.use(express.json());

app.use("url", urlRouter);

app.get("/:shortId", async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory: {timestamp: Date.now()}
        }
    })
    res.redirect(entry.redirectURL);
});

app.listen(Port, () => console.log("server listening on port " + Port));
