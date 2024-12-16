import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";

interface DownloadReportProops {
  hgvs: string;
}

const DownloadVariant: React.FC<DownloadReportProops> = ({ hgvs }) => {
  return (
    <div className="flex p-5 flex-row items-center justify-between border border-1 shadow-sm rounded-sm">
      <div className="border-l-2 border-l-red-500  bg-gray-50 pr-10 rounded-r-md shadow-sm">
        <p className="text-lg p-3 rounded-sm">{hgvs}</p>
      </div>

      <div className="flex flex-row mr-10 ">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Download Format</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-row gap-2">
                <div className="flex flex-row gap-1">
                  <Button variant={"outline"}>PDF</Button>
                  <Button variant={"outline"}>CSV</Button>
                  <Button variant={"outline"}>XML</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default DownloadVariant;
