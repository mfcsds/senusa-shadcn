import graphqlOperation, { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";

Amplify.configure(config);

interface VariantRawData {
    id_patient: string;
    id_vcf: string;
    id_var: string;
    chrom: string;
    pos: string;
    id?: string;
    ref: string;
    alt: string;
    qual: string;
    filter: string;
    info: string;
    zygosity: string;
    ac: number;
    af: number;
    an: number;
    dp: number;
    fs: number;
    mq: number;
    mqranksum: number;
    qd: number;
    readposrank: number;
    sor: number;
    fraction: number;
    hgvs: string;
    acmg: string;
  }