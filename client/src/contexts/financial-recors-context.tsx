import { useUser } from "@clerk/clerk-react";
import { createContext,useState,useContext, useEffect } from "react";

export interface Financialrecord{
    _id?:string;
    userId:string;
    description:string;
    date:Date;
    amount:number;
    category:string;
    paymentmethod:string;
}
interface FinancialrecordsContextType{
    records:Financialrecord[];
    addRecord:(record:Financialrecord)=>void;
    updateRecord:(id:string,newRecord:Financialrecord)=>void;
    deleteRecord:(id:string)=>void;
}
export const FinancialrecordsContext=createContext<FinancialrecordsContextType | undefined>(undefined);

export const FinancialRecordsProvider=({children}:{children:React.ReactNode})=>{
    
    const [records,setRecords]=useState<Financialrecord[]>([]);
    const {user}=useUser();
    const fetchRecords = async()=>{
        if(!user) return;
        const response= await fetch(`https://finance-tracker-back-one.vercel.app/financial-record/getAllByUserID/${user?.id}`);
        if(response.ok){
            const records= await response.json();
            console.log(records);
            setRecords(records);
        }
    };
    
    useEffect(()=>{fetchRecords();},[user]);


    const addRecord=async(record:Financialrecord)=>{
    const response=  await fetch("https://finance-tracker-back-one.vercel.app/financial-record",{ 
      method:"POST",
      body:JSON.stringify(record),
      headers:{
        'Content-Type':"application/json",
      },
    });
    
    try {
        if(response.ok){
            const newRecord= await response.json();
            setRecords((prev)=>[...prev,newRecord]);
        } 
    } catch (error) { };
   
    };


    const updateRecord=async(id:string,newrecord:Financialrecord)=>{
        const response=  await fetch(`https://finance-tracker-back-one.vercel.app/financial-record/${id}`,{ 
          method:"PUT",
          body:JSON.stringify(newrecord),
          headers:{
            'Content-Type':"application/json",
          },
        });
        
        try {
            if(response.ok){
                const newRecord= await response.json();
                setRecords((prev)=>prev.map((record)=>{
                    if(record._id===id){
                        return newRecord;
                    }else{
                        return record;
                    }
                }));
            } 
        } catch (error) { };
       
        };
        
    
        const deleteRecord=async(id:string)=>{
            const response=  await fetch(`https://finance-tracker-back-one.vercel.app/financial-record/${id}`,{ 
                method:"DELETE",
              });
              
              try {
                  if(response.ok){
                      const deleteRecord= await response.json();
                      setRecords((prev)=>prev.filter((record)=>record._id!==deleteRecord._id));
                  } 
              } catch (error) { };
             
        }
    return( <FinancialrecordsContext.Provider value={{records,addRecord,updateRecord,deleteRecord}}>
        {" "}
        {children}
    </FinancialrecordsContext.Provider>
    );
};

export const useFinancialRecords=()=>{
    const context=useContext<FinancialrecordsContextType | undefined>(FinancialrecordsContext);
    if(!context)
        throw new Error("usefinancialrecord must be within a FinancialRecordsProvider ");
    return context;
};
