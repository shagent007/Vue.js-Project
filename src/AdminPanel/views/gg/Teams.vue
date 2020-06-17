<template lang="pug">
.Teams.Page__container
  .Page__title статистика команд

  .Page__title-inner таблица команд китая
  .Team__table.AdminPanel__table
    gg-table(
      :headers="tableHeaders"
      :data="tableData"
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
      tableHeaders: [
        {
          name: "Номер",
          value: "id",
          minWidth: 150
        },
        {
          name: "Название",
          value: "name",
          minWidth: 150
        },
        {
          name: "Количество участников",
          value: "membersCount",
          minWidth: 200
        },
        {
          name: "Тренер",
          value: "trainer",
          minWidth: 150
        },
        {
          name: "Дата формирования",
          value: "date",
          minWidth: 200
        }
      ],

      tableData: new Array(10).fill({
        id: 1,
        name: "Хубэй",
        membersCount: 21,
        trainer: "Мау дзэ Дун",
        date: "01.01.2020 г."
      })
    };
  }
};
</script>

<style lang="sass" scoped></style>
