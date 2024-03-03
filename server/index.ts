import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";

import { TodoModel } from "./models/Todo";

dotenv.config();

const app = express()

app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MongoDBAPI!)
.then((res) => {console.log("connected to cluster0...")})
.catch((err) => {console.log(err)});

app.get("/get", (req, res) => {
    TodoModel.find().then(result => res.json(result)).catch(err => res.json(err))
})

app.post("/add", (req, res) => {
    const task = req.body.Task;
    console.log(`Got task ${task}`);
    TodoModel.create({
        task: task
    }).then((result) => res.json(result))
    .catch((err) => res.json(err))
})

app.put("/update/:id/:isChecked", (req, res) => {
    const { id, isChecked } = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: isChecked})
    .then(result => res.json(result))
    .catch(err => res.send(err));
})

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    TodoModel.deleteOne({_id: id})
    .then(result => res.json(result))
    .catch(err => res.send(err));
})

app.listen(3001, () => console.log("Listening on server 3001..."));