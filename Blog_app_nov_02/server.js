const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/DB");

//env configuration
dotenv.config()
const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE;

//import routes
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRouter");

//mongodb connection
connectDB();


//rest object
const app = express();

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/blog', blogRoutes)


//server
app.listen(PORT, () => console.log(`listening on ${DEV_MODE} ${PORT}`.bgCyan.white));
