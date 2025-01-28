"use client";
import { Star } from "lucide-react";
import React, { useState, useEffect } from "react";

type VariantSynonynProops = {
  synonym: string;
};

type ReviewVariant = {
  variant_title: string;
  germline_classification: string;
  last_review: string;
  status: string;
};
const VariantSynonym: React.FC<VariantSynonynProops> = ({ synonym }) => {
  const link = `https://www.ncbi.nlm.nih.gov/clinvar/${synonym}`;

  const [reviewvariant, setReviewVariant] = useState<ReviewVariant>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://06yw0m9zjl.execute-api.us-east-1.amazonaws.com/prod/parse",
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

          setReviewVariant({
            variant_title: bodyData.variant_title,
            germline_classification: bodyData.germline_classification,
            last_review: bodyData.last_evaluated_date,
            status: bodyData.review_status,
          });
        } else {
          console.error("Error fetching data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [link]);

  return (
    <div className="flex flex-col mb-5 border-2 shadow-xl p-5 rounded-lg w-full">
      <div className="flex flex-col mb-2 gap-3">
        <p className="font-semibold text-sm p-2 pl-5 border-2 rounded-lg border-primary bg-accent">
          Reference Clinvar Variants{" "}
        </p>
        <div className="flex flex-col ml-5">
          <div className="flex flex-row gap-3 items-center">
            <p className="font-semibold text-sm">Variant Title : </p>
            <p className="font-semibold text-blue-500 py-1 px-2 rounded-lg">
              <a href={`https://www.ncbi.nlm.nih.gov/clinvar/${synonym}`} className="text-sm hover:underline">
                {reviewvariant?.variant_title}
              </a>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row">
              <p className="font-semibold text-sm">Germline Classification : </p>
              <p className="text-sm">{reviewvariant?.germline_classification}</p>
            </div>
            <div className="flex flex-row">
              <p className="font-semibold text-sm">Last Review : </p>
              <p className="text-sm">{reviewvariant?.last_review}</p>
            </div>
            <div className="flex flex-row">
              <p className="font-semibold text-sm">Status : </p>
              {/* Render stars based on the status value */}
              {reviewvariant && (
                <div className="flex flex-row items-center">
                  {Array.from({ length: Number(reviewvariant.status) }).map(
                    (_, index) => (
                      <Star
                        fill={"yellow"}
                        key={index}
                        className="h-4 w-4 align-baseline font-extrabold"
                      />
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantSynonym;
