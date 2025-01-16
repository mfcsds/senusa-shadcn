import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/update/dialog/Dialog";
import {
  Plus,
  Upload,
  Dna,
  X,
  Server,
  FileUp,
  Save,
  CalendarArrowUp,
} from "lucide-react";
import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";
import Dropdown from "@/components/update/input/Dropdown";
import DragAndDropInput from "@/components/update/input/DragAndDropInput";
import { getDateToday } from "@/utils/DateHelperFunction";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/update/ui/table";
import {
  generateACMGID,
  generateHGVS,
  generateHGVS2,
  generateVCFDataID,
} from "@/utils/function";
import { VcfData } from "@/utils/object";
import { uploadData } from "aws-amplify/storage";
import { CreateVariantInput } from "@/src/API";
import { Amplify } from "aws-amplify";
import axios from "axios";
import config from "@/src/amplifyconfiguration.json";
import Swal from "sweetalert2";
import {
  createAcmgAnnotation,
  createVariant,
  createVcfdata,
} from "@/src/graphql/mutations";
import { generateClient } from "aws-amplify/api";

Amplify.configure(config);

interface AddVcfDialogProps {
  patientID: string;
}

const AddVCFDialog: React.FC<AddVcfDialogProps> = ({ patientID }) => {
  const client = generateClient();
  const [genomReference, setGenomReference] = useState("");
  const [sampleDate, setSampleDate] = useState("");
  const [file, setFile] = useState<File>();
  const [readVariantFromText, setReadVariantFromText] = useState<
    CreateVariantInput[]
  >([]);
  const [errorGenomReference, setErrorGenomReference] = useState("");
  const [vcfID, setVCFID] = useState(generateVCFDataID());
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [disabledButtonSave, setDisabledButtonSave] = useState(true);
  const [filePath, setFilePath] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [savingProgress, setSavingProgress] = useState(0);
  const [tableDataVariant, setTableDataVariant] = useState<any[]>([]);
  const [vcfFiles, setVCFFiles] = useState<VcfData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const optionsGenomeReference = [
    { label: "GRCH38", value: "GRCH38" },
    { label: "GRCH37", value: "GRCH37" },
  ];

  const handleUploadVCFd = async () => {
    if (!genomReference) {
      setErrorGenomReference("Please select the genome reference.");
      return;
    }
    if (genomReference) {
      setErrorGenomReference("");
    }
    if (!file) {
      Swal.fire({
        title: "Information.",
        text: "Please select a file VCF!",
        icon: "info",
        background: "bg-background",
        color: "text-text-primary",
        timer: 1500,
        customClass: {
          popup: "bg-background text-text-primary",
          title: "text-2xl font-bold",
          confirmButton:
            "bg-primary text-text-action hover:bg-secondary rounded-lg px-4 py-2",
          cancelButton:
            "bg-red-primary text-text-action hover:bg-red-secondary rounded-lg px-4 py-2",
        },
        showConfirmButton: false,
      });
      return;
    }
    setLoading(true);
    setUploadProgress(0);
    setReadVariantFromText([]);
    try {
      const fileKey = `public/${patientID}/${"vcf"}/${vcfID}/${file.name}`;

      // Upload file to S3 with progress monitoring
      const result = await uploadData({
        path: fileKey,
        data: file,
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              const progress = Math.round(
                (transferredBytes / totalBytes) * 100
              );
              setUploadProgress(progress);
            }
          },
        },
      }).result;

      console.log("Path from Response: ", result.path);
      setFilePath(result.path);

      // Call the Lambda API
      const apiUrl =
        "https://sdcmg4zzh7.execute-api.us-east-1.amazonaws.com/dev/parsevcf";
      const payload = {
        Records: [
          {
            s3: {
              bucket: {
                name: config.aws_user_files_s3_bucket,
              },
              object: {
                key: result.path,
              },
            },
          },
        ],
      };
      console.log("Im call- Lambda aPI");
      const response = await axios.post(apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data && response.data.body) {
        const parsedData = JSON.parse(response.data.body);
        setTableDataVariant(parsedData);
        const parsedVariant: CreateVariantInput[] = parsedData.map(
          (item: any, index: number) => ({
            id_patient: patientID,
            id_vcf: vcfID,
            id_var: item.id_var,
            chrom: item.chrom || "",
            pos: item.pos?.toString() || "",
            ref: item.ref || "",
            alt: item.alts || "",
            qual: item.qual?.toString() || "",
            filter: item.filter || "PASS",
            zygosity: item.zygosity || "",
            info: JSON.stringify(item.info || {}),
            ac: item.AC || 0,
            af: item.AF || 0,
            an: item.AN || 0,
            dp: item.DP || 0,
            fs: item.FS || 0,
            mq: item.MQ || 0,
            mqranksum: item.MQRankSum || 0,
            qd: item.QD || 0,
            readposrank: item.ReadPosRankSum || 0,
            sor: item.SOR || 0,
            fraction: item.FractionInformativeReads || 0,
            hgvs: generateHGVS2(item.chrom, item.pos, item.ref, item.alts),
            acmg: "Benign",
          })
        );
        await setReadVariantFromText(parsedVariant);
      } else {
        alert("No data returned from API.");
      }
    } catch (error) {
      console.error("Error uploading file or calling API:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
      setFile(undefined);
      setDisabledButtonSave(false);
    }
  };

  const handleCancelDialog = () => {
    setFiles([]);
    setReadVariantFromText([]);
    setGenomReference("");
    setSampleDate("");
    setOpenDialog(false);
    setTableDataVariant([]);
    setDisabledButtonSave(true);
  };

  const saveSampleVariant = async (variant: CreateVariantInput) => {
    try {
      const apiUrl =
        genomReference === "GRCH37"
          ? "https://pr2yknfpne.execute-api.us-east-1.amazonaws.com/dev/acmg_grch37"
          : "https://yyj4sdbsd6.execute-api.us-east-1.amazonaws.com/dev-acmg/classification";

      // Fetch ACMG classification from the API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          body: JSON.stringify({
            variants: [variant.hgvs],
          }),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ACMG classification");
      }

      const data = await response.json();
      const acmgResults = JSON.parse(data.body);

      if (acmgResults && acmgResults.length > 0) {
        const acmgData = acmgResults[0];
        variant.acmg = acmgData.acmg ?? "VUS";
        
        if (variant.acmg) {
          const variantResult = await client.graphql({
            query: createVariant,
            variables: { input: variant },
          });
          console.log("Variant saved successfully", variantResult);
          const savedVariant = variantResult.data?.createVariant;
          if (!savedVariant) {
            throw new Error("Failed to save variant to database.");
          }
          console.log("Variant saved successfully:", savedVariant);
        } else {
          throw new Error("ACMG classification missing; cannot save variant");
        }
      } else {
        throw new Error("ACMG classification not found in response");
      }
    } catch (error) {
      console.error("Error saving variant and ACMG criteria:", error);
    }
  };

  const handleSaveFileVCF = async () => {
    console.log("Click Upload Button");
    setVCFID(generateVCFDataID());
    setSavingProgress(0);
    setDisabledButtonSave(true);

    try {
      const newVCFFile: VcfData = {
        id: vcfID,
        id_patient: patientID,
        genome_reference: genomReference,
        sample_date: sampleDate ?? "No Date Selected",
        uploadAt: getDateToday(),
        pathfile: filePath,
        number_variant: readVariantFromText.length,
      };

      const saveData = async () => {
        try {
          const saveVCFData = await client.graphql({
            query: createVcfdata,
            variables: { input: newVCFFile },
          });
        } catch (error) {
          console.log(error);
        }
      };
      await saveData();
      setVCFFiles((vcfData) => [...vcfData, newVCFFile]);

      let completed = 0;
      const totalVariants = readVariantFromText.length;
      await Promise.all(
        readVariantFromText.map(async (variant) => {
          await saveSampleVariant(variant);
          completed++;

          if (completed % 10 === 0 || completed === totalVariants) {
            setSavingProgress(Math.round((completed / totalVariants) * 100));
          }
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setFiles([]);
      setUploadProgress(0);
      setSavingProgress(0);
      setReadVariantFromText([]);
      setDisabledButtonSave(false);
      setOpenDialog(false);
      window.location.reload();
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          label="VCF Data"
          className="relative w-full sm:w-auto sm:mt-0 mt-6"
          variant="primary"
          size="large"
          icon={<Plus className="w-4 h-4" />}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1100px] max-h-[500px] overflow-y-auto bg-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Server className="w-8 h-8 text-primary" />
            <span className="text-text-primary">Upload Variant Call Data</span>
          </DialogTitle>
          <DialogDescription>
            Please select and upload your VCF file containing the variant data.
            Ensure that the file follows the correct format and is bellow is the
            maximum upload size. Once uploaded, the system will process the
            file, the variant data will be displayed in the table bellow. If you
            encounter any issues, please contact support.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSaveFileVCF} className="grid gap-4 mt-4">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div className="flex flex-col space-y-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Dna className="w-6 h-6 text-blue-primary mb-1" />
                  <label
                    htmlFor="institution"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Genome Reference
                  </label>
                </div>
                <p className="text-xs text-text-secondary mb-4">
                  Please select the appropriate reference genome version for
                  your VCF file. Ensure that the selected version matches the
                  reference genome use variant during calling to avoid
                  inconsistencies in analysis.
                </p>
                <Dropdown
                  options={optionsGenomeReference}
                  selectedValue={genomReference}
                  onChange={setGenomReference}
                  placeholder="Select the genome reference"
                  size="medium"
                  variant="default"
                />
                {errorGenomReference && (
                  <p className="text-red-primary text-xs mt-2">
                    {errorGenomReference}
                  </p>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <CalendarArrowUp className="w-6 h-6 text-blue-primary mb-1" />
                  <label
                    htmlFor="institution"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Sample Date
                  </label>
                </div>
                <p className="text-xs text-text-secondary mb-4">
                  The date when the patient’s sample was collected for variant
                  analysis. Please select the acurate collection date to ensure
                  proper tracking of sample data.
                </p>
                <Input
                  id="date"
                  type="date"
                  value={sampleDate}
                  onChange={(e) => setSampleDate(e.target.value)}
                  placeholder="Pick a Date"
                  className="w-full bg-foreground"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div>
                <div className="flex items-center space-x-2">
                  <FileUp className="w-6 h-6 text-blue-primary mb-1" />
                  <label
                    htmlFor="institution"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Upload VCF File
                  </label>
                </div>
                <p className="text-xs text-text-secondary mb-4">
                  Please upload the Variant Call Format (VCF) file containng the
                  patient’s variant data. Ensure that the file is properly
                  formatted and does not exceed the upload size limit. only .vcf
                  dan .tbi file formats will be accepted. If you encounter any
                  issues with uploading, please contact support for assitance.
                </p>
                <DragAndDropInput
                  onChange={handleFileChange}
                  accept=".vcf,.vcf.gz,.gz"
                  className="h-28"
                />
              </div>
              <Button
                label="Upload"
                className="relative w-full sm:w-auto"
                variant="primary"
                size="large"
                onClick={handleUploadVCFd}
                icon={<Upload className="w-4 h-4" />}
              />
            </div>
          </div>
          
          {savingProgress > 0 && (
                  <div className="w-full bg-yellow-secondary rounded-full h-4 my-4">
                    <div
                      className="bg-yellow-primary h-4 rounded-full transition-all duration-300"
                      style={{ width: `${savingProgress}%` }}
                    ></div>
                    <p className="text-center text-sm font-semibold mt-2 text-text-primary animate-pulse">
                      Saving... {savingProgress}%
                    </p>
                  </div>
                )}

          {uploadProgress > 0 && (
            <div className="flex flex-col rounded-md border-primary border-2 ">
              <div className="p-4">
                <p className="text-sm text-center text-primary font-semibold animate-pulse">
                  Loading Preview Variant Data...
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col p-2">
            {tableDataVariant.length > 0 && (
              <div className="flex flex-col p-2 rounded-md border-primary border-2 ">
                <DialogTitle className="flex items-center space-x-2">
                  <span className="text-text-primary text-sm">
                    Preview Variant Data
                  </span>
                </DialogTitle>
                <div className="mt-6">
                  <Table className="overflow-y-auto h-[200px] w-[350px] md:w-[1000px] block">
                    <TableHeader className="sticky top-0 bg-foreground z-10">
                      <TableRow>
                        <TableHead>Chrom</TableHead>
                        <TableHead>Pos</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Ref</TableHead>
                        <TableHead>Alts</TableHead>
                        <TableHead>Qual</TableHead>
                        <TableHead>Filter</TableHead>
                        <TableHead>Zygosity</TableHead>
                        <TableHead>AC</TableHead>
                        <TableHead>AF</TableHead>
                        <TableHead>AN</TableHead>
                        <TableHead>DP</TableHead>
                        <TableHead>FS</TableHead>
                        <TableHead>MQ</TableHead>
                        <TableHead>MQRankSum</TableHead>
                        <TableHead>QD</TableHead>
                        <TableHead>ReadPosRankSum</TableHead>
                        <TableHead>SOR</TableHead>
                        <TableHead>FractionInformativeReads</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableDataVariant.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.chrom}</TableCell>
                          <TableCell>{row.pos}</TableCell>
                          <TableCell>{row.id ?? "N/A"}</TableCell>
                          <TableCell>{row.ref}</TableCell>
                          <TableCell>{row.alts}</TableCell>
                          <TableCell>{row.qual ?? "N/A"}</TableCell>
                          <TableCell>{row.filter ?? "N/A"}</TableCell>
                          <TableCell>{row.zygosity ?? "N/A"}</TableCell>
                          <TableCell>{row.AC ?? "N/A"}</TableCell>
                          <TableCell>{row.AF ?? "N/A"}</TableCell>
                          <TableCell>{row.AN ?? "N/A"}</TableCell>
                          <TableCell>{row.DP ?? "N/A"}</TableCell>
                          <TableCell>{row.FS ?? "N/A"}</TableCell>
                          <TableCell>{row.MQ ?? "N/A"}</TableCell>
                          <TableCell>{row.MQRankSum ?? "N/A"}</TableCell>
                          <TableCell>{row.QD ?? "N/A"}</TableCell>
                          <TableCell>{row.ReadPosRankSum ?? "N/A"}</TableCell>
                          <TableCell>{row.SOR ?? "N/A"}</TableCell>
                          <TableCell>
                            {row.FractionInformativeReads ?? "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="mt-6 mb-6 gap-4">
            <Button
              label="Cancel"
              variant="outlineDanger"
              size="large"
              icon={<X className="w-4 h-4" />}
              onClick={handleCancelDialog}
            />
            <Button
              label="Save"
              variant="outlineSecondary"
              size="large"
              icon={<Save className="w-4 h-4" />}
              onClick={handleSaveFileVCF}
              disabled={disabledButtonSave}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVCFDialog;
