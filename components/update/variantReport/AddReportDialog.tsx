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
import {ButtonAdd} from "@/components/update/button/ButtonAdd";
import Input from "@/components/update/input/Input";
import DragAndDropInput from "@/components/update/input/DragAndDropInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Patient } from "@/utils/object";
import { DataPatients } from "@/utils/object";
import { fetchPatients } from "@/hooks/usePatients";
import axios from "axios";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

const AddPatientDialog: React.FC = () => {
  const [patientID, setPatientID] = useState("");
  const [patients, setPatients] = useState<DataPatients[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [phenotypeQuery, setPhenotypeQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string }[]
  >([]);
  const [open, setOpen] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>();

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

  useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true);
        const fetchedPatients = await fetchPatients();
        setPatients(fetchedPatients);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPatients();
}, []);


  useEffect(() => {
    const fetchSuggestions = async () => {
      if (phenotypeQuery.length > 2) {
        try {
          const response = await axios.get(
            "https://ontology.jax.org/api/hp/search",
            {
              params: {
                q: phenotypeQuery,
                page: 0,
                limit: 10,
              },
            }
          );
          const terms = response.data.terms || [];
          setSuggestions(
            terms.map((term: any) => ({ id: term.id, name: term.name }))
          );
        } catch (error) {
          console.error("Error fetching phenotype suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [phenotypeQuery]);

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
      <DialogContent className="sm:max-w-[50%] max-h-[90%] overflow-y-auto bg-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ClipboardPlus className="w-8 h-8 text-primary" />
            <span className="text-text-primary">Create New Variant Report</span>
          </DialogTitle>
          <DialogDescription>Adding Variant Report.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
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
              <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <ButtonAdd
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="bg-foreground border-2 border-primary hover:border-secondary w-full justify-between rounded hover:bg-secondary text-primary hover:text-text-action"
                        >
                          {selectedPatient
                            ? selectedPatient.name
                            : "Select Patient"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </ButtonAdd>
                      </PopoverTrigger>
                      <PopoverContent className="w-[500px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search ID Patient"
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No patient found.</CommandEmpty>
                            <CommandGroup>
                              {patients.map((patient) => (
                                <CommandItem
                                  key={patient.id}
                                  value={patient.id}
                                  onSelect={(currentValue) => {
                                    const selected = patients.find(
                                      (p) => p.id === currentValue
                                    );
                                    if (selected) {
                                      setSelectedPatient(selected);
                                    }
                                    setOpen(false);
                                  }}
                                >
                                  {patient.name} (ID: {patient.id})
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      selectedPatient?.id === patient.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
