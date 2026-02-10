import { useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, CircleDashed } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { columns } from "./columns"
import { mockData } from "./data"
import { DataTableToolbar } from "./DataTableToolbar"
import { DataTablePagination } from "./DataTablePagination"

export default function ObjectTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  const selectedCount = table.getFilteredSelectedRowModel().rows.length

  const clearSelection = () => setRowSelection({})

  const selectAll = () => {
    table.toggleAllRowsSelected(true)
  }

  const handleBulkAction = (action: string) => {
    const selectedIds = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id)
    alert(`${action} triggered for ${selectedIds.length} item(s): ${selectedIds.join(", ")}`)
  }

  return (
    <div className="flex min-h-screen bg-app-bg font-sans">
      {/* Sidebar */}
      <aside className="w-[72px] bg-app-sidebar shrink-0" />

      {/* Main Content */}
      <main className="flex-1 p-4 px-6 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-app-heading">Object table</h1>
          <ThemeToggle />
        </header>

        {/* Table Card */}
        <div className="bg-card rounded-lg shadow-sm flex-1 overflow-hidden flex flex-col">
          <Tabs defaultValue="outline" className="flex-1 flex flex-col gap-0">
            <div className="flex items-center justify-between border-b px-4">
              <TabsList variant="line" className="h-10">
                <TabsTrigger value="outline">Outline</TabsTrigger>
                <TabsTrigger value="past-performance">
                  Past Performance
                  <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                    3
                  </span>
                </TabsTrigger>
                <TabsTrigger value="key-personnel">
                  Key Personnel
                  <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                    2
                  </span>
                </TabsTrigger>
                <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
              </TabsList>
              <DataTableToolbar table={table} />
            </div>

            <TabsContent value="outline" className="flex-1 flex flex-col mt-0">
              <div className="flex-1 overflow-auto">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow
                        key={headerGroup.id}
                        className="hover:bg-transparent border-border"
                      >
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            style={{ width: header.getSize() }}
                            className="bg-muted/50 text-muted-foreground text-xs font-medium"
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
                          className={
                            row.getIsSelected()
                              ? "bg-row-selected hover:bg-row-selected-hover"
                              : "hover:bg-row-hover"
                          }
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <DataTablePagination table={table} />
            </TabsContent>

            <TabsContent value="past-performance" className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Past Performance content</p>
            </TabsContent>
            <TabsContent value="key-personnel" className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Key Personnel content</p>
            </TabsContent>
            <TabsContent value="focus-documents" className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Focus Documents content</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Bulk Actions Bar */}
        {selectedCount > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-10 p-2 bg-bulk-bar-bg rounded-2xl shadow-lg z-50">
            <div className="flex items-center gap-0.5 px-2 text-bulk-bar-text text-sm">
              <span className="font-medium mr-2.5">{selectedCount} selected</span>
              <span className="text-bulk-bar-text/70 font-mono font-medium">&bull;</span>
              <button
                className="bg-transparent border-none text-bulk-bar-link cursor-pointer text-sm p-0 hover:underline"
                onClick={selectAll}
              >
                Select all
              </button>
              <span className="text-bulk-bar-text/70 font-mono font-medium">&bull;</span>
              <button
                className="bg-transparent border-none text-bulk-bar-link cursor-pointer text-sm p-0 hover:underline"
                onClick={clearSelection}
              >
                Clear
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-bulk-bar-text hover:bg-bulk-bar-text/10 h-9 px-4"
                onClick={() => handleBulkAction("Button")}
              >
                Button
                <ChevronDown className="size-4" />
              </Button>
              <Button
                variant="ghost"
                className="text-bulk-bar-text hover:bg-bulk-bar-text/10 h-9 px-4"
                onClick={() => handleBulkAction("Button")}
              >
                Button
                <ChevronDown className="size-4" />
              </Button>
              <Button
                className="bg-bulk-bar-cta hover:bg-bulk-bar-cta-hover text-bulk-bar-text h-9 px-4"
                onClick={() => handleBulkAction("Button")}
              >
                <CircleDashed className="size-4" />
                Button
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
