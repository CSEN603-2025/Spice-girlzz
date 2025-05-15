import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// Generate a CV PDF using pdf-lib
export const generateStatisticsReport = async (cvData) => {
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

    // Header: Name
    page.drawText(cvData.personalInfo.name, {
      x: 50,
      y: yPosition,
      size: 20,
      font: boldFont,
      color: rgb(0, 0, 0.5),
    });
    yPosition -= 20;

    // Personal Info
    page.drawText(
      `${cvData.personalInfo.email} | ${cvData.personalInfo.phone} | ${cvData.personalInfo.location}`,
      {
        x: 50,
        y: yPosition,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      }
    );
    if (cvData.personalInfo.linkedin) {
      yPosition -= 15;
      page.drawText(cvData.personalInfo.linkedin, {
        x: 50,
        y: yPosition,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
    }
    yPosition -= 30;

    // Education Section
    page.drawText("Education", {
      x: 50,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
    cvData.education.forEach((edu) => {
      page.drawText(
        `${edu.degree} - ${edu.institution} (${edu.startDate} - ${edu.endDate})`,
        {
          x: 60,
          y: yPosition,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        }
      );
      yPosition -= 15;
      page.drawText(`GPA: ${edu.gpa}`, {
        x: 60,
        y: yPosition,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;
    });
    yPosition -= 10;

    // Skills Section
    page.drawText("Skills", {
      x: 50,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
    page.drawText(cvData.skills.join(", "), {
      x: 60,
      y: yPosition,
      size: 12,
      font,
      color: rgb(0, 0, 0),
      maxWidth: width - 120,
      lineHeight: 15,
    });
    yPosition -= 40;

    // Work Experience Section
    page.drawText("Work Experience", {
      x: 50,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
    cvData.workExperience.forEach((exp) => {
      page.drawText(
        `${exp.title} - ${exp.company}, ${exp.location} (${exp.startDate} - ${exp.endDate})`,
        {
          x: 60,
          y: yPosition,
          size: 12,
          font: boldFont,
          color: rgb(0, 0, 0),
        }
      );
      yPosition -= 15;
      exp.responsibilities.forEach((resp) => {
        page.drawText(`- ${resp}`, {
          x: 70,
          y: yPosition,
          size: 12,
          font,
          color: rgb(0, 0, 0),
          maxWidth: width - 140,
          lineHeight: 15,
        });
        yPosition -= 15;
      });
      yPosition -= 10;
    });
    yPosition -= 10;

    // Projects Section
    page.drawText("Projects", {
      x: 50,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
    cvData.projects.forEach((proj) => {
      page.drawText(proj.name, {
        x: 60,
        y: yPosition,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 15;
      page.drawText(proj.description, {
        x: 70,
        y: yPosition,
        size: 12,
        font,
        color: rgb(0, 0, 0),
        maxWidth: width - 140,
        lineHeight: 15,
      });
      yPosition -= 15;
      page.drawText(`Technologies: ${proj.technologies.join(", ")}`, {
        x: 70,
        y: yPosition,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      if (proj.link) {
        yPosition -= 15;
        page.drawText(`Link: ${proj.link}`, {
          x: 70,
          y: yPosition,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
      }
      yPosition -= 20;
    });
    yPosition -= 10;

    // Certifications Section
    page.drawText("Certifications", {
      x: 50,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
    cvData.certifications.forEach((cert) => {
      page.drawText(
        `${cert.name} - ${cert.issuer} (${cert.date})`,
        {
          x: 60,
          y: yPosition,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        }
      );
      yPosition -= 15;
    });
    yPosition -= 20;

    // Footer
    page.drawText(`Generated on: ${reportDate} at ${reportTime}`, {
      x: 50,
      y: 30,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CV_${cvData.personalInfo.name.replace(
      " ",
      "_"
    )}_${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating CV PDF:", error);
    alert("Failed to generate CV. Please try again.");
  }
};