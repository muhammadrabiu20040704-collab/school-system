import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const AttendanceExcel = (report) => {

    const rows = report.attendance.map((student) => ({

        "Admission No": student.admissionNumber,

        Name: student.name,

        Level: student.level,

        Semester: student.semester,

        Status: student.status

    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Attendance"
    );

    const excelBuffer = XLSX.write(
        workbook,
        {
            bookType: "xlsx",
            type: "array"
        }
    );

    const file = new Blob(
        [excelBuffer],
        {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    );

    saveAs(

        file,

        `${report.course.code}_${report.course.title}_Attendance.xlsx`

    );

};