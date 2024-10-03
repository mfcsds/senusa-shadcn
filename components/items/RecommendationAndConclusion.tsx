"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
} from "../ui/table";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog"; // Assuming Dialog components are in ../ui/dialog

import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { generateClient } from "aws-amplify/api";
import {
  Conclusion,
  CreateConclusionInput,
  CreateRecommendationInput,
  Recommendation,
} from "@/src/API";
import {
  generateConclusionID,
  generateRecommendationID,
} from "@/utils/function";
import { useParams } from "next/navigation";
import { createConclusion } from "@/src/graphql/mutations";

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

  const [listRecommendation, setListRecommendation] = useState<
    CreateRecommendationInput[]
  >([]);
  const [listConclusion, setListConclusion] = useState<CreateConclusionInput[]>(
    []
  );

  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Recommendation>();
  const [selectedConclusion, setSelectedConclusion] = useState<Conclusion>();

  // State to handle dialog visibility
  const [isRecommendationDialogOpen, setRecommendationDialogOpen] =
    useState(false);
  const [isConclusionDialogOpen, setConclusionDialogOpen] = useState(false);

  // State to handle form inputs for recommendation and conclusion
  const [recommendationInput, setRecommendationInput] = useState("");
  const [conclusionInput, setConclusionInput] = useState("");

  // Function to handle adding a recommendation
  const handleAddRecommendation = () => {
    if (recommendationInput) {
      const newRecommendation: CreateRecommendationInput = {
        id: generateRecommendationID(),
        id_patient: id_patient ?? "",
        id_report: id_report ?? "",
        text: recommendationInput,
      };
      setListRecommendation([...listRecommendation, newRecommendation]);
      setRecommendationInput(""); // Reset input
      setRecommendationDialogOpen(false); // Close dialog
    }
  };

  // Function to handle adding a conclusion
  const handleAddConclusion = () => {
    if (conclusionInput) {
      const newConclusion: CreateConclusionInput = {
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
      }

      setListConclusion([...listConclusion, newConclusion]);
      setConclusionInput(""); // Reset input
      setConclusionDialogOpen(false); // Close dialog
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
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
                  variant={"ghost"}
                  className="rounded-full"
                  onClick={() => setRecommendationDialogOpen(true)}
                >
                  <PlusCircle className="" />
                </Button>

                <p className="text-balance text-gray-500">Add Recommendation</p>
              </div>
              <Separator />
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/12">No</TableHead>
                      <TableHead className="w-10/12">Recommendation</TableHead>
                      <TableHead className="w-1/12">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listRecommendation.map((rec, index) => (
                      <TableRow key={rec.id}>
                        <td>{index + 1}</td>
                        <td>{rec.text}</td>
                        <td> {/* Placeholder for Actions */}</td>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
                  variant={"link"}
                  className="rounded-full"
                  onClick={() => setConclusionDialogOpen(true)}
                >
                  <PlusCircle className="" />
                </Button>

                <p className="text-balance text-gray-500">Add Conclusion</p>
              </div>
              <Separator />
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/12">No</TableHead>
                      <TableHead className="w-10/12">Conclusion</TableHead>
                      <TableHead className="w-1/12">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listConclusion.map((conc, index) => (
                      <TableRow key={conc.id}>
                        <td>{index + 1}</td>
                        <td>{conc.text}</td>
                        <td> {/* Placeholder for Actions */}</td>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation Dialog */}
      <Dialog
        open={isRecommendationDialogOpen}
        onOpenChange={setRecommendationDialogOpen}
      >
        <DialogContent>
          <DialogTitle>Add Recommendation</DialogTitle>
          <DialogDescription>
            Enter the recommendation based on the selected variant analysis.
          </DialogDescription>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Type recommendation here..."
            value={recommendationInput}
            onChange={(e) => setRecommendationInput(e.target.value)}
          ></textarea>
          <DialogFooter>
            <Button onClick={handleAddRecommendation}>Save</Button>
            <Button
              variant="ghost"
              onClick={() => setRecommendationDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Conclusion Dialog */}
      <Dialog
        open={isConclusionDialogOpen}
        onOpenChange={setConclusionDialogOpen}
      >
        <DialogContent>
          <DialogTitle>Add Conclusion</DialogTitle>
          <DialogDescription>
            Provide a conclusion that summarizes the analysis results.
          </DialogDescription>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Type conclusion here..."
            value={conclusionInput}
            onChange={(e) => setConclusionInput(e.target.value)}
          ></textarea>
          <DialogFooter>
            <Button onClick={handleAddConclusion}>Save</Button>
            <Button
              variant="ghost"
              onClick={() => setConclusionDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecommendationAndConclusion;
