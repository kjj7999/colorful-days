import { useEffect, useState } from "react";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { FaRegEdit } from "react-icons/fa";
import Widget, { WidgetInfo } from "../components/organisms/Widget";
import ActionButton from "../components/atoms/ActionButton";
import WidgetContextMenu from "../components/molecules/WidgetContextMenu";

const ResponsiveGridLayout = WidthProvider(Responsive);

let layout1 = [
  { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
  { i: "b", x: 1, y: 0, w: 3, h: 2, static: true },
  { i: "c", x: 4, y: 3, w: 1, h: 1, static: true },
];

let widgetInfos: WidgetInfo[] = [
  { widgetType: "counter", title: "Acounter", value: 24 },
  { widgetType: "progress", title: "BProgress", value: 73.5 },
  { widgetType: "table", title: "CTable" },
];

function Dashboard() {
  const [title, setTitle] = useState("Dashboard");
  const [layout, setLayout] = useState<Layouts>({ lg: layout1 });
  const [breakpoint, setBreakPoint] = useState<String>("lg");
  const [isEdit, setIsEdit] = useState(false);
  const [isContextMenu, setIsContextMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // console.log("use effect " + isEdit);
  });

  function onBreakpointChange(newBreakpoint: string, newCols: number) {
    setBreakPoint(newBreakpoint);
  }

  function onLayoutChange(currentLayout: Layout[], allLayouts: Layouts) {
    if (breakpoint === "lg" || breakpoint === "md") {
      setLayout({ lg: currentLayout, md: currentLayout });
    }
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

  function toggleEdit(event: React.MouseEvent<HTMLButtonElement>) {
    setLayout({
      lg: layout.lg.map((l) => {
        return { ...l, static: !l.static };
      }),
    });
    setIsEdit(!isEdit);
  }

  function showContextMenu(item: string, x: number, y: number) {
    console.log(`show context menu parent ${item}`);
    setIsContextMenu(false);
    setPosition({ x: x, y: y });
    setIsContextMenu(true);
  }

  function hideContextMenu() {
    console.log(`hide context menu parent`);
    setIsContextMenu(false);
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    console.log("parent on click");
    setIsContextMenu(false);
  }

  function handleContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    console.log("parent on context menu");
    setIsContextMenu(false);
  }

  return (
    <div onClick={handleClick} onContextMenu={handleContextMenu}>
      <div className="p-3">
        <span className={"text-xl font-bold"}>{title}</span>
        <div className={"mt-3"}>
          <ActionButton onClick={toggleEdit} icon={<FaRegEdit />}>
            Edit
          </ActionButton>
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
