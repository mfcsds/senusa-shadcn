import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/update/dialog/Dialog";
import { ClipboardPlus, Save, X, Edit, LetterText } from "lucide-react";
import Button from "@/components/update/button/Button";
import { Textarea } from "@/components/update/input/textarea";
import { editVariantReport } from "@/hooks/useVariantReport";
import { useToast } from "@/components/ui/use-toast";


interface EditTestingDialogProps {
    reportId: string;
    testingDescription: string;
    onUpdateSuccess: (newDescription: string) => void;
  }

  const EditTestingDialog = ({ reportId, testingDescription, onUpdateSuccess }: EditTestingDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [testingDesc, setTestingDesc] = useState(testingDescription);
  const { toast } = useToast();

  const handleEditTestingDesc = async () => {
    try {
      await editVariantReport(reportId!, testingDesc);
      onUpdateSuccess(testingDesc)
      toast({
        title: "Update Successfully",
        description: "Testing Description has been update successfully.",
      });
      setOpenDialog(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed testing description",
        description: "Can not update Testing description.",
      });
    }
  };


  const handleCancelDialog = () => {
    setOpenDialog(false);
    setTestingDesc(testingDescription);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          label="Edit Description"
          variant="underlinePrimary"
          size="none"
          icon={<Edit className="w-4 h-4" />}
          onClick={() => setOpenDialog(true)}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[40%] max-h-[90%] overflow-y-auto bg-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ClipboardPlus className="w-8 h-8 text-primary" />
            <span className="text-text-primary">Edit Testing Description</span>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
          <div>
            <div className="flex items-center space-x-2">
              <LetterText className="w-6 h-6 text-blue-primary mb-1" />
              <label
                htmlFor="patienID"
                className="block text-sm font-medium text-text-primary"
              >
                Testing Description
              </label>
            </div>
            <p className="text-xs text-text-secondary mb-4">
              Edit testing description for variant report.
            </p>
            <Textarea
              id="testingDesc"
              value={testingDesc}
              onChange={(e) => setTestingDesc(e.target.value)}
              placeholder="Enter Test Description"
            />
          </div>
        </div>

        <DialogFooter className="mt-6 gap-4">
          <Button
            label="Cancel"
            variant="outlineDanger"
            size="large"
            icon={<X className="w-4 h-4" />}
            onClick={handleCancelDialog}
          />
          <Button
            label="Edit Description"
            variant="outlineSecondary"
            size="large"
            icon={<Save className="w-4 h-4" />}
            onClick={() => handleEditTestingDesc()}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTestingDialog;
