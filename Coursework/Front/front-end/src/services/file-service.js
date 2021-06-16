import XLSX from 'xlsx'

function downloadTableWithoutLast2(table, name, fileName) {
    if (!table.nodeType) 
        table = document.getElementById(table)
    var copy = table.cloneNode(true)
    var rows = copy.rows
    var cells = rows[0].cells

    var i = cells.length - 1
    for (var j = 0; j < rows.length; j++) {
        rows[j].deleteCell(i);
    }

    var i = cells.length - 1
    for (var j = 0; j < rows.length; j++) {
        rows[j].deleteCell(i);
    }

    var wb = XLSX.utils.table_to_book(copy, {sheet: "Page 1"})
    XLSX.writeFile(wb, null || (fileName + '.' +  'xlsx'));
};

function downloadTable(table, name, fileName) {
    if (!table.nodeType) {
        table = document.getElementById(table)
    }    
    var wb = XLSX.utils.table_to_book(table, {sheet: "Page 1"})
    XLSX.writeFile(wb, null || (fileName + '.' +  'xlsx'));
};

function downloadTableWithoutLast1(table, name, fileName) {
    if (!table.nodeType) 
        table = document.getElementById(table)
    var copy = table.cloneNode(true)
    var rows = copy.rows
    var cells = rows[0].cells

    var i = cells.length - 1
    for (var j = 0; j < rows.length; j++) {
        rows[j].deleteCell(i);
    }

    var wb = XLSX.utils.table_to_book(copy, {sheet: "Page 1"})
    XLSX.writeFile(wb, null || (fileName + '.' +  'xlsx'));
}

export {downloadTable, downloadTableWithoutLast1, downloadTableWithoutLast2}

