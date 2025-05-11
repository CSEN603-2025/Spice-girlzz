import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export const generateDummyPDF = async (report) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
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
    
    page.drawText(text, {
      x: 50,
      y: height - 50,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
    
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Report_${report.student.replace(' ', '_')}_${report.id}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

export const generateStatisticsReport = async (stats) => {
  try {
    const now = new Date();
    const reportDate = now.toLocaleDateString();
    const reportTime = now.toLocaleTimeString();
    
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    let yPosition = height - 50;
    
    page.drawText('Internship Program Statistics Report', {
      x: 50,
      y: yPosition,
      size: 20,
      font: boldFont,
      color: rgb(0, 0, 0.5),
    });
    yPosition -= 30;
    
    page.drawText(`Generated on: ${reportDate} at ${reportTime}`, {
      x: 50,
      y: yPosition,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });
    yPosition -= 40;
    
    page.drawText('1. Summary Statistics', {
      x: 50,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 25;
    
    const totalReports = (stats.reportsPerCycle.accepted || 0) + 
                        (stats.reportsPerCycle.rejected || 0) + 
                        (stats.reportsPerCycle.flagged || 0) + 
                        (stats.reportsPerCycle.pending || 0);
    const acceptedPercentage = totalReports ? 
      Math.round((stats.reportsPerCycle.accepted / totalReports) * 100) : 0;
    
    const summaryText = `
      Total Reports: ${totalReports}
      Accepted: ${stats.reportsPerCycle.accepted || 0} (${acceptedPercentage}%)
      Rejected: ${stats.reportsPerCycle.rejected || 0}
      Flagged: ${stats.reportsPerCycle.flagged || 0}
      Pending: ${stats.reportsPerCycle.pending || 0}
      Average Review Time: ${stats.averageReviewTime || 'N/A'}
    `;
    
    page.drawText(summaryText, {
      x: 60,
      y: yPosition,
      size: 12,
      font,
      color: rgb(0, 0, 0),
      lineHeight: 15,
    });
    yPosition -= 100;
    
    page.drawText('2. Popular Courses', {
      x: 50,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 25;
    
    (stats.popularCourses || []).forEach((course, index) => {
      const courseText = typeof course === 'string' ? course : `${course.name}: ${course.reports} reports`;
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
    
    page.drawText('3. Top Companies', {
      x: 50,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 25;
    
    (stats.topCompanies || []).forEach((company, index) => {
      const companyText = typeof company === 'string' ? company : `${company.name} (Rating: ${company.rating}): ${company.reports} interns`;
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
    
    if (stats.performanceMetrics) {
      page.drawText('4. Performance Metrics', {
        x: 50,
        y: yPosition,
        size: 14,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 25;
      
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
        x: 50,
        y: yPosition,
        size: 14,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 25;
      
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
      x: 50,
      y: 30,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });
    
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Internship_Statistics_Report_${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating statistics report:', error);
    alert('Failed to generate report. Please try again.');
  }
};