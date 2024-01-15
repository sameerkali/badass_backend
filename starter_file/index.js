const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Port = process.env.PORT || 6969
app.listen(Port, () => console.log(`server listening on port ${Port}`));
