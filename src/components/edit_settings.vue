<template>
  <v-dialog
    v-model="edit_settings.modal"
    persistent
    max-width="500"
  >
    <v-card>
      <v-card-title>
        <v-col class="xs12">
          <v-row>Настройка условий для поля:</v-row>
          <v-row>
            <h3>{{ `${edit_settings.data.caption} (${edit_settings.data.code})` }}</h3>
          </v-row>
          <v-row>Тип данных: {{ edit_settings.condition_data.name }}</v-row>
        </v-col>
      </v-card-title>
      <v-card-text>
        <v-col class="12">
          <v-form ref="form_edit_settings" v-model="form">
            <v-row>
              <v-select
                label="Условия"
                :items="filtered_condition"
                v-model="selected_condition"
                @change="v => selectCondition(v)"
                multiple
                :rules="[rules.required_arr]"
              ></v-select>
            </v-row>
            <v-row v-for="(condition, key) in edit_settings.data.condition" :key="key">
              <v-text-field
                v-if="edit_settings.data.type === 'string'"
                :label="key"
                v-model="edit_settings.data.condition[key]"
                type="text"
                :rules="[rules.required_field]"
              ></v-text-field>
              <v-text-field
                v-else-if="edit_settings.data.type === 'number'"
                :label="key"
                v-model.number="edit_settings.data.condition[key]"
                type="number"
                :rules="[rules.required_field]"
              ></v-text-field>
              <v-checkbox
                v-else
                :label="key"
                on-icon="done"
                off-icon=""
                mandatory
                v-model="edit_settings.data.condition[key]"
              ></v-checkbox>
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
                  @click="saveSettings"
                >
                  <v-icon>done</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Constructor from 'vue-class-component'
    import {Getter, Mutation} from "vuex-class"
    import {Watch} from "vue-property-decorator";

    const namespace = 'constructor';

    @Constructor({})

    export default class EditSettings extends Vue {
        @Getter('getEditSettings', {namespace}) edit_settings: any;
        @Getter('getNotIntersectionArray') getNotIntersectionArray: any;
        @Getter('getRules', {namespace}) rules: any;
        @Mutation('updateSelectedItem', {namespace}) updateSelectedItem: any;
        @Mutation('closeModalEditSettings', {namespace}) closeModalEditSettings: any;
        selected_condition: Array<string> = [];

        @Watch('edit_settings.modal') modalWatcher(new_val: boolean) {
            if (!new_val) return;
            if (this.edit_settings.data.condition && Object.keys(this.edit_settings.data.condition).length) {
                this.selected_condition = Object.keys(this.edit_settings.data.condition);
            }
        }

        form: boolean = true;

        selectCondition(v: Array<string>) {
            let new_condition = v.filter(i => this.edit_settings.data.condition[i] === undefined);
            for (let key in this.edit_settings.data.condition) {
                if (!v.includes(key)) this.$delete(this.edit_settings.data.condition, key);
            }
            new_condition.forEach(item => {
                this.$set(this.edit_settings.data.condition, item, undefined);
            })
        }

        saveSettings(): void {
            if ((this.$refs.form_edit_settings as Vue & { validate: () => boolean }).validate()) {
                this.updateSelectedItem(this.edit_settings.data);
                this.closeModal();
            }
        }

        closeModal(): void {
            this.closeModalEditSettings();
            this.selected_condition = [];
            (this.$refs.form_edit_settings as Vue & { resetValidation: () => boolean }).resetValidation();
        }

        get filtered_condition() {
            if (this.edit_settings.data.condition && !Object.keys(this.edit_settings.data.condition).length) {
                return this.edit_settings.condition_data.condition;
            } else {
                return this.edit_settings.condition_data.condition;
            }
        }
    }

</script>
