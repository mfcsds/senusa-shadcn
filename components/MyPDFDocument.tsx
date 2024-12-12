import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Image } from "@react-pdf/renderer";
import {
  Conclusion,
  Patient,
  Recommendation,
  SelectedVariant,
  VariantInterpretation,
  VariantReportData,
} from "@/utils/object";

// Define styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 20,
  },
  container: {
    padding: 16,
    border: "1px solid #ccc",
    marginTop: 10,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  section: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 6,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "semibold",
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  textsmall: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  textxs: {
    fontSize: 4, // Smaller than before
    lineHeight: 1.2, // Adjust the line height to match the smaller font
    marginBottom: 2, // Reduce margin for compactness
  },
  table: {
    width: "100%",
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  tableHeaderRow: {
    backgroundColor: "#eaeaea",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#ffffff",
  },
  tableHeader: {
    fontSize: 12,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
    paddingHorizontal: 5,
  },
  tableCell: {
    fontSize: 12,
    flex: 1,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  leftAligned: {
    textAlign: "left",
  },
  centered: {
    textAlign: "center",
  },
  signatureContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  signature: {
    textAlign: "center",
  },
  logo: {
    width: 64, // Adjust the width as needed
    height: 64, // Adjust the height as needed
    marginBottom: 10,
  },
});

// Define Props
interface MyPDFDocumentProps {
  patient: Patient;
  listConc: Conclusion[];
  listRec: Recommendation[];
  listSelVariants: SelectedVariant[];
  variantInter: VariantInterpretation[];
}

// PDF Document Component
const MyPDFDocument: React.FC<MyPDFDocumentProps> = ({
  patient,
  listConc,
  listRec,
  listSelVariants,
  variantInter,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View
          style={[
            styles.section,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <View>
            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <Image style={styles.logo} src="/logo-senusa.png" />
          </View>
          <View>
            <Text style={styles.title}>Variant Analysis Report</Text>
            <Text style={styles.textsmall}>
              Genusa Labs{"\n"}
              123 Genome Way{"\n"}
              Jakarta Pusat, Cempaka Putih, 62701{"\n"}
              Jakarta, Indonesia
            </Text>
          </View>
        </View>

        {/* Patient Information */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Patient Information</Text>
          <View>
            <Text style={styles.text}>ID/Reference: {patient.id}</Text>
          </View>
        </View>

        {/* Result & Interpretations */}
        <View style={[styles.section, { backgroundColor: "#f9f9f9" }]}>
          <Text style={styles.subtitle}>Result & Interpretations</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <Text style={[styles.tableHeader, styles.bold]}>
                Variant Detail
              </Text>
              <Text style={[styles.tableHeader, styles.centered]}>
                Zygosity
              </Text>
              <Text style={[styles.tableHeader, styles.centered]}>ACMG</Text>
            </View>

            {/* Table Rows */}
            {listSelVariants.map((item, idx) => (
              <View
                key={idx}
                style={[
                  styles.tableRow,
                  idx % 2 === 0 ? styles.evenRow : styles.oddRow,
                ]}
              >
                <Text style={[styles.tableCell, styles.leftAligned]}>
                  {`${item.gene_symbol} (${item.gene_id}): ${item.hgvs}`}
                </Text>
                <Text style={[styles.tableCell, styles.centered]}>
                  {item.zigosity}
                </Text>
                <Text style={[styles.tableCell, styles.centered]}>
                  {item.acmg}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Variant Interpretation */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Variant Interpretation</Text>
          {variantInter.map((item, idx) => (
            <Text key={idx} style={styles.textsmall}>
              <Text
                style={{ fontWeight: "bold" }}
              >{`(${item.gene_symbol}) ${item.hgvs}: `}</Text>
              {item.text}
            </Text>
          ))}
        </View>

        {/* Recommendations */}
        {listRec.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Recommendation</Text>
            {listRec.map((item, idx) => (
              <Text key={idx} style={styles.text}>
                - {item.text}
              </Text>
            ))}
          </View>
        )}

        {/* Conclusions */}
        {listConc.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Conclusions</Text>
            {listConc.map((item, idx) => (
              <Text key={idx} style={styles.textxs}>
                {item.text}
              </Text>
            ))}
          </View>
        )}

        {/* Database Version */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Database Information</Text>
          <Text style={styles.textsmall}>
            Ensembl Version: 113.0 October 2024; Senusa Version:Alpha 1.00
          </Text>
        </View>

        {/* Signatures */}
        <View style={styles.signatureContainer}>
          <View style={styles.signature}>
            <Text style={styles.textsmall}>Rina Maheswari, M.Sc., Ph.D.</Text>
            <Text style={styles.textsmall}>Head Laboratory</Text>
          </View>
          <View style={styles.signature}>
            <Text style={styles.textsmall}>Lia Kartika, M.D.</Text>
            <Text style={styles.textsmall}>Genetic Counsellor</Text>
          </View>
          <View style={styles.signature}>
            <Text style={styles.textsmall}>Putu Bagus, M.G.C</Text>
            <Text style={styles.textsmall}>Clinical Pathology</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyPDFDocument;
