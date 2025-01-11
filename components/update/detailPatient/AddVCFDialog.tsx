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

const AddVCFDialog: React.FC = () => {
  const [levelAccount, setLevelAccount] = useState("");
  const [roleAccount, setRoleAccount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ roleAccount });
  };

  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const userLevel = [
    { label: "Level 1", value: "level 1" },
    { label: "Level 2", value: "level 2" },
  ];

  const userRole = [
    { label: "Admin Lab", value: "Admin Lab" },
    { label: "User Lab", value: "User Lab" },
    { label: "Bioinformatician", value: "Bioinformatician" },
    { label: "Head Lab", value: "Head Lab" },
    { label: "Genetic Cousellor", value: "Genetic Cousellor" },
    { label: "Clinical Pathology", value: "Clinical Pathology" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          label="VCF Data"
          className="relative w-full sm:w-auto"
          variant="primary"
          size="large"
          icon={<Plus className="w-4 h-4" />}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1100px] max-h-[500px] overflow-y-auto">
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
        <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
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
                  options={userRole}
                  selectedValue={roleAccount}
                  onChange={setRoleAccount}
                  placeholder="Select the genome reference"
                  size="medium"
                  variant="default"
                />
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
                  id="firstName"
                  type="date"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  accept=".vcf,.tbi"
                  className="h-28"
                />
              </div>
              <Button
                label="Upload"
                className="relative w-full sm:w-auto"
                variant="primary"
                size="large"
                icon={<Upload className="w-4 h-4" />}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2"></div>
          <DialogFooter className="mt-6 mb-6 gap-4">
            <Button
              label="Cancel"
              variant="outlineDanger"
              size="large"
              icon={<X className="w-4 h-4" />}
            />
            <Button
              label="Save"
              variant="outlineSecondary"
              size="large"
              icon={<Save className="w-4 h-4" />}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVCFDialog;
