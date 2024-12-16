"use client";
import { useState } from "react";

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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Download,
  FileCode,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import VariantInformationModal from "../items/VariantInformationModal";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

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

  const [selectedVariant, setSelectedVariant] = useState<TData | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [zygosityFilter, setZygosityFilter] = useState<string | null>(null);

  const [acmgFilter, setACMGFilter] = useState<string | null>(null);

  const [fiVis, setFiVis] = useState(false);

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

  const generateCSV = () => {
    // Get column headers dynamically from the table
    // Get column headers dynamically from the table
    const headers = table.getAllColumns().map((column) => column.id);

    // Access all rows from the filtered row model
    const rows = table.getFilteredRowModel().rows.map((row) => {
      return row.getAllCells().map((cell) => {
        // Ensure proper formatting or handling of cell values
        const value = cell.getValue();
        return typeof value === "string" ? value.replace(/,/g, " ") : value; // Replace commas if present
      });
    });

    // Combine headers and rows into a CSV format
    const csvContent = [
      headers.join(","), // Join headers
      ...rows.map((row) => row.join(",")), // Join data rows
    ].join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `sample.csv`; // Dynamic file name
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
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
    <div className="flex flex-col rounded-md border gap-3 w-fit">
      <div className="flex items-center p-4">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-2">
              <Label className="text-lg">Gene ID</Label>
              <Input
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
            {/* Gene Sysmbol */}
            <div className="flex flex-col gap-2">
              <Label className="text-lg">Gene Symbol</Label>
              <Input
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
            {/* Clinical Sign */}
            <div className="flex flex-col gap-2">
              <Label className="text-lg">Clinical Significance</Label>
              <Input
                className="max-w-sm"
                placeholder="Clinical Sign"
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
              ></Input>
            </div>
            {/* Allele Population Frequency */}
            <div className="flex flex-col gap-2">
              <Label className="text-lg">Allele Population Frequency</Label>
              <div className="flex flex-row gap-1">
                <Input
                  className="max-w-sm"
                  type="number"
                  placeholder="Gnomade"
                ></Input>
                <Input
                  className="max-w-sm"
                  placeholder="Gnomadg"
                  type="number"
                ></Input>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-lg">Zygosity</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Select Zygosity
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-lg">ACMG</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    ACMG Classification
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={(isChecked) => {
                      const value = isChecked ? "Pathogenic" : null;
                      setACMGFilter(value);
                      table.getColumn("acmg")?.setFilterValue(value);
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
          </div>
          <div className="flex flex-row ml-3 gap-2 items-center justify-center ">
            <div className="flex flex-col gap-2">
              <Label className="text-lg">Select Column</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Select Column to Show
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
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
            <div className="flex flex-col gap-2">
              <Label className="text-lg">Download Type</Label>
              <div className="flex flex-row">
                <Button variant={"outline"} onClick={(e) => generateCSV()}>
                  <Logs> </Logs>CSV
                </Button>
                <Button
                  variant={"outline"}
                  onClick={(e) => generateXML("ID_RECORD", "ID_PATIENT")}
                >
                  <FileCode> </FileCode>XML
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-x-auto w-full">
        <Table className="m-4 rounded-md min-w-full">
          <TableHeader className="h-[50px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className=" hover:bg-violet-200 bg-violet-200 border-y-4 border-gray-900 rounded-md"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-gray-90 px-2 md:px-4 h-[70px] text-lg  "
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
