import { Variant } from "./object";

export function generatePatientID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let patientID = "P-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    patientID += characters[randomIndex];
  }

  return patientID;
}
export function generateReportID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let reportID = "R-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    reportID += characters[randomIndex];
  }
  return reportID;
}

export function generateVCFDataID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let reportID = "VCF-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    reportID += characters[randomIndex];
  }
  return reportID;
}

export function generateUserID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let reportID = "U-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    reportID += characters[randomIndex];
  }
  return reportID;
}

export function generateInstutionID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let institutionID = "U-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    institutionID += characters[randomIndex];
  }
  return institutionID;
}

export function extractZygosity(info: string): string {
  const infoFields = info.split(";");
  let acValue = 0;
  let anValue = 0;

  infoFields.forEach((field) => {
    const [key, value] = field.split("=");
    if (key === "AC") {
      acValue = parseInt(value, 10);
    } else if (key === "AN") {
      anValue = parseInt(value, 10);
    }
  });

  // Determine zygosity based on AC and AN values
  if (acValue === 1 && anValue === 2) {
    return "Heterozygous";
  } else if (acValue === 2 && anValue === 2) {
    return "Homozygous";
  } else {
    return "Unknown";
  }
}

export function generateHGVS(variant: Variant): string {
  // Example HGVS format: "chr1:g.123456A>T"
  // HGVS nomenclature usually follows this format:
  // "chromosome:position reference_allele>alternate_allele"

  const { chrom, pos, ref, alt } = variant;

  // HGVS nomenclature
  const hgvs = `${chrom}:g.${pos}${ref}>${alt}`;

  return hgvs;
}

import axios from "axios";
export const fetchVariantDetails = async (
  variant: Variant
): Promise<Variant> => {
  const server = "https://rest.ensembl.org/";
  const vep_ext = "vep/human/region/";
  const contentType = "application/json";

  const variantList = [
    `${variant.chrom} ${variant.pos} . ${variant.ref} ${variant.alt}`,
  ];

  const response = await axios.post(
    server + vep_ext,
    JSON.stringify({ variants: variantList }),
    {
      headers: {
        "Content-Type": contentType,
        Accept: contentType,
      },
    }
  );

  const data = response.data[0];
  if (data) {
    let gnomad = null;
    let clinicalSignificance = null;

    for (const variantData of data.colocated_variants || []) {
      // Search for gnomad frequency across all colocated_variants
      for (const key in variantData.frequencies) {
        if (variantData.frequencies[key]?.gnomade) {
          gnomad = variantData.frequencies[key].gnomade;
          break;
        }
      }

      // Collect clinical significance if available
      if (variantData.clin_sig && variantData.clin_sig.length > 0) {
        clinicalSignificance = variantData.clin_sig.join(", ");
      }

      // If both values are found, no need to continue searching
      if (gnomad && clinicalSignificance) {
        break;
      }
    }

    // Extract additional fields
    let severeConsequence = data.most_severe_consequence || null;
    let siftScore = null;
    let siftPrediction = null;
    let geneSymbol = null;
    let geneId = null;

    for (const transcript of data.transcript_consequences || []) {
      // Set sift_score and sift_prediction if available and not already set
      if (transcript.sift_score != null && siftScore == null) {
        siftScore = transcript.sift_score;
      }
      if (transcript.sift_prediction && siftPrediction == null) {
        siftPrediction = transcript.sift_prediction;
      }

      // Set gene_symbol and gene_id if available and not already set
      if (transcript.gene_symbol && geneSymbol == null) {
        geneSymbol = transcript.gene_symbol;
      }
      if (transcript.gene_id && geneId == null) {
        geneId = transcript.gene_id;
      }

      // If all values are found, we can break
      if (siftScore != null && siftPrediction && geneSymbol && geneId) {
        break;
      }
    }

    console.log("sukses");

    return {
      ...variant,
      globalallele: gnomad,
      clinicalSign: clinicalSignificance,
      severeconsequence: severeConsequence,
      sift_score: siftScore,
      sift_prediction: siftPrediction,
      gene_symbol: geneSymbol,
      gene_id: geneId,
    };
  }

  return variant;
};
