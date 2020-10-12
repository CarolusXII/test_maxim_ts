<template>
  <v-card class="element-picker">
        <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <template v-if="items.length">
        <v-row align="center"
               v-ripple
               class="element-picker__item"
               :class="{ 'element-picker__item--selected' : selected_items.find(i => i[item_value] === item[item_value]) }"
               v-for="(item, index) in items"
               :key="index"
               @click="toggleItem(item)"
        >
          <span>{{ item[item_text] }}</span>
          <v-spacer></v-spacer>
          <slot name="info" :item="item"></slot>
          <slot name="action" :item="item"></slot>
        </v-row>
      </template>
      <template v-else>
        <span class="error--text">Нет данных</span>
      </template>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Prop, Watch} from 'vue-property-decorator'
    import { ArrayItem } from './types';

    @Component({
        model: {
            prop: 'selected_items_init',
            event: 'change-selected-items'
        }
    })

    export default class ElementPicker extends Vue {
        @Prop({type: Array, default: () => [{}]}) items: Array<object>;
        @Prop({type: Array, default: () => [{}]}) selected_items_init: Array<ArrayItem>;
        @Prop({type: String, default: () => 'id'}) item_value: string;
        @Prop({type: String, default: () => 'text'}) item_text: string;
        @Prop({type: String, default: () => ''}) readonly title: string;
        selected_items: Array<ArrayItem> = [];

        init() {
            this.selected_items = this.selected_items_init;
        }
        toggleItem(item_data: ArrayItem) {
            if (this.selected_items.find((si: ArrayItem) => si[this.item_value] === item_data[this.item_value])) {
                this.selected_items = this.selected_items.filter(i => i[this.item_value] !== item_data[this.item_value]);
            } else {
                this.selected_items.push(item_data);
            }
        }

        created(): void {
            this.init();
        }

        @Watch('items') itemsWatcher(new_val: Array<ArrayItem>, old_val: Array<ArrayItem>) {
            let flag = false;
            let _val = [].concat(new_val.map((i: ArrayItem) => i[this.item_value]).sort((a, b) => a < b ? -1 : 1));
            let _old_val = [].concat(old_val.map((i: ArrayItem) => i[this.item_value]).sort((a, b) => a < b ? -1 : 1));
            if (_val.length !== _old_val.length) flag = true;
            if (!flag) {
                for (let i in _val) {
                    if (_val[i] !== _old_val[i]) flag = true;
                    break;
                }
            }
            if (flag) {
                this.selected_items = this.$store.getters.getIntersectionArray(this.selected_items, new_val, this.item_value);
            }
        }

    }

</script>
