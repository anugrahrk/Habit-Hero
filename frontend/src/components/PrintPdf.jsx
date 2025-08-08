// App.jsx
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { HabitReportPDF } from "./HabitReportPDF";
import { useAtomValue } from "jotai";
import { percentageAtom } from "../atom/atom";
import { Habbit } from "../assets/mockdata";

export default function PrintPdf() {
    const percentage=useAtomValue(percentageAtom)
  
  return (
    <div className="p-5 flex justify-center items-center pb-1 cursor-pointer hover:bg-gray-100 rounded-lg">
      <PDFDownloadLink
        document={
          <HabitReportPDF
            week="Aug 7 – Aug 10, 2025"
            user="Anugrah Rk"
            progress={percentage+"%"}
            streak={localStorage.getItem("StreakCount")}
            bestDay="2025-08-08"

          />
        }
        fileName="habit_report.pdf"
      >
        {({ loading }) => (loading ? "Loading..." : "Export as PDF")}
      </PDFDownloadLink>
    </div>
  );
}
