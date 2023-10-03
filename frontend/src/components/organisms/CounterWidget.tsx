import { useEffect, useState } from "react";
import { useObserveElementSize } from "../../hooks/useObserverElementSize";
import { WidgetInfo } from "./Widget";
import { Box } from "@mui/material";

function CounterWidget(props: WidgetInfo) {
  const { width, height, ref } = useObserveElementSize<HTMLDivElement>();
  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(Math.min(width, height));
  }, [width, height]);

  return (
    <div className="relative w-full h-full" ref={ref}>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: `${0.25 * size}px` }}>{`${props.value}`}</span>
      </Box>
    </div>
  );
}

export default CounterWidget;
