"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { T, formatNumber } from "./shared.jsx";

/**
 * OWJ table tools — redesigned presentation only.
 * Filtering, comparison, sort direction and public exports stay unchanged.
 */
function compareValues(left, right, locale = "fa") {
  if (left == null && right == null) return 0;
  if (left == null) return 1;
  if (right == null) return -1;
  if (Number.isFinite(left) && Number.isFinite(right)) return left - right;
  return String(left).localeCompare(String(right), locale, {
    numeric: true,
    sensitivity: "base",
  });
}

export function useTableView(
  rows,
  {
    searchText = (row) => JSON.stringify(row),
    columns = {},
    initialSort = { key: Object.keys(columns)[0] || "", direction: "asc" },
  } = {},
) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(initialSort);
  const deferredQuery = useDeferredValue(query);
  const filteredRows = useMemo(() => {
    const needle = deferredQuery.trim().toLocaleLowerCase("fa");
    const accessor = columns[sort.key] || ((row) => row?.[sort.key]);
    return [...rows]
      .filter(
        (row) =>
          !needle ||
          String(searchText(row) ?? "")
            .toLocaleLowerCase("fa")
            .includes(needle),
      )
      .sort(
        (left, right) =>
          compareValues(accessor(left), accessor(right)) *
          (sort.direction === "desc" ? -1 : 1),
      );
  }, [rows, deferredQuery, searchText, columns, sort]);
  const changeSort = (key) =>
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  return { query, setQuery, sort, changeSort, rows: filteredRows };
}

const TABLE_TOOL_CSS = `
  .owj-table-tools, .owj-table-tools * { box-sizing: border-box; }
  .owj-table-tools {
    display: flex; flex-wrap: wrap; align-items: center; gap: 12px;
    justify-content: space-between; width: 100%; min-width: 0;
    padding: 2px 0; margin: 0 0 15px; direction: rtl;
    font-family: var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
  }
  .owj-table-search {
    flex: 1 1 280px; min-width: 0; min-height: 48px;
    display: flex; align-items: center; gap: 10px;
    background: #fafbfc; border: 1px solid #e6e8ed;
    border-radius: 13px; color: #777e87; padding: 0 14px;
    transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
  }
  .owj-table-search:focus-within {
    background: #fff; border-color: rgba(102,48,141,.56);
    box-shadow: 0 0 0 3px rgba(102,48,141,.10);
  }
  .owj-table-search svg { flex: 0 0 auto; color: #747b85; }
  .owj-table-search input {
    flex: 1; width: 100%; min-width: 0; border: 0; outline: 0;
    background: transparent; color: #202127; font-size: 14px;
    font-family: inherit; height: 46px; direction: rtl;
  }
  .owj-table-search input::placeholder { color: #858b96; opacity: 1; }
  .owj-table-search input::-webkit-search-cancel-button { display: none; }
  .owj-table-search__clear {
    display: inline-grid; place-items: center; flex: 0 0 auto;
    width: 29px; height: 29px; padding: 0;
    border: none; border-radius: 9px; background: #eceef2;
    color: #5c626e; cursor: pointer; font-size: 19px; line-height: 1;
    transition: background .16s ease, color .16s ease;
  }
  .owj-table-search__clear:hover { background: #e8dff0; color: #66308d; }
  .owj-table-tools__count {
    flex: 0 0 auto; padding: 8px 12px; border: 1px solid #eceef2;
    border-radius: 10px; background: #f7f8fa; color: #5f6671;
    font-size: 12px; font-weight: 750; white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .owj-table-tools__sr-only {
    position: absolute !important; width: 1px !important; height: 1px !important;
    padding: 0 !important; margin: -1px !important; overflow: hidden !important;
    clip: rect(0,0,0,0) !important; white-space: nowrap !important; border: 0 !important;
  }
  .owj-table-tools button:focus-visible,
  .owj-table-tools input:focus-visible {
    outline: 2px solid #66308d; outline-offset: 3px;
  }
  .owj-table-search:focus-within input:focus-visible { outline: none; }
  @media (max-width: 600px) {
    .owj-table-tools { gap: 9px; margin-bottom: 12px; }
    .owj-table-search { flex-basis: 100%; min-height: 50px; }
    .owj-table-tools__count { margin-inline-start: auto; }
  }
  @media (prefers-reduced-motion: reduce) {
    .owj-table-search, .owj-table-search__clear { transition: none; }
  }
`;

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10.7"
        cy="10.7"
        r="6.8"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="m16 16 4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TableTools({
  query,
  setQuery,
  count,
  placeholder = "جستجو در جدول…",
  children,
}) {
  return (
    <>
      <style>{TABLE_TOOL_CSS}</style>
      <div className="data-table-tools owj-table-tools" role="search">
        <div className="data-table-search owj-table-search">
          <span className="owj-table-tools__sr-only">{placeholder}</span>
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            aria-label={placeholder}
          />
          {!!query && (
            <button
              className="owj-table-search__clear"
              type="button"
              onClick={() => setQuery("")}
              aria-label="پاک کردن جستجو"
              title="پاک کردن جستجو"
            >
              ×
            </button>
          )}
        </div>
        {children}
        <output className="owj-table-tools__count" aria-live="polite">
          {formatNumber(count)} نتیجه
        </output>
      </div>
    </>
  );
}

export function SortableTh({ column, sort, onSort, children, style, title }) {
  const active = sort.key === column;
  return (
    <th
      style={{ verticalAlign: "middle", ...style }}
      aria-sort={
        active
          ? sort.direction === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      <button
        type="button"
        className="sortable-table-heading"
        onClick={() => onSort(column)}
        title={title}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 8,
          maxWidth: "100%",
          minHeight: 36,
          padding: "5px 0",
          background: "transparent",
          border: 0,
          color: active ? T.primary : T.textSec,
          fontFamily: "inherit",
          fontSize: 12,
          fontWeight: active ? 800 : 650,
          textAlign: "right",
          lineHeight: 1.5,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        <span>{children}</span>
        <i
          aria-hidden="true"
          style={{
            display: "inline-grid",
            placeItems: "center",
            flexShrink: 0,
            width: 21,
            height: 21,
            borderRadius: 6,
            fontSize: 12,
            lineHeight: 1,
            fontStyle: "normal",
            fontWeight: 900,
            color: active ? T.primary : T.textMuted,
            background: active ? T.primaryBg : "#f1f2f5",
          }}
        >
          {active ? (sort.direction === "asc" ? "↑" : "↓") : "↕"}
        </i>
      </button>
    </th>
  );
}

export const tableToolStyles = { text: T.text };
