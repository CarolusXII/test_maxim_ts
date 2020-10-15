import { ConstructorState } from './types';

export const state: ConstructorState = {
  JSON_data: [],
  selected_items: [],
  types_map: {
    number: {
      name: 'Число',
      condition: ['gt', 'lt', 'gte', 'lte', 'eq', 'neq']
    },
    string: {
      name: 'Строка',
      condition: ['like', 'eq', 'neq']
    },
    bool: {
      name: 'Булево значение',
      condition: ['eq']
    }
  },

  edit_json_data_element: {
    title: undefined,
    data: {
      caption: undefined,
      code: undefined,
      type: undefined
    },
    form: true,
    modal: false
  },
  edit_json_data_element_data: {
    caption: undefined,
    code: undefined,
    type: undefined
  },
  rules: {
    required_field: (v: any) => !!v || ''
  },
  modal_edit_json_data: false
}
