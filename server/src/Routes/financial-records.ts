import express ,{Request,Response} from "express";
import FinacialRecordModel from "../schema/financial-record";

const router=express.Router();
router.get("/getAllByUserID/:userId",async (req: Request,res: Response)=>{
     try {
        const userId=req.params.userId;
        const records= await FinacialRecordModel.find({userId:userId});
        if(records.length===0)
            return res.status(404).send("No records found for the user.");
        res.status(200).send(records);
     } catch (error) {
        res.status(500).send(error);
     }
});

router.post("/",async(req:Request,res:Response)=>{
    try {
      const newRecordBody=req.body;
      const newRecord= new FinacialRecordModel(newRecordBody);
      const savedrecord=await newRecord.save();
      res.status(200).send(savedrecord);
    } catch (error) {
      res.status(500).send(error);
    }
});

router.put("/:id",async(req:Request,res:Response)=>{
try {
   const id=req.params.id;
   const newRecordbody=req.body;
   const record=await FinacialRecordModel.findByIdAndUpdate(id,newRecordbody,{new:true});
   if(!record) return res.status(404).send("Record not Found.")
   res.status(200).send(record);   
} catch (error) {
   res.status(500).send(error);
}
});

router.delete("/:id",async(req:Request,res:Response)=>{
    try {
    const id=req.params.id;
    const del=await FinacialRecordModel.findByIdAndDelete(id);
    if(!del) return res.status(404).send("Could not find file for deletion.");
    res.status(200).send(del);
    } catch (error) {
      res.status(500).send(error);
    }
});
export default router;
