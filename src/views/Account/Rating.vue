<template lang="pug">
.rating-wrapper
  .account-item-header
    apexcharts(
      type="line"
      width="100%"
      height="350px"
      :series="[{data: [123, 1323, 2222, 1444, 2331, 1231, 3221, 2334], name: 'Какое то название1'}]"
      :options="{...settingsDefaultLine, ...{ colors: ['#00FF47'], labels: this.labels }}"
    )
    apexcharts(
      type="bar"
      width="100%"
      height="350px"
      :series="[{data: [123, 1323, 2222, 1444, 2331, 1231, 3221, 2334], name: 'Какое то название2'}]"
      :options="{...settingsDefaultLine, ...settingsDefaultBar, ...{ colors: ['#1A2DFF'], labels: this.labels }}"
    )
    apexcharts(
      type="line"
      width="100%"
      height="350px"
      :series="[{data: [123, 1323, 2222, 1444, 2331, 1231, 3221, 2334], name: 'Какое то название3'}]"
      :options="{...settingsDefaultLine, ...{ colors: ['#D52B1E'], labels: this.labels }}"
    )
    apexcharts(
      type="line"
      width="100%"
      height="350px"
      :series="[{data: [123, 1323, 2222, 1444, 2331, 1231, 3221, 2334], name: 'Какое то названи4'}]"
      :options="{...settingsDefaultLine, ...{ colors: ['#0039A6'], labels: this.labels }}"
    )
</template>

<script>
export default {
  name: "rating",
  data() {
    return {
      labels: [
        "01.05.20",
        "04.05.20",
        "05.05.20",
        "06.05.20",
        "08.05.20",
        "10.05.20",
        "11.05.20",
        "13.05.20"
      ],
      settingsDefaultLine: {
        chart: { toolbar: { show: false } },
        legend: { show: false },
        grid: {
          xaxis: { lines: { show: true } },
          yaxis: { lines: { show: true } }
        }
      },
      settingsDefaultBar: {
        dataLabels: { enabled: false }
      }
    };
  }
};
</script>

<style lang="sass" scoped>
.rating-wrapper
  width: 100%
</style>
