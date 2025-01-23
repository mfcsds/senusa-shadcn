"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/update/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
} from "@/components/update/ui/table";
import OpenAI from "openai";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "../../ui/separator";
import Button from "@/components/update/button/Button";
import {
  Edit,
  Lightbulb,
  PlusCircle,
  Trash,
  X,
  Plus,
  Save,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../dialog/Dialog"; // Assuming Dialog components are in ../ui/dialog

import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { generateClient } from "aws-amplify/api";
import { CreateConclusionInput, CreateRecommendationInput } from "@/src/API";
import {
  generateConclusionID,
  generateRecommendationID,
} from "@/utils/function";
import { useParams } from "next/navigation";
import {
  createConclusion,
  createRecommendation,
  deleteConclusion,
  deleteRecommendation,
  updateConclusion,
  updateRecommendation,
} from "@/src/graphql/mutations";

import { listVariantInterpretations } from "@/src/graphql/queries";

import { TableCell } from "@aws-amplify/ui-react";
import { listConclusions, listRecommendations } from "@/src/graphql/queries";
import {
  Recommendation,
  Conclusion,
  VariantInterpretation,
} from "@/utils/object";
import { Textarea } from "../../ui/textarea";
import { text } from "stream/consumers";
import { Tooltip, TooltipContent } from "../../ui/tooltip";
import { TooltipProvider } from "../../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

Amplify.configure(config);

interface RecommendationConclusionProops {
  id_patient: string | null;
  id_report: string | null;
}

const RecommendationAndConclusion: React.FC<RecommendationConclusionProops> = ({
  id_patient,
  id_report,
}) => {
  const client = generateClient();
  const { toast } = useToast();
  const clientOpenAi = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [listRecommendation, setListRecommendation] = useState<
    Recommendation[]
  >([]);
  const [listConclusion, setListConclusion] = useState<Conclusion[]>([]);

  const [allDescIntepretation, setAllDescInterpretation] = useState("");

  const fetchAllInterpretation = async () => {
    try {
      const result = await client.graphql({
        query: listVariantInterpretations,
        variables: { filter: { id_report: { eq: id_report } } },
      });
      if (result.data && result.data.listVariantInterpretations.items) {
        // Extract the list of variant interpretations
        const interpretations = result.data.listVariantInterpretations.items;
        const combinedDescriptions = interpretations
          .map((item) => item.text) // Assuming `description` is the field that contains the interpretation text
          .join("\n"); // Replace with desired separator, e.g., ", " for comma-separated

        // Update the state with the combined string
        setAllDescInterpretation(combinedDescriptions);
        // Update the state
        // setAllDescInterpretation(allDescInterpretationString);
      }
    } catch (error) {
      console.log("error fetch variant interpretation");
    }
  };

  const fetchRecommendation = async () => {
    try {
      const result = await client.graphql({
        query: listRecommendations,
        variables: { filter: { id_report: { eq: id_report } } },
      });
      setListRecommendation(
        result.data.listRecommendations.items as Recommendation[]
      );
    } catch (error) {
      console.log("Error fetching recommendation data");
    }
  };

  const fetchConclusion = async () => {
    try {
      const result = await client.graphql({
        query: listConclusions,
        variables: { filter: { id_report: { eq: id_report } } },
      });
      setListConclusion(result.data.listConclusions.items as Conclusion[]);
    } catch (error) {
      console.log("Error fetching recommendation data");
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleAIPreTextRecommendation = async (id: string) => {
    try {
      setIsLoading(true);
      const prompt = `
      You are and expert genetics conselor for about 10 years experience
      Provide a detailed recommendations of the following human genome variant interpretations:
      ${allDescIntepretation}

The recommendation should include the phenotypic relevance, impact of patient management, recommendation for further testing result, follow-up, and limitation, make it easy to understand, make it efficient, and short`;
      // Request AI-generated text from OpenAI
      const response = await clientOpenAi.chat.completions.create({
        model: "gpt-4", // Use the GPT-4 model for better analysis
        messages: [{ role: "user", content: prompt }],
      });

      if (response.choices && response.choices[0]?.message?.content) {
        const generatedText = response.choices[0].message.content.trim();

        // setSelectedRecommendation(generatedText);
        // Update the selected recommendation with the AI-generated text
        setListRecommendation((prevList) =>
          prevList.map((item) =>
            item.id === id ? { ...item, text: generatedText } : item
          )
        );
        setSelectedRecommendation(generatedText);
        // console.log(generatedText);
        // Update Textarea with AI response
        // setListRecommendation((prevState) => ({
        //   ...prevState,
        //   text: generatedText,
        // }));
      }
    } catch (error) {
      console.error("Error generating AI pre-text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIPreTextConclusion = async (id: string) => {
    try {
      // setIsLoading(true);
      const prompt = `
      You are and expert genetics conselor for about 10 years experience
      Provide a detailed conclusion of the following human genome variant interpretations and recommmendation:
      ${allDescIntepretation}

      ----------------------
      Recommendation
      ${setSelectedRecommendation}

The conclusion make it easy to understand, make it efficient, and short, no more then 150 words`;
      // Request AI-generated text from OpenAI
      const response = await clientOpenAi.chat.completions.create({
        model: "gpt-4", // Use the GPT-4 model for better analysis
        messages: [{ role: "user", content: prompt }],
      });

      if (response.choices && response.choices[0]?.message?.content) {
        const generatedText = response.choices[0].message.content.trim();

        // setSelectedRecommendation(generatedText);
        // Update the selected recommendation with the AI-generated text
        setListConclusion((prevList) =>
          prevList.map((item) =>
            item.id === id ? { ...item, text: generatedText } : item
          )
        );
        setSelectedConclusion(generatedText);
      }
    } catch (error) {
      console.error("Error generating AI pre-text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendation();
    fetchConclusion();
    fetchAllInterpretation();
  }, []);

  const [selectedRecommendation, setSelectedRecommendation] = useState("");
  const [idSelectecRecommendation, setIdSelectedRecommendation] = useState("");

  const [selectedConclusion, setSelectedConclusion] = useState("");
  const [idSelectecConclusion, setIdSelectedConclusion] = useState("");

  // State to handle dialog visibility
  const [isRecommendationDialogOpen, setRecommendationDialogOpen] =
    useState(false);

  const [isConclusionDialogOpen, setConclusionDialogOpen] = useState(false);

  // State to handle form inputs for recommendation and conclusion
  const [recommendationInput, setRecommendationInput] = useState("");
  const [conclusionInput, setConclusionInput] = useState("");

  const [isEditModalRecommendationOpen, setIsEditModalRecommendationOpen] =
    useState(false);

  const [isEditModalConclusionOpen, setIsEditModalConclusionOpen] =
    useState(false);

  const handleOpenEditModalRecommendation = (id: string) => {
    let tempRecommend = listRecommendation.find((item) => item.id === id);
    setIsEditModalRecommendationOpen(true);
    setSelectedRecommendation(tempRecommend?.text ?? "");
    setIdSelectedRecommendation(tempRecommend?.id ?? "");
  };

  const handleOpenEditModalConclusion = (id: string) => {
    let tempConclusion = listConclusion.find((item) => item.id === id);
    setIsEditModalConclusionOpen(true);
    setSelectedConclusion(tempConclusion?.text ?? "");
    setIdSelectedConclusion(tempConclusion?.id ?? "");
  };

  const handleDeleteRecommendation = async (id: string) => {
    const selrec = listRecommendation.find((item) => item.id === id);

    await setListRecommendation(
      listRecommendation.filter((item) => item.id != id)
    );
    // Delete
    try {
      const result = client.graphql({
        query: deleteRecommendation,
        variables: { input: { id } },
      });

      // fetchRecommendation();
    } catch (error) {
      console.log("Error");
    } finally {
      toast({
        title: "Update Successfully",
        description: "The recommendation has been delete successfully.",
      });
    }
  };

  const handleSaveEditRecommendation = async () => {
    let rec = listRecommendation.find(
      (item) => item.id === idSelectecRecommendation
    );

    rec = {
      id: rec?.id ?? "",
      id_patient: rec?.id_patient ?? "",
      id_report: rec?.id_report ?? "",
      text: selectedRecommendation,
    };
    try {
      const result = await client.graphql({
        query: updateRecommendation,
        variables: { input: rec },
      });
      if (result.data) {
        setListRecommendation((prevList) =>
          prevList.map((item) =>
            item.id === rec.id
              ? { ...item, text: selectedRecommendation }
              : item
          )
        );
        setIsEditModalRecommendationOpen(false);
        // await fetchRecommendation();
      }
    } catch (error) {
      console.log("Failed update");
    } finally {
      toast({
        title: "Update Successfully",
        description: "The recommendation has been update successfully.",
      });
    }
  };

  const handleSaveEditConclusion = async () => {
    let rec = listConclusion.find((item) => item.id === idSelectecConclusion);

    rec = {
      id: rec?.id ?? "",
      id_patient: rec?.id_patient ?? "",
      id_report: rec?.id_report ?? "",
      text: selectedConclusion,
    };
    try {
      const result = await client.graphql({
        query: updateConclusion,
        variables: { input: rec },
      });
      if (result.data) {
        setListConclusion((prevList) =>
          prevList.map((item) =>
            item.id === rec.id ? { ...item, text: selectedConclusion } : item
          )
        );
        setIsEditModalConclusionOpen(false);
      }
    } catch (error) {
      console.log("Failed update");
    } finally {
      toast({
        title: "Update Successfully",
        description: "The conclusion has been update successfully.",
      });
    }
  };

  const handleDeleteConclusion = async (id: string) => {
    await setListConclusion(listConclusion.filter((item) => item.id != id));

    try {
      const result = await client.graphql({
        query: deleteConclusion,
        variables: { input: { id } },
      });
    } catch (error) {
      console.log("Error Delete Conclusion", error);
    } finally {
      toast({
        title: "Delete Successfully",
        description: "The conclusion has been delete successfully.",
      });
    }
  };

  // Function to handle adding a recommendation
  const handleAddRecommendation = () => {
    if (recommendationInput) {
      const newRecommendation: Recommendation = {
        id: generateRecommendationID(),
        id_patient: id_patient ?? "",
        id_report: id_report ?? "",
        text: recommendationInput,
      };
      try {
        const result = client.graphql({
          query: createRecommendation,
          variables: { input: newRecommendation },
        });
      } catch (error) {
        console.log(error);
      } finally {
        toast({
          title: "Add Successfully",
          description: "The recommendation has been add successfully.",
        });
      }
      setListRecommendation([...listRecommendation, newRecommendation]);
      setRecommendationInput(""); // Reset input
      setRecommendationDialogOpen(false); // Close dialog
    }
  };

  // Function to handle adding a conclusion
  const handleAddConclusion = () => {
    if (conclusionInput) {
      const newConclusion: Conclusion = {
        id: generateConclusionID(),
        id_patient: id_patient ?? "",
        id_report: id_report ?? "",
        text: conclusionInput,
      };

      try {
        const result = client.graphql({
          query: createConclusion,
          variables: { input: newConclusion },
        });
      } catch (error) {
        console.log(error);
      } finally {
        toast({
          title: "Add Successfully",
          description: "The conclusion has been add successfully.",
        });
      }

      setListConclusion([...listConclusion, newConclusion]);
      setConclusionInput(""); // Reset input
      setConclusionDialogOpen(false); // Close dialog
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Edit Modal Recommendation */}
      <Dialog
        open={isEditModalRecommendationOpen}
        onOpenChange={setIsEditModalRecommendationOpen}
      >
        <DialogContent className="sm:max-w-[70%] max-h-[90%]">
          <DialogTitle>Edit Recommendation</DialogTitle>
          <DialogDescription>
            Modify the recommendation text based on the new findings or
            interpretations for the selected variant. Make sure the text clearly
            explains any new recommendations or changes to previous ones.
          </DialogDescription>

          <Textarea
            className="w-full p-5 mt-4 border-2 border-border rounded-md mb-6 h-[200px] text-text-secondary"
            placeholder="Edit recommendation here..."
            value={selectedRecommendation}
            onChange={(e) => setSelectedRecommendation(e.target.value)}
          />
          <DialogFooter>
            <div className="flex justify-end gap-4 mb-2">
              <Button
                label="Cancel"
                variant="outlineDanger"
                size="large"
                icon={<X className="w-5 h-5" />}
                onClick={() => setIsEditModalRecommendationOpen(false)}
              />
              <Button
                label="Save"
                variant="outlineSecondary"
                size="large"
                icon={<Save className="w-5 h-5" />}
                onClick={() => handleSaveEditRecommendation()}
              />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal Conclusion */}
      <Dialog
        open={isEditModalConclusionOpen}
        onOpenChange={setIsEditModalConclusionOpen}
      >
        <DialogContent className="sm:max-w-[70%] max-h-[90%]">
          <DialogTitle>Edit Conclusion</DialogTitle>
          <DialogDescription>
          Modify the conclusion text based on the new findings or
                  interpretations for the selected variant. Make sure the text
                  clearly explains any new conclusions or changes to previous
                  ones.
          </DialogDescription>

          <Textarea
            className="w-full p-5 mt-4 border-2 border-border rounded-md mb-6 h-[200px] text-text-secondary"
            placeholder="Edit conclusion here..."
            value={selectedRecommendation}
            onChange={(e) => setSelectedRecommendation(e.target.value)}
          />
          <DialogFooter>
            <div className="flex justify-end gap-4 mb-2">
            <Button
                      label="Cancel"
                      variant="outlineDanger"
                      size="large"
                      icon={<X className="w-5 h-5" />}
                      onClick={() => setIsEditModalConclusionOpen(false)}
                    />
                    <Button
                      label="Save"
                      variant="outlineSecondary"
                      size="large"
                      icon={<Save className="w-5 h-5" />}
                      onClick={() => handleSaveEditConclusion()}
                    />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Conclusion Section */}
      <div className="flex flex-col">
        <Card>
          <CardHeader>
            <CardTitle>Conclusion</CardTitle>
            <CardDescription>
              Provide a conclusion that summarizes the results and
              interpretations of the variant analysis. Make sure to address
              clinical relevance and any potential genetic implications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col w-full">
              <div className="flex flex-row-reverse items-center p-3">
                <Button
                  variant="iconPrimary"
                  size="large"
                  icon={<PlusCircle className="w-6 h-6" />}
                  onClick={() => setConclusionDialogOpen(true)}
                />
                <p className="text-balance text-text-secondary">
                  Add Conclusion
                </p>
              </div>
              <Separator />
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/12">No</TableHead>
                        <TableHead className="w-9/12">Conclusion</TableHead>
                        <TableHead className="w-1/12">Edit</TableHead>
                        <TableHead className="w-1/12">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                  </Table>
                  {/* <RecommendationEditor ></RecommendationEditor> */}
                </div>
                <div className="flex flex-col h-[300px] overflow-y-auto">
                  <Table>
                    <TableBody>
                      {listConclusion.map((conc, index) => (
                        <TableRow
                          key={conc.id}
                          className="h-[100px] text-balance"
                        >
                          <TableCell className="pl-2 text-left w-1/12">
                            {index + 1}
                          </TableCell>
                          <TableCell className="w-9/12">{conc.text}</TableCell>
                          <TableCell className="w-1/12">
                            <Button
                              variant="iconSecondary"
                              size="large"
                              icon={<Edit className="w-5 h-5" />}
                              onClick={() =>
                                handleOpenEditModalConclusion(conc.id)
                              }
                            />
                          </TableCell>
                          <TableCell className="w-1/12">
                            <Button
                              variant="iconDanger"
                              size="large"
                              icon={<Trash className="w-5 h-5" />}
                              onClick={() =>
                                handleDeleteConclusion(conc.id ?? "")
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation Section */}
      <div className="flex flex-col w-full">
        <Card>
          <CardHeader>
            <CardTitle>Recommendation</CardTitle>
            <CardDescription>
              Please add recommendations based on the selected variant analysis.
              Include any therapeutic suggestions, management strategies, or
              follow-up testing if necessary.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col w-full">
              <div className="flex flex-row-reverse items-center p-3">
                <Button
                  variant="iconPrimary"
                  size="large"
                  icon={<PlusCircle className="w-6 h-6" />}
                  onClick={() => setRecommendationDialogOpen(true)}
                />
                <p className="text-balance text-text-secondary">
                  Add Recommendation
                </p>
              </div>
              <Separator />
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/12">No</TableHead>
                        <TableHead className="w-9/12">Recommendation</TableHead>
                        <TableHead className="w-1/12">Edit</TableHead>
                        <TableHead className="w-1/12">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                  </Table>
                </div>
                <div className="flex flex-col h-[250px] overflow-y-auto">
                  <Table>
                    <TableBody>
                      {listRecommendation.map((rec, index) => (
                        <TableRow
                          key={rec.id}
                          className="h-[70px] text-balance"
                        >
                          <TableCell className="text-left pl-4 w-1/12">
                            {index + 1}
                          </TableCell>
                          <TableCell className="w-9/12">{rec.text}</TableCell>
                          <TableCell className="w-1/12">
                            <Button
                              variant="iconSecondary"
                              size="large"
                              icon={<Edit className="w-5 h-5" />}
                              onClick={() =>
                                handleOpenEditModalRecommendation(rec.id ?? "")
                              }
                            />
                          </TableCell>
                          <TableCell className="w-1/12">
                            <Button
                              variant="iconDanger"
                              size="large"
                              icon={<Trash className="w-5 h-5" />}
                              onClick={() =>
                                handleDeleteRecommendation(rec.id ?? "")
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation Add Dialog */}
      <Dialog
        open={isRecommendationDialogOpen}
        onOpenChange={setRecommendationDialogOpen}
      >
        <DialogContent className="sm:max-w-[70%] max-h-[90%]">
          <DialogTitle>Add Recommendation</DialogTitle>
          <DialogDescription>
            Enter the recommendation based on the selected variant analysis.
          </DialogDescription>
          <Textarea
            className="w-full mt-4 p-2 rounded-md border-2 border-border text-text-secondary h-[200px] mb-6"
            placeholder="Type recommendation here..."
            value={recommendationInput}
            onChange={(e) => setRecommendationInput(e.target.value)}
          ></Textarea>
          <DialogFooter>
            <div className="flex justify-end gap-4 mb-2">
              <Button
                label="Cancel"
                variant="outlineDanger"
                size="large"
                icon={<X className="w-5 h-5" />}
                onClick={() => setRecommendationDialogOpen(false)}
              />
              <Button
                label="Save"
                variant="outlineSecondary"
                size="large"
                icon={<Save className="w-5 h-5" />}
                onClick={handleAddRecommendation}
              />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Conclusion Add Dialog */}
      <Dialog
        open={isConclusionDialogOpen}
        onOpenChange={setConclusionDialogOpen}
      >
        <DialogContent className="sm:max-w-[70%] max-h-[90%]">
          <DialogTitle>Add Conclusion</DialogTitle>
          <DialogDescription>
            Provide a conclusion that summarizes the analysis results.
          </DialogDescription>

          <Textarea
            className="w-full p-2 mt-4 border-2 border-border rounded-md text-text-secondary h-[200px]"
            placeholder="Type conclusion here..."
            value={conclusionInput}
            onChange={(e) => setConclusionInput(e.target.value)}
          ></Textarea>
          <DialogFooter>
            <div className="flex justify-end gap-4 mb-2">
              <Button
                label="Cancel"
                variant="outlineDanger"
                size="large"
                icon={<X className="w-5 h-5" />}
                onClick={() => setConclusionDialogOpen(false)}
              />
              <Button
                label="Save"
                variant="outlineSecondary"
                size="large"
                icon={<Save className="w-5 h-5" />}
                onClick={handleAddConclusion}
              />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecommendationAndConclusion;
