import { useEffect, useState } from "react";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { FaRegEdit } from "react-icons/fa";
import Gadget from "../components/organisms/Gadget";
import ActionButton from "../components/atoms/ActionButton";

const ResponsiveGridLayout = WidthProvider(Responsive);

let layout1 = [
  { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
  { i: "b", x: 1, y: 0, w: 3, h: 2, static: true },
  { i: "c", x: 4, y: 3, w: 1, h: 1, static: true },
];

function Dashboard() {
  const [title, setTitle] = useState("Dashboard");
  const [layout, setLayout] = useState<Layouts>({ lg: layout1 });
  const [breakpoint, setBreakPoint] = useState<String>("lg");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    console.log("use effect " + isEdit);
  });

  function onBreakpointChange(newBreakpoint: string, newCols: number) {
    setBreakPoint(newBreakpoint);
  }

  function onLayoutChange(currentLayout: Layout[], allLayouts: Layouts) {
    if (breakpoint == "lg" || breakpoint == "md") {
      setLayout({ lg: currentLayout, md: currentLayout });
    }
  }

  function generateDOM() {
    return layout.lg.map((l) => {
      return (
        <div key={l.i} style={{ zIndex: -1 }}>
          <Gadget item={l.i} />
        </div>
      );
    });
  }

  function toggleEdit(event: React.MouseEvent<HTMLButtonElement>) {
    setLayout({
      lg: layout.lg.map((l) => {
        return { ...l, static: !l.static };
      }),
    });
    setIsEdit(!isEdit);
  }

  return (
    <div>
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
        rowHeight={60}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        compactType={null}
        useCSSTransforms={false}
        style={{ zIndex: 0 }}
      >
        {generateDOM()}
      </ResponsiveGridLayout>
    </div>
  );
}

export default Dashboard;
