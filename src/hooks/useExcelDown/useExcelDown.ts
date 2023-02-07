import * as excel from 'xlsx';
import React from 'react';
import { DataTableRowType } from '@components/common/DataTable';

function useExcelDown(rows: DataTableRowType<any>[], pageName: string) {
    console.log('다운로드 클릭' + excel);
    const ws = excel?.utils?.json_to_sheet(rows);
    const wb = excel?.utils?.book_new();
    excel?.utils?.book_append_sheet(wb, ws, 'Sheet1');
    excel?.writeFile(wb, `${pageName}.xlsx`);
}

export default useExcelDown;