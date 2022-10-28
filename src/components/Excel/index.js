import React from "react";
import ReactExport from "react-export-excel-xlsx-fix";
import { Button, Tooltip } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excel = ({permission = false, dataSource = [], columns = [], fileName = ""}) => {

    return (
        <>
            {
                permission ? 
                <ExcelFile 
                    element={
                        <Tooltip title="Exportar a Excel">
                            <Button style={{background: "green", color: "white", border: "1px solid white"}} type="default">
                                <div className="flex">
                                    <FileExcelOutlined className="mt-1 mr-2" />
                                    <p>Excel</p>
                                </div>
                            </Button>
                        </Tooltip>
                        
                    }
                >
                    <ExcelSheet data={dataSource} name={fileName}>
                        {
                            columns.map((c, index) => {
                                return (
                                    <ExcelColumn key={index} label={c.title} value={c.dataIndex}/>
                                )
                            })
                        }
                    </ExcelSheet>
                </ExcelFile> : 
                <Tooltip
                    title={<p className='text-black font-semibold'>Necesitas permiso para ejecutar esta acción!</p>} 
                    color="#F7F6DC" 
                    placement="left"
                >
                    <Button disabled type="default">
                        <div className="flex">
                            <FileExcelOutlined className="mt-1 mr-2" />
                            <p>Excel</p>
                        </div>
                    </Button>
                </Tooltip>
            }
        </>
    )
}

export default Excel;