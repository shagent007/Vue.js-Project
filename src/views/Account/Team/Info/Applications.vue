<template lang="pug">
.Applications
  gg-table(
    :headers="tableHeaders"
    :data="tableData"
  )
    template(v-slot:default="{ cell }")

      template(v-if="cell.key === 'confirm'")
        gg-confirm
          img.Applications__edit(
            src="@/assets/ui/accept.svg"
          )

      template(v-else-if="cell.key === 'delete'")
        gg-confirm
          img.Applications__edit(
            src="@/assets/ui/deleteRed.svg"
          )

      template(v-else-if="cell.key === 'view'")
        img.Applications__edit(
          src="@/assets/ui/docIcon.svg"
        )

      template(v-else) {{ cell.prop }}
</template>

<script>
import GgTable from "@/components/Base/GgTable";
import GgConfirm from "@/components/Base/GgConfirm";

import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    GgTable,
    GgConfirm
  },

  data() {
    return {
      tableData: Array(9).fill({
        id: 1,
        structure: "hello js",
        position: "trainer",
        city: "Moscow",
        rating: 9000
      }),
      tableHeaders: [
        {
          name: "Номер",
          value: "id",
          minWidth: 100
        },
        {
          name: "Состав",
          value: "structure",
          minWidth: 150
        },
        {
          name: "Должность",
          value: "position",
          minWidth: 150
        },
        {
          name: "Город",
          value: "city",
          minWidth: 150
        },
        {
          name: "Рейтинг",
          value: "rating",
          minWidth: 100
        },
        {
          // name: "",
          value: "confirm",
          minWidth: 100
        },
        {
          // name: "",
          value: "delete",
          minWidth: 100
        },
        {
          // name: "",
          value: "view",
          minWidth: 100
        }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
.Applications__edit
  cursor: pointer
</style>
