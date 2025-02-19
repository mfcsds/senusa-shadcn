"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";
import { CopyIcon, Search } from "lucide-react";
import Spinner from "@/components/update/ui/Spinner";
import { AcmgCriteria } from "@/utils/object";
import axios from "axios";
import VariantQueryInformation from "@/components/update/variantQuery/VariantQueryInformation";

export default function VariantQueryComponent() {
  const [variant, setVariant] = useState("");
  const [theACMG, setACMG] = useState<AcmgCriteria>();
  const [variantData, setVariantData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [freqData, setFreqData] = useState<any>(null);

  const fetchVariantData = async (variant: string) => {
    try {
      const response = await axios.get(
        `https://rest.ensembl.org/vep/human/hgvs/${encodeURIComponent(
          variant
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

      console.log("ParsedBody", parsedBody);

      // Map the first item in the response to AcmgCriteria
      const acmgCriteria: AcmgCriteria = {
        PVS1: parsedBody[0].PVS1,
        PS1: parsedBody[0].PS1,
        PS2: parsedBody[0].PS2,
        PS3: parsedBody[0].PS3,
        PS4: parsedBody[0].PS4,
        PP1_Strong: parsedBody[0]["PP1_Strong"],
        PM1: parsedBody[0].PM1,
        PM2: parsedBody[0].PM2,
        PM3: parsedBody[0].PM3,
        PM4: parsedBody[0].PM4,
        PM5: parsedBody[0].PM5,
        PM6: parsedBody[0].PM6,
        PP1_Moderate: parsedBody[0]["PP1_Moderate"],
        PP1_Cosegregation: parsedBody[0]["PP1_Moderate"],
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

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const acmgCriteria = await fetchACMGCriteria(variant);
      if (acmgCriteria) {
        setACMG(acmgCriteria);
        console.log(acmgCriteria);
      } else {
        setError("No ACMG criteria found for the variant.");
      }

      await fetchVariantData(variant);
    } catch (error) {
      setError("Failed to fetch variant data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-sans font-bold text-primary ">
          Senusa Variant Query
        </p>
        {/* Instruction text to put variant Query */}
        <div className="w-full text-center mb-5">
          <p className="text-text-secondary">Search for variant information</p>
        </div>
        <div className="w-full text-center mb-5 flex flex-row items-center justify-center gap-2">
          <Button
            variant="copy"
            onClick={() => setVariant("NM_024675.4:c.172_175del")}
            label="NM_024675.4:c.172_175del"
            icon={<CopyIcon className="w-4 h-4" />}
          />
          <Button
            variant="copy"
            onClick={() => setVariant("NM_000059.4:c.9648+1G>C")}
            label="{`NM_000059.4:c.9648+1G>C`}"
            icon={<CopyIcon className="w-4 h-4" />}
          />
        </div>
        <div className="flex flex-row w-full  gap-4 items-center px-8 mt-2">
          <Input
            id="searchQuery"
            type="text"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className="h-[50px] bg-foreground shadow-md"
            placeholder="Type e.g NM_007294.4:c.3835G>A or NM_000059.4:c.9648+1G>C"
          ></Input>
          <div>
            <Button
              variant="borderSecondary"
              onClick={handleSearch}
              size="large"
              className="h-[50px] border-1"
              label="Search"
              disabled={loading}
              icon={<Search className="w-5 h-5" />}
            ></Button>
          </div>
        </div>
      </div>
      {loading ? (
        <div>
            <Spinner/>
            <p className="text-lg text-center mt-10 text-primary font-semibold animate-pulse">
          Loading
        </p>
        </div>
      ) : (
        <div className="mt-10">
            {theACMG && variantData ? (
        <VariantQueryInformation
        acmgdata={theACMG}
        variantdata={variantData}
        hgvs={variant}
      />
      ) : (
        <div className="flex w-full items-center mt-3 text-text-secondary justify-center">
          <p className=""> No data available. Please search for a variant.</p>
        </div>
      )}
        </div>
      )}
      
    </div>
  );
}
