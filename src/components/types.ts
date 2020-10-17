export interface ArrayItem {
  [key: string]: any;
}

export interface JSONDataElement {
  caption: string;
  type: string;
  code?: string;
}

export interface ElementsSelector {
  active_items: Array<JSONDataElement>;
  deactive_items: Array<JSONDataElement>
}

export interface ConditionObj {
  [key: string]: string | number | boolean;
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

export interface ValidationData {
  [key: string]: {
    [key: string]: Function;
  }
}
