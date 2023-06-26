// exportUtils.js

import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const exportToCSV = (data) => {
    const allData = []
    
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            allData.push(data[i][j])
        }
    }
    console.log("Looping array",allData)
    let dataArr = Array.from(data);
  const csvData = dataArr.map((row) => Object.values(row).join(',')).join('\n');
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, 'table_data.csv');
};

// export const exportToPDF = (data) => {
//   const doc = new jsPDF();
//   const tableContent = [];
//   const columns = Object.keys(data[0]);

//   data.forEach((row) => {
//     const rowData = Object.values(row);
//     tableContent.push(rowData);
//   });

//   doc.autoTable({
//     head: [columns],
//     body: tableContent,
//   });

//   doc.save('table_data.pdf');
// };
export const exportToPDF = async (data) => {
  const doc = new jsPDF();
  const tableContent = [];
  const columns = Object.keys(data[0]);

  data.forEach((row) => {
    const rowData = Object.values(row);
    tableContent.push(rowData);
  });

  await doc.autoTable({
    head: [columns],
    body: tableContent,
  });

  doc.save('table_data.pdf');
};