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
  FileUp,
  LetterText 
} from "lucide-react";
import Button from "@/components/update/button/Button";
import { ButtonAdd } from "@/components/update/button/ButtonAdd";
import Input from "@/components/update/input/Input";
import { Textarea }from "@/components/update/input/textarea";
import DragAndDropInput from "@/components/update/input/DragAndDropInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getDateToday } from "@/utils/DateHelperFunction";
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
import { addVariantReport, fetchVariantReport } from "@/hooks/useVariantReport";
import { generateReportID } from "@/utils/function";
import { useToast } from "@/components/ui/use-toast";
import { fetchUserAttributes } from "aws-amplify/auth";

const AddReportDialog = ({ onUpdateVariantReport }: { onUpdateVariantReport: () => Promise<void> }) => {
  const [testingDesc, setTestingDesc] = useState("");
  const [patients, setPatients] = useState<DataPatients[]>([]);
  const [phenotypeQuery, setPhenotypeQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string }[]
  >([]);
  const [open, setOpen] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>();
  const [selectedPhenotypes, setSelectedPhenotypes] = useState<string[]>([]);
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [errorSelectPatient, setErrorSelectPatient] = useState("");
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const fetchedPatients = await fetchPatients();
        setPatients(fetchedPatients);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
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

  const handlePhenotypeSelect = (suggestion: { id: string; name: string }) => {
    const formattedSuggestion = `${suggestion.id} - ${suggestion.name}`;
    if (!selectedPhenotypes.includes(formattedSuggestion)) {
      setSelectedPhenotypes([...selectedPhenotypes, formattedSuggestion]);
    }
    setPhenotypeQuery("");
    setSuggestions([]);
  };

  const handleRemovePhenotype = (phenotype: string) => {
    setSelectedPhenotypes(
      selectedPhenotypes.filter((item) => item !== phenotype)
    );
  };

  const handleCreateReport = async (
    e: React.FormEvent,
    onUpdateVariantReport: () => Promise<void>
  ) => {
    e.preventDefault();
    try {
      if (!selectedPatient?.id.trim()) {
        setErrorSelectPatient("Select patient is required.");
        return;
      }
      const newReport = {
        id: generateReportID(),
        status: 1,
        medical_history: "-",
        current_diagnosis: "-",
        sample_collection: getDateToday(),
        phenotype: selectedPhenotypes,
        institutionID: institution_id,
        idPatient: selectedPatient?.id,
        testing_description: testingDesc
      };
      console.log("New Report Add", newReport);
      // await addVariantReport(newReport)
      await onUpdateVariantReport();
      setOpenDialog(false);
      setSelectedPhenotypes([])
      setSelectedPatient(null)
      toast({
        title: "Success Add Variant Report",
        description: "Variant Report added successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDialog = () => {
    setOpenDialog(false);
    setSelectedPhenotypes([])
    setSelectedPatient(null)
    setErrorSelectPatient("")
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          label="Create Variant Report"
          variant="primary"
          size="large"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setOpenDialog(true)}
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
        <form onSubmit={(e) => handleCreateReport(e, onUpdateVariantReport)} className="grid gap-4 mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div>
              <div className="flex items-center space-x-2">
                <Accessibility className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="patienID"
                  className="block text-sm font-medium text-text-primary"
                >
                  Select Patient <span className="text-red-500">*</span>
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Choose the patient by id for whom you want to create this
                variant report is required.
              </p>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <ButtonAdd
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="bg-background border-2 border-border hover:border-secondary w-full justify-between rounded hover:bg-secondary text-text-primary hover:text-text-action"
                  >
                    {selectedPatient ? selectedPatient.id : "Select Patient"}
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
                            ID: {patient.id}
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
              {errorSelectPatient && (
                <p className="text-red-primary text-xs mt-2">
                  {errorSelectPatient}
                </p>
              )}
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
              id="Phenotype"
                type="Text"
                value={phenotypeQuery}
                onChange={(e) => setPhenotypeQuery(e.target.value)}
                placeholder="Type to search.."
              ></Input>
              {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-foreground border border-border w-md mt-1 rounded-md shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handlePhenotypeSelect(suggestion)}
                      className="px-4 text-text-secondary text-sm py-2 hover:bg-background cursor-pointer"
                    >
                      {suggestion.id} - {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
              {selectedPhenotypes.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-text-primary mb-2 mt-4">
                    Selected Phenotypes
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedPhenotypes.map((phenotype, index) => (
                      <span
                        key={index}
                        className="flex items-center px-2 py-1 border-2 border-border rounded-md text-sm text-text-secondary"
                      >
                        {phenotype}
                        <button
                          type="button"
                          onClick={() => handleRemovePhenotype(phenotype)}
                          className="ml-2 text-red-secondary hover:text-red-primary"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <LetterText  className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="institution"
                  className="block text-sm font-medium text-text-primary"
                >
                  Testing Description
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
              Add testing description for variant report.
              </p>
              <Textarea
                id="testingDesc"
                value={testingDesc}
                onChange={(e) => setTestingDesc(e.target.value)}
                placeholder="Enter Test Description"
              />
            </div>

            {/* <div className="flex items-center space-x-2">
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
            </DragAndDropInput> */}
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
              label="Create Variant Report"
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

export default AddReportDialog;
