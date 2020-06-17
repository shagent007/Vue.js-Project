<template lang="pug">
.wrapper(ref="wrapper")

  table.table(:style="{ width: tableWidth }" v-if="!smallScreen")
    thead
      tr(class="head")
        th(v-for="(th, index) in headers" :key="index") {{ th.name }}
    tbody
      tr(v-for="(tr, trIndex) in data" :key="trIndex" class="row")
        td(v-for="(td, tdIndex) in headers.map(h => h.value)" :key="td")
          slot(:cell="{ key: td, prop: tr[td], rowID: trIndex }") {{tr[td]}}

  .table(v-else class="smallScreen")
    table(v-for="(dataRow, index) in data" :style="{ width: tableWidth }") 
      tr(v-for="(th, trIndex) in headers" :key="th.value")
        th(v-if="th.name") {{ th.name }}:
        td(:colspan="th.name ? 1 : 2")
          slot(:cell="{ key: th.value, prop: dataRow[th.value], rowID: trIndex }") {{ dataRow[th.value] }}
</template>

<script>
export default {
  props: {
    headers: Array,
    data: Array
    /*
      headers: [{
        name: String,
        value: String, // нужен для связывания значения с заголовком
        minWidth: Number
      }],
      data: [{}, {}]
    */
  },
  data() {
    return {
      tableWidth: 0,
      smallScreen: false,
      resize: false
    };
  },
  methods: {
    calculateTableWidth() {
      if (this.smallScreen) {
        this.tableWidth = "100%";
        return;
      }

      const wrapperWidth = this.$refs.wrapper.offsetWidth;

      if (wrapperWidth === 0) {
        setTimeout(this.calculateTableWidth, 100);
        return;
      }

      const tableWidth = this.headers.reduce((prev, curr) => {
        return curr.minWidth ? prev + curr.minWidth : prev + 100;
      }, 0);

      const coefficient = wrapperWidth / tableWidth;
      console.log(coefficient, wrapperWidth, tableWidth);
      this.tableWidth = coefficient >= 1 ? "100%" : tableWidth + "px";
    }
  },
  mounted() {
    this.smallScreen = document.body.offsetWidth < 576 ? true : false;
    this.calculateTableWidth();
  }
};
</script>

<style lang="sass" scoped>
.smallScreen
  table
    border: 1px solid $Grey
    margin-bottom: 10px

    th
      text-align: left
      padding-left: 10px

    td
      text-align: left

.wrapper
  width: 100%
  overflow: auto

table
  border-spacing: 0

td, th
  color: $Black
  padding: 15px 0
  text-align: center

.row
  td
    +afs(18px, 16px, 16px)
    border-bottom: 1px solid $LightGrey
  &:last-child
    td
      border-bottom: 0

.head th
  border-bottom: 4px solid $LightGrey
</style>
