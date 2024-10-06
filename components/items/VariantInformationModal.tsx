"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Adjust import based on your setup
import axios from "axios";
import VariantGeneralInfo from "./VariantGeneralInfo";
import VariantAlellel from "./VariantAlellel";
import { VariantData } from "@/utils/object";
import VariantComputationalPrediction from "./VariantComputationalPrediction";

interface VariantInformation {
  hgvsNotation: string | "";
}
const VariantInformationModal: React.FC<VariantInformation> = ({
  hgvsNotation,
}) => {
  const [variantData, setVariantData] = useState<VariantData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch variant data
    const fetchVariantData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://rest.ensembl.org/vep/human/hgvs/${encodeURIComponent(
            hgvsNotation
          )}?content-type=application/json`,
          {
            params: {
              AncestralAllele: 1,
              Blosum62: 1,
              CADD: 1,
              Conservation: 1,
              dbNSFP:
                "SIFT_pred,Polyphen2_HDIV_pred,MutationTaster_pred,LRT_pred",
              dbscSNV: 1,
              MaxEntScan: 1,
              GeneSplicer: 1,
              NMD: 1,
              mirna: 1,
              appris: 1,
              canonical: 1,
              ccds: 1,
              domains: 1,
              hgvs: 1,
              mane: 1,
              numbers: 1,
              protein: 1,
              tsl: 1,
              uniprot: 1,
              variant_class: 1,
              shift_3prime: 1,
              shift_genomic: 1,
              sift: "b",
              polyphen: "b",
              gene_phenotype: 1,
              pubmed: 1,
              xref_refseq: 1,
            },
          }
        );
        setVariantData(response.data[0]); // Assuming we get an array with one element
      } catch (error) {
        console.error("Error fetching variant data:", error);
        setVariantData(null);
      } finally {
        setLoading(false);
      }
    };

    if (hgvsNotation) {
      fetchVariantData();
    }
  }, [hgvsNotation]);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading... fetching data {hgvsNotation}
      </div>
    );
  }

  if (!variantData) {
    return (
      <div className="text-center py-10">
        No data available for {hgvsNotation}
      </div>
    );
  }

  // Destructure the data for easier access
  const {
    id,
    input,
    assembly_name,
    seq_region_name,
    start,
    end,
    allele_string,
    variant_class,
    most_severe_consequence,
    colocated_variants,
    transcript_consequences,
    strand,
    hgvsc,
    hgvsp,
    consequence_terms,
    gene_id,
    gene_symbol,
    canonical,
    impact,
    cadd_phred,
    cadd_raw,
    polyphen_score,
    polyphen_prediction,
    sift_score,
    sift_prediction,
    appris,
    domains,
    hgvs_offset,
  } = variantData || {};

  console.log("Print");
  console.log(sift_prediction, sift_score);
  // console.log(Object.keys(variantData));

  return (
    <div className="p-4">
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General Information</TabsTrigger>
          <TabsTrigger value="allele">Allele Frequency</TabsTrigger>
          <TabsTrigger value="computational">
            Computational Predictions
          </TabsTrigger>
          <TabsTrigger value="functional">Functional Annotations</TabsTrigger>
          <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
          <TabsTrigger value="conservation">Conservation Scores</TabsTrigger>
        </TabsList>

        {/* General Information Tab */}
        <TabsContent value="general">
          <VariantGeneralInfo data={variantData}></VariantGeneralInfo>
        </TabsContent>

        {/* Allele Frequency Tab */}
        <TabsContent value="allele">
          <VariantAlellel data={variantData.colocated_variants} />
        </TabsContent>

        {/* Computational Predictions Tab */}
        <TabsContent value="computational">
          <VariantComputationalPrediction
            data={variantData.transcript_consequences}
          />
        </TabsContent>

        {/* Functional Annotations Tab */}
        <TabsContent value="functional">
          {/* <FunctionalAnnotations data={transcript_consequences} /> */}
        </TabsContent>

        {/* Transcripts Tab */}
        <TabsContent value="transcripts">
          {/* <Transcripts data={transcript_consequences} /> */}
        </TabsContent>

        {/* Conservation Scores Tab */}
        <TabsContent value="conservation">
          {/* <ConservationScores data={transcript_consequences} /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VariantInformationModal;
