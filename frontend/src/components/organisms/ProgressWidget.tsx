import { WidgetInfo } from "./Widget";

function ProgressWidget(prop: WidgetInfo) {
  return (
    <>
      <div>{prop.title}</div>
      <div></div>
    </>
  );
}

export default ProgressWidget;
