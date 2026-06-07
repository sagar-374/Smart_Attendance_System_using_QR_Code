package com.example.attendance.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.attendance.entity.Attendance;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class AttendancePdfService {

    public void generatePdf(
            List<Attendance> attendanceList,
            HttpServletResponse response
    ) throws Exception {

        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD);
        Paragraph title = new Paragraph("Attendance Report", titleFont);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);

        document.add(new Paragraph(" "));
        
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);

        table.addCell("Roll No");
        table.addCell("Name");
        table.addCell("Lecture ID");
        table.addCell("Marked At");

        for (Attendance a : attendanceList) {
            table.addCell(a.getRollNo());
            table.addCell(a.getName());
            table.addCell(a.getLectureId());
            table.addCell(a.getMarkedAt().toString());
        }

        document.add(table);
        document.close();
    }
}
