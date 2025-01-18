"use client";

import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { ButtonAdd } from "@/components/update/button/ButtonAdd";
import { Plus, SearchIcon, Trash2 } from "lucide-react";
import Input from "@/components/update/input/Input";
import axios from "axios";
import Button from "@/components/update/button/Button";
import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { generateClient } from "aws-amplify/api";
import { PatientDiseaseData } from "@/utils/object";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/update/ui/according";
import {
  fetchPatientDisease,
  removePatientDisease,
  addNewPatientDisease,
} from "@/hooks/useHistoryPatientDisease";

Amplify.configure(config);

interface FamilyProps {
  patient_id: string | null;
}

const ButtonAddFamilyDisease: React.FC<FamilyProps> = ({ patient_id }) => {
  const [phenotypeQuery, setPhenotypeQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedPhenotypes, setSelectedPhenotypes] = useState<
    PatientDiseaseData[]
  >([]);

  const client = generateClient();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const fetchedPatientDisease = await fetchPatientDisease(patient_id!);
        setSelectedPhenotypes(fetchedPatientDisease);
      } catch (error) {
        console.error("Error loading patient history data:", error);
      }
    };

    if (patient_id) {
      loadInitialData();
    }
  }, [patient_id]);

  const saveSelected = async (suggestion: { id: string; name: string }) => {
    const newPhenotype: PatientDiseaseData = {
      id_patient: patient_id ?? "",
      hpo_code: suggestion.id,
      hpo_desc: suggestion.name,
    };

    try {
      await addNewPatientDisease(newPhenotype);
      setSelectedPhenotypes((prev) => [...prev, newPhenotype]);
    } catch (error) {
      console.log("Error saving patient history:", error);
    }
  };

  const deletePhenotype = async (id: string) => {
    try {
      await removePatientDisease(id);
      setSelectedPhenotypes((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting patient history:", error);
    }
  };

  const handlePhenotypeSelect = (suggestion: { id: string; name: string }) => {
    if (!selectedPhenotypes.find((p) => p.hpo_code === suggestion.id)) {
      saveSelected(suggestion);
    }
    setPhenotypeQuery("");
    setSuggestions([]);
  };

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
    <div className="flex flex-row gap-2 items-center justify-end w-[300px]">
      <Accordion
        type="single"
        collapsible
        className="w-[200px] text-text-primary text-sm"
      >
        <AccordionItem value="patient-history">
          <AccordionTrigger>Patient Disease History</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside">
              {selectedPhenotypes.map((phenotype, index) => (
                <li key={index} className="flex justify-between items-center">
                  {phenotype.hpo_code} - {phenotype.hpo_desc}
                  <Button
                    variant="iconDanger"
                    icon={<Trash2 className="w-5 h-5" />}
                    onClick={() => {
                      if (phenotype.id) {
                        deletePhenotype(phenotype.id);
                      } else {
                        console.error(
                          "ID is undefined for phenotype:",
                          phenotype
                        );
                      }
                    }}
                  />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Popover>
        <PopoverTrigger asChild>
          <ButtonAdd
            variant={"outline"}
            className="ml-2 bg-foreground border-2 border-foreground hover:border-blue-primary hover:bg-background py-2 px-2"
          >
            <Plus className="w-5 h-5 text-blue-primary" />
          </ButtonAdd>
        </PopoverTrigger>
        <PopoverContent className="sm:-translate-x-20 -translate-x-5 sm-translate-y-10 -translate-y-30 w-[380px]">
          <div className="flex flex-col w-full p-2">
            <div className="flex flex-row items-center justify-between gap-2">
              <Input
                id="searchPatient"
                value={phenotypeQuery}
                type="text"
                onChange={(e) => setPhenotypeQuery(e.target.value)}
                placeholder="Type patient history disease"
              />
              <Button
                variant="iconPrimary"
                size="innerChild"
                icon={<SearchIcon className="w-5 h-5 " />}
              />
            </div>
            {suggestions.length > 0 && (
              <ul className="absolute translate-y-14 z-10 bg-background border border-border w-md mt-1 rounded-md shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handlePhenotypeSelect(suggestion)}
                    className="px-4 py-2 hover:bg-accent text-text-secondary cursor-pointer text-sm"
                  >
                    {suggestion.id} - {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ButtonAddFamilyDisease;
