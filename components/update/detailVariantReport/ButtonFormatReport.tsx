"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/update/ui/according";
import {
  FileSpreadsheet,
  FileCode,
  FileText,
} from "lucide-react";
import Button from "@/components/update/button/Button";

interface FamilyProps {
  patient_id: string | null;
}
const ButtonFormatReport: React.FC<FamilyProps> = ({ patient_id }) => {
  return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Download Format</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-4">
                <Button
                  label="CSV"
                  variant="borderPrimary"
                  size="large"
                  icon={<FileSpreadsheet className="w-6 h-6" />}
                />
                <Button
                  label="XML"
                  variant="borderSecondary"
                  size="large"
                  icon={<FileCode className="w-6 h-6" />}
                />
                <Button
                  label="PDF"
                  variant="borderDanger"
                  size="large"
                  icon={<FileText className="w-6 h-6" />}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  );
};

export default ButtonFormatReport;
