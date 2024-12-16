import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center w-full">
      <div className="max-w-8xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Senusa Software Version 1.00
        </h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          Senusa Software Version 1.00 is an innovative and robust application
          designed specifically for the analysis of germline genomic variants.
          The software provides a streamlined and accurate approach to variant
          classification, leveraging insights from multiple publicly available
          variant databases while adhering strictly to the guidelines set by the
          American College of Medical Genetics and Genomics (ACMG).
        </p>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Key Features
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li>
            <strong>Database Integration:</strong> Aggregates variant
            information from numerous curated and reliable databases, ensuring
            comprehensive data coverage.
          </li>
          <li>
            <strong>ACMG-Compliant Classification:</strong> Applies ACMG
            guidelines to classify variants with high-confidence
            interpretations.
          </li>
          <li>
            <strong>User-Friendly Interface:</strong> Input VCF files and access
            detailed, well-structured reports effortlessly.
          </li>
          <li>
            <strong>Customization Options:</strong> Add annotations,
            interpretations, and recommendations tailored to your context.
          </li>
          <li>
            <strong>Trial Subscription Model:</strong> Offers a one-month trial
            period to explore features.
          </li>
          <li>
            <strong>Secure Data Handling:</strong> Ensures compliance with
            global standards for sensitive genomic data.
          </li>
          <li>
            <strong>Feature-Rich Variant Reports:</strong> Provides a summary of
            classifications, supporting evidence, and actionable insights.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Advancements in Version 1.00
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Version 1.00 marks the launch of Senusa, focusing on providing stable,
          foundational features for germline variant analysis. A feedback
          integration mechanism allows users to report issues and suggest
          improvements, contributing to the refinement of future versions.
        </p>
        <p className="text-gray-600 leading-relaxed">
          For more information or to join the alpha-testing program, please
          contact the Senusa development team.
        </p>
      </div>
    </div>
  );
};

export default page;
