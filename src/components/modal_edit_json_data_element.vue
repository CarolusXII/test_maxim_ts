<template>
  <v-dialog
    v-model="edit_json_data_element.modal"
    persistent
    max-width="400"
  >
    <v-card>
      <v-card-title>
        {{ edit_json_data_element.title }}
      </v-card-title>
      <v-card-text>
        <v-form
          v-model="edit_json_data_element.form"
          ref="form_edit_json_data_element"
        >
          <v-col class="xs12">
            <v-row v-if="edit_json_data_element.data.code !== undefined">
              <v-text-field
                label="Код поля"
                v-model="edit_json_data_element.data.code"
                readonly
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                label="Название поля"
                v-model="edit_json_data_element.data.caption"
                :rules="[rules.required_field]"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-select
                label="Тип данных"
                :items="types"
                v-model="edit_json_data_element.data.type"
                :rules="[rules.required_field]"
              ></v-select>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-col class="fix-flex">
                <v-btn
                  @click="closeModal"
                >
                  <v-icon>clear</v-icon>
                </v-btn>
              </v-col>
              <v-col class="fix-flex">
                <v-btn
                  @click="saveElement"
                >
                  <v-icon>done</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
    import Vue from "vue"
    import Component from 'vue-class-component'
    import {Getter, Mutation, Action} from "vuex-class";

    const namespace = 'constructor';

    @Component({
        name: 'ModalEditJsonDataElement'
    })

    export default class ModalEditJSONDataElement extends Vue {
        @Getter('getEditJSONDataElement', {namespace}) edit_json_data_element: any;
        @Getter('getRules', {namespace}) rules: any;
        @Getter('getTypes', {namespace}) types: any;
        @Mutation('closeModalEditJSONElement', {namespace}) closeModalEditJSONElement: any;
        @Action('saveEditJSONElement', {namespace}) saveEditJSONElement: any;

        saveElement() {
            if ((this.$refs.form_edit_json_data_element as Vue & { validate: () => boolean }).validate()) {
                this.saveEditJSONElement(this.edit_json_data_element.data);
                this.closeModal();
            }
        }

        closeModal() {
            this.closeModalEditJSONElement();
            (this.$refs.form_edit_json_data_element as Vue & { resetValidation: () => boolean }).resetValidation();
        }
    }

</script>
