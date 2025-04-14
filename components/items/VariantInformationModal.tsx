"use client";

import React, { useState, useEffect } from "react";
import { getAcmgAnnotation, listAcmgAnnotations } from "@/src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Adjust import based on your setup
import axios from "axios";
import VariantGeneralInfo from "./VariantGeneralInfo";
import VariantAlellel from "./VariantAlellel";
import { AcmgCriteria, VariantData } from "@/utils/object";
import VariantComputationalPrediction from "./VariantComputationalPrediction";
import ACMGAnnotation from "./ACMGAnnotation";
import FunctionalAnnotations from "./FunctionalAnnotations";
import Transcripts from "./Transcripts";
import ConservationScores from "./ConservationScores";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ACMGVariantQuery from "./variantquery/ACMGVariantQuery";
import { equal } from "assert";
import ACMGVariantReport from "./variantquery/ACMGVariantReport";

interface VariantInformation {
  hgvsNotation: string | "";
  id_variant: string | "";
}
const VariantInformationModal: React.FC<VariantInformation> = ({
  hgvsNotation,
  id_variant,
}) => {
  const [variantData, setVariantData] = useState<VariantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [theACMGCriteria, setACMGCriteria] = useState<AcmgCriteria>();
  const [theListACMGCriteria, setListACMGCriteria] = useState<AcmgCriteria[]>(
    []
  );
  const [error, setError] = useState("");

  const fetchVariantData = async () => {
    setLoading(true);
    try {
      const apiUrl =
        "https://iti7fmrlmj.execute-api.us-east-1.amazonaws.com/Dev/variant_extract";

      const response = await axios.post(
        apiUrl,
        { body: JSON.stringify({ variants: [hgvsNotation] }) },
        { headers: { "Content-Type": "application/json" } }
      );

      const responseBody = JSON.parse(response.data.body);

      if (responseBody.length === 0) {
        setError("No variant data found.");
        setVariantData(null);
        return;
      }
      setVariantData(responseBody[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching variant data:", error);
      setVariantData(null);
      setError("Failed to fetch variant data.");
    } finally {
    }
  };

  useEffect(() => {
    // Function to fetch variant data
    const fetchACMGCriteria = async (
      variant: string
    ): Promise<AcmgCriteria | null> => {
      const apiUrl =
        "https://yyj4sdbsd6.execute-api.us-east-1.amazonaws.com/dev-acmg/classification";

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: JSON.stringify({ variants: [variant] }),
          }),
        });

        if (!response.ok) {
          console.error(`Error: API returned status ${response.status}`);
          return null;
        }

        const data = await response.json();
        const parsedBody = JSON.parse(data.body);

        if (!Array.isArray(parsedBody) || parsedBody.length === 0) {
          console.error("Error: Invalid response format or empty data.");
          return null;
        }
        // Map the first item in the response to AcmgCriteria
        const acmgCriteria: AcmgCriteria = {
          id_variant: "",
          id: "",
          PVS1: parsedBody[0].PVS1,
          PS1: parsedBody[0].PS1,
          PS2: parsedBody[0].PS2,
          PS3: parsedBody[0].PS3,
          PS4: parsedBody[0].PS4,
          PP1_Strong: parsedBody[0]["PP1 Strong"],
          PM1: parsedBody[0].PM1,
          PM2: parsedBody[0].PM2,
          PM3: parsedBody[0].PM3,
          PM4: parsedBody[0].PM4,
          PM5: parsedBody[0].PM5,
          PM6: parsedBody[0].PM6,
          PP1_Moderate: parsedBody[0]["PP1 Moderate"],
          PP1_Cosegregation: parsedBody[0]["PP1 Cosegregation"],
          PP2: parsedBody[0].PP2,
          PP3: parsedBody[0].PP3,
          PP4: parsedBody[0].PP4,
          PP5: parsedBody[0].PP5,
          BP1: parsedBody[0].BP1,
          BP2: parsedBody[0].BP2,
          BP3: parsedBody[0].BP3,
          BP4: parsedBody[0].BP4,
          BP5: parsedBody[0].BP5,
          BP6: parsedBody[0].BP6,
          BP7: parsedBody[0].BP7,
          BS1: parsedBody[0].BS1,
          BS2: parsedBody[0].BS2,
          BS3: parsedBody[0].BS3,
          BS4: parsedBody[0].BS4,
          BA1: parsedBody[0].BA1,
          acmg_class: parsedBody[0].acmg,
        };

        return acmgCriteria;
      } catch (error) {
        console.error("Error fetching ACMG Criteria:", error);
        return null;
      }
    };

    if (hgvsNotation) {
      fetchVariantData();
      // fetchACMGCriteria(hgvsNotation).then((variant) => {
      //   if (variant) {
      //     setACMGCriteria(variant);
      //   }
      // });
    }
  }, [hgvsNotation]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
        <p className="text-gray-500 ">
          Loading... fetching data for {hgvsNotation}
        </p>
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

  return (
    <div className="flex flex-col h-[1000px]">
      <div className="flex flex-col border p-4 mb-5 w-full ">
        <p className="text-2xl font-semibold text-balance border-l-emerald-500 border-l-4 pl-5">
          {hgvsNotation}
        </p>
        {/* <Table>
          <TableBody className="divide-y divide-gray-200">
            <TableRow className="even:bg-gray-50">
              <TableCell>Assembly Name</TableCell>
              <TableCell>{assembly_name || "N/A"}</TableCell>
            </TableRow>
            <TableRow className="even:bg-gray-50">
              <TableCell>Chromosome</TableCell>
              <TableCell>{seq_region_name || "N/A"}</TableCell>
            </TableRow>
          </TableBody>
        </Table> */}
      </div>
      <div className="flex flex-col w-full items-start ">
        <Tabs defaultValue="acmg" className="w-full items-start justify-start">
          <TabsList className=" flex items-start mb-4 h-[80px] bg-white border-b-2 w-full justify-start">
            {/* <TabsTrigger
              value="acmg"
              className="text-md hover:border-b-4 hover:border-violet-900 rounded-none data-[state=active]:border-b-4 data-[state=active]:border-violet-900 "
            >
              ACMG
            </TabsTrigger> */}
            <TabsTrigger
              value="general"
              className="text-md hover:border-b-4 hover:border-violet-900 rounded-none data-[state=active]:border-b-4 data-[state=active]:border-violet-900"
            >
              General Information
            </TabsTrigger>
            <TabsTrigger
              value="allele"
              className="text-md hover:border-b-4 hover:border-violet-900 rounded-none data-[state=active]:border-b-4 data-[state=active]:border-violet-900 "
            >
              Allele Frequency
            </TabsTrigger>
            <TabsTrigger
              value="computational"
              className="text-md hover:border-b-4 hover:border-violet-900 rounded-none data-[state=active]:border-b-4 data-[state=active]:border-violet-900 "
            >
              Functional Annotations
            </TabsTrigger>
            <TabsTrigger
              value="functional"
              className="text-md hover:border-b-4 hover:border-violet-900 rounded-none data-[state=active]:border-b-4 data-[state=active]:border-violet-900 "
            >
              Computational Predictions
            </TabsTrigger>
            <TabsTrigger
              value="transcripts"
              className="text-md hover:border-b-4 hover:border-violet-900 rounded-none data-[state=active]:border-b-4 data-[state=active]:border-violet-900 "
            >
              Transcripts
            </TabsTrigger>
            <TabsTrigger
              value="conservation"
              className="text-md hover:border-b-4 hover:border-violet-900 rounded-none data-[state=active]:border-b-4 data-[state=active]:border-violet-900 "
            >
              Conservation Scores
            </TabsTrigger>
          </TabsList>

          {/* ACMG Classification */}

          {/* <TabsContent value="acmg">
            <ACMGVariantReport
              id_variantku={id_variant}
              hgvs={hgvsNotation}
              onUpdateVariant={onUpdateVariant}
            ></ACMGVariantReport>
          </TabsContent> */}

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
            <FunctionalAnnotations data={transcript_consequences} />
          </TabsContent>

          {/* Transcripts Tab */}
          <TabsContent value="transcripts">
            <Transcripts data={transcript_consequences} />
          </TabsContent>

          {/* Conservation Scores Tab */}
          <TabsContent value="conservation">
            <ConservationScores data={transcript_consequences} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VariantInformationModal;
