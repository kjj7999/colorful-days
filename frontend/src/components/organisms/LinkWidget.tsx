import { WidgetInfo } from "./Widget";

function LinkWidget(prop: WidgetInfo) {
  return (
    <>
      <div>{prop.title}</div>
      <div></div>
    </>
  );
}

export default LinkWidget;
