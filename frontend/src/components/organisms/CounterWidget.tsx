import { WidgetInfo } from "./Widget";

function CounterWidget(prop: WidgetInfo) {
  return (
    <>
      <div>{prop.title}</div>
      <div>{prop.value}</div>
    </>
  );
}

export default CounterWidget;
