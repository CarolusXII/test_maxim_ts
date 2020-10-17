import { JSONDataElement, SelectedItemsElement, ArrayItem } from '../../components/types'

interface TypesMapElement {
  name: string;
  condition: Array<string>;
}

export interface ConditionData {
  condition: Array<string>;
  name: string;
}

export interface Data {
  caption: string;
  code: string;
  condition: object;
  type: string;
}

export interface ConstructorState {
  JSON_data: Array<JSONDataElement>;
  selected_items: Array<SelectedItemsElement>;
  types_map: {
    [key: string]: any;
    number: TypesMapElement;
    string: TypesMapElement;
    bool: TypesMapElement;
  }
  edit_json_data_element: {
    form: boolean;
    title: string | undefined;
    data: object;
    modal: boolean;
  }
  edit_json_data_element_data: {
    caption: string | undefined;
    code: string | undefined;
    type: string | undefined;
  }
  rules: ArrayItem;
  modal_edit_json_data: boolean;
  edit_settings: {
    modal: boolean;
    data: Data | {};
    condition_data: ConditionData | {};
  }
}
