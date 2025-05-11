// src/utils/pdfGenerator.js
import jsPDF from "jspdf";

export const downloadPDF = (report) => {
  console.log("Starting PDF generation for:", report.student);
  try {
    const doc = new jsPDF();
    console.log("jsPDF instance created");
    doc.setFontSize(16);
    doc.text("Internship Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Student: ${report.student}`, 20, 40);
    doc.text(`Major: ${report.major}`, 20, 50);
    doc.text(`Company: ${report.company}`, 20, 60);
    doc.text(`Supervisor: ${report.supervisor}`, 20, 70);
    doc.text(`Period: ${report.startDate} to ${report.endDate}`, 20, 80);
    doc.text(`Status: ${report.status}`, 20, 90);
    doc.text(doc.splitTextToSize(`Details: ${report.details}`, 160), 20, 100);
    if (report.comments) {
      doc.text(
        doc.splitTextToSize(`Comments: ${report.comments}`, 160),
        20,
        120
      );
    }
    console.log("PDF content added");
    const pdfBlob = doc.output("blob");
    console.log("Blob created:", pdfBlob);
    const url = URL.createObjectURL(pdfBlob);
    console.log("Blob URL:", url);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.student}_report.pdf`;
    document.body.appendChild(link);
    link.click();
    console.log("Download triggered");
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log("Cleanup completed");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Check the console for details.");
  }
};