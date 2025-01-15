import React from "react";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  GENE_PANEL_25,
  GENE_PANEL_50,
  GENE_PANEL_75,
  GENE_PANEL_113,
} from "@/utils/Contanst";

interface GenePanelPopoverProps {
  selectedGenePanel: number;
}

const GenePanelPopover: React.FC<GenePanelPopoverProps> = ({
  selectedGenePanel,
}) => {
  // Function to get the gene list based on the selected panel
  const getGeneList = () => {
    switch (selectedGenePanel) {
      case 25:
        return GENE_PANEL_25;
      case 50:
        return GENE_PANEL_50;
      case 75:
        return GENE_PANEL_75;
      case 113:
        return GENE_PANEL_113;
      default:
        return []; // Return an empty array if no match
    }
  };

  const geneList = getGeneList();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="hover:text-blue-500">
          <Info className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] max-w-full p-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {selectedGenePanel} List of Selected Genes
            </h4>
            <p className="text-sm text-muted-foreground">
              The genes that will be analyzed
            </p>
          </div>
          <div className="grid grid-cols-5 gap-4 max-h-[400px] overflow-y-auto border p-4 rounded-lg">
            {geneList.map((gene, index) => (
              <div
                key={index}
                className="text-sm bg-white p-2 rounded-md shadow-sm hover:bg-gray-100"
              >
                {gene}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GenePanelPopover;
