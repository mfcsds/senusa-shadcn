"use client";
import React, { useEffect, useState } from "react";

import {
  ColumnDef,
  Row,
  flexRender,
  ColumnFiltersState,
  VisibilityState,
  SortingState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/update/ui/table";
import { ButtonAdd } from "@/components/update/button/ButtonAdd";

import {
  ChevronDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileCode,
  FileJson,
  FileSpreadsheet,
} from "lucide-react";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import Input from "@/components/update/input/Input";
import { Label } from "../../../ui/label";

import GenePanelPopover from "./GenePanelPopover";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/update/ui/according";
import {
  GENE_PANEL_25,
  GENE_PANEL_50,
  GENE_PANEL_75,
  GENE_PANEL_113,
} from "@/utils/Contanst";

interface TableVariantsProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TableVariants<TData, TValue>({
  columns,
  data,
}: TableVariantsProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  // Colum yang akan dimunculkan
  const visibleColumns = [
    "gene_id",
    "AC",
    "AF",
    "fraction",
    "acmg",
    "clinicalSign",
    "phenotypes",
    "action",
  ]; // List of columns to be visible initially

  const initialColumnVisibility = columns.reduce((acc, column) => {
    const columnId = column.id || (column as any).accessorKey; // Fallback to accessorKey if id is not defined
    if (columnId) {
      acc[columnId] = visibleColumns.includes(columnId); // Set true for visible columns, false otherwise
    }
    return acc;
  }, {} as VisibilityState);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility
  );
  const [isOpenDetailVariantDialog, setIsOpenDetailVariantDialog] =
    useState(false);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "acmg", value: "Pathogenic" },
  ]);

  const [selectedGenePanel, setSelectedGenePanel] = useState<number>(25);

  const containsAnyFilterFn = (
    row: Row<any>,
    columnId: string,
    filterValues: string[]
  ) => {
    const cellValue = row.getValue<string>(columnId);
    return filterValues.some((filterValue) =>
      cellValue?.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  // Dynamically get the gene panel list based on the selected panel
  const getGenePanel = (panelNumber: number) => {
    switch (panelNumber) {
      case 25:
        return GENE_PANEL_25;
      case 50:
        return GENE_PANEL_50;
      case 75:
        return GENE_PANEL_75;
      case 113:
        return GENE_PANEL_113;
      default:
        return [];
    }
  };

  const [selectedVariant, setSelectedVariant] = useState<TData | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [zygosityFilter, setZygosityFilter] = useState<string | null>(null);

  const [acmgFilter, setACMGFilter] = useState<string | null>(null);

  const [fiVis, setFiVis] = useState(false);

  const [activeDownloadCSV, setActiveDownloadCSV] = useState(false);
  const [activeDownloadJSON, setActiveDownloadJSON] = useState(false);
  const [activeDownloadXML, setActiveDownloadXML] = useState(false);

  const handleZygosityChange = (value: string) => {
    setZygosityFilter(value);
    setColumnFilters((prev) => [
      ...prev.filter((filter) => filter.id !== "zygosity"), // Remove any existing zygosity filter
      { id: "zygosity", value }, // Add the new zygosity filter
    ]);
  };

  const handleACMGChange = (value: string) => {
    setACMGFilter(value);
    setColumnFilters((prev) => [
      ...prev.filter((filter) => filter.id !== "acmg"), // Remove any existing zygosity filter
      { id: "acmg", value }, // Add the new zygosity filter
    ]);
  };

  const containsFilterFn = (
    row: Row<any>,
    columnId: string,
    filterValue: string
  ): boolean => {
    const cellValue = row.getValue<string>(columnId);
    return cellValue
      ? cellValue.toLowerCase().includes(filterValue.toLowerCase())
      : false;
  };

  const table = useReactTable({
    data,
    columns: columns.map((column) => {
      if (column.id === "clinicalSign") {
        return {
          ...column,
          filterFn: containsFilterFn, // Assign the custom filter function
        };
      }
      return column;
    }),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const generateXML = (id_report: string, id_patient: string) => {
    setActiveDownloadXML(true);
    // XML Header
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const rootStart = `<VariantReport reportId="${id_report}" patientId="${id_patient}">`;
    const rootEnd = "</VariantReport>";

    // Access all rows from the filtered row model
    const rows = table.getFilteredRowModel().rows;

    // Generate XML for each row
    const variantsXML = rows
      .map((row) => {
        const cells = row.getAllCells();
        const variantData = cells
          .map((cell) => {
            const columnName = cell.column.id; // Column name from the table
            const value = cell.getValue(); // Cell value
            return `  <${columnName}>${value ?? "N/A"}</${columnName}>`; // Handle null/undefined values
          })
          .join("\n");

        return `<Variant>\n${variantData}\n</Variant>`;
      })
      .join("\n");

    // Combine XML parts
    const xmlContent = `${xmlHeader}\n${rootStart}\n${variantsXML}\n${rootEnd}`;

    // Create a Blob and trigger download
    const blob = new Blob([xmlContent], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `sample.xml`; // Dynamic file name
    link.click();

    // Clean up
    URL.revokeObjectURL(url);

    setActiveDownloadXML(false);
  };
  const fetchAPIData = async (hgvs: string) => {
    const requestBody = {
      body: JSON.stringify({ variants: [hgvs] }),
    };

    const response = await fetch(
      "https://iti7fmrlmj.execute-api.us-east-1.amazonaws.com/Dev/variant_extract",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    const result = await response.json();
    const apiData = JSON.parse(result.body);
    return apiData[0]; // Ambil hanya data pertama
  };

  const mergeDataWithAPI = async () => {
    // Pastikan data tersedia
    if (!data || data.length === 0) {
      console.error("Data kosong atau tidak ditemukan.");
      return;
    }

    const updatedData = await Promise.all(
      data.map(async (item: any) => {
        const apiInfo = await fetchAPIData(item.hgvs || "N/A");

        return {
          ...item,
          api_clin_sig: apiInfo?.colocated_variants[0]?.clin_sig || [],
          api_frequencies: apiInfo?.colocated_variants[0]?.frequencies || {},
          api_variant_class: apiInfo?.variant_class || "N/A",
          api_consequence: apiInfo?.most_severe_consequence || "N/A",
          api_gene_symbol:
            apiInfo?.transcript_consequences?.[0]?.gene_symbol || "N/A",
          api_gene_id: apiInfo?.transcript_consequences?.[0]?.gene_id || "N/A",
          api_impact: apiInfo?.transcript_consequences?.[0]?.impact || "N/A",
          api_protein_id:
            apiInfo?.transcript_consequences?.[0]?.protein_id || "N/A",
          api_hgvsc: apiInfo?.transcript_consequences?.[0]?.hgvsc || "N/A",
          api_hgvsp: apiInfo?.transcript_consequences?.[0]?.hgvsp || "N/A",
        };
      })
    );

    return updatedData;
  };

  const generateCSV = async () => {
    setActiveDownloadCSV(true);
    try {
      const updatedData = await mergeDataWithAPI();

      // Header kolom CSV
      const headers = [
        "id",
        "id_patient",
        "id_report",
        "chrom",
        "pos",
        "ref",
        "alt",
        "hgvs",
        "api_clin_sig",
        "api_frequencies",
        "api_variant_class",
        "api_consequence",
        "api_gene_symbol",
        "api_gene_id",
        "api_impact",
        "api_protein_id",
        "api_hgvsc",
        "api_hgvsp",
      ];

      if (!updatedData || !Array.isArray(updatedData)) {
        console.error("Data tidak valid atau kosong.");
        return;
      }

      // Format ulang data menjadi array untuk CSV
      const csvRows: string[] = updatedData.map((item: any) => {
        return [
          item.id || "N/A",
          item.id_patient || "N/A",
          item.id_report || "N/A",
          item.chrom || "N/A",
          item.pos || "N/A",
          item.ref || "N/A",
          item.alt || "N/A",
          item.hgvs || "N/A",
          (item.api_clin_sig || []).join("; "), // Gabungkan array menjadi string
          JSON.stringify(item.api_frequencies) || "N/A",
          item.api_variant_class || "N/A",
          item.api_consequence || "N/A",
          item.api_gene_symbol || "N/A",
          item.api_gene_id || "N/A",
          item.api_impact || "N/A",
          item.api_protein_id || "N/A",
          item.api_hgvsc || "N/A",
          item.api_hgvsp || "N/A",
        ].join(",");
      });

      // Gabungkan header dan data
      const csvContent = [headers.join(","), ...csvRows].join("\n");

      // Membuat file CSV
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      // Membuat link untuk unduhan
      const link = document.createElement("a");
      link.href = url;
      link.download = "variant-data.csv"; // Nama file unduhan
      link.click();

      // Bersihkan URL blob setelah digunakan
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Cannot generate CSV");
    } finally {
      setActiveDownloadCSV(false);
    }
  };

  const generateJSON = async () => {
    setActiveDownloadJSON(true);
    try {
      const updatedData = await mergeDataWithAPI();

      // Membuat file JSON
      const blob = new Blob([JSON.stringify(updatedData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      // Membuat link untuk unduhan
      const link = document.createElement("a");
      link.href = url;
      link.download = "variant-data.json"; // Nama file unduhan
      link.click();

      // Bersihkan URL blob setelah digunakan
      URL.revokeObjectURL(url);
    } catch (error) {
    } finally {
      setActiveDownloadJSON(false);
    }
  };

  const [gene_id, setGeneID] = useState("");
  const [gene_symbol, setGeneSymbol] = useState("");

  // Define states for the min and max values for the Gnomadg filter
  const [gnomadgMin, setGnomadgMin] = useState<number | "">("");
  const [gnomadgMax, setGnomadgMax] = useState<number | "">("");

  // Define a custom filter function for a number range
  const numberRangeFilterFn = (
    row: Row<any>,
    columnId: string,
    filterValue: [number | "", number | ""]
  ) => {
    const value = row.getValue<number>(columnId);
    const [min, max] = filterValue;

    if (min !== "" && value < min) return false;
    if (max !== "" && value > max) return false;
    return true;
  };

  return (
    <div className="mt-4 bg-background ">
      {/* Grid untuk membagi form dan tabel */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
        {/* Bagian Form */}
        <div className="md:col-span-3 bg-foreground p-6 rounded-lg shadow-lg">
          <div className="space-y-6 text-text-primary">
            {/* Dropdown Gene Panel */}
            <div className="space-y-2">
              <Label className="text-md">Gene Panel</Label>
              <div className="flex flex-row">
                <Select
                  onValueChange={(value) => {
                    const selectedValue = parseInt(value);
                    let genePanel: string[] = [];
                    switch (selectedValue) {
                      case 25:
                        genePanel = GENE_PANEL_25;
                        break;
                      case 50:
                        genePanel = GENE_PANEL_50;
                        break;
                      case 75:
                        genePanel = GENE_PANEL_75;
                        break;
                      case 113:
                        genePanel = GENE_PANEL_113;
                        break;
                    }
                    setSelectedGenePanel(selectedValue);
                    table.getColumn("gene_symbol")?.setFilterValue(genePanel);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={"Select Gene Panel"}
                    ></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="text-text-primary">
                      <SelectItem value="25">Gene Panel 25</SelectItem>
                      <SelectItem value="50">Gene Panel 50</SelectItem>
                      <SelectItem value="75">Gene Panel 75</SelectItem>
                      <SelectItem value="113">Gene Panel 113</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <GenePanelPopover
                  selectedGenePanel={selectedGenePanel}
                ></GenePanelPopover>
              </div>
            </div>

            {/* Input Gene ID */}
            <div className="space-y-2">
              <Label className="text-md">Gene ID</Label>
              <Input
                id="ganeId"
                className="max-w-sm"
                placeholder="Gene ID"
                value={gene_id}
                onChange={(event) => {
                  const value = event.target.value;
                  setGeneID(value); // Update local state
                  table.getColumn("gene_id")?.setFilterValue(value); // Set filter in table
                }}
              ></Input>
            </div>

            {/* Input Gene Symbol */}
            <div className="space-y-2">
              <Label className="text-md">Gene Sysmbol</Label>
              <Input
                id="goneSysmbol"
                className="max-w-sm"
                placeholder="Gene Symbol"
                value={gene_symbol}
                onChange={(event) => {
                  const value = event.target.value;
                  setGeneSymbol(value);
                  table.getColumn("gene_symbol")?.setFilterValue(value);
                }}
              ></Input>
            </div>

            {/* Input Clinical Significance */}
            <div className="space-y-2">
              <Label className="text-md">Clinical Significance</Label>
              <Input
                type="clinicialSignificance"
                id="geneID"
                className="max-w-sm"
                placeholder="Clinical Significance"
                value={
                  (table
                    .getColumn("clinicalSign")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("clinicalSign")
                    ?.setFilterValue(event.target.value)
                }
              />
            </div>

            {/* Dropdown Zygosity */}
            <div className="space-y-2">
              <Label className="text-md">Zygosity</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ButtonAdd
                    variant="outline"
                    className="w-full text-left bg-foreground border-2 border-primary hover:border-secondary rounded-lg hover:bg-secondary text-primary hover:text-text-action"
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
                      table.getColumn("zygosity")?.setFilterValue(value);
                    }}
                    checked={zygosityFilter === "Homozygous"}
                  >
                    Homozygous
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={(isChecked) => {
                      const value = isChecked ? "Heterozygous" : null;
                      setZygosityFilter(value);
                      table.getColumn("zygosity")?.setFilterValue(value);
                    }}
                    checked={zygosityFilter === "Heterozygous"}
                  >
                    Heterozygous
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={(isChecked) => {
                      const value = isChecked ? "Reference / Unknown" : null;
                      setZygosityFilter(value);
                      table.getColumn("zygosity")?.setFilterValue(value);
                    }}
                    checked={zygosityFilter === "Reference /Unknown"}
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
                    className="w-full text-left bg-foreground border-2 border-primary hover:border-secondary rounded-lg hover:bg-secondary text-primary hover:text-text-action"
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
                      table.getColumn("acmg")?.setFilterValue(value);
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
                      table.getColumn("acmg")?.setFilterValue(value);
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
                      table.getColumn("acmg")?.setFilterValue(value);
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
                      table.getColumn("acmg")?.setFilterValue(value);
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
                    className="w-full text-left bg-foreground border-2 border-primary hover:border-secondary rounded-lg hover:bg-secondary text-primary hover:text-text-action"
                  >
                    Select Column to Show
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </ButtonAdd>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => {
                            column.toggleVisibility(!!value);
                            if (column.id === "functional_impact") {
                              setFiVis(!!value);
                            }
                          }}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Bagian Tabel */}
        <div className="md:col-span-7 bg-foreground p-6 rounded-lg shadow-lg">
          <div className="overflow-x-auto max-h-[500px]">
            <Table className="m-4 rounded-md min-w-full overflow-y-auto">
              <TableHeader className="h-[50px] sticky top-0 bg-background">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-accent bg-accent border-y-2 border-border rounded-md"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-gray-90 px-2 md:px-4 h-[70px] text-sm"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="h-8 text-xs px-2 md:px-4 text-md"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-10 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-2 mt-4">
            <div className="flex-1 text-sm  text-text-secondary">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8 p-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-text-secondary">
                  Rows per page
                </p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium text-text-secondary">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="flex items-center space-x-2">
                <ButtonAdd
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex text-text-secondary hover:text-text-primary"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <DoubleArrowLeftIcon className="h-4 w-4" />
                </ButtonAdd>
                <ButtonAdd
                  variant="outline"
                  className="h-8 w-8 p-0 text-text-secondary hover:text-text-primary"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon className="h-4 w-4" />
                </ButtonAdd>
                <ButtonAdd
                  variant="outline"
                  className="h-8 w-8 p-0 text-text-secondary hover:text-text-primary"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </ButtonAdd>
                <ButtonAdd
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex text-text-secondary hover:text-text-primary"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <DoubleArrowRightIcon className="h-4 w-4" />
                </ButtonAdd>
              </div>
            </div>
          </div>
          <div className="flex justify-start w-full">
            <Accordion type="single" collapsible className="w-[400px]">
              <AccordionItem value="item-1">
                <AccordionTrigger>Download Format</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-row gap-4">
                      <ButtonAdd
                        className={
                          activeDownloadCSV
                            ? "rounded-lg bg-foreground border-2 border-primary hover:border-secondary hover:bg-secondary text-primary hover:text-text-action cursor-not-allowed"
                            : "rounded-lg bg-foreground border-2 border-primary hover:border-secondary hover:bg-secondary text-primary hover:text-text-action"
                        }
                        variant={"outline"}
                        onClick={(e) => generateCSV()}
                        disabled={activeDownloadCSV}
                      >
                        <FileSpreadsheet> </FileSpreadsheet>
                        {activeDownloadCSV ? "Processing" : "CSV"}
                      </ButtonAdd>
                      <ButtonAdd
                        className={
                          activeDownloadJSON
                            ? "rounded-lg bg-foreground border-2 border-blue-primary hover:border-blue-secondary hover:bg-blue-secondary text-blue-primary hover:text-text-action cursor-not-allowed"
                            : "rounded-lg bg-foreground border-2 border-blue-primary hover:border-blue-secondary hover:bg-blue-secondary text-blue-primary hover:text-text-action"
                        }
                        variant={"outline"}
                        onClick={(e) => generateJSON()}
                        disabled={activeDownloadJSON}
                      >
                        <FileJson></FileJson>
                        {activeDownloadJSON ? "Processing" : "JSON"}
                      </ButtonAdd>
                      <ButtonAdd
                        className={
                          activeDownloadXML
                            ? "rounded-lg bg-foreground border-2 border-red-primary hover:border-red-secondary hover:bg-red-secondary text-red-primary hover:text-text-action cursor-not-allowed"
                            : "rounded-lg bg-foreground border-2 border-red-primary hover:border-red-secondary hover:bg-red-secondary text-red-primary hover:text-text-action"
                        }
                        variant={"outline"}
                        onClick={(e) => generateXML("ID_RECORD", "ID_PATIENT")}
                      >
                        <FileCode> </FileCode>
                        {activeDownloadXML ? "Processing" : "XML"}
                      </ButtonAdd>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
