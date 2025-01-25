"use component";
import { SelectedVariant } from "@/utils/object";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../ui/button";
import {
  Trash,
  UserPlus,
  Bold as LucideBold,
  Italic as LucideItalic,
  Underline as LucideUndeline,
  LucideUnderline,
  ListCollapse,
  Save,
  Edit,
} from "lucide-react";
import VariantItem from "../variant/VariantItem";
import ACMGLabel from "../variant/ACMGLabel";
import ZygosityLabel from "../variant/ZygosityLabel";
import { ZYGOSITY_HETEROZYGOUS, ZYGOSITY_HOMOZYGOUS } from "@/utils/Contanst";
import {
  deleteSelectedVariant,
  updateSelectedVariant,
} from "@/src/graphql/mutations";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";

import { generateClient } from "aws-amplify/api";
import { toast, useToast } from "../ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import VariantInformationModal from "../items/VariantInformationModal";
import { getSelectedVariant } from "@/src/graphql/queries";
import ACMGAnnotation from "../items/ACMGAnnotation";
import { DialogTrigger } from "@radix-ui/react-dialog";
import ACMGVariantInterpretation from "../items/variantquery/ACMGVariantInterpretation";

interface VariantEditorProops {
  variantData?: SelectedVariant;
  onDeleteVariant: (id: string) => void;
}

const VariantEditor: React.FC<VariantEditorProops> = ({
  variantData,
  onDeleteVariant,
}) => {
  const client = generateClient();

  const [contentText, setContentText] = useState<string>(
    variantData?.text_interpretation ?? "<p>Start editing here...</p>"
  );

  const [acmg, setACMG] = useState<string>(variantData?.acmg ?? "");

  const [isEditableVariantEditor, setEditableVariantEditor] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] }, // Configure heading levels if needed
      }),
      Underline,
    ],
    content: contentText,
    editable: isEditableVariantEditor,
  });

  const updateACMGClassSelectedVariant = async (
    new_acmg: string,
    selectedVariant: SelectedVariant
  ) => {
    selectedVariant.acmg = new_acmg;
    try {
      const result = client.graphql({
        query: updateSelectedVariant,
        variables: { input: { id: variantData?.id ?? "", acmg: new_acmg } },
      });

      toast({ title: "Sucessfully update ACMG" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed Update ACMG Class",
        description: `Failed update ${variantData?.acmg}`,
      });
    }
  };

  useEffect(() => {
    const fetchVariantData = async () => {
      try {
        if (variantData) {
          const result = client.graphql({
            query: getSelectedVariant,
            variables: { id: variantData?.id },
          });

          if ((await result).data) {
            const fecthInterpretation = (await result).data.getSelectedVariant
              ?.text_interpretation;
            editor?.commands.setContent(fecthInterpretation ?? "");
          }
        }
      } catch (error) {
        toast({ title: "Error fetching data" });
      }
    };
    fetchVariantData();
  }, [variantData]);

  // ➊ Gunakan useEffect untuk memonitor perubahan pada variantData?.text_interpretation
  useEffect(() => {
    if (!editor) return;

    // Jika text_interpretatio dari server berbeda dengan contentText saat ini
    // maka update contentText dan isi editor
    if (
      variantData?.text_interpretation &&
      variantData.text_interpretation !== contentText
    ) {
      setContentText(variantData.text_interpretation);
      editor.commands.setContent(variantData.text_interpretation);
    }
  }, [variantData?.text_interpretation, contentText, editor]);

  // ➋ Update 'editable' setiap kali isEditableVariantEditor berubah
  useEffect(() => {
    editor?.setEditable(isEditableVariantEditor);
  }, [isEditableVariantEditor, editor]);

  const handleDeleteVariantAnalysis = async () => {
    if (variantData?.id) {
      onDeleteVariant(variantData.id);
    }
  };
  const [isOpenDetailVariantDialog, setIsOpenDetailVariantDialog] =
    useState(false);

  const handleSaveVariantAnalysis = async () => {
    if (editor?.getText() && variantData?.id) {
      const editorContent = editor.getHTML();
      variantData.text_interpretation = editorContent;
      try {
        const result = await client.graphql({
          query: updateSelectedVariant,
          variables: {
            input: {
              id: variantData?.id,
              id_report: variantData?.id_report,
              id_patient: variantData?.id_patient,
              text_interpretation: editorContent, // Correct GraphQL field
            },
          },
        });
        toast({
          title: "Update Variant",
          description: "Successfully updated variant interpretation.",
        });
        setEditableVariantEditor(false);
        setContentText(editorContent);
      } catch (error) {
        console.error("GraphQL Error:", error); // Log error for debugging
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Failed to update variant interpretation.",
        });
      }
    }
  };

  // Toolbar Actions
  const handleFormatting = (action: string) => {
    if (!editor) return;

    switch (action) {
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "underline":
        editor.chain().focus().toggleUnderline().run();
        break;
      case "heading1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "heading2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "bulletList":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "orderedList":
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "blockquote":
        editor.chain().focus().toggleBlockquote().run();
        break;
      default:
        break;
    }
  };
  return (
    <div className="flex flex-col w-full mb-10 shadow-md">
      <div className="border p-3 rounded">
        <div className="flex flex-row p-3 items-center justify-between">
          <div className="flex flex-row ">
            <div className="flex flex-row pr-5 py-2 rounded border shadow-md mr-2">
              <VariantItem variantData={variantData}></VariantItem>
            </div>
            <div className="flex flex-col px-3 py-2 rounded shadow-sm gap-2">
              <p className="text-lg font-bold text-gray-400">ACMG</p>
              <div className="flex flex-row gap-2">
                <ACMGLabel label={acmg ?? ""}></ACMGLabel>
                <div className="flex flex-col items-center justify-center">
                  <Dialog>
                    <DialogTitle>{""}</DialogTitle>
                    <DialogTrigger>
                      <Button variant={"ghost"}>
                        <Edit className="w-5 h-5 text-gray-400"></Edit>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-screen-2xl">
                      <ACMGVariantInterpretation
                        selectedVariant={variantData}
                        onUpdateVariant={updateACMGClassSelectedVariant}
                        setACMGClass={setACMG}
                      ></ACMGVariantInterpretation>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            <div className="flex flex-col px-3 py-2 rounded shadow-sm gap-2">
              <p className="text-lg font-bold text-gray-400">Zygosity</p>
              <div>
                <ZygosityLabel
                  label={variantData?.zygosity ?? "Unknown"}
                ></ZygosityLabel>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row-reverse gap-5 border-gray-200 h-[40px]">
              <AlertDialog>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="border rounded bg-red-50 border-red-600"
                        >
                          <Trash className="w-4 h-5" />
                        </Button>
                      </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete this variant form analysis</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the variant and remove related data from the database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteVariantAnalysis}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Separator
                orientation="vertical"
                className="bg-black"
              ></Separator>
              <div className="flex flex-row gap-1">
                <Dialog>
                  <DialogTrigger>
                    <Button
                      variant={"outline"}
                      className="border rounded bg-green-50 border-green-600"
                    >
                      <ListCollapse className="w-4 h-5"></ListCollapse>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-screen-2xl">
                    <DialogTitle>Variant Information</DialogTitle>
                    <DialogDescription>
                      {`Here is the detailed information about the ${variantData?.hgvs}`}
                    </DialogDescription>
                    {/* Pass the hgvsNotation as a prop to the VariantInformationModal */}
                    <VariantInformationModal
                      id_variant={`${variantData?.id}`}
                      hgvsNotation={`${variantData?.hgvs}`}
                      // "BAHAYA"
                    />
                  </DialogContent>
                </Dialog>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild></TooltipTrigger>
                    <TooltipContent>
                      <p>Detail Variant Information</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="border rounded bg-green-50 border-green-600"
                      >
                        <UserPlus className="w-4 h-5"></UserPlus>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Invite other user to provide analysis</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {/* Save Variant Interpretation */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="border rounded bg-green-50 border-green-600"
                        onClick={() => handleSaveVariantAnalysis()}
                      >
                        <Save className="w-4 h-5"></Save>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save Current Analysis</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {/* Activate Edit */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="border rounded bg-green-50 border-green-600"
                        onClick={() => setEditableVariantEditor(true)}
                      >
                        <Edit className="w-4 h-5"></Edit>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Variant Interpretation</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-5 border gap-2">
        <p className="text-gray-500">Add variant interpretation</p>
        {/* Toolbar */}
        <div className="flex gap-2 border p-2 bg-gray-50 border-gray-300 rounded">
          <Button
            variant={"ghost"}
            className="border"
            onClick={() => handleFormatting("bold")}
          >
            <LucideBold className="w-4 h-4"></LucideBold>
          </Button>
          <Button
            variant={"ghost"}
            className="border"
            onClick={() => handleFormatting("italic")}
          >
            <LucideItalic className="w-4 h-4"></LucideItalic>
          </Button>

          <Button
            variant={"ghost"}
            className="border"
            onClick={() => handleFormatting("underline")}
          >
            <LucideUnderline className="w-4 h-4"></LucideUnderline>
          </Button>

          <button
            onClick={() => handleFormatting("heading2")}
            className="px-2 py-1 border rounded hover:bg-gray-200"
          >
            H2
          </button>
          <button
            onClick={() => handleFormatting("bulletList")}
            className="px-2 py-1 border rounded hover:bg-gray-200"
          >
            Bullet List
          </button>
          <button
            onClick={() => handleFormatting("orderedList")}
            className="px-2 py-1 border rounded hover:bg-gray-200"
          >
            Ordered List
          </button>
          <button
            onClick={() => handleFormatting("blockquote")}
            className="px-2 py-1 border rounded hover:bg-gray-200"
          >
            Blockquote
          </button>
        </div>

        <EditorContent
          editor={editor}
          className="p-5 border mt-5"
        ></EditorContent>

        <Dialog
          open={isOpenDetailVariantDialog}
          onOpenChange={() => setIsOpenDetailVariantDialog(true)}
        >
          <DialogTrigger></DialogTrigger>
          {/* <div className="fixed inset-0 bg-black bg-opacity-0 pointer-events-none"></div> */}
          <DialogContent className="max-w-7xl max-h-4xl "></DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default VariantEditor;
