"use client";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useMemo } from "react";
import { Order } from "prisma/generated/prisma/client";
import {
  Search,
  SlidersHorizontal,
  Columns,
  X,
  Download,
  ChevronDown,
} from "lucide-react";
import { getPresetFilters, PresetFilters } from "./filter-presets";
import { orderColumnsEnhanced } from "./column";
import { exportToCSV, exportToJSON, printReport } from "./export-utils";

type EnrichedOrder = Order & {
  profit: number;
  revenue: number;
};

export function OrdersTableComplete({ orders }: { orders: Order[] }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
    address: false,
    notes: false,
    returnedAt: false,
    remittanceId: false,
    additionalCosts: false,
    cashCollected: false,
    actualPaidPrice: false,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const enrichedOrders = useMemo(() => {
    return orders.map((order) => ({
      ...order,
      profit:
        (order.actualPaidPrice || order.cashCollected || order.expectedPrice) -
        order.productCost -
        order.shippingFee -
        order.additionalCosts,
      revenue: order.actualPaidPrice || order.cashCollected || 0,
    }));
  }, [orders]);

  const table = useReactTable({
    data: enrichedOrders,
    columns: orderColumnsEnhanced,
    state: {
      pagination,
      columnFilters,
      sorting,
      columnVisibility,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase();
      const searchableFields = [
        row.original.customerName,
        row.original.customerPhone,
        row.original.productTitle,
        row.original.city,
        row.original.address,
        row.original.id,
      ];
      return searchableFields.some((field) =>
        field?.toLowerCase().includes(search)
      );
    },
  });

  const uniqueStatuses = useMemo(
    () => Array.from(new Set(orders.map((o) => o.status))),
    [orders]
  );

  const uniqueCities = useMemo(
    () => Array.from(new Set(orders.map((o) => o.city).filter(Boolean))),
    [orders]
  );

  const uniquePaymentStatuses = useMemo(
    () => Array.from(new Set(orders.map((o) => o.paymentStatus))),
    [orders]
  );

  const stats = useMemo(() => {
    const filtered = table.getFilteredRowModel().rows.map((r) => r.original);
    return {
      totalOrders: filtered.length,
      totalRevenue: filtered.reduce((sum, o) => sum + (o.revenue || 0), 0),
      totalProfit: filtered.reduce((sum, o) => sum + (o.profit || 0), 0),
      averageOrderValue:
        filtered.length > 0
          ? filtered.reduce((sum, o) => sum + (o.revenue || 0), 0) /
            filtered.length
          : 0,
    };
  }, [table.getFilteredRowModel().rows]);

  const handlePresetChange = (presetId: string | null) => {
    setActivePreset(presetId);
    if (presetId === null) {
      setColumnFilters([]);
    } else {
      const presetFilters = getPresetFilters(presetId);
      setColumnFilters(presetFilters);
    }
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
  };

  const handleExportCSV = () => {
    const filteredData = table
      .getFilteredRowModel()
      .rows.map((r) => r.original);
    const timestamp = new Date().toISOString().split("T")[0];
    exportToCSV(filteredData, `orders-${timestamp}.csv`);
    setShowExportMenu(false);
  };

  const handleExportJSON = () => {
    const filteredData = table
      .getFilteredRowModel()
      .rows.map((r) => r.original);
    const timestamp = new Date().toISOString().split("T")[0];
    exportToJSON(filteredData, `orders-${timestamp}.json`);
    setShowExportMenu(false);
  };

  const handlePrint = () => {
    const filteredData = table
      .getFilteredRowModel()
      .rows.map((r) => r.original);
    printReport(filteredData);
    setShowExportMenu(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* Stats - Minimal Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm text-gray-500 mb-1">შეკვეთები</div>
          <div className="text-3xl font-semibold text-gray-900">
            {stats.totalOrders}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            სულ {enrichedOrders.length}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm text-gray-500 mb-1">შემოსავალი</div>
          <div className="text-3xl font-semibold text-gray-900">
            {stats.totalRevenue.toFixed(0)} ₾
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm text-gray-500 mb-1">მოგება</div>
          <div className="text-3xl font-semibold text-gray-900">
            {stats.totalProfit.toFixed(0)} ₾
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.totalRevenue > 0
              ? `${((stats.totalProfit / stats.totalRevenue) * 100).toFixed(1)}%`
              : "0%"}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm text-gray-500 mb-1">საშუალო</div>
          <div className="text-3xl font-semibold text-gray-900">
            {stats.averageOrderValue.toFixed(0)} ₾
          </div>
        </div>
      </div>

      {/* Preset Filters - Minimal Pills */}
      <PresetFilters
        activePreset={activePreset}
        onPresetChange={handlePresetChange}
      />

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={globalFilter ?? ""}
                onChange={(e) => {
                  setGlobalFilter(e.target.value);
                  setActivePreset(null);
                }}
                placeholder="ძებნა..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              {globalFilter && (
                <button
                  onClick={() => setGlobalFilter("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                  showFilters
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>ფილტრები</span>
                  {columnFilters.length > 0 && (
                    <span className="bg-gray-900 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                      {columnFilters.length}
                    </span>
                  )}
                </div>
              </button>

              <button
                onClick={() => setShowColumnSettings(!showColumnSettings)}
                className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                  showColumnSettings
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Columns className="h-4 w-4" />
                  <span>სვეტები</span>
                </div>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="px-4 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>ექსპორტი</span>
                  </div>
                </button>
                {showExportMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                    <button
                      onClick={handleExportCSV}
                      className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors"
                    >
                      ჩამოტვირთვა CSV
                    </button>
                    <button
                      onClick={handleExportJSON}
                      className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors border-t border-gray-100"
                    >
                      ჩამოტვირთვა JSON
                    </button>
                    <button
                      onClick={handlePrint}
                      className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors border-t border-gray-100"
                    >
                      ბეჭდვა
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                დეტალური ფილტრები
              </h3>
              {columnFilters.length > 0 && (
                <button
                  onClick={() => {
                    setColumnFilters([]);
                    setActivePreset(null);
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  გასუფთავება
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  სტატუსი
                </label>
                <select
                  value={
                    (table.getColumn("status")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(e) => {
                    table
                      .getColumn("status")
                      ?.setFilterValue(e.target.value || undefined);
                    setActivePreset(null);
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">ყველა</option>
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  გადახდის სტატუსი
                </label>
                <select
                  value={
                    (table
                      .getColumn("paymentStatus")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(e) => {
                    table
                      .getColumn("paymentStatus")
                      ?.setFilterValue(e.target.value || undefined);
                    setActivePreset(null);
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">ყველა</option>
                  {uniquePaymentStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  ქალაქი
                </label>
                <select
                  value={
                    (table.getColumn("city")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(e) => {
                    table
                      .getColumn("city")
                      ?.setFilterValue(e.target.value || undefined);
                    setActivePreset(null);
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">ყველა</option>
                  {uniqueCities.map((city) => (
                    <option key={city} value={city!}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  დან (თარიღი)
                </label>
                <input
                  type="date"
                  onChange={(e) => {
                    const value = e.target.value;
                    table.getColumn("createdAt")?.setFilterValue((old: any) => {
                      return [value ? new Date(value) : undefined, old?.[1]];
                    });
                    setActivePreset(null);
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  მდე (თარიღი)
                </label>
                <input
                  type="date"
                  onChange={(e) => {
                    const value = e.target.value;
                    table.getColumn("createdAt")?.setFilterValue((old: any) => {
                      return [old?.[0], value ? new Date(value) : undefined];
                    });
                    setActivePreset(null);
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  ტიპი
                </label>
                <select
                  value={
                    (table.getColumn("type")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(e) => {
                    table
                      .getColumn("type")
                      ?.setFilterValue(e.target.value || undefined);
                    setActivePreset(null);
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">ყველა</option>
                  <option value="LEAD">LEAD</option>
                  <option value="ORDER">ORDER</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Column Settings */}
        {showColumnSettings && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                სვეტების ხილვადობა
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const allColumns = table.getAllLeafColumns();
                    const newVisibility: VisibilityState = {};
                    allColumns.forEach((col) => {
                      newVisibility[col.id] = true;
                    });
                    setColumnVisibility(newVisibility);
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ყველას ჩვენება
                </button>
                <button
                  onClick={() => {
                    const allColumns = table.getAllLeafColumns();
                    const newVisibility: VisibilityState = {};
                    allColumns.forEach((col) => {
                      newVisibility[col.id] = false;
                    });
                    setColumnVisibility(newVisibility);
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ყველას დამალვა
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {table.getAllLeafColumns().map((column) => (
                <label
                  key={column.id}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : column.id}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="border-b border-gray-200">
                  {hg.headers.map((h) => (
                    <TableHead
                      key={h.id}
                      onClick={
                        h.column.getCanSort()
                          ? h.column.getToggleSortingHandler()
                          : undefined
                      }
                      className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50 ${
                        h.column.getCanSort()
                          ? "cursor-pointer select-none hover:bg-gray-100"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {h.column.getCanSort() && (
                          <span className="text-gray-400">
                            {h.column.getIsSorted() === "asc"
                              ? "↑"
                              : h.column.getIsSorted() === "desc"
                                ? "↓"
                                : "↕"}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="text-center py-12 text-sm text-gray-500"
                  >
                    შეკვეთები არ მოიძებნა
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                გვერდი {pagination.pageIndex + 1} / {table.getPageCount() || 1}
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">
                სულ {table.getFilteredRowModel().rows.length} შეკვეთა
              </span>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={pagination.pageSize}
                onChange={(e) => {
                  setPagination({
                    pageIndex: 0,
                    pageSize: Number(e.target.value),
                  });
                }}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                {[10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <div className="flex gap-1">
                <button
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  ««
                </button>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  წინა
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  შემდეგი
                </button>
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  »»
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
