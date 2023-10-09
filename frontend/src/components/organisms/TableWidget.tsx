import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AgGridEvent } from 'ag-grid-community';
import { WidgetInfo } from './WidgetType';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function TableWidget(prop: WidgetInfo) {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState();

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'make', filter: true },
    { field: 'model', filter: true },
    { field: 'price' },
  ]);

  const cellClickedListener = useCallback((event: AgGridEvent) => {
    console.log('cellClicked', event);
  }, []);

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then((result) => result.json())
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then((rowData) => setRowData(rowData));
  }, []);

  return (
    <div className="relative w-full h-full">
      <div>table</div>
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
        />
      </div>
    </div>
  );
}

export default TableWidget;
