'use client';

import { TableData } from '@/lib/types';
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@fluentui/react-components';

interface DataTableProps {
  data: TableData;
}

export default function DataTable({ data }: DataTableProps) {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            {data.columns.map((column) => (
              <TableHeaderCell key={column.key} style={{ width: column.width }}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.rows.map((row, index) => {
            const isHighlighted = data.highlightRows?.includes(row.id);
            return (
              <TableRow
                key={row.id || index}
                className={isHighlighted ? 'bg-red-50 font-semibold' : ''}
              >
                {data.columns.map((column) => (
                  <TableCell key={column.key}>{row[column.key]}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
