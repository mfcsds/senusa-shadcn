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
import Button from "@/components/update/button/Button";
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
  SquarePen,
  History,
} from "lucide-react";
import { fetchDetailPatient } from "@/hooks/usePatients";
import { DataPatients } from "@/utils/object";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/update/ui/select";
import Input from "@/components/update/input/Input";
import { updateDataPatient } from "@/hooks/usePatients";
import { useToast } from "@/components/ui/use-toast";

interface EditDetailPatientDialogProps {
  patientID: string;
}

const EditDetailPatientDialog = ({
  patientID,
}: EditDetailPatientDialogProps) => {
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [patient, setPatient] = useState<DataPatients | null>(null);
  const [loading, setLoading] = useState(false);

  const [idReference, setIDReference] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [healthDesc, setHealthDesc] = useState("");
  const [errorIDReference, setErrorIDReference] = useState("");

  useEffect(() => {
    if (openDialog && patientID) {
      const getPatientDetails = async () => {
        setLoading(true);
        try {
          const response = await fetchDetailPatient(patientID);
          if (response.length > 0) {
            const data = response[0];
            setPatient(data);
            setIDReference(data.id_reference ?? "");
            setName(data.name ?? "");
            setSex(data.sex ?? "");
            setPhoneNumber(data.phone_number ?? "");
            setDob(data.dob ?? "");
            setHealthDesc(data.health_desc ?? "");
          } else {
            setPatient(null);
          }
        } catch (error) {
          console.error("Error fetching patient:", error);
          setPatient(null);
        } finally {
          setLoading(false);
        }
      };

      getPatientDetails();
    }
  }, [openDialog, patientID]);

  const handleCancelDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdatePatient = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idReference.trim()) {
      setErrorIDReference("Patient ID Reference is required.");
      return;
    }

    const updatePatient = {
      id: patientID,
      name: name ?? "-",
      sex: sex ?? "-",
      id_reference: idReference,
      dob: dob ?? "-",
      phone_number: phoneNumber ?? "-",
      health_desc: healthDesc ?? "-",
    };

    try {
      await updateDataPatient(patientID, updatePatient);
      setErrorIDReference("");
      setIDReference("");
      setOpenDialog(false);
      toast({
        title: "Success Update Patient",
        description: "Patient update successfully",
      });
    } catch (error) {
      console.error("Error Update patient:", error);
      toast({
        variant: "destructive",
        title: "Failed to update patient",
        description: "Failed to update new patient. Please try again.",
      });
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant="iconSecondary"
          size="none"
          icon={<SquarePen className="w-5 h-5" />}
          className="bg-foreground mr-4"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60%] max-h-[90%] overflow-y-auto bg-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Accessibility className="text-primary w-5 h-5 sm:w-10 sm:h-10" />
            <span className="text-text-primary">Edit Detail Patient</span>
          </DialogTitle>
          <DialogDescription className="text-text-secondary"></DialogDescription>
        </DialogHeader>

        {loading ? (
          <p className="text-lg text-center mt-4 mb-6 text-primary font-semibold animate-pulse">
            Loading
          </p>
        ) : !patient ? (
          <p className="text-center text-text-secondary">Data tidak tersedia</p>
        ) : (
          <form
            onSubmit={(e) => handleUpdatePatient(e)}
            className="grid gap-4 mt-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              <div>
                <div className="flex items-center space-x-2">
                  <IdCard className="w-6 h-6 text-blue-primary mb-1" />
                  <label
                    htmlFor="patienID"
                    className="block text-sm font-medium text-text-primary"
                  >
                    ID or Patient Reference Number{" "}
                    <span className="text-red-500">*</span>
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

            <DialogFooter className="mt-6 gap-4">
              <Button
                label="Cancel"
                variant="outlineDanger"
                size="large"
                icon={<X className="w-4 h-4" />}
                onClick={handleCancelDialog}
              />
              <Button
                label="Edit Detail Patient"
                variant="outlineSecondary"
                size="large"
                icon={<Save className="w-4 h-4" />}
                type="submit"
              />
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditDetailPatientDialog;
