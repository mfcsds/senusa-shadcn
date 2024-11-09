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
} from "lucide-react";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isOpenDetailVariantDialog, setIsOpenDetailVariantDialog] =
    useState(false);

  const [selectedVariant, setSelectedVariant] = useState<TData | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [zygosityFilter, setZygosityFilter] = useState<string | null>(null);

  const handleZygosityChange = (value: string) => {
    setZygosityFilter(value);
    setColumnFilters((prev) => [
      ...prev.filter((filter) => filter.id !== "zygosity"), // Remove any existing zygosity filter
      { id: "zygosity", value }, // Add the new zygosity filter
    ]);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: { sorting, columnFilters, columnVisibility, rowSelection },
    initialState: {
      columnFilters: [{ id: "clinicalSign", value: "pathogenic" }],
    },
  });

  const [gene_id, setGeneID] = useState("");

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
    <div className="flex flex-col rounded-md border gap-3">
      <div className="flex items-center p-4">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-2">
              <Label>Gene ID</Label>
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
              <Label>Gene Symbol</Label>
              <Input
                className="max-w-sm"
                placeholder="Gene Symbol"
                value={
                  (table
                    .getColumn("gene_symbol")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("gene_symbol")
                    ?.setFilterValue(event.target.value)
                }
              ></Input>
            </div>
            {/* Clinical Sign */}
            <div className="flex flex-col gap-2">
              <Label>Clinical Significance</Label>
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
              <Label>Allel Population Frequency</Label>
              <div className="flex flex-row gap-1">
                <Input
                  className="max-w-sm"
                  placeholder="Gnomade"
                  value={
                    (table.getColumn("gnomade")?.getFilterValue() as number) ??
                    ""
                  }
                ></Input>
                <Input
                  className="max-w-sm"
                  placeholder="Gnomadg"
                  value={
                    (table.getColumn("gnomadg")?.getFilterValue() as number) ??
                    ""
                  }
                ></Input>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Zygosity</Label>
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
          </div>
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
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col overflow-x-auto w-full">
        <Table className="m-4 rounded-md min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="text-xs hover:bg-black bg-black text-white"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-white px-2 md:px-4"
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
