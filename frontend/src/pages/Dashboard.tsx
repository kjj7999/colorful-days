import { useEffect, useState } from "react";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { FaRegEdit } from "react-icons/fa";
import Gadget from "../components/organisms/Gadget";
import ActionButton from "../components/atoms/ActionButton";

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout1 = [
  { i: "a", x: 0, y: 0, w: 1, h: 2 },
  { i: "b", x: 1, y: 0, w: 3, h: 2 },
  { i: "c", x: 4, y: 3, w: 1, h: 1 },
];

function Dashboard() {
  const [title, setTitle] = useState("Dashboard");
  const [layout, setLayout] = useState({ lg: layout1 });
  
  useEffect(() => {
    console.log("use effect");
  });

  function onBreakpointChange(breakpoint: string, cols: number) {
    console.log(`on breakpoint change ${breakpoint}, ${cols}`);
  }

  function onLayoutChange(layout: Layout[], layouts: Layouts) {
    console.log(`on layout change`);
  }

  function generateDOM() {
    return layout.lg.map((l) => {
      return (
        <div key={l.i}>
          <Gadget item={l.i} />
        </div>
      );
    });
  }

  function handleButtonClick(event : React.MouseEvent<HTMLButtonElement>) {
    console.log("editButton");
  }

  return (
    <div>
      <div className="p-3">
        <span className={"text-xl font-bold"}>{title}</span>
        <div className={"mt-3"}>
          <ActionButton onClick={handleButtonClick} icon={<FaRegEdit />}>Edit</ActionButton>
        </div>
      </div>
      <ResponsiveGridLayout
        layouts={layout}
        cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        compactType={null}
      >
        {generateDOM()}
      </ResponsiveGridLayout>
    </div>
  );
}

export default Dashboard;
