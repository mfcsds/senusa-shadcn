"use client";

import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "../ui/input";
import axios from "axios";

import { createFamilyHistoryDisease } from "@/src/graphql/mutations";
import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { generateClient } from "aws-amplify/api";
import { generateFamilyHPOID } from "@/utils/function";
import { FamilyDiseaseData } from "@/utils/object";

Amplify.configure(config);

interface FamilyProops {
  patient_id: string | null;
}

const ButtonAddFamilyDisease: React.FC<FamilyProops> = ({ patient_id }) => {
  const [phenotypeQuery, setPhenotypeQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedPhenotypes, setSelectedPhenotypes] = useState<string[]>([]);

  const client = generateClient();

  //   const saveSelected = async (suggestion: { id_hpo: string; name: string }) => {
  //     const inputTemp: FamilyDiseaseData = {
  //       id: generateFamilyHPOID(),
  //       id_patient: patient_id ?? "",
  //       hpo_code: suggestion.id_hpo ?? "",
  //       hpo_desc: selectedPhenotypes,
  //     };
  //     try {
  //       const result = await client.graphql({
  //         query: createFamilyHistoryDisease,
  //         variables: { input: inputTemp },
  //       });
  //     } catch (error) {
  //       console.log("error save family history");
  //     }
  //   };

  const handlePhenotypeSelect = (suggestion: { id: string; name: string }) => {
    const formattedSuggestion = `${suggestion.id} - ${suggestion.name}`;

    if (!selectedPhenotypes.includes(formattedSuggestion)) {
      setSelectedPhenotypes([...selectedPhenotypes, formattedSuggestion]);
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
    <div className="flex flex-row">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className="">
            <small>
              <Plus className="w-4 h-4 mr-2"></Plus>
            </small>
            Add Family Disease
          </Button>
        </PopoverTrigger>
        <PopoverContent className="-translate-x-60 -translate-y-10 w-[400px]">
          <div className="flex flex-col w-full p-2 ">
            <div className="flex flex-row items-center justify-between gap-2">
              <Input
                value={phenotypeQuery}
                type={"text"}
                onChange={(e) => setPhenotypeQuery(e.target.value)}
                placeholder="Type family history disease"
                className=" focus:outline-none focus:border-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 shadow-sm"
              ></Input>
              <Button variant={"outline"}>
                <small>
                  <Search className="w-4 h-4 text-gray-400"></Search>
                </small>
              </Button>
            </div>
            {suggestions.length > 0 && (
              <ul
                className="absolute 
                 translate-y-14 z-10 bg-white border border-gray-300 w-md mt-1 rounded-md shadow-lg"
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handlePhenotypeSelect(suggestion)}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
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
