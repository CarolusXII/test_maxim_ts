import { JSONDataElement, SelectedItemsElement, ArrayItem } from '../../components/types'

interface TypesMapElement {
  name: string;
  condition: Array<string>;
}

export interface AddJSONElementPayload {
  element: JSONDataElement;
  index: number
}

export interface ConstructorState {
  JSON_data: Array<JSONDataElement>;
  selected_items: Array<SelectedItemsElement>;
  types_map: {
    number: TypesMapElement;
    string: TypesMapElement;
    bool: TypesMapElement
  };
  edit_json_data_element: {
    form: boolean;
    title: string | undefined;
    data: object;
    modal: boolean;
  };
  edit_json_data_element_data: {
    caption: string | undefined;
    code: string | undefined;
    type: string | undefined;
  }
  rules: ArrayItem
}
