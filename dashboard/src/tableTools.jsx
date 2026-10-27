import { useDeferredValue, useMemo, useState } from "react";
import { Icon, T, formatNumber } from "./shared.jsx";

function compareValues(left, right, locale = "fa") {
  if (left == null && right == null) return 0;
  if (left == null) return 1;
  if (right == null) return -1;
  if (Number.isFinite(left) && Number.isFinite(right)) return left - right;
  return String(left).localeCompare(String(right), locale, { numeric: true, sensitivity: "base" });
}

export function useTableView(rows, {
  searchText = (row) => JSON.stringify(row),
  columns = {},
  initialSort = { key: Object.keys(columns)[0] || "", direction: "asc" },
} = {}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(initialSort);
  const deferredQuery = useDeferredValue(query);
  const filteredRows = useMemo(() => {
    const needle = deferredQuery.trim().toLocaleLowerCase("fa");
    const accessor = columns[sort.key] || ((row) => row?.[sort.key]);
    return [...rows]
      .filter((row) => !needle || String(searchText(row) ?? "").toLocaleLowerCase("fa").includes(needle))
      .sort((left, right) => compareValues(accessor(left), accessor(right)) * (sort.direction === "desc" ? -1 : 1));
  }, [rows, deferredQuery, searchText, columns, sort]);
  const changeSort = (key) => setSort((current) => ({
    key,
    direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
  }));
  return { query, setQuery, sort, changeSort, rows: filteredRows };
}

export function TableTools({ query, setQuery, count, placeholder = "جستجو در جدول…", children }) {
  return <div className="data-table-tools">
    <label className="data-table-search">
      <span className="sr-only">{placeholder}</span><Icon name="search" size={17} />
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} />
    </label>
    {children}
    <output aria-live="polite">{formatNumber(count)} نتیجه</output>
  </div>;
}

export function SortableTh({ column, sort, onSort, children, style, title }) {
  const active = sort.key === column;
  return <th style={style} aria-sort={active ? (sort.direction === "asc" ? "ascending" : "descending") : "none"}>
    <button type="button" className="sortable-table-heading" onClick={() => onSort(column)} title={title}>
      <span>{children}</span><i aria-hidden="true">{active ? (sort.direction === "asc" ? "↑" : "↓") : "↕"}</i>
    </button>
  </th>;
}

export const tableToolStyles = { text: T.text };
