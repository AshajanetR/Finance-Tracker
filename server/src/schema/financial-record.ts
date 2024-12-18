import mongoose from "mongoose";

interface Financialrecord{
    userId:string;
    description:string;
    date:Date;
    amount:number;
    category:string;
    paymentmethod:string;
}
const financialRecordschema =new mongoose.Schema<Financialrecord>({
    userId:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:Date,required:true},
    amount:{type:Number,required:true}, 
    category:{type:String,required:true},
    paymentmethod:{type:String,required:true},
});

const FinacialRecordModel=mongoose.model("FinancialRecordTracker",financialRecordschema);

export default FinacialRecordModel;