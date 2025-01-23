"use client";

import React, { useState, useEffect } from "react";
import { getAcmgAnnotation, listAcmgAnnotations } from "@/src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Save, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Adjust import based on your setup
import axios from "axios";
import VariantGeneralInfo from "../../../items/VariantGeneralInfo";
import VariantAlellel from "../../../items/VariantAlellel";
import { AcmgCriteria, VariantData } from "@/utils/object";
import VariantComputationalPrediction from "../../../items/VariantComputationalPrediction";
import ACMGAnnotation from "../../../items/ACMGAnnotation";
import FunctionalAnnotations from "../../../items/FunctionalAnnotations";
import Transcripts from "../../../items/Transcripts";
import ConservationScores from "../../../items/ConservationScores";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/update/ui/table";
import Button from "@/components/update/button/Button";
import ACMGVariantQuery from "../../../items/variantquery/ACMGVariantQuery";
import { equal } from "assert";
import ACMGVariantReport from "../../../items/variantquery/ACMGVariantReport";
import Spinner from "@/components/update/ui/Spinner";

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

    // const client = generateClient();
    // const fetchACMGCriteria = async () => {
    //   try {
    //     const acmgResult = await client.graphql({
    //       query: listAcmgAnnotations,
    //       variables: { filter: { id_variant: { eq: id_variant } } },
    //     });
    //   } catch (error) {}
    // };

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
      // fetchACMGCriteria(hgvsNotation).then((variant) => {
      //   if (variant) {
      //     setACMGCriteria(variant);
      //   }
      // });
    }
  }, [hgvsNotation]);

  if (loading) {
    return (
      <div className="text-center py-2">
        <div className="flex flex-col justify-center items-center h-full space-y-4 animate-icon mt-2">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-t-accent border-r-transparent border-b-transparent border-l-accent animate-spin"></div>
        <div className="absolute inset-4 bg-secondary rounded-full"></div>
      </div>
    </div>
        <p className="text-lg text-center text-primary font-semibold animate-pulse">
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
    <div className="flex flex-col">
      <div className="flex bg-foreground flex-col border-2 border-border shadow-xl mt-10 p-4 mb-10 w-full">
        <div className="grid">
          <div className="flex items-center gap-8">
            <img
              src="/logo-senusa.png"
              alt="Logo"
              className="w-12 h-auto object-contain"
            />
            <p className="text-2xl text-text-primary font-semibold text-balance border-primary border-l-4 pl-5 flex-grow text-center">
              {hgvsNotation}
            </p>
            <div className="flex gap-4 mt-0">
              <Button
                label="Save"
                variant="outlineSecondary"
                size="large"
                icon={<Save className="w-5 h-5" />}
                type="submit"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full bg-foreground items-start">
        <Tabs
          defaultValue="acmg"
          className="w-full items-start bg-foreground justify-start mt-6"
        >
          <TabsList className=" flex items-start mb-4 h-[80px]border-b-2 w-full justify-start">
            <TabsTrigger
              value="acmg"
              className="text-md text-text-primary hover:border-b-4 hover:border-primary rounded-none data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:text-text-primary data-[state=active]:bg-foreground "
            >
              ACMG
            </TabsTrigger>
            <TabsTrigger
              value="general"
              className="text-md text-text-primary hover:border-b-4 hover:border-primary rounded-none data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:text-text-primary data-[state=active]:bg-foreground"
            >
              General Information
            </TabsTrigger>
            <TabsTrigger
              value="allele"
              className="text-md text-text-primary hover:border-b-4 hover:border-primary rounded-none data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:text-text-primary data-[state=active]:bg-foreground "
            >
              Allele Frequency
            </TabsTrigger>
            <TabsTrigger
              value="computational"
              className="text-md text-text-primary hover:border-b-4 hover:border-primary rounded-none data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:text-text-primary data-[state=active]:bg-foreground "
            >
              Computational Predictions
            </TabsTrigger>
            <TabsTrigger
              value="functional"
              className="text-md text-text-primary hover:border-b-4 hover:border-primary rounded-none data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:text-text-primary data-[state=active]:bg-foreground "
            >
              Functional Annotations
            </TabsTrigger>
            <TabsTrigger
              value="transcripts"
              className="text-md text-text-primary hover:border-b-4 hover:border-primary rounded-none data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:text-text-primary data-[state=active]:bg-foreground "
            >
              Transcripts
            </TabsTrigger>
            <TabsTrigger
              value="conservation"
              className="text-md text-text-primary hover:border-b-4 hover:border-primary rounded-none data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:text-text-primary data-[state=active]:bg-foreground "
            >
              Conservation Scores
            </TabsTrigger>
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
