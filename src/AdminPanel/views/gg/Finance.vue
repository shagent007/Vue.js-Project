<template lang="pug">
.Finance.Page__container
  .Page__title статистика финансов

  .Page__title-inner таблица финансов за текущий месяц
  .Finance__table-month.AdminPanel__table
    gg-table(
      :headers="currentMonthHeaders"
      :data="currentMonthData"
    )

  .Page__title-inner таблица финансов за 2020 год

  .Finance__table-month.AdminPanel__table
    gg-table(
      :headers="currentYearHeaders"
      :data="currentYearData"
    )
</template>

<script>
import BaseButton from "@/AdminPanel/ui/BaseButton";
import GgTable from "@/components/Base/GgTable";

export default {
  components: {
    BaseButton,
    GgTable
  },

  data() {
    return {
      currentMonthHeaders: [
        {
          name: "Номер операции",
          value: "id",
          minWidth: 200
        },
        {
          name: "Пользователь",
          value: "user",
          minWidth: 200
        },
        {
          name: "Сумма, ₽",
          value: "sum",
          minWidth: 100
        },
        {
          name: "Вид операции",
          value: "operation",
          minWidth: 150
        },
        {
          name: "Дата",
          value: "date",
          minWidth: 100
        }
      ],

      currentMonthData: new Array(10).fill({
        id: "#0001",
        user: "В. В. Путин",
        sum: 5000,
        operation: "Оплата",
        date: "01.01.2020 г."
      }),

      currentYearHeaders: [
        {
          name: "Номер операции",
          value: "id",
          minWidth: 200
        },
        {
          name: "Месяц",
          value: "month",
          minWidth: 200
        },
        {
          name: "Сумма за месяц, ₽",
          value: "sum",
          minWidth: 200
        }
      ],

      currentYearData: new Array(10).fill({
        id: 1,
        month: "01.2020 г.",
        sum: 1000000
      })
    };
  }
};
</script>

<style lang="sass" scoped>
.Finance__table-month
  margin: 1rem 0

.Page__title-inner
  margin: 3rem 0 0
</style>
