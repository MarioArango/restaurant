import React from "react";
import ReactExport from "react-export-excel-xlsx-fix";
import { Button, Tooltip } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excel = ({dataSource, columns, fileName}) => {

    return (
        <ExcelFile 
            element={
                <Tooltip title="Exportar a Excel">
                    <Button type="default" className="text-white bg-green-700 hover:bg-green-600 hover:text-white hover:border-green-700">
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
                    columns.map(c => {
                        return (
                            <ExcelColumn label={c.title} value={c.dataIndex}/>
                        )
                    })
                }
            </ExcelSheet>
        </ExcelFile>
    )
}

export default Excel;