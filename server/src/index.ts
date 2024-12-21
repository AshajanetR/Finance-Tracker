import express,{Express} from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./Routes/financial-records";
import cors from "cors";
const app: Express=express();
const port =process.env.PORT || 3001;

app.use(express.json());
app.use(cors(
        {
                origin:["https://finance-tracker-frontend-six.vercel.app"],
                methods:["POST","GET","PUT"],
                credentials:true
        }
));
const mongoURI: string ="mongodb+srv://AshajanetR:Asha1310@financetracker.frmjt.mongodb.n";

mongoose.connect(mongoURI)
        .then(()=>console.log("CONNECTED TO MONGODB."))
        .catch((err)=>console.error("Failed to Connect to MongoDB:",err));

app.use("/financial-record",financialRecordRouter);

app.get('/', (req, res) => {
        res.send('<h1>Hello World</h1>');
      });

app.listen(port,()=>{
    console.log(`Server Running on Port ${port}`);
 }); 
