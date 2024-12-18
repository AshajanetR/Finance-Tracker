import {useUser} from "@clerk/clerk-react";
import "./financial-record.css";
import { FinancialRecordList } from "./financial-record-list";
import { FinancialRecordForm } from "./financial-record-form";
import { useFinancialRecords } from "../../contexts/financial-recors-context";
import { useMemo } from "react";
export const Dashboard = () => {

    const {user}=useUser();
    const {records}=useFinancialRecords();
    const monthytotal=useMemo(()=>{
     let totalAmount=0;
     records.forEach((record)=>{
      totalAmount+=record.amount;
     })
     return totalAmount;
    } ,[records])
  return (
    <div className="dashboard-container">
        <h1>Welcome {user?.firstName}! Here are your Finances:</h1>
        <FinancialRecordForm/>
        <div>Total Monthly: ${monthytotal}</div>
        <FinancialRecordList/>
    </div>
  )
}
