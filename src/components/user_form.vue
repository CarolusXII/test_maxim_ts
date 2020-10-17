<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-col>
          <v-row>
            <v-col>Форма пользователя</v-col>
          </v-row>
          <v-row>
            <v-form ref="form_user_interface">
              <v-col class="xs12">
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="5"
                    lg="4"
                    xl="3"
                    v-for="(field, index) in selected_items"
                    :key="index"
                  >
                    <v-text-field
                      v-if="field.type === 'string'"
                      v-model="field.value"
                      :label="field.caption"
                      type="string"
                      :rules="getRules(field)"
                    ></v-text-field>
                    <v-text-field
                      v-else-if="field.type === 'number'"
                      v-model.number="field.value"
                      :label="field.caption"
                      type="number"
                      :rules="getRules(field)"
                    ></v-text-field>
                    <v-checkbox
                      v-else
                      v-model="field.value"
                      :label="field.caption"
                      on-icon="done"
                      :rules="getRules(field)"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-col>
            </v-form>
          </v-row>
        </v-col>

      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    import {Getter} from "vuex-class";
    import {SelectedItemsElement, ValidationData} from "./types";

    const namespace = 'constructor';

    @Component({})

    export default class UserForm extends Vue {
        @Getter('getSelectedItems', {namespace}) selected_items: any;

        getRules(field: SelectedItemsElement) {
            let rules: Array<Function> = [],
                validation_data: ValidationData = {
                    number: {
                        gt: (v: number) => v > field.condition['gt'] || '',
                        lt: (v: number) => v < field.condition['lt'] || '',
                        gte: (v: number) => v >= field.condition['gte'] || '',
                        lte: (v: number) => v <= field.condition['lte'] || '',
                        eq: (v: number) => v === field.condition['eq'] || '',
                        neq: (v: number) => v !== field.condition['neq'] || ''
                    },
                    string: {
                        like: (v: string) => v ? v.includes(field.condition['like']) || '' : '',
                        eq: (v: string) => v === field.condition['eq'] || '',
                        neq: (v: string) => v !== field.condition['neq'] || ''
                    },
                    bool: {
                        eq: (v: boolean) => v === field.condition['eq'] || ''
                    }
                }
            for (let key in field.condition) {
                if (validation_data[field.type] && validation_data[field.type][key]) {
                    rules.push(validation_data[field.type][key]);
                }
            }
            return rules;
        }
    }
</script>
