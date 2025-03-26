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

export function userStatus(counter: number) {
  if (counter == 1) {
    return "In verification";
  } else if (counter == 2) {
    return "Active";
  } else if (counter == 3) {
    return "Deactivated";
  }
}

export function generateACMGID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let acmgID = "ACMG-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    acmgID += characters[randomIndex];
  }

  return acmgID;
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
export function generateVariantInterpretation() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let variantInterID = "VI-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    variantInterID += characters[randomIndex];
  }
  return variantInterID;
}

export function generateFamilyHPOID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let fdhpo = "FD-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    fdhpo += characters[randomIndex];
  }
  return fdhpo;
}

export function generateVariantSampleID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstu";
  let variantSampleID = "vs-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    variantSampleID += characters[randomIndex];
  }
  return variantSampleID;
}
export function generateRecommendationID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstu";
  let recommendationID = "r-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    recommendationID += characters[randomIndex];
  }
  return recommendationID;
}

export function generateConclusionID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstu";
  let conclusionID = "c-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    conclusionID += characters[randomIndex];
  }
  return conclusionID;
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

export function generateHGVS2(
  chrom: string,
  pos: string,
  ref: string,
  alt: string
): string {
  // Example HGVS format: "chr1:g.123456A>T"
  // HGVS nomenclature usually follows this format:
  // "chromosome:position reference_allele>alternate_allele"

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
    let rsID = null;

    for (const variantData of data.colocated_variants || []) {
      if (variantData.id && variantData.id.startsWith("rs") && !rsID) {
        rsID = variantData.id;
      }
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
      clinicalSign: clinicalSignificance,
      severeconsequence: severeConsequence,
      sift_score: siftScore,
      sift_prediction: siftPrediction,
      gene_symbol: geneSymbol,
      gene_id: geneId,
      rsID: rsID,
    };
  }

  return variant;
};
export const fetchVariantDetails4 = async (
  variant: Variant
): Promise<Variant> => {
  const lambdaEndpoint =
    "https://i189efe3m3.execute-api.us-east-1.amazonaws.com/dev/variantinfo";

  const maxRetries = 10;
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.post(
        lambdaEndpoint,
        {
          variant: {
            chrom: variant.chrom.replace("chr", ""),
            pos: variant.pos,
            ref: variant.ref,
            alt: variant.alt,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        // const lambdaBody = JSON.parse(response.data.body);
        // Print the entire lambdaBody to the console
        const lambdaBody =
          typeof response.data.body === "string"
            ? JSON.parse(response.data.body)
            : response.data.body;

        // Debug the parsed response
        console.log("Parsed Lambda Body:", lambdaBody);

        return {
          ...variant,
          gnomade: lambdaBody.gnomade || null,
          gnomadg: lambdaBody.gnomadg || null,
          clinicalSign: lambdaBody.clinicalSign || null,
          severeconsequence: lambdaBody.severeconsequence || null,
          sift_score: lambdaBody.sift_score || null,
          sift_prediction: lambdaBody.sift_prediction || null,
          gene_symbol: lambdaBody.gene_symbol || null,
          gene_id: lambdaBody.gene_id || null,
          rsID: lambdaBody.rsID || null,
          phenotypes: lambdaBody.phenotypes || null,
          alldesc: lambdaBody.alldesc || "",
          inheritance: lambdaBody.inheritance || "Not available",
        };
      } else {
        console.error(
          `Attempt ${attempt}: Lambda function returned status ${response.status}.`
        );
      }
    } catch (error) {
      console.error(`Attempt ${attempt}: Error calling Lambda function:`);

      if (attempt === maxRetries) {
        console.error("Max retries reached. Unable to fetch variant details.");
      } else {
        const backoffTime = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`Retrying in ${backoffTime / 1000} seconds...`);
        await delay(backoffTime);
      }
    }
  }

  // Return original variant if all retries fail
  return variant;
};
export const fetchVariantDetails2 = async (
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
    let gnomade = null;
    let gnomadg = null;
    let clinicalSignificance = null;
    let rsID = null;

    for (const variantData of data.colocated_variants || []) {
      if (variantData.id && variantData.id.startsWith("rs") && !rsID) {
        rsID = variantData.id;
      }
      // Search for gnomad frequency across all colocated_variants
      for (const key in variantData.frequencies) {
        if (variantData.frequencies[key]?.gnomade) {
          gnomad = variantData.frequencies[key].gnomade;
        }
        if (variantData.frequencies[key]?.gnomadg) {
          gnomadg = variantData.frequencies[key].gnomadg;
        }
        if (variantData.frequencies[key]?.gnomade) {
          gnomade = variantData.frequencies[key].gnomade;
        }
      }

      // Collect clinical significance if available
      if (variantData.clin_sig && variantData.clin_sig.length > 0) {
        clinicalSignificance = variantData.clin_sig.join(", ");
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

    let phenotypes = null;
    // If rsID is available, fetch phenotype data using the Variation endpoint

    let desc = null;
    // alldesc contain all the infomarmation with the string format such as gnomade: value, ... phenotypes: value
    if (rsID) {
      const phenotypeUrl = `${server}variation/human/${rsID}?phenotypes=1`;
      try {
        const phenotypeResponse = await axios.get(phenotypeUrl, {
          headers: {
            "Content-Type": contentType,
            Accept: contentType,
          },
        });

        if (phenotypeResponse.status === 200) {
          const phenotypeData = phenotypeResponse.data;
          if (
            phenotypeData &&
            phenotypeData.phenotypes &&
            phenotypeData.phenotypes.length > 0
          ) {
            // Extract phenotype descriptions
            phenotypes = phenotypeData.phenotypes
              .map((p: any) => p.description || p.trait || "N/A")
              .join("; ");
          }
        } else {
          console.error(
            "Error fetching phenotype data:",
            phenotypeResponse.status
          );
        }
      } catch (error) {
        console.error("Error fetching phenotype data:", error);
      }
    }

    // Construct the 'desc' string with separators
    const descParts = [];

    descParts.push(`Chromosome: ${variant.chrom}`);
    descParts.push(`Position: ${variant.pos}`);
    descParts.push(`Reference Allele: ${variant.ref}`);
    descParts.push(`Alternate Allele: ${variant.alt}`);
    descParts.push(
      `Global Allele Frequency (gnomad): ${gnomad !== null ? gnomad : "N/A"}`
    );
    descParts.push(`gnomade: ${gnomade !== null ? gnomade : "N/A"}`);
    descParts.push(`gnomadg: ${gnomadg !== null ? gnomadg : "N/A"}`);
    descParts.push(
      `Clinical Significance: ${
        clinicalSignificance !== null ? clinicalSignificance : "N/A"
      }`
    );
    descParts.push(
      `Most Severe Consequence: ${
        severeConsequence !== null ? severeConsequence : "N/A"
      }`
    );
    descParts.push(`SIFT Score: ${siftScore !== null ? siftScore : "N/A"}`);
    descParts.push(
      `SIFT Prediction: ${siftPrediction !== null ? siftPrediction : "N/A"}`
    );
    descParts.push(`Gene Symbol: ${geneSymbol !== null ? geneSymbol : "N/A"}`);
    descParts.push(`Gene ID: ${geneId !== null ? geneId : "N/A"}`);
    descParts.push(`rsID: ${rsID !== null ? rsID : "N/A"}`);
    descParts.push(`Phenotypes: ${phenotypes !== null ? phenotypes : "N/A"}`);

    // Join all parts into a single string with newline separators
    let descAll = descParts.join("\n");

    return {
      ...variant,
      gnomade: gnomade,
      gnomadg: gnomadg,
      clinicalSign: clinicalSignificance,
      severeconsequence: severeConsequence,
      sift_score: siftScore,
      sift_prediction: siftPrediction,
      gene_symbol: geneSymbol,
      gene_id: geneId,
      rsID: rsID,
      phenotypes: phenotypes,
      alldesc: descAll,
    };
  }

  return variant;
};

export const fetchVariantDetails3 = async (
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
    let gnomade = null;
    let gnomadg = null;
    let clinicalSignificance = null;
    let rsID = null;

    for (const variantData of data.colocated_variants || []) {
      if (variantData.id && variantData.id.startsWith("rs") && !rsID) {
        rsID = variantData.id;
      }
      // Search for gnomad frequency across all colocated_variants
      for (const key in variantData.frequencies) {
        if (variantData.frequencies[key]?.gnomad) {
          gnomad = variantData.frequencies[key].gnomad;
        }
        if (variantData.frequencies[key]?.gnomade) {
          gnomade = variantData.frequencies[key].gnomade;
        }
        if (variantData.frequencies[key]?.gnomadg) {
          gnomadg = variantData.frequencies[key].gnomadg;
        }
      }

      // Collect clinical significance if available
      if (variantData.clin_sig && variantData.clin_sig.length > 0) {
        clinicalSignificance = variantData.clin_sig.join(", ");
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

    let phenotypes = null;
    // If rsID is available, fetch phenotype data using the Variation endpoint
    let desc = null;
    if (rsID) {
      const phenotypeUrl = `${server}variation/human/${rsID}?phenotypes=1`;
      try {
        const phenotypeResponse = await axios.get(phenotypeUrl, {
          headers: {
            "Content-Type": contentType,
            Accept: contentType,
          },
        });

        if (phenotypeResponse.status === 200) {
          const phenotypeData = phenotypeResponse.data;
          if (
            phenotypeData &&
            phenotypeData.phenotypes &&
            phenotypeData.phenotypes.length > 0
          ) {
            // Extract phenotype descriptions
            phenotypes = phenotypeData.phenotypes
              .map((p: any) => p.description || p.trait || "N/A")
              .join("; ");
          }
        } else {
          console.error(
            "Error fetching phenotype data:",
            phenotypeResponse.status
          );
        }
      } catch (error) {
        console.error("Error fetching phenotype data:", error);
      }
    }

    // Construct the 'desc' string with separators
    const descParts = [];

    descParts.push(`Chromosome: ${variant.chrom}`);
    descParts.push(`Position: ${variant.pos}`);
    descParts.push(`Reference Allele: ${variant.ref}`);
    descParts.push(`Alternate Allele: ${variant.alt}`);
    descParts.push(
      `Global Allele Frequency (gnomad): ${gnomad !== null ? gnomad : "N/A"}`
    );
    descParts.push(`gnomade: ${gnomade !== null ? gnomade : "N/A"}`);
    descParts.push(`gnomadg: ${gnomadg !== null ? gnomadg : "N/A"}`);
    descParts.push(
      `Clinical Significance: ${
        clinicalSignificance !== null ? clinicalSignificance : "N/A"
      }`
    );
    descParts.push(
      `Most Severe Consequence: ${
        severeConsequence !== null ? severeConsequence : "N/A"
      }`
    );
    descParts.push(`SIFT Score: ${siftScore !== null ? siftScore : "N/A"}`);
    descParts.push(
      `SIFT Prediction: ${siftPrediction !== null ? siftPrediction : "N/A"}`
    );
    descParts.push(`Gene Symbol: ${geneSymbol !== null ? geneSymbol : "N/A"}`);
    descParts.push(`Gene ID: ${geneId !== null ? geneId : "N/A"}`);
    descParts.push(`rsID: ${rsID !== null ? rsID : "N/A"}`);
    descParts.push(`Phenotypes: ${phenotypes !== null ? phenotypes : "N/A"}`);

    // Join all parts into a single string with newline separators
    desc = descParts.join("\n");

    return {
      ...variant,
      gnomade: gnomade,
      gnomadg: gnomadg,
      clinicalSign: clinicalSignificance,
      severeconsequence: severeConsequence,
      sift_score: siftScore,
      sift_prediction: siftPrediction,
      gene_symbol: geneSymbol,
      gene_id: geneId,
      rsID: rsID,
      phenotypes: phenotypes,
      alldesc: desc,
    };
  }

  return variant;
};
