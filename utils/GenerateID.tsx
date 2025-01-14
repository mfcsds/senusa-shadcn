export function generatePatientID() {
    const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let patientID = "P-";
  
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      patientID += characters[randomIndex];
    }
  
    return patientID;
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