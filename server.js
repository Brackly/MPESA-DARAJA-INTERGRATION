const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials");
const authHandler = require('./middleware/auth')
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));



// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use(authHandler)
app.use("/b2c", require("./routes/api/b2c"));
app.use("/c2b", require("./routes/api/c2b"));
app.use("/stkpush", require("./routes/api/stkpush"));

app.all("*", (req, res) => {
  res.status(404).json({'message':"route does not exist!!"})
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
