import * as excel from 'xlsx';

function useExcelSheetDown(datas: any, fileName: string) {
    let sheetNames = Object.keys(datas);
    const wb = excel?.utils?.book_new();
    sheetNames.forEach(sheetName => {
        if(datas[sheetName].length == 0) return;
        const ws = excel?.utils?.json_to_sheet(datas[sheetName]);
        excel?.utils?.book_append_sheet(wb, ws, sheetName);
    });
    excel?.writeFile(wb, `${fileName}.xlsx`);
}

export default useExcelSheetDown;