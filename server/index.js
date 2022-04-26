const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "car"
})

app.listen(3001, ()=>{
    console.log("connection successfull")
})

app.get("/getUserDetails", (req, res)=>{
    const sqlQuery = "SELECT * FROM user";
    db.query(sqlQuery, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            // console.log(result.length)
        }
    })
})

app.get("/getCarDetails", (req, res)=>{
    const sqlQuery = "SELECT * FROM car";
    db.query(sqlQuery, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            // console.log(result.length)
        }
    })
})

app.get("/getBookings", (req, res)=>{
    const sqlQuery = "SELECT * FROM bookings";
    db.query(sqlQuery, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            // console.log(result.length)
        }
    })
})

app.get("/getAllComments", (req, res)=>{
    const sqlQuery = "SELECT * FROM comments";
    db.query(sqlQuery, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            console.log(result.length)
        }
    })
})

app.post("/setUserDetails", (req, res)=>{
    const name = req.body.name;
    const phone = req.body.phone;
    const username = req.body.username;
    const password = req.body.password;

    const sqlQuery = "INSERT INTO user (Username, UserPassword, Name, Phone) VALUES (?, ?, ?, ?)";
    db.query(sqlQuery, [username, password, name, phone], (err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Registration in user successfull")
            res.send("registration with details "+[username, password, name, phone]+" successfull")
        }
        
    })
})

app.get("/getCarBookingDetails", (req, res)=>{
    // console.log("getting booking details")
    let CarID = req.query["CarID"]
    // console.log(req.query["CarID"])
    const sqlQuery = "SELECT * FROM bookings WHERE carID=(?)";
    db.query(sqlQuery, [CarID], (err, result)=>{
        if(err){
            // console.log("There was an error")
        }else{
            // console.log("Seding car booking details")
            res.send(result)
        }
    })
})

app.post("/setSubscription", (req, res)=>{
    const userID = req.body.userID;
    const carID = req.body.carID;
    const StartDate = req.body.StartDate;
    const EndTime = req.body.EndTime;
    console.log(userID, carID, StartDate, EndTime)

    sqlQuery = "INSERT INTO bookings (UserID, CarID, StartDate, EndDate) VALUES(?, ?, ?, ?);"
    db.query(sqlQuery, [userID, carID, StartDate, EndTime], (err, result)=>{
        res.send(result)
    })
})

app.get("/getComments", (req, res)=>{
    let CarID = req.query["CarID"]
    console.log(CarID)
    const sqlQuery = "SELECT * FROM comments INNER JOIN user ON comments.UserID=user.UserID WHERE comments.CarID=(?);"
    db.query(sqlQuery, [CarID], (err, result)=>{
        if(err){
            console.log("cannot get comments")
        }else{
            console.log("got comments")
            console.log(result)
            // res.send(result)
        }
    })
})

app.post("/addComment", (req, res)=>{
    console.log("hello")
    const comment =  req.body.comment
    const CarID =  req.body.CarID
    const UserID =  req.body.UserID

    console.log(comment, UserID, CarID)

    sqlQuery = "INSERT INTO car.comments (UserID, CarID, Comment) VALUES(?, ?, ?);"
    db.query(sqlQuery, [UserID, CarID, comment], (err, result)=>{
        res.send(result)
    })
})

app.get("/getUserBookings", (req, res)=>{
    let UserID = req.query.UserID
    console.log(UserID)
    let sqlQuery = "SELECT * FROM car.bookings INNER JOIN car.user ON car.bookings.UserID=car.user.UserID WHERE car.user.UserID= ?;"
    db.query(sqlQuery, [UserID], (err, result)=>{
        // console.log(result)
        res.send(result)
    })
})


app.post("/removeBooking", (req, res)=>{
    console.log("calling")
    const bookingID = req.body.BookingID
    const sqlQuery = "DELETE FROM car.bookings WHERE bookings.BookingID = ?;"
    db.query(sqlQuery, [bookingID], (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    })
})

app.post("/addCar", (req, res)=>{
    const Name = req.body.Name;
    const Description = req.body.Description;
    const Features = req.body.Features;
    const Type = req.body.Type;

    const sqlQuery = "INSERT INTO car.car (Name, Description, Features, Type) VALUES (?, ?, ?, ?);"
    db.query(sqlQuery, [Name, Description, Features, Type], (err, result)=>{
        if(err){
            console.log("err")
        }else{
            console.log("Car Insertion successfull");
        }
    })
})