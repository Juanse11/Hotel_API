var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var HotelRouter = require("./routes/hotelRouter");
var UserRouter = require("./routes/userRouter");
var tokenRouter = require("./routes/tokenRouter");
var reservationRouter = require("./routes/reservationRoutes");
var availableRouter = require("./routes/availableRouter");


mongoose.connect("mongodb://localhost/hotel", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use("/hotels",HotelRouter);
app.use("/hotels/reservations",reservationRouter);
app.use("/hotels/availables",availableRouter);
app.use("/users",UserRouter);
app.use("/tokens",tokenRouter);


app.listen(3000,function(){
    console.log("Server connected.");
});