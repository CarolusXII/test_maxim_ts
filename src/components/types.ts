export interface ArrayItem {
  [index: string]: any;
}

export interface ElementsSelector {
  active_items: Array<JSONDataElement>;
  deactive_items: Array<JSONDataElement>
}

export interface JSONDataElement {
  caption: string;
  type: number;
  code: string;
}

export interface ConditionObj {
  gt?: number;
  lt?: number;
  gte?: number;
  lte?: number;
  eq?: number | string | boolean;
  neq?: number | string;
  like?: string;
}

export interface SelectedItemsElement {
  caption: string;
  type: string;
  code: string;
  value: string | number | undefined;
  condition: ConditionObj;
}

export interface EditJsonDataElement {
  title: string | undefined;
  data: object;
  modal: boolean
}

export interface EditJSONDataElementDataEmpty {
  code: string;
  caption: string;
  type: string;
}
