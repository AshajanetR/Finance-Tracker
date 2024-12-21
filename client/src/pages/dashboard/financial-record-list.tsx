import { useMemo,useState } from "react";
import { Financialrecord, useFinancialRecords } from "../../contexts/financial-recors-context"
import {useTable,Column,CellProps} from "react-table";

interface EditableCellProps extends CellProps<Financialrecord>{
  updateRecord:(rowIndex:number,columnId:string,value:any)=>void;
  editable:boolean;
}

const EditableCell:React.FC<EditableCellProps>=({value:initialvalue,row,column,updateRecord,editable})=>{
    
  const [isediting,setisediting]=useState(false);
  const [value,setvalue]=useState(initialvalue);
  
  const onBlur1=()=>{
    setisediting(false);
    updateRecord(row.index,column.id,value);
  };
  
  return(
  <div onClick={()=>editable && setisediting(true)} 
  style={{cursor:editable?"pointer":"default"}}
  >
    {isediting ? (<input value={value} 
    onChange={(e)=>setvalue(e.target.value)} autoFocus 
    onBlur={onBlur1} style={{width:"100%"}} />)
     :typeof value === "string"
     ?(value)
     :(value?.toString())} 
  </div>
  );
};
export const FinancialRecordList = () => {
    
  const {records,updateRecord,deleteRecord}=useFinancialRecords();
  
  const updateCellRecord=(rowIndex:number,columnId:string,value:any)=>{
         const id=records[rowIndex]._id;
         updateRecord(id??"",{...records[rowIndex],[columnId]:value})
  }
  const columns:Array<Column<Financialrecord>>=useMemo(()=>[
    {
      Header:"Description",
      accessor:"description",
      Cell:(props)=>(
      <EditableCell {...props} updateRecord={updateCellRecord} editable={true}/>
      ),
    },
    {
      Header:"Amount",
      accessor:"amount",
      Cell:(props)=>(
      <EditableCell {...props} updateRecord={updateCellRecord} editable={true}/>
      ),
    },
    {
      Header:"Category",
      accessor:"category",
      Cell:(props)=>(
      <EditableCell {...props} updateRecord={updateCellRecord} editable={true}/>
      ),
    },
    {
      Header:"Payment Method",
      accessor:"paymentmethod",
      Cell:(props)=>(
      <EditableCell {...props} updateRecord={updateCellRecord} editable={true}/>
      ),
    },
    {
      Header:"Date",
      accessor:"date",
      Cell:(props)=>(
      <EditableCell {...props} updateRecord={updateCellRecord} editable={false}/>
      ),
    },
    {
      Header:"Delete",
      Cell:({row})=>(
      <button onClick={()=>deleteRecord(row.original._id??"")} className="button">Delete</button>
      ),
    }
  ],[records]);

  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow}=useTable({columns,data:records});

  return (
      <div className="table-container">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((hg)=>(
              <tr {...hg.getHeaderGroupProps()}>
                {hg.headers.map((column)=>(
                  <th {...column.getHeaderProps()}>
                    {column.render("Header") as React.ReactNode}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row)=>{
              prepareRow(row);
              return <tr {...row.getRowProps()}>{row.cells.map((cell)=>(
                <td{...cell.getCellProps()}> {cell.render("Cell") as React.ReactNode} </td>
              ))}</tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }
