export type WidgetType = 'counter' | 'progress' | 'table' | 'group' | 'link';
export type WidgetInfo = {
  widgetType: WidgetType;
  title: string;
  value?: number;
};
