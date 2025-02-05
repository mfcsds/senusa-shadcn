"use client";

import React, { useCallback, useState, ReactNode } from "react";
import clsx from "clsx";

interface DragAndDropInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  className?: string;
  children?: ReactNode; 
}

const DragAndDropInput: React.FC<DragAndDropInputProps> = ({
  onChange,
  accept = "",
  className = "",
  children, 
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const event = { target: { files } } as unknown as React.ChangeEvent<HTMLInputElement>;
        setFileName(files[0].name); // Menyimpan nama file yang diunggah
        onChange(event);
      }
    },
    [onChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name); // Menyimpan nama file yang diunggah
      onChange(e);
    }
  };

  return (
    <div
      className={clsx(
        "w-full h-28 border-2 border-dashed border-border rounded-lg p-4 bg-background cursor-pointer hover:border-primary flex items-center justify-center text-center",
        className
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept={accept}
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="block text-sm text-text-secondary cursor-pointer"
      >
        {fileName ? ( 
          <p className="text-xs text-text-secondary">File uploaded: {fileName}</p>
        ) : (
          children ? children : (
            <>
              <p className="text-xs text-text-secondary">Drag n drop some files here, or click to select files</p>
              <p className="text-xs text-text-secondary">(Only *.vcf, *.tbi will be accepted)</p>
            </>
          )
        )}
      </label>
    </div>
  );
};

export default DragAndDropInput;
