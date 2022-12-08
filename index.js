import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import eventsRoutes from './routes/events.js';
import projectsRoutes from './routes/projects.js';
import adminRoutes from './routes/admin.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use("/events", eventsRoutes);
app.use("/admin", adminRoutes);
app.use("/rd",projectsRoutes);
// app.get("/", (req, res)=>{
//     res.json("Hello World")
// })
const port =  process.env.PORT || 3000;

const DB=process.env.CONNECTION_URL
mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(port,()=>console.log(`Server running successfully at PORT: ${port}`)))
    .catch((error)=>console.log(`Due to ${error}, server did not connect`));

mongoose.set('useFindAndModify',false);