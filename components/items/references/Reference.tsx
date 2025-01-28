"use client";
import { Skeleton } from "@/components/update/ui/Skeleton";
import { ReferenceVariant } from "@/utils/object";
import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ReferenceVariantProps {
  ref_code: number;
}

const Reference: React.FC<ReferenceVariantProps> = ({ ref_code }) => {
  const link = `https://pubmed.ncbi.nlm.nih.gov/${ref_code}/`;
  const [loading, setLoading] = useState(false);
  const [refData, setRefData] = useState<ReferenceVariant | null>(null);

  const fetchReference = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://f4c5tulqb7.execute-api.us-east-1.amazonaws.com/dev_ref/variantref",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: link }),
        }
      );

      const data = await response.json();

      if (data.statusCode === 200) {
        // Parse the body since it's a JSON string
        const bodyData = JSON.parse(data.body);
        setRefData({
          title: bodyData.title,
          date: bodyData.date,
          abstract: bodyData.abstract,
          author: bodyData.authors,
        });
      } else {
        console.error("Error fetching data:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchReference when the component mounts or ref_code changes
  useEffect(() => {
    fetchReference();
  }, [ref_code]); // Dependency ensures it runs whenever ref_code changes

  return (
    <div className="flex flex-row w-full bg-foreground border-2 rounded-lg p-5 shadow-xl">
      {loading ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-start justify-between">
            <img
              src="/variant-image.png"
              alt="References Image"
              className="w-full rounded-md mb-4"
            />
            <p className="text-md font-semibold text-blue-500 hover:underline">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {refData?.title || "No title available"}
              </a>
            </p>
            <p className="text-xs mt-4 p-2 rounded-md text-text-secondary border-2 border-secondary bg-accent font-semibold">
              {refData?.date}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="text-sm italic text-text-secondary mb-2 mt-4">
              {refData?.author || "No authors available"}
            </p>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-text-primary">
                  See Full Abstract
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-justify font-sans text-md text-text-primary italic text-balance">
                    {refData?.abstract || "No abstract available"}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reference;
