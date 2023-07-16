const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://bhuwan:bhuwan123@carrental.bsteyhl.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log("no connection", err);
  });
