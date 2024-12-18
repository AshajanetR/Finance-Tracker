
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-recors-context";

export const FinancialRecordForm = () => {

const [Description,setDescription]=useState<string>("");
const [Amount,setAmount]=useState<string>("");
const [Category,setCategory]=useState<string>("");
const [Payment,setPayment]=useState<string>("");
const {addRecord}=useFinancialRecords();

const {user}=useUser();

const handleSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
   event.preventDefault();
   
   const newRecord={
    userId:user?.id ?? "",
    date:new Date(),
    description:Description,
    amount:parseFloat(Amount),
    category:Category,
    paymentmethod:Payment,
 };
    addRecord(newRecord);
    setDescription("");
    setAmount("");
    setCategory("");
    setPayment("");
};
  return (
    <div className="form-container">
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label>Description:</label>
                <input  type="text" required className="input" value={Description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className="form-field">
                <label>Amount:</label>
                <input  type="number" required className="input" value={Amount} onChange={(e)=>setAmount(e.target.value)}/>
            </div>
            <div className="form-field">
                <label>Category:</label>
                <select required className="input" value={Category} onChange={(e)=>setCategory(e.target.value)}>
                   <option value="">Select a Category</option>
                   <option value="Food">Food</option>
                   <option value="Rent">Rent</option>
                   <option value="Salary">Salary</option>
                   <option value="Utilities">Utilities</option>
                   <option value="Entertainment">Entertainment</option>
                   <option value="Others">Others</option>
                </select>
            </div>
            <div className="form-field">
                <label>Payment Method:</label>
                <select required className="input" value={Payment} onChange={(e)=>setPayment(e.target.value)}>
                    <option value="">Select a Payment Method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                </select>
            </div>
            <button type="submit" className="button">Add Record</button>
        </form>
    </div>
  )
}
