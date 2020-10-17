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
    import { Prop, Watch, Model, Emit } from 'vue-property-decorator'
    import { Getter } from 'vuex-class'
    import { ArrayItem } from './types'

    @Component({})

    export default class ElementPicker extends Vue {
        @Model('change-selected-items', { type: Array }) selected_items_init: Array<ArrayItem>;
        @Prop({type: Array, default: () => [{}]}) items: Array<object>;
        @Prop({type: String, default: () => 'id'}) item_value: string;
        @Prop({type: String, default: () => 'text'}) item_text: string;
        @Prop({type: String, default: () => ''}) readonly title: string;
        @Emit('change-selected-items') changeSelectedItems(val: Array<object>) {
            return val;
        }
        @Getter('getIntersectionArray') getIntersectionArray: any;
        selected_items: Array<ArrayItem> = [];

        init(): void {
            this.selected_items = this.selected_items_init;
        }
        toggleItem(item_data: ArrayItem): void {
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
                this.selected_items = this.getIntersectionArray(this.selected_items, new_val, this.item_value);
            }
        }
        @Watch('selected_items') selectedItemsWatcher(new_val: Array<ArrayItem>) {
            this.changeSelectedItems(new_val);
        }

    }

</script>

<style lang="scss">
  .element-picker {
    .element-picker__item {
      padding: 4px 8px;
      cursor: pointer;
      height: 40px;
      &.element-picker__item--selected {
        background-color: #ebebeb;
      }
      span {
        user-select: none;
        font-size: 18px;
      }
    }
  }
</style>
