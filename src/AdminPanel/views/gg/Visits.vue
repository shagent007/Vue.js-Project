<template lang="pug">
.Visits.Page__container(v-if="pageMounted")
  .Page__title статистика посещения

  .Page__title-inner график посещения за 2020 год
  .Visitrs__graphic-current-year
    apexcharts(
      type="line"
      :series="currentYearData"
      :options="{ ...settingsDefaultLine, ...currentYearOptions }"
    )

  .Page__title-inner График посещения за текущий месяц
  .Visitrs__graphic-current-month
    apexcharts(
      type="area"
      :series="currentMonthData"
      :options="{ ...settingsDefaultLine, ...currentMonthOptions }"
    )

  .Page__title-inner График посещения за прошлый месяц
  .Visitrs__graphic-last-month
    apexcharts(
      type="bar"
      :series="lastMonthData"
      :options="{ ...settingsDefaultLine, ...lastMonthOptions }"
    )

</template>

<script>
export default {
  data() {
    return {
      pageMounted: false,
      settingsDefaultLine: {
        dataLabels: { enabled: false },
        chart: { toolbar: { show: false } },
        legend: { show: false },
        grid: {
          xaxis: { lines: { show: true } },
          yaxis: { lines: { show: true } }
        }
      },

      currentYearData: [
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
      ],

      currentYearOptions: {
        colors: ["#F44336"]
      },

      currentMonthData: [
        {
          name: "Inflation",
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
      ],

      currentMonthOptions: {
        colors: ["#80e066"],
        fill: {
          colors: ["#80e066"],
          type: "solid"
        },
        stroke: {
          curve: "straight"
        }
      },

      lastMonthData: [
        {
          name: "Inflation",
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
      ],

      lastMonthOptions: {
        colors: ["#AD00FF"]
      }
    };
  },

  mounted() {
    // хак
    this.pageMounted = true;
  }
};
</script>

<style lang="sass" scoped></style>
