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
import { Accessibility, IdCard, Save, X, Plus } from "lucide-react";
import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";
import { generatePatientID } from "@/utils/GenerateID";
import { addNewPatient } from "@/hooks/usePatients";

const AddPatientDialog: React.FC = () => {
  const [idReference, setIDReference] = useState("");
  const [errorIDReference, setErrorIDReference] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleCancelDialog = () => {
    setOpenDialog(false);
    setErrorIDReference(""); 
    setIDReference("");
  };

  const handleAddNewPatient = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idReference.trim()) {
      setErrorIDReference("Patient ID Reference is required.");
      return;
    }

    const newPatient = {
      id: generatePatientID(),
      name: "-",
      sex: "-",
      id_reference: idReference,
      phone_number: "-",
    };

    try {
      await addNewPatient(newPatient);
      setErrorIDReference(""); 
      setIDReference(""); 
      setOpenDialog(false); 
      window.location.reload();
    } catch (error) {
      console.error("Error adding patient:", error);
      setErrorIDReference("Failed to add new patient. Please try again.");
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          label="New Patient"
          variant="primary"
          size="large"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setOpenDialog(true)}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Accessibility className="w-8 h-8 text-primary" />
            <span className="text-text-primary">Add New Patient</span>
          </DialogTitle>
          <DialogDescription>Adding Patient Information.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddNewPatient} className="grid gap-4 mt-2">
          <div>
            <div className="flex items-center space-x-2">
              <IdCard className="w-6 h-6 text-blue-primary mb-1" />
              <label
                htmlFor="patienID"
                className="block text-sm font-medium text-text-primary"
              >
                ID or Patient Reference Number
              </label>
            </div>
            <p className="text-xs text-text-secondary mb-4">Patient Identifier.</p>
            <Input
              id="patienID"
              type="text"
              value={idReference}
              onChange={(e) => setIDReference(e.target.value)}
              placeholder="Enter Patient ID"
              className="w-full bg-foreground"
            />
            {errorIDReference && (
              <p className="text-red-primary text-xs mt-2">{errorIDReference}</p>
            )}
          </div>
          <DialogFooter className="mt-4 gap-4">
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
              type="submit"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
