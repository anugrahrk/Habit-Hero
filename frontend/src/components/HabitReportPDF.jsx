// HabitReportPDF.jsx
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

import { useAtom, useAtomValue } from "jotai";
import { HabbitAtom, percentageAtom } from "../atom/atom";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  title: { fontSize: 18, textAlign: "center", fontWeight: "bold", marginBottom: 10 },
  section: { marginBottom: 10 },
  table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { flexDirection: "row" },
  tableCol: { width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, padding: 4 },
  bold: { fontWeight: "bold" }
});


export const HabitReportPDF = ({ week, user, progress, streak, bestDay, Habbit}) =>{ 
  

    
    return(
        
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Title */}
      <Text style={styles.title}>HABIT HERO — WEEKLY REPORT</Text>
      <View style={styles.section}>
        <Text>Week: {week}</Text>
        <Text>User: {user}</Text>
      </View>

      {/* Progress Summary */}
      <View style={styles.section}>
        <Text>Total Habits Completed: {progress}</Text>
        <Text>Current Streak: {streak} days</Text>
        <Text>Best Day: {bestDay}</Text>
      </View>

      {/* Daily Breakdown Table */}
      <Text style={{ marginBottom: 4 }}>Daily Breakdown:</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.bold]}>
            <Text style={styles.tableCol}>Name</Text>
            <Text style={styles.tableCol}>Category</Text>
          <Text style={styles.tableCol}>Date</Text>
          <Text style={styles.tableCol}>Completed</Text>
          
          
        </View>
        {/* Table Rows */}
        {Habbit.map((habit, idx) => (
          <View style={styles.tableRow} key={idx}>
            <Text style={styles.tableCol}>{habit.name}</Text>
            <Text style={styles.tableCol}>{habit.category}</Text>
            <Text style={styles.tableCol}>{habit.startdate}</Text>
            <Text style={styles.tableCol}>{habit.completed==true?"True":"False"}</Text>
          </View>
        ))}
      </View>

      {/* Top Habits */}
      {/* <View style={styles.section}>
        <Text style={{ marginTop: 10 }}>Top Habits:</Text>
        {Habbit.map((habit, idx) => (
          <Text key={idx}>
            {idx + 1}. {habit.name} – {habit.percentage}%
          </Text>
        ))}
      </View> */}

      <Text style={{ marginTop: 20, fontSize: 10 }}>
         Generated on {new Date().toLocaleDateString()} via Habit Hero
      </Text>
    </Page>
  </Document>
)};
