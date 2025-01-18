import { FileText, FilePen, FileCheck2, Save } from "lucide-react";
import Dropdown from "@/components/update/input/Dropdown";
import Button from "@/components/update/button/Button";
import ButtonFormatReport from "@/components/update/detailVariantReport/ButtonFormatReport"
import React, { useState, useEffect } from "react";

const InformationApprovalReport: React.FC = ({}) => {
  const [levelAccount, setLevelAccount] = useState("");
  const userLevel = [
    { label: "Level 1", value: "Level 1" },
    { label: "Level 2", value: "Level 2" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div className="bg-foreground p-6 rounded-lg shadow-lg text-text-primary">
        <div className="flex items-center gap-4 mb-8">
          <FileText className="text-blue-primary w-10 h-10" />
          <h3 className="font-semibold text-xl">Testing Detail</h3>
        </div>
        <p className="mb-8">
          <span className="font-medium">Testing Method Sequencing:</span> Next
          Generation
        </p>
        <p className="mb-8">
          <span className="font-medium">Gene Panel Cardiomyopathy Panel:</span>{" "}
          Comprehensive
        </p>
        <p className="font-medium mb-4">Testing Description:</p>
        <p className="text-text-secondary">
          The genetic analysis was performed using high-throughput Next
          Generation Sequencing (NGS) on a blood sample. DNA was extracted using
          the QIAamp DNA Blood Mini Kit. Sequencing was carried out on an
          Illumina HiSeq 4000 platform, covering all coding regions and
          intron-exon boundaries of the genes listed.
        </p>
      </div>

      <div className="bg-foreground p-10 rounded-lg shadow-lg">
        <div className="flex flex-col gap-4 justify-start w-full sm:w-auto">
          <div className="flex justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-text-primary">
              <FilePen className="text-blue-primary w-8 h-8" />
              <h3 className="font-semibold text-md">Update Report Status</h3>
            </div>
            <Button
              label="Priview Report"
              variant="underlinePrimary"
              size="large"
            />
          </div>
          <div className="flex justify-between items-center gap-6">
            <Dropdown
              options={userLevel}
              selectedValue={levelAccount}
              onChange={setLevelAccount}
              placeholder="Select Report Status"
              variant="default"
            />
            <Button
              variant="borderSecondary"
              size="md"
              icon={<Save className="w-5 h-5" />}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-start w-full sm:w-auto mt-10">
          <div className="flex items-center gap-2 text-text-primary">
            <FileCheck2 className="text-blue-primary w-8 h-8" />
            <h3 className="font-semibold text-md">
              Approved By: <span>Example Name</span>
            </h3>
          </div>
        </div>

        <div className="mt-6">
          <ButtonFormatReport patient_id={"P-MLSACTYXJ4HI"} />
        </div>
      </div>
    </div>
  );
};

export default InformationApprovalReport;
