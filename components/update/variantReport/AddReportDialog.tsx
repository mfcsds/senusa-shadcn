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
  ClipboardPlus,
  Activity,
  Save,
  X,
  Plus,
  Accessibility,
  History,
  BookHeart,
  FileUp,
} from "lucide-react";
import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";
import DragAndDropInput from "@/components/update/input/DragAndDropInput";

const AddPatientDialog: React.FC = () => {
  const [patientID, setPatientID] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ patientID });
  };

  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          label="Variant Report"
          variant="primary"
          size="large"
          icon={<Plus className="w-4 h-4" />}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[750px] max-h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ClipboardPlus className="w-8 h-8 text-primary" />
            <span className="text-text-primary">Create New Variant Report</span>
          </DialogTitle>
          <DialogDescription>Adding Variant Report.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center space-x-2">
                <Accessibility className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="patienID"
                  className="block text-sm font-medium text-text-primary"
                >
                  Select Patient
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Choose the patient by id for whom you want to create this
                variant report.
              </p>
              <Input
                id="patienID"
                type="text"
                value={patientID}
                onChange={(e) => setPatientID(e.target.value)}
                placeholder="Enter Patient ID"
                className="w-full bg-foreground"
              />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <Activity className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="patienID"
                  className="block text-sm font-medium text-text-primary"
                >
                  Phenotype
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Enter or select the phenotype related to this patient is
                condition. This could include observable characteristics or
                traits.
              </p>
              <Input
                id="patienID"
                type="text"
                value={patientID}
                onChange={(e) => setPatientID(e.target.value)}
                placeholder="Type of Search"
                className="w-full bg-foreground"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center space-x-2">
                <History className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="patienID"
                  className="block text-sm font-medium text-text-primary"
                >
                  Medical History
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Enter the current diagnosis that has been confirmed for this
                patient (e.g., Breast Cancer, Type 2 Diabetes).
              </p>
              <Input
                id="patienID"
                type="text"
                value={patientID}
                onChange={(e) => setPatientID(e.target.value)}
                placeholder="Enter Patient ID"
                className="w-full bg-foreground"
              />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <BookHeart className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="patienID"
                  className="block text-sm font-medium text-text-primary"
                >
                  Current Diagnosis
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Enter the current diagnosis that has been identified for this
                patient.
              </p>
              <Input
                id="patienID"
                type="text"
                value={patientID}
                onChange={(e) => setPatientID(e.target.value)}
                placeholder="Type of Search"
                className="w-full bg-foreground"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <FileUp className="w-6 h-6 text-blue-primary mb-1" />
              <label
                htmlFor="patienID"
                className="block text-sm font-medium text-text-primary"
              >
                Supplementary Files
              </label>
            </div>
            <p className="text-xs text-text-secondary mb-4">
              Upload any supplementary files or documents that support this
              variant report. Accepted formats: PDF, DOCX, JPG.
            </p>
            <DragAndDropInput
              onChange={handleFileChange}
              accept=".pdf, .docx, .jpg, and .jpeg"
            >
              <p>Drag n drop some files here, or click to select files</p>
              <p className="text-xs text-text-secondary">
                (Only *.pdf, *.docx, *.jpg, and *.jpeg will be accepted)
              </p>
            </DragAndDropInput>
          </div>
          <DialogFooter className="mt-4 gap-4">
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

export default AddPatientDialog;
