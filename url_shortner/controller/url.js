const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
console.log("i am called")
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: []
  });
  return response.json({ id: shortID });
}
module.exports = {
  handleGenerateNewShortURL,
};
