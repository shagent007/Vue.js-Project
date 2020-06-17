<template lang="pug">
.Activity.Page__container
  .Page__title активность

  .Page__title-inner зарегестрированные пользователи

  .Activity__table.AdminPanel__table
    gg-table(
      :headers="tableHeaders"
      :data="tableData"
    )

  .Page__title-inner График регистрации пользователей на текущий месяц

  .Activity__graphic(v-if="componentMounted")
    apexcharts(
      type="bar"
      :options="chartOptions" 
      :series="chartSeries"
    )
</template>

<script>
import GgTable from "@/components/Base/GgTable";

export default {
  components: {
    GgTable
  },

  data() {
    return {
      componentMounted: false,

      tableHeaders: [
        {
          name: "Дата",
          value: "date",
          minWidth: 100
        },
        {
          name: "Состав",
          value: "members",
          minWidth: 100
        },
        {
          name: "Должность",
          value: "position",
          minWidth: 100
        }
      ],

      tableData: new Array(10).fill({
        date: "01.01.20",
        members: "В. В. Путин",
        position: "Тренер"
      }),

      chartOptions: {
        colors: ["#22D1C6"],
        chart: { toolbar: { show: false }, width: "100%" },
        legend: { show: false },
        grid: {
          xaxis: { lines: { show: true } },
          yaxis: { lines: { show: true } }
        },
        dataLabels: { enabled: false }
      },

      chartSeries: [
        {
          name: "",
          data: [
            2.3,
            3.1,
            4.0,
            10.1,
            4.0,
            3.6,
            3.2,
            2.3,
            1.4,
            0.8,
            0.5,
            0.2,
            2.3,
            3.1,
            4.0,
            10.1,
            4.0,
            3.6,
            2.3,
            3.1,
            4.0,
            10.1,
            4.0,
            3.6
          ]
        }
      ]
    };
  },

  mounted() {
    // хак, чтобы график не "расплывался" на 150% ширины контейнера
    this.componentMounted = true;
  }
};
</script>

<style lang="sass" scoped>
.Activity__graphic
  width: 100%
  overflow: hidden
</style>
