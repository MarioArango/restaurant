import React from "react";
import ReactExport from "react-export-excel";
import { Button } from "antd";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excel = ({dataSource, columns, fileName}) => {

    return (
        <ExcelFile element={<Button>Excel</Button>}>
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