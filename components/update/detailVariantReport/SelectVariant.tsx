import React, { useState, useEffect } from "react";
import Input from "@/components/update/input/Input";
import { Label } from "../../ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { ButtonAdd } from "@/components/update/button/ButtonAdd";

const SelectVariant: React.FC = () => {
  const [gene_id, setGeneID] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [zygosityFilter, setZygosityFilter] = useState<string | null>(null);

  const [acmgFilter, setACMGFilter] = useState<string | null>(null);

  const [fiVis, setFiVis] = useState(false);

  const [activeDownloadCSV, setActiveDownloadCSV] = useState(false);
  const [activeDownloadJSON, setActiveDownloadJSON] = useState(false);

  return (
    <div className="mt-4 bg-background ">
      {/* Grid untuk membagi form dan tabel */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
        {/* Bagian Form */}
        <div className="md:col-span-3 bg-foreground p-6 rounded-lg shadow-lg">
          <div className="space-y-4 text-text-primary">
            {/* Dropdown Gene Panel */}
            <div className="space-y-2">
              <Label className="text-md">Gene Panel</Label>
              <Input
                type="text"
                id="geneID"
                value={gene_id}
                className="max-w-sm"
                placeholder="Gene ID"
                onChange={(event) => {
                  const value = event.target.value;
                  setGeneID(value);
                }}
              />
            </div>

            {/* Input Gene ID */}
            <div className="space-y-2">
              <Label className="text-md">Gene ID</Label>
              <Input
                type="text"
                id="geneID"
                value={gene_id}
                className="max-w-sm"
                placeholder="Gene ID"
                onChange={(event) => {
                  const value = event.target.value;
                  setGeneID(value);
                }}
              />
            </div>

            {/* Input Gene Symbol */}
            <div className="space-y-2">
              <Label className="text-md">Gene Sysmbol</Label>
              <Input
                type="text"
                id="geneID"
                value={gene_id}
                className="max-w-sm"
                placeholder="Gene Sysmbol"
                onChange={(event) => {
                  const value = event.target.value;
                  setGeneID(value);
                }}
              />
            </div>

            {/* Input Clinical Significance */}
            <div className="space-y-2">
              <Label className="text-md">Clinical Significance</Label>
              <Input
                type="text"
                id="geneID"
                value={gene_id}
                className="max-w-sm"
                placeholder="Clinical Significance"
                onChange={(event) => {
                  const value = event.target.value;
                  setGeneID(value);
                }}
              />
            </div>

            {/* Input Clinical Significance */}
            <div className="space-y-2">
              <Label className="text-md">Clinical Significance</Label>
              <Input
                type="text"
                id="geneID"
                value={gene_id}
                className="max-w-sm"
                placeholder="Clinical Significance"
                onChange={(event) => {
                  const value = event.target.value;
                  setGeneID(value);
                }}
              />
            </div>

            {/* Dropdown Zygosity */}
            <div className="space-y-2">
              <Label className="text-md">Clinical Significance</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ButtonAdd
                    variant="outline"
                    className="w-full text-left bg-foreground border-2 border-primary hover:border-secondary rounded hover:bg-secondary text-primary hover:text-text-action"
                  >
                    Select Zygosity
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </ButtonAdd>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={(isChecked) => {
                      const value = isChecked ? "Homozygous" : null;
                      setZygosityFilter(value);
                    }}
                    checked={zygosityFilter === "Homozygous"}
                  >
                    Homozygous
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={(isChecked) => {
                      const value = isChecked ? "Heterozygous" : null;
                      setZygosityFilter(value);
                    }}
                    checked={zygosityFilter === "Heterozygous"}
                  >
                    Heterozygous
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={(isChecked) => {
                      const value = isChecked ? "Reference" : null;
                      setZygosityFilter(value);
                    }}
                    checked={zygosityFilter === "Reference"}
                  >
                    Reference / Unknown
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2">
              <Label className="text-md">ACMG</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ButtonAdd
                    variant="outline"
                    className="w-full text-left bg-foreground border-2 border-primary hover:border-secondary rounded hover:bg-secondary text-primary hover:text-text-action"
                  >
                    ACMG Classification
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </ButtonAdd>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={(isChecked) => {
                      const value = isChecked ? "Pathogenic" : null;
                      setACMGFilter(value);
                    }}
                    checked={acmgFilter === "Pathogenic"}
                  >
                    <div className="border-2 border-red-600 w-full p-2 rounded-sm bg-red-400">
                      <p className="text-black font-semibold">Pathogenic</p>
                    </div>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={(isChecked) => {
                      const value = isChecked ? "Likely Pathogenic" : null;
                      setACMGFilter(value);
                    }}
                    checked={acmgFilter === "Likely Pathogenic"}
                  >
                    <div className="border-2 border-red-600 w-full p-2 rounded-sm bg-red-300">
                      <p className="text-black font-semibold">
                        Likely Pathogenic
                      </p>
                    </div>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={(isChecked) => {
                      const value = isChecked ? "VUS" : null;
                      setACMGFilter(value);
                    }}
                    checked={acmgFilter === "VUS"}
                  >
                    <div className="border-2 border-yellow-600 w-full p-2 rounded-sm bg-yellow-300">
                      <p className="text-black font-semibold">VUS</p>
                    </div>
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuCheckboxItem
                    onCheckedChange={(isChecked) => {
                      const value = isChecked ? "Likely Benign" : null;
                      setACMGFilter(value);
                    }}
                    checked={acmgFilter === "Likely Benign"}
                  >
                    <div className="border-2 border-green-600 w-full p-2 rounded-sm bg-green-200">
                      <p className="text-black font-semibold">Likely Benign</p>
                    </div>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={(isChecked) => {
                      const value = isChecked ? "Benign" : null;
                      setACMGFilter(value);
                    }}
                    checked={acmgFilter === "Benign"}
                  >
                    <div className="border-2 border-green-600 w-full p-2 rounded-sm bg-green-300">
                      <p className="text-black font-semibold">Benign</p>
                    </div>
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2">
            <Label className="text-lg">Select Column</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <ButtonAdd
                    variant="outline"
                    className="w-full text-left bg-foreground border-2 border-primary hover:border-secondary rounded hover:bg-secondary text-primary hover:text-text-action"
                  >
                    Select Column to Show
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </ButtonAdd>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Bagian Tabel */}
        <div className="md:col-span-7 bg-foreground p-6 rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-teal-500 text-white">
                  <th className="px-4 py-2">Variant Detail</th>
                  <th className="px-4 py-2">AC</th>
                  <th className="px-4 py-2">AF</th>
                  <th className="px-4 py-2">ACMG</th>
                  <th className="px-4 py-2">Clinical Sign</th>
                  <th className="px-4 py-2">Phenotypes</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Lorem Ipsum</td>
                  <td className="border px-4 py-2">Lor</td>
                  <td className="border px-4 py-2">Lor</td>
                  <td className="border px-4 py-2">Lorem Ipsum</td>
                  <td className="border px-4 py-2">Lorem Ipsum</td>
                  <td className="border px-4 py-2">Lorem Ipsum</td>
                  <td className="border px-4 py-2 text-center">
                    <button className="text-red-500 hover:underline">🗑️</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <span>Rows per page:</span>
            <select className="border border-gray-300 rounded-lg p-1">
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
            <span>Page 1 of 0</span>
            <div>
              <button className="px-2 py-1 border rounded-lg mr-2">&lt;</button>
              <button className="px-2 py-1 border rounded-lg">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectVariant;
