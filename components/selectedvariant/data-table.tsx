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
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";
import {
  ChevronDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  Download,
  FileCode,
  FileJson,
  Logs,
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
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import GenePanelPopover from "../genepanel/GenePanelPopover";

import {
  GENE_PANEL_25,
  GENE_PANEL_50,
  GENE_PANEL_75,
  GENE_PANEL_113,
} from "@/utils/Constant";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  // Colum yang akan dimunculkan
  const visibleColumns = [
    "gene_id",
    "inheritance",
    "acmg",
    "clinicalSign",
    "phenotypes",
    "gnomadg",
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

  // // Update filters dynamically based on the selected gene panel
  // useEffect(() => {
  //   const genePanel = getGenePanel(selectedGenePanel);

  //   // Update column filters with gene symbols
  //   setColumnFilters((prevFilters) => [
  //     ...prevFilters.filter((filter) => filter.id !== "gene_symbol"), // Remove existing `gene_symbol` filter
  //     { id: "gene_symbol", value: genePanel.join(",") }, // Add new filter with the selected gene panel
  //   ]);
  // }, [selectedGenePanel]);

  const [selectedVariant, setSelectedVariant] = useState<TData | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [zygosityFilter, setZygosityFilter] = useState<string | null>(null);

  const [acmgFilter, setACMGFilter] = useState<string | null>(null);

  const [fiVis, setFiVis] = useState(false);

  const [activeDownloadCSV, setActiveDownloadCSV] = useState(false);
  const [activeDownloadJSON, setActiveDownloadJSON] = useState(false);
  const [gnomadRange, setGnomadRange] = useState<[number | "", number | ""]>([
    "",
    "",
  ]);

  const [selectedGenes, setSelectedGenes] = useState<string[]>(
    getGenePanel(selectedGenePanel)
  );

  useEffect(() => {
    table.getColumn("gene_symbol")?.setFilterValue(selectedGenes);
  }, [selectedGenes]);

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

  const gnomadCombinedRangeFilterFn = (
    row: Row<any>,
    _columnId: string, // unused
    filterValue: [number | "", number | ""]
  ): boolean => {
    const [min, max] = filterValue;

    const gnomadg = row.getValue<number>("gnomadg");
    const gnomade = row.getValue<number>("gnomade");

    const inRange = (val: number | undefined) => {
      if (val === undefined || val === null) return false;
      if (min !== "" && val < min) return false;
      if (max !== "" && val > max) return false;
      return true;
    };

    return inRange(gnomadg) || inRange(gnomade);
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

  const geneSymbolFilterFn = (
    row: Row<any>,
    columnId: string,
    filterValues: string[]
  ): boolean => {
    const cellValue = row.getValue<string>(columnId)?.toLowerCase();
    return filterValues.some((value) =>
      cellValue?.includes(value.toLowerCase())
    );
  };

  const gnomadCombinedColumn: ColumnDef<TData, TValue> = {
    id: "gnomad_combined",
    accessorFn: () => undefined as unknown as TValue, // or undefined
    header: () => null,
    cell: () => null,
    enableSorting: false,
    enableHiding: false,
    filterFn: gnomadCombinedRangeFilterFn,
  };
  useEffect(() => {
    table.getColumn("gnomad_combined")?.setFilterValue(gnomadRange);
  }, [gnomadRange]);

  const table = useReactTable({
    data,
    columns: [
      ...columns.map((column) => {
        if (column.id === "clinicalSign") {
          return { ...column, filterFn: containsFilterFn };
        }
        if (column.id === "gene_symbol") {
          return { ...column, filterFn: geneSymbolFilterFn };
        }
        return column;
      }),
      gnomadCombinedColumn,
    ],
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

  useEffect(() => {
    setColumnFilters((prev) => [
      ...prev.filter((filter) => filter.id !== "gene_symbol"),
      { id: "gene_symbol", value: selectedGenes },
    ]);
  }, [selectedGenes]);

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
    <div className="flex flex-col rounded-md  gap-3 w-full">
      <div className="w-full  p-4 bg-white rounded-xl border">
        <div className="overflow-x-auto">
          <div className="flex flex-row  gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {/* Gene Panel */}
            <div className="flex flex-col gap-2 min-w-[180px]">
              <Label className="text-lg">Gene Panel</Label>
              <div className="flex flex-row items-center gap-2">
                <Select
                  onValueChange={(value) => {
                    const selectedValue = parseInt(value);
                    let genePanel: string[] = [];
                    switch (selectedValue) {
                      case 25:
                        genePanel = GENE_PANEL_25;
                        setSelectedGenePanel(genePanel.length);
                        break;
                      case 50:
                        genePanel = GENE_PANEL_50;
                        setSelectedGenePanel(genePanel.length);
                        break;
                      case 75:
                        genePanel = GENE_PANEL_75;
                        setSelectedGenePanel(genePanel.length);
                        break;
                      case 113:
                        genePanel = GENE_PANEL_113;
                        setSelectedGenePanel(genePanel.length);
                        break;
                    }

                    // This is the important part:
                    // pass the array to the "gene_symbol" filter.
                    table.getColumn("gene_symbol")?.setFilterValue(genePanel);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gene Panel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="25">Gene Panel 25</SelectItem>
                      <SelectItem value="50">Gene Panel 50</SelectItem>
                      <SelectItem value="75">Gene Panel 75</SelectItem>
                      <SelectItem value="113">Gene Panel 113</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <GenePanelPopover
                  selectedGenePanel={selectedGenePanel}
                  selectedGenes={selectedGenes}
                  onGeneSelectionChange={setSelectedGenes}
                />
              </div>
            </div>

            {/* Gene ID */}
            <div className="flex flex-col gap-2 min-w-[160px]">
              <Label className="text-lg">Gene ID</Label>
              <Input
                className="h-10"
                placeholder="Gene ID"
                value={gene_id}
                onChange={(e) => {
                  const value = e.target.value;
                  setGeneID(value);
                  table.getColumn("gene_id")?.setFilterValue(value);
                }}
              />
            </div>

            {/* Gene Symbol */}
            <div className="flex flex-col gap-2 min-w-[160px]">
              <Label className="text-lg">Gene Symbol</Label>
              <Input
                className="h-10"
                placeholder="Gene Symbol"
                value={gene_symbol}
                onChange={(e) => {
                  const value = e.target.value;
                  setGeneSymbol(value);
                  table.getColumn("gene_symbol")?.setFilterValue(value);
                }}
              />
            </div>

            {/* Clinical Significance */}
            <div className="flex flex-col gap-2 min-w-[180px]">
              <Label className="text-lg">Clinical Significance</Label>
              <Input
                className="h-10"
                placeholder="Clinical Sign"
                value={
                  (table
                    .getColumn("clinicalSign")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(e) =>
                  table
                    .getColumn("clinicalSign")
                    ?.setFilterValue(e.target.value)
                }
              />
            </div>

            {/* Zygosity */}
            <div className="flex flex-col gap-2 min-w-[160px]">
              <Label className="text-lg">Zygosity</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10">
                    Select Zygosity <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {["Homozygous", "Heterozygous", "Reference / Unknown"].map(
                    (type) => (
                      <DropdownMenuCheckboxItem
                        key={type}
                        checked={zygosityFilter === type}
                        onCheckedChange={(isChecked) => {
                          const value = isChecked ? type : null;
                          setZygosityFilter(value);
                          table.getColumn("zygosity")?.setFilterValue(value);
                        }}
                      >
                        {type}
                      </DropdownMenuCheckboxItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Gnomad Combined Range */}
            <div className="flex flex-col gap-2 min-w-[200px]">
              <Label className="text-lg">Gnomad Combined Range</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  className="w-20 h-10"
                  placeholder="Min"
                  value={gnomadRange[0]}
                  onChange={(e) =>
                    setGnomadRange([
                      e.target.value ? parseFloat(e.target.value) : "",
                      gnomadRange[1],
                    ])
                  }
                />
                <Input
                  type="number"
                  className="w-20 h-10"
                  placeholder="Max"
                  value={gnomadRange[1]}
                  onChange={(e) =>
                    setGnomadRange([
                      gnomadRange[0],
                      e.target.value ? parseFloat(e.target.value) : "",
                    ])
                  }
                />
              </div>
            </div>

            {/* ACMG */}
            <div className="flex flex-col gap-2 min-w-[160px]">
              <Label className="text-lg">ACMG</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10">
                    ACMG Classification <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {[
                    { label: "Pathogenic", color: "bg-red-400 border-red-600" },
                    {
                      label: "Likely Pathogenic",
                      color: "bg-red-300 border-red-600",
                    },
                    { label: "VUS", color: "bg-yellow-300 border-yellow-600" },
                    {
                      label: "Likely Benign",
                      color: "bg-green-200 border-green-600",
                    },
                    { label: "Benign", color: "bg-green-300 border-green-600" },
                  ].map(({ label, color }) => (
                    <DropdownMenuCheckboxItem
                      key={label}
                      checked={acmgFilter === label}
                      onCheckedChange={(isChecked) => {
                        const value = isChecked ? label : null;
                        setACMGFilter(value);
                        table.getColumn("acmg")?.setFilterValue(value);
                      }}
                    >
                      <div
                        className={`w-full p-2 rounded-sm border-2 ${color}`}
                      >
                        <p className="text-black font-semibold">{label}</p>
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Select Column */}
            <div className="flex flex-col gap-2 min-w-[180px]">
              <Label className="text-lg">Select Column</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10">
                    Select Column to Show{" "}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((col) => col.getCanHide())
                    .map((col) => (
                      <DropdownMenuCheckboxItem
                        key={col.id}
                        checked={col.getIsVisible()}
                        onCheckedChange={(value) => {
                          col.toggleVisibility(!!value);
                          if (col.id === "functional_impact") {
                            setFiVis(!!value);
                          }
                        }}
                      >
                        {col.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col gap-2 min-w-[200px]">
              <Label className="text-lg">Download Type</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className={
                    activeDownloadCSV ? "bg-gray-200 cursor-not-allowed" : ""
                  }
                  disabled={activeDownloadCSV}
                  onClick={generateCSV}
                >
                  <Logs className="mr-1" />
                  {activeDownloadCSV ? "Processing.." : "CSV"}
                </Button>
                <Button
                  variant="outline"
                  className={
                    activeDownloadJSON ? "bg-gray-200 cursor-not-allowed" : ""
                  }
                  disabled={activeDownloadJSON}
                  onClick={generateJSON}
                >
                  <FileJson className="mr-1" />
                  {activeDownloadJSON ? "Processing.." : "JSON"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => generateXML("ID_RECORD", "ID_PATIENT")}
                >
                  <FileCode className="mr-1" /> XML
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-x-auto w-full bg-white rounded shadow-xl">
        <Table className="m-4 rounded-md min-w-full">
          <TableHeader className="h-[50px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className=" hover:bg-purple-500 bg-purple-500 border-y-4 border-gray-900 rounded-md"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-white px-2 md:px-4 h-[70px] text-lg  "
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                      className="h-8 text-xs px-2 md:px-4"
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

      <Separator></Separator>
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8 p-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
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
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
