import type { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown, GripVertical, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { DocumentRow } from "./data"

function SortableHeader({
  column,
  children,
}: {
  column: { getIsSorted: () => false | "asc" | "desc"; toggleSorting: (desc?: boolean) => void }
  children: React.ReactNode
}) {
  const sorted = column.getIsSorted()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {children}
      {sorted === "asc" ? (
        <ArrowUp className="ml-1 size-3" />
      ) : sorted === "desc" ? (
        <ArrowDown className="ml-1 size-3" />
      ) : (
        <ArrowUpDown className="ml-1 size-3 opacity-30" />
      )}
    </Button>
  )
}

export const columns: ColumnDef<DocumentRow>[] = [
  {
    id: "drag",
    header: () => null,
    cell: () => (
      <GripVertical className="size-4 text-muted-foreground/50 cursor-grab" />
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: ({ column }) => (
      <SortableHeader column={column}>Header</SortableHeader>
    ),
    size: 220,
  },
  {
    accessorKey: "sectionType",
    header: ({ column }) => (
      <SortableHeader column={column}>Section Type</SortableHeader>
    ),
    size: 160,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader column={column}>Status</SortableHeader>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className="flex items-center gap-2">
          <span
            className={`inline-block size-2 rounded-full ${
              status === "done" ? "bg-green-500" : "bg-yellow-500"
            }`}
          />
          <span>{status === "done" ? "Done" : "In Process"}</span>
        </div>
      )
    },
    size: 130,
  },
  {
    accessorKey: "target",
    header: ({ column }) => (
      <SortableHeader column={column}>Target</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{row.getValue("target")}</div>
    ),
    size: 80,
  },
  {
    accessorKey: "limit",
    header: ({ column }) => (
      <SortableHeader column={column}>Limit</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{row.getValue("limit")}</div>
    ),
    size: 80,
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => {
      const reviewer = row.getValue("reviewer") as string | null
      if (reviewer) {
        return <span>{reviewer}</span>
      }
      return (
        <Select>
          <SelectTrigger size="sm" className="h-7 w-[160px] text-muted-foreground border-dashed">
            <SelectValue placeholder="Assign reviewer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jamik">Jamik Tashpulatov</SelectItem>
            <SelectItem value="eddie">Eddie Lake</SelectItem>
            <SelectItem value="sarah">Sarah Chen</SelectItem>
            <SelectItem value="marcus">Marcus Johnson</SelectItem>
            <SelectItem value="priya">Priya Patel</SelectItem>
          </SelectContent>
        </Select>
      )
    },
    size: 180,
  },
  {
    id: "actions",
    header: () => null,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-xs">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
]
