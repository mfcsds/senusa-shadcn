"use component";
import { SelectedVariant } from "@/utils/object";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import Button from "@/components/update/button/Button";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import ButtonInviteUser from "@/components/update/button/ButtonInviteUser";
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
import VariantItem from "@/components/variant/VariantItem";
import ACMGLabel from "./ACMGLabel";
import ZygosityLabel from "./ZygosityLabel";
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
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import ACMGVariantInterpretation from "./ACMGVariantInterpretation";
import { generateClient } from "aws-amplify/api";
import { useToast } from "@/components/ui/use-toast";
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
} from "@/components/update/dialog/AlertDialog";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/update/dialog/Dialog";
import VariantInformationModal from "../selectVariant/VariantInformationModal";
import { getSelectedVariant, getUser } from "@/src/graphql/queries";
import { ButtonAdd } from "../../button/ButtonAdd";
import { getCurrentUser } from "aws-amplify/auth";
import { User } from "@/src/API";

interface VariantEditorProops {
  variantData?: SelectedVariant;
  onDeleteVariant: (id: string) => void;
}

const VariantEditor: React.FC<VariantEditorProops> = ({
  variantData,
  onDeleteVariant,
}) => {
  const client = generateClient();
  const [user, setUser] = useState<User>();
  const { toast } = useToast();
  const [contentText, setContentText] = useState<string>(
    variantData?.text_interpretation ?? "<p>Start editing here...</p>"
  );
  const [hasFetched, setHasFetched] = useState(false);
  const [acmg, setACMG] = useState<string>(variantData?.acmg ?? "");
  const [isEditableVariantEditor, setEditableVariantEditor] = useState(true);

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

  const fetchCurrentUser = async () => {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      const result = await client.graphql({
        query: getUser,
        variables: { id: userId },
      });
      setHasFetched(true);

      await setUser(result.data.getUser as User);
    } catch (error) {}
  };

  useEffect(() => {
    if (!hasFetched) {
      fetchCurrentUser();
    }
  });
  
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

  useEffect(() => {
    if (!editor) return;
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
          title: "Update Successfully",
          description: "Successfully updated variant interpretation.",
        });
        setEditableVariantEditor(true);
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
  return (
    <div className="flex flex-col w-full mb-10 shadow-md bg-foreground">
      <div className="border-2 border-border p-3 rounded">
        {/* Container Grid */}
        <div className="grid grid-cols-3 gap-6 p-4">
          {/* Card 1 */}
          <div className="col-span-1 flex flex-col border border-border p-6 bg-background rounded-lg shadow-lg">
            <div className="flex flex-row pr-5 py-2 mr-2">
              <VariantItem variantData={variantData}></VariantItem>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col px-3 py-2 gap-2">
                <p className="text-md font-bold text-text-secondary">ACMG</p>
                <div>
                  <ACMGLabel label={acmg ?? ""}></ACMGLabel>
                </div>
              </div>
              <div className="flex flex-col px-3 py-2 gap-2">
                <p className="text-md font-bold text-text-secondary">
                  Zygosity
                </p>
                <div>
                  <ZygosityLabel
                    label={variantData?.zygosity ?? "Unknown"}
                  ></ZygosityLabel>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-span-2 flex flex-col p-5 border gap-4 bg-background rounded-lg shadow-lg">
            <div className="p-4 flex items-center justify-between">
              <p className="text-text-secondary font-semibold">
                Add variant interpretation
              </p>
              <Dialog>
                <DialogTrigger>
                  <ButtonAdd
                    variant="outline"
                    className="rounded-lg font-semibold text-sm text-primary bg-background hover:bg-background hover:text-primary hover:underline"
                  >
                    Edit ACMG
                  </ButtonAdd>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[90%] max-h-[90%] overflow-y-auto bg-foreground">
                  <ACMGVariantInterpretation
                    selectedVariant={variantData}
                    onUpdateVariant={updateACMGClassSelectedVariant}
                    setACMGClass={setACMG}
                  ></ACMGVariantInterpretation>
                </DialogContent>
              </Dialog>
            </div>

            {/* Toolbar */}
            <div className="flex gap-2 border p-2 bg-foreground border-gray-500 rounded">
              <Button
                variant="iconSecondary"
                size="md"
                icon={<LucideBold className="w-4 h-4" />}
                onClick={() => handleFormatting("bold")}
              />
              <Button
                variant="iconSecondary"
                size="md"
                onClick={() => handleFormatting("italic")}
                icon={<LucideItalic className="w-4 h-4" />}
              />
              <Button
                variant="iconSecondary"
                size="md"
                icon={<LucideUnderline className="w-4 h-4" />}
                onClick={() => handleFormatting("underline")}
              />
              <Button
                variant="iconSecondary"
                size="md"
                label="H2"
                className="text-sm"
                onClick={() => handleFormatting("heading2")}
              />
              <Button
                variant="iconSecondary"
                size="md"
                label="Bullet List"
                className="text-sm"
                onClick={() => handleFormatting("bulletList")}
              />
              <Button
                variant="iconSecondary"
                size="md"
                label="Ordered List"
                className="text-sm"
                onClick={() => handleFormatting("orderedList")}
              />
              <Button
                variant="iconSecondary"
                size="md"
                label="Blockquote"
                className="text-sm"
                onClick={() => handleFormatting("blockquote")}
              />
              <div className="flex flex-row-reverse gap-5 justify-end">
                <div className="flex flex-row gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Dialog>
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                          </DialogHeader>
                          <DialogTrigger asChild>
                            <Button
                              variant="iconSecondary"
                              size="md"
                              icon={<ListCollapse className="w-4 h-4" />}
                            />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[95%] max-h-[95%] overflow-y-auto bg-background">
                            <VariantInformationModal
                              id_variant={`${variantData?.id}`}
                              hgvsNotation={`${variantData?.hgvs}`}
                            ></VariantInformationModal>
                            <DialogFooter></DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Detail Variant Information</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                      <ButtonInviteUser
                          user={user}
                          variant_data={variantData}
                        ></ButtonInviteUser>
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
                          variant="iconSecondary"
                          size="md"
                          onClick={() => handleSaveVariantAnalysis()}
                          icon={<Save className="w-4 h-4" />}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Save Current Analysis</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>  
                  {/* Activate Delete */}
                  <AlertDialog>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="iconDanger"
                              size="md"
                              icon={<Trash className="w-4 h-4" />}
                            />
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
                          This action cannot be undone. This will permanently
                          delete the variant and remove related data from the
                          database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteVariantAnalysis}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
            {/* Editor Content */}
            <EditorContent
              editor={editor}
              className="p-5 border mt-5 rounded bg-foreground text-text-primary border-gray-500"
            ></EditorContent>

            {/* Dialog */}
            <Dialog
              open={isOpenDetailVariantDialog}
              onOpenChange={() => setIsOpenDetailVariantDialog(false)}
            >
              <DialogContent className="max-w-7xl max-h-4xl">
                <DialogTitle>Variant Information</DialogTitle>
                <DialogDescription></DialogDescription>
                <VariantInformationModal
                  id_variant={variantData?.id!}
                  hgvsNotation={variantData?.hgvs!}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantEditor;
