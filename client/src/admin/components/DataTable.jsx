import { ArrowUpDown, ArrowUp, ArrowDown, Search, FolderOpen } from 'lucide-react';
import './DataTable.css';

export default function DataTable({ 
  columns = [], 
  data = [], 
  searchPlaceholder = 'Search records...', 
  searchTerm = '', 
  onSearchChange,
  extraToolbar = null,
  emptyMessage = 'No records created yet. New entries will appear here.',
  // Sorting props
  sortBy = null,
  onSort = null,
  // Selection props
  selectable = false,
  selectedIds = [],
  onToggleSelectRow = null,
  onToggleSelectAll = null,
}) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  return (
    <div className="admin-datatable-wrapper">
      {/* 1. Toolbar */}
      {(onSearchChange || extraToolbar) && (
        <div className="datatable-toolbar">
          {onSearchChange && (
            <div className="datatable-search-box">
              <Search size={15} className="search-icon" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="datatable-search-input"
              />
            </div>
          )}

          {extraToolbar && (
            <div className="datatable-extra-toolbar">
              {extraToolbar}
            </div>
          )}
        </div>
      )}

      {/* 2. Table Container */}
      <div className="datatable-scroll-container">
        <table className="admin-custom-table">
          <thead>
            <tr>
              {selectable && (
                <th className="th-checkbox-col" style={{ width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={onToggleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}

              {columns.map((col, idx) => {
                const isSortable = col.sortable && onSort;
                const isCurrentSort = sortBy?.field === (col.sortField || col.accessor);

                return (
                  <th 
                    key={idx} 
                    style={col.width ? { width: col.width } : {}}
                    className={isSortable ? 'th-sortable' : ''}
                    onClick={() => isSortable && onSort(col.sortField || col.accessor)}
                  >
                    <div className="th-content-row">
                      <span>{col.header}</span>
                      {isSortable && (
                        <span className="th-sort-icon">
                          {isCurrentSort ? (
                            sortBy.direction === 'asc' ? <ArrowUp size={13} /> : <ArrowDown size={13} />
                          ) : (
                            <ArrowUpDown size={12} className="opacity-40" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIdx) => {
                const rowId = row.id || row.txnId || rowIdx;
                const isSelected = selectedIds.includes(rowId);

                return (
                  <tr key={rowId} className={isSelected ? 'row-selected' : ''}>
                    {selectable && (
                      <td className="td-checkbox-col">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSelectRow && onToggleSelectRow(rowId)}
                          aria-label={`Select row ${rowId}`}
                        />
                      </td>
                    )}

                    {columns.map((col, colIdx) => (
                      <td 
                        key={colIdx} 
                        className={col.isNumeric ? 'tabular-nums' : ''}
                      >
                        {col.render ? col.render(row) : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td 
                  colSpan={columns.length + (selectable ? 1 : 0)} 
                  className="datatable-empty-cell"
                  style={{ textAlign: 'center', padding: '32px 16px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                    <FolderOpen size={24} style={{ opacity: 0.6 }} />
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>
                      {searchTerm.trim()
                        ? `No results match your search "${searchTerm}".`
                        : emptyMessage}
                    </span>
                    {searchTerm.trim() && (
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                        Try searching with different keywords or check spelling.
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
