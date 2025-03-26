import React, { useEffect, useState } from "react";
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
  Accessibility,
  IdCard,
  Save,
  X,
  Plus,
  Contact,
  PersonStanding,
  HeartPulse,
  CalendarArrowUp,
  Phone,
  History,
} from "lucide-react";
import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";
import { generatePatientID } from "@/utils/GenerateID";
import { addNewPatient } from "@/hooks/usePatients";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/update/ui/select";
import { generateClient } from "aws-amplify/api";
import { getUser } from "@/src/graphql/queries";
import { User } from "@/src/API";
import ButtonAddFamilyDisease from "@/components/update/button/ButtonAddFamilyDisease";
import ButtonAddPatientDisease from "@/components/update/button/ButtonAddPatientDisease";
import { fetchUserAttributes } from "aws-amplify/auth";

const AddPatientDialog = ({
  onUpdatePatients,
}: {
  onUpdatePatients: () => Promise<void>;
}) => {
  const [patientID, setPatientID] = useState(generatePatientID());
  const [idReference, setIDReference] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [errorIDReference, setErrorIDReference] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();
  const [healthDesc, setHealthDesc] = useState("");
  const [institution_id, setInstitutionID] = useState<string | null>(null)

  useEffect(() => {
    const getUserInstitutionID = async () => {
      try {
        const attributes = await fetchUserAttributes();
        setInstitutionID(attributes["custom:institution_id"] || null);
      } catch (error) {
        console.error("Error fetching user attributes", error);
      }
    };
    getUserInstitutionID();
  }, []);

  const handleCancelDialog = () => {
    setOpenDialog(false);
    setErrorIDReference("");
    setIDReference("");
    setName("");
    setSex("");
    setPhoneNumber("");
    setDob("");
    setHealthDesc("");
    setPatientID(generatePatientID());
  };

  const handleAddNewPatient = async (
    e: React.FormEvent,
    onUpdatePatients: () => Promise<void>
  ) => {
    e.preventDefault();

    if (!idReference.trim()) {
      setErrorIDReference("Patient ID Reference is required.");
      return;
    }

    const newPatient = {
      id: patientID,
      name: name ?? "-",
      sex: sex ?? "-",
      id_reference: idReference,
      dob: dob ?? "-",
      id_institution: institution_id ?? "",
      phone_number: phoneNumber ?? "-",
      health_desc: healthDesc ?? "-",
    };

    try {
      await addNewPatient(newPatient);
      setErrorIDReference("");
      setIDReference("");
      setOpenDialog(false);
      await onUpdatePatients();
      toast({
        title: "Success Add Patient",
        description: "Patient added successfully",
      });
      handleCancelDialog();
    } catch (error) {
      console.error("Error adding patient:", error);
      toast({
        variant: "destructive",
        title: "Failed to add patient",
        description: "Failed to add new patient. Please try again.",
      });
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          label="Add New Patient"
          variant="primary"
          size="large"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setOpenDialog(true)}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] max-h-[90%] overflow-y-auto bg-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Accessibility className="w-8 h-8 text-primary" />
            <span className="text-text-primary">Add New Patient</span>
          </DialogTitle>
          <DialogDescription>Adding Patient Information.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => handleAddNewPatient(e, onUpdatePatients)}
          className="grid gap-4 mt-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center space-x-2">
                <IdCard className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="patienID"
                  className="block text-sm font-medium text-text-primary"
                >
                  ID or Patient Reference Number <span className="text-red-500">*</span>
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
              ID or Patient Reference Number is Required
              </p>
              <Input
                id="patienID"
                type="text"
                value={idReference}
                onChange={(e) => setIDReference(e.target.value)}
                placeholder="Enter Patient Reference Number"
              />
              {errorIDReference && (
                <p className="text-red-primary text-xs mt-2">
                  {errorIDReference}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Contact className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-primary"
                >
                  Name
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Name for Patient Identifier.
              </p>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Patient Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center space-x-2">
                <PersonStanding className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="sex"
                  className="block text-sm font-medium text-text-primary"
                >
                  Sex
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Sex for Patient Identifier.
              </p>
              <Select value={`${sex}`} onValueChange={setSex}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Sex for Patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Phone className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-text-primary"
                >
                  Phone Number
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Phone Number for Patient Identifier.
              </p>
              <Input
                id="phoneNumber"
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center space-x-2">
                <CalendarArrowUp className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-text-primary"
                >
                  Date of Birth
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Dob for Patient Identifier.
              </p>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Enter Dob Patient"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <HeartPulse className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="healthDesc"
                  className="block text-sm font-medium text-text-primary"
                >
                  Health Description
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Health Description for Patient Identifier.
              </p>
              <Select value={`${healthDesc}`} onValueChange={setHealthDesc}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Patient State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No personal or familial history of cancer">
                    No personal or familial history of cancer
                  </SelectItem>
                  <SelectItem value="Healthy with a family history of cancer">
                    Healthy with a family history of cancer
                  </SelectItem>
                  <SelectItem value="Personal history of cancer, no family history">
                    Personal history of cancer, no family history
                  </SelectItem>
                  <SelectItem value="Personal and family history of cancer">
                    Personal and family history of cancer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center space-x-2">
                <History className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-text-primary"
                >
                  Patient Disease History
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Patient Disease History for Patient Identifier.
              </p>
              <ButtonAddPatientDisease patient_id={patientID} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <History className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="healthDesc"
                  className="block text-sm font-medium text-text-primary"
                >
                  Family Disease History
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Family Disease History for Patient Identifier.
              </p>
              <ButtonAddFamilyDisease patient_id={patientID} />
            </div>
          </div>

          <DialogFooter className="mt-6 gap-4">
            <Button
              label="Cancel"
              variant="outlineDanger"
              size="large"
              icon={<X className="w-4 h-4" />}
              onClick={handleCancelDialog}
            />
            <Button
              label="Add New Patient"
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
