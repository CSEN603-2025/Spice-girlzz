<<<<<<< HEAD
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
=======
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174

export const generateDummyPDF = async (report) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
<<<<<<< HEAD

=======
    
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
    const text = `
      Internship Report
      ================
      
      Student: ${report.student}
      Major: ${report.major}
      Company: ${report.company}
      Status: ${report.status}
      
      Report Details:
      ${report.details}
    `;
<<<<<<< HEAD

=======
    
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
    page.drawText(text, {
      x: 50,
      y: height - 50,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
<<<<<<< HEAD

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Report_${report.student.replace(" ", "_")}_${report.id}.pdf`;
=======
    
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Report_${report.student.replace(' ', '_')}_${report.id}.pdf`;
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
<<<<<<< HEAD
    console.error("Error generating PDF:", error);
=======
    console.error('Error generating PDF:', error);
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
  }
};

export const generateStatisticsReport = async (stats) => {
  try {
    const now = new Date();
    const reportDate = now.toLocaleDateString();
    const reportTime = now.toLocaleTimeString();
<<<<<<< HEAD

=======
    
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
<<<<<<< HEAD

    let yPosition = height - 50;

    page.drawText("Internship Program Statistics Report", {
=======
    
    let yPosition = height - 50;
    
    page.drawText('Internship Program Statistics Report', {
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
      x: 50,
      y: yPosition,
      size: 20,
      font: boldFont,
      color: rgb(0, 0, 0.5),
    });
    yPosition -= 30;
<<<<<<< HEAD

=======
    
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
    page.drawText(`Generated on: ${reportDate} at ${reportTime}`, {
      x: 50,
      y: yPosition,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });
    yPosition -= 40;
<<<<<<< HEAD

    page.drawText("1. Summary Statistics", {
=======
    
    page.drawText('1. Summary Statistics', {
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
      x: 50,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 25;
<<<<<<< HEAD

    const totalReports =
      (stats.reportsPerCycle.accepted || 0) +
      (stats.reportsPerCycle.rejected || 0) +
      (stats.reportsPerCycle.flagged || 0) +
      (stats.reportsPerCycle.pending || 0);
    const acceptedPercentage = totalReports
      ? Math.round((stats.reportsPerCycle.accepted / totalReports) * 100)
      : 0;

=======
    
    const totalReports = (stats.reportsPerCycle.accepted || 0) + 
                        (stats.reportsPerCycle.rejected || 0) + 
                        (stats.reportsPerCycle.flagged || 0) + 
                        (stats.reportsPerCycle.pending || 0);
    const acceptedPercentage = totalReports ? 
      Math.round((stats.reportsPerCycle.accepted / totalReports) * 100) : 0;
    
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
    const summaryText = `
      Total Reports: ${totalReports}
      Accepted: ${stats.reportsPerCycle.accepted || 0} (${acceptedPercentage}%)
      Rejected: ${stats.reportsPerCycle.rejected || 0}
      Flagged: ${stats.reportsPerCycle.flagged || 0}
      Pending: ${stats.reportsPerCycle.pending || 0}
<<<<<<< HEAD
      Average Review Time: ${stats.averageReviewTime || "N/A"}
    `;

=======
      Average Review Time: ${stats.averageReviewTime || 'N/A'}
    `;
    
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
    page.drawText(summaryText, {
      x: 60,
      y: yPosition,
      size: 12,
      font,
      color: rgb(0, 0, 0),
      lineHeight: 15,
    });
    yPosition -= 100;
<<<<<<< HEAD

    page.drawText("2. Popular Courses", {
=======
    
    page.drawText('2. Popular Courses', {
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
      x: 50,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 25;
<<<<<<< HEAD

    (stats.popularCourses || []).forEach((course, index) => {
      const courseText =
        typeof course === "string"
          ? course
          : `${course.name}: ${course.reports} reports`;
=======
    
    (stats.popularCourses || []).forEach((course, index) => {
      const courseText = typeof course === 'string' ? course : `${course.name}: ${course.reports} reports`;
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
      page.drawText(`${index + 1}. ${courseText}`, {
        x: 60,
        y: yPosition,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;
    });
    yPosition -= 20;
<<<<<<< HEAD

    page.drawText("3. Top Companies", {
=======
    
    page.drawText('3. Top Companies', {
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
      x: 50,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 25;
<<<<<<< HEAD

    (stats.topCompanies || []).forEach((company, index) => {
      const companyText =
        typeof company === "string"
          ? company
          : `${company.name} (Rating: ${company.rating}): ${company.reports} interns`;
=======
    
    (stats.topCompanies || []).forEach((company, index) => {
      const companyText = typeof company === 'string' ? company : `${company.name} (Rating: ${company.rating}): ${company.reports} interns`;
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
      page.drawText(`${index + 1}. ${companyText}`, {
        x: 60,
        y: yPosition,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;
    });
    yPosition -= 30;
<<<<<<< HEAD

    if (stats.performanceMetrics) {
      page.drawText("4. Performance Metrics", {
=======
    
    if (stats.performanceMetrics) {
      page.drawText('4. Performance Metrics', {
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
        x: 50,
        y: yPosition,
        size: 14,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 25;
<<<<<<< HEAD

      page.drawText(
        `Faculty Average Review Time: ${
          stats.performanceMetrics.facultyAverage || "N/A"
        } days`,
        {
          x: 60,
          y: yPosition,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        }
      );
      yPosition -= 20;

      page.drawText(
        `Department Average: ${
          stats.performanceMetrics.departmentAverage || "N/A"
        } days`,
        {
          x: 60,
          y: yPosition,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        }
      );
      yPosition -= 20;

      page.drawText(
        `University Average: ${
          stats.performanceMetrics.universityAverage || "N/A"
        } days`,
        {
          x: 60,
          y: yPosition,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        }
      );
      yPosition -= 30;
    }

    if (stats.internshipCount) {
      page.drawText("5. Internship Count by Company", {
=======
      
      page.drawText(`Faculty Average Review Time: ${stats.performanceMetrics.facultyAverage || 'N/A'} days`, {
        x: 60,
        y: yPosition,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;
      
      page.drawText(`Department Average: ${stats.performanceMetrics.departmentAverage || 'N/A'} days`, {
        x: 60,
        y: yPosition,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;
      
      page.drawText(`University Average: ${stats.performanceMetrics.universityAverage || 'N/A'} days`, {
        x: 60,
        y: yPosition,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      yPosition -= 30;
    }
    
    if (stats.internshipCount) {
      page.drawText('5. Internship Count by Company', {
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
        x: 50,
        y: yPosition,
        size: 14,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 25;
<<<<<<< HEAD

      Object.entries(stats.internshipCount).forEach(
        ([company, count], index) => {
          page.drawText(`${index + 1}. ${company}: ${count} interns`, {
            x: 60,
            y: yPosition,
            size: 12,
            font,
            color: rgb(0, 0, 0),
          });
          yPosition -= 20;
        }
      );
      yPosition -= 20;
    }

    page.drawText("Generated by Faculty Dashboard System", {
=======
      
      Object.entries(stats.internshipCount).forEach(([company, count], index) => {
        page.drawText(`${index + 1}. ${company}: ${count} interns`, {
          x: 60,
          y: yPosition,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
        yPosition -= 20;
      });
      yPosition -= 20;
    }
    
    page.drawText('Generated by Faculty Dashboard System', {
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
      x: 50,
      y: 30,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });
<<<<<<< HEAD

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Internship_Statistics_Report_${now.getFullYear()}_${
      now.getMonth() + 1
    }_${now.getDate()}.pdf`;
=======
    
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Internship_Statistics_Report_${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}.pdf`;
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
<<<<<<< HEAD
    console.error("Error generating statistics report:", error);
    alert("Failed to generate report. Please try again.");
  }
};
=======
    console.error('Error generating statistics report:', error);
    alert('Failed to generate report. Please try again.');
  }
};
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
>>>>>>> 53056517270fae88ad0c98c46238f594da71f174
