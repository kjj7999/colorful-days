import { useCallback, useEffect, useState } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import { TextField } from '@mui/material';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegCircleXmark, FaRegFloppyDisk, FaPlus } from 'react-icons/fa6';
import Widget from '../components/organisms/Widget';
import { WidgetInfo } from '../components/organisms/WidgetType';
import ActionButton from '../components/atoms/ActionButton';
import WidgetContextMenu from '../components/molecules/WidgetContextMenu';

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout1 = [
  { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
  { i: 'b', x: 1, y: 0, w: 3, h: 2, static: true },
  { i: 'c', x: 4, y: 3, w: 1, h: 1, static: true },
];

const widgetInfos: WidgetInfo[] = [
  { widgetType: 'counter', title: 'Acounter', value: 24 },
  { widgetType: 'progress', title: 'BProgress', value: 73.5 },
  { widgetType: 'table', title: 'CTable' },
];

function Dashboard() {
  const [title, setTitle] = useState('Dashboard');
  const [titleText, setTitleText] = useState('');
  const [layout, setLayout] = useState<Layouts>({ lg: layout1 });
  const [backupLayout, setBackupLayout] = useState<Layouts>({ lg: layout1 });
  const [breakpoint, setBreakPoint] = useState<string>('lg');
  const [isEdit, setIsEdit] = useState(false);
  const [isContextMenu, setIsContextMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // console.log("use effect " + isEdit);
  });

  const onBreakpointChange = useCallback((newBreakpoint: string, newCols: number) => {
    setBreakPoint(newBreakpoint);
  }, []);

  function onLayoutChange(currentLayout: Layout[], allLayouts: Layouts) {
    if (breakpoint === 'lg' || breakpoint === 'md') {
      setLayout({ lg: currentLayout, md: currentLayout, sm: allLayouts.sm });
    } else if (breakpoint === 'sm') {
      setLayout({
        lg: layout.lg.map((l) => {
          return { ...l, static: true };
        }),
        md: layout.md.map((l) => {
          return { ...l, static: true };
        }),
        sm: currentLayout.map((l) => {
          return { ...l, static: true };
        }),
      });
      setIsEdit(false);
    }
  }

  function toggleEdit() {
    setBackupLayout(layout);
    console.log(JSON.stringify(layout));
    setLayout({
      lg: layout.lg.map((l) => {
        return { ...l, static: !l.static };
      }),
    });
    if (isEdit) {
      setTitle(titleText);
    } else {
      setTitleText(title);
    }
    setIsEdit(!isEdit);
  }

  const cancelEdit = useCallback(() => {
    setLayout(backupLayout);
    setIsEdit(false);
  }, []);

  const addWidget = useCallback(() => {
    console.log('add widget');
  }, []);

  function showContextMenu(item: string, x: number, y: number) {
    console.log(`show context menu parent ${item}`);
    setIsContextMenu(false);
    setPosition({ x, y });
    setIsContextMenu(true);
  }

  function hideContextMenu() {
    console.log(`hide context menu parent`);
    setIsContextMenu(false);
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    console.log('parent on click');
    setIsContextMenu(false);
  }

  function handleContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    console.log('parent on context menu');
    setIsContextMenu(false);
  }

  function generateDOM() {
    return layout.lg.map((l, index) => (
      <div key={l.i} style={{ zIndex: -1 }}>
        <Widget
          item={l.i}
          editable={l.static === false}
          onClick={hideContextMenu}
          onContextMenu={showContextMenu}
          widgetInfo={widgetInfos[index]}
        />
      </div>
    ));
  }

  return (
    <div onClick={handleClick} onContextMenu={handleContextMenu} role="presentation">
      <div className="p-3">
        <div className="h-8">
          {!isEdit && <span className="text-2xl font-bold">{title}</span>}
          {isEdit && (
            <TextField
              id="title"
              variant="outlined"
              size="small"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
            />
          )}
        </div>
        <div className="flex mt-3">
          {isEdit && (
            <ActionButton onClick={toggleEdit} icon={<FaRegFloppyDisk className="align-middle" />}>
              Save
            </ActionButton>
          )}
          {isEdit && (
            <ActionButton onClick={cancelEdit} icon={<FaRegCircleXmark className="align-middle" />}>
              Cancel
            </ActionButton>
          )}
          {!isEdit && (
            <ActionButton onClick={toggleEdit} icon={<FaRegEdit className="align-middle" />}>
              Edit
            </ActionButton>
          )}
          {!isEdit && (
            <ActionButton onClick={addWidget} icon={<FaPlus className="align-middle" />}>
              Add Widget
            </ActionButton>
          )}
        </div>
      </div>
      <ResponsiveGridLayout
        layouts={layout}
        cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={90}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        compactType={null}
        useCSSTransforms={false}
        style={{ zIndex: 0 }}
      >
        {generateDOM()}
      </ResponsiveGridLayout>
      {isContextMenu && <WidgetContextMenu y={position.y} x={position.x} />}
    </div>
  );
}

export default Dashboard;
