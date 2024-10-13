"use client";
import { SelectedVariant } from "@/utils/object";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<SelectedVariant>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "id_patient",
    header: "Patient ID",
  },
  {
    accessorKey: "id_vcf",
    header: "VCF ID",
  },
  {
    accessorKey: "id_report",
    header: "Report ID",
  },
  {
    accessorKey: "gene_id",
    header: "Gene ID",
  },
  {
    accessorKey: "gene_symbol",
    header: "Gene Symbol",
  },
  {
    accessorKey: "chrom",
    header: "Chromosome",
  },
  {
    accessorKey: "pos",
    header: "Position",
  },
  {
    accessorKey: "id_var",
    header: "Variant ID",
  },
  {
    accessorKey: "ref",
    header: "Reference",
  },
  {
    accessorKey: "alt",
    header: "Alternate",
  },
  {
    accessorKey: "qual",
    header: "Qual",
  },
  {
    accessorKey: "zigosity",
    header: "Zygosity",
  },
  {
    accessorKey: "global_allele",
    header: "Global Allele Frequency",
  },
  {
    accessorKey: "functional_impact",
    header: "Functional Impact",
  },
  {
    accessorKey: "acmg",
    header: "ACMG Classification",
  },
  {
    accessorKey: "reviewer_class",
    header: "Reviewer Classification",
  },
  {
    accessorKey: "clinical_sign",
    header: "Clinical Significance",
  },
  {
    accessorKey: "hgvs",
    header: "HGVS Notation",
  },
  {
    accessorKey: "severe_consequence",
    header: "Severe Consequence",
  },
  {
    accessorKey: "sift_score",
    header: "SIFT Score",
  },
  {
    accessorKey: "sift_prediction",
    header: "SIFT Prediction",
  },
  {
    accessorKey: "phenotypes",
    header: "Phenotypes",
  },
  {
    accessorKey: "rsID",
    header: "rsID",
  },
  {
    accessorKey: "gnomade",
    header: "GnomAD Exome Frequency",
  },
  {
    accessorKey: "gnomadg",
    header: "GnomAD Genome Frequency",
  },
  {
    accessorKey: "alldesc",
    header: "All Descriptions",
  },
];
