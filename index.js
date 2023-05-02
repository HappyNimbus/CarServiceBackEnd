import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"password",
    database:"test"
})

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json("Hello, this is backend");
})

app.get("/cars" , (req,res)=>{
    const q = "SELECT * FROM cars";
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/makeCar",(req,res)=>{
    const q = "INSERT INTO cars (`carName`,`km`,`carYear`,`carDesc`,`cover`, `carPrice`) VALUES (?)";
    const values = [req.body.carName,
    req.body.km,
    req.body.carYear,
    req.body.carDesc,
    req.body.cover,
    req.body.carPrice];

    db.query(q, [values], (err,data) => {
        if(err) return res.json(err);
        return res.json("Car added");
    })

})

app.delete("/deleteCar/:id", (req,res) =>{
    const carId = req.params.id;
    const q = "DELETE FROM cars WHERE id = ?"

    db.query(q,[carId], (err,data)=>{
        if (err) return res.json(err);
        return res.json("Car listing deleted");
    })
})

app.put("/updateCar/:id", (req,res)=>{
    const carId = req.params.id;
    const q = "UPDATE cars SET `carName` = ?, `km` = ?, `carYear` = ?, `carDesc` = ?, `cover` = ?, `carPrice` = ? WHERE id = ?"

    const values = [req.body.carName,
        req.body.km,
        req.body.carYear,
        req.body.carDesc,
        req.body.cover,
        req.body.carPrice]

    db.query(q, [...values, carId], (err,data) =>{
        if (err) return res.json(err);
        return res.json("Car listing has been updated");
    })
})
app.listen(8800, ()=>{
    console.log("Connected to backend")
})