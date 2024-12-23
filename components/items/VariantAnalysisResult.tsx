"use client";

import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Edit, Lightbulb, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog"; // Import shadcn UI components for Dialog

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
} from "../ui/table";
import { TableRow } from "@aws-amplify/ui-react";
import { getVariantInterpretation } from "@/src/graphql/queries";
import { updateVariantInterpretation } from "@/src/graphql/mutations";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "@/src/amplifyconfiguration.json";
import { VariantData, VariantInterpretation } from "@/utils/object";
import LabelAndDescription from "./LabelAndDescription";
import { Separator } from "../ui/separator";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import OpenAI from "openai";
import axios from "axios";

// Generate Client
Amplify.configure(config);

interface VariantAnalysisResultProps {
  varInterpretation: VariantInterpretation;
}

const VariantAnalysisResult: React.FC<VariantAnalysisResultProps> = ({
  varInterpretation,
}) => {
  const client = generateClient();

  const clientOpenAi = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // State to store the current variant interpretation
  const [variantInterpretation, setVariantInterpretation] =
    useState<VariantInterpretation>(varInterpretation);

  // State to control modal visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State to store the text interpretation value from Textarea, initialized with the variantInterpretation text
  const [textInterpretation, setTextInterpretation] = useState(
    variantInterpretation.text
  );
  // State to store AI pre-text
  const [isLoading, setIsLoading] = useState(false); // Loading state to handle async operations

  // Function to open or close the modal dialog
  const openDialog = () => {
    setTextInterpretation(variantInterpretation.text); // Ensure Textarea has the latest value when dialog opens
    setIsDialogOpen(true);
  };

  // Function to get AI Pre-text from OpenAI API using streaming
  const handleAIPreText = async () => {
    try {
      setIsLoading(true);
      const prompt = `Provide a detailed interpretation of the following human genome variant:
      ${varInterpretation.alldesc}

The interpretation should include the clinical significance, potential impacts, and any relevant information that would be useful for understanding this variant in the context of a patient diagnosis.`;
      // Request AI-generated text from OpenAI
      const response = await clientOpenAi.chat.completions.create({
        model: "gpt-4", // Use the GPT-4 model for better analysis
        messages: [{ role: "user", content: prompt }],
      });

      if (response.choices && response.choices[0]?.message?.content) {
        const generatedText = response.choices[0].message.content.trim();

        setTextInterpretation(generatedText); // Update Textarea with AI response
        setVariantInterpretation((prevState) => ({
          ...prevState,
          text: generatedText,
        }));
      }
    } catch (error) {
      console.error("Error generating AI pre-text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle the update of the interpretation
  const handleUpdateInterpretation = async () => {
    try {
      // Update the variant interpretation in the database
      const result = await client.graphql({
        query: updateVariantInterpretation,
        variables: {
          input: {
            id: variantInterpretation?.id ?? "",
            text: textInterpretation,
          },
        },
      });

      // Update the local state with the new value
      setVariantInterpretation((prev) => ({
        ...prev,
        text: textInterpretation,
      }));

      // Close the dialog and reset the input field
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating variant interpretation:", error);
    }
  };

  return (
    <div className="flex flex-col gap-3 border rounded-md shadow-sm">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">
              <div className="flex flex-col">
                <p className="text-sm font-bold">Variant Detail</p>
              </div>
            </TableHead>
            <TableHead className="w-6/12">Interpretation</TableHead>
            <TableHead className="w-1/12">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-balance">
              <div className="flex flex-col">
                <p className="text-lg">{`${variantInterpretation.gene_symbol}`}</p>
                <p className="text-lg">{`${variantInterpretation.gene_id}:${variantInterpretation.hgvs}`}</p>
              </div>
            </TableCell>
            <TableCell className="text-balance">
              {/* Show updated interpretation text */}
              {variantInterpretation.text || "No Interpretation"}
            </TableCell>
            <TableCell className="text-balance">
              <div className="flex flex-row gap-2 items-center">
                <Button
                  variant={"ghost"}
                  className="rounded-full hover:bg-violet-700 hover:text-white"
                  onClick={openDialog} // Open modal on click
                >
                  <small>
                    <Edit className="w-4 h-4"></Edit>
                  </small>
                </Button>
                <Separator orientation="vertical" className="h-5"></Separator>
                {/* <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className="rounded-full hover:bg-green-600 hover:text-white"
                        onClick={(e) => handleAIPreText()}
                        disabled={isLoading}
                      >
                        <small>
                          <Lightbulb className="w-5 h-5"></Lightbulb>
                        </small>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-balance w-[150px]">
                        AI Pre-text for variant analysis
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider> */}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Modal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Interpretation
              <LabelAndDescription
                label={`${variantInterpretation?.hgvs}`}
                desc=""
              ></LabelAndDescription>
            </DialogTitle>
          </DialogHeader>
          <Textarea
            className="mt-4"
            value={textInterpretation}
            onChange={(e) => setTextInterpretation(e.target.value)}
            placeholder="Update your interpretation here..."
          />
          <DialogFooter className="mt-4">
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateInterpretation}>
              Save <Save className="ml-2 w-4 h-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VariantAnalysisResult;
