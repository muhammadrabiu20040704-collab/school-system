import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const AttendancePDF = (report) => {

    const doc = new jsPDF();

    // ===== Title =====
    doc.setFontSize(18);
    doc.text("Attendance Report", 14, 20);

    // ===== Course Details =====
    doc.setFontSize(12);

    doc.text(`Course: ${report.course.title}`, 14, 35);
    doc.text(`Course Code: ${report.course.code}`, 14, 42);
    doc.text(`Department: ${report.course.department}`, 14, 49);
    doc.text(`Lecturer: ${report.course.lecturer}`, 14, 56);

    // ===== Summary =====
    doc.text("Summary", 14, 70);

    doc.text(`Total Students: ${report.summary.totalStudents}`, 14, 78);
    doc.text(`Present: ${report.summary.present}`, 14, 85);
    doc.text(`Absent: ${report.summary.absent}`, 14, 92);
    doc.text(`Late: ${report.summary.late}`, 14, 99);
    doc.text(`Excused: ${report.summary.excused}`, 14, 106);

    // ===== Attendance Table =====
    autoTable(doc, {

        startY: 115,

        head: [[
            "Admission No",
            "Name",
            "Level",
            "Semester",
            "Status"
        ]],

        body: report.attendance.map((student) => [

            student.admissionNumber,

            student.name,

            student.level,

            student.semester,

            student.status

        ])

    });

    doc.save(
        `${report.course.code}_Attendance_Report.pdf`
    );

};