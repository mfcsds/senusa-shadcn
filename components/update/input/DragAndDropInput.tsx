"use client";

import React, { useCallback, ReactNode } from "react";
import clsx from "clsx";

interface DragAndDropInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  className?: string;
  children?: ReactNode; // Tambahkan properti children untuk fleksibilitas konten
}

const DragAndDropInput: React.FC<DragAndDropInputProps> = ({
  onChange,
  accept = "",
  className = "",
  children, // Destructure children
}) => {
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const event = { target: { files } } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  }, [onChange]);

  return (
    <div
      className={clsx(
        "w-full h-28 border-2 border-dashed border-border rounded-lg p-4 bg-foreground cursor-pointer hover:border-primary flex items-center justify-center text-center",
        className
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="hidden"
        onChange={onChange}
        accept={accept}
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="block text-sm text-text-secondary cursor-pointer"
      >
        {children ? children : (
          <>
            <p>Drag n drop some files here, or click to select files</p>
            <p className="text-xs text-text-secondary">(Only *.vcf, *.tbi will be accepted)</p>
          </>
        )}
      </label>
    </div>
  );
};

export default DragAndDropInput;
