import { useEffect, useState } from "react";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import Gadget from "../components/organisms/Gadget";

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout1 = [
  { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
  { i: "b", x: 1, y: 0, w: 3, h: 2 },
  { i: "c", x: 4, y: 3, w: 1, h: 1 },
];

function Dashboard() {
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

  return (
    <div>
      Hello sdafas
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
