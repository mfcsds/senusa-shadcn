"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  GENE_PANEL_25,
  GENE_PANEL_50,
  GENE_PANEL_75,
  GENE_PANEL_113,
} from "@/utils/Constant";

interface GenePanelPopoverProps {
  selectedGenePanel: number;
  selectedGenes: string[];
  onGeneSelectionChange: (genes: string[]) => void;
}

const GenePanelPopover: React.FC<GenePanelPopoverProps> = ({
  selectedGenePanel,
  selectedGenes,
  onGeneSelectionChange,
}) => {
  // const [selectedGenes, setSelectedGenes] = useState<string[]>([]);

  // Get gene list
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
        return [];
    }
  };

  const geneList = getGeneList();

  useEffect(() => {
    onGeneSelectionChange(geneList); // select all by default
  }, [selectedGenePanel]);

  const handleToggle = (gene: string, checked: boolean) => {
    if (checked) {
      onGeneSelectionChange([...selectedGenes, gene]);
    } else {
      onGeneSelectionChange(selectedGenes.filter((g) => g !== gene));
    }
  };

  const handleSelectAll = () => {
    onGeneSelectionChange(geneList);
  };

  const handleClearAll = () => {
    onGeneSelectionChange([]);
  };

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

          <div className="flex justify-end gap-2">
            <Button size="sm" variant="outline" onClick={handleSelectAll}>
              Select All
            </Button>
            <Button size="sm" variant="ghost" onClick={handleClearAll}>
              Clear
            </Button>
          </div>

          <div className="grid grid-cols-5 gap-4 max-h-[400px] overflow-y-auto border p-4 rounded-lg">
            <TooltipProvider>
              {geneList.map((gene, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`gene-${index}`}
                        checked={selectedGenes.includes(gene)}
                        onCheckedChange={(checked) =>
                          handleToggle(gene, !!checked)
                        }
                      />
                      <label
                        htmlFor={`gene-${index}`}
                        className="text-sm cursor-pointer hover:text-blue-600"
                      >
                        {gene}
                      </label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-xs">
                      Info about <strong>{gene}</strong> — relevant for
                      variant-related conditions.
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GenePanelPopover;
