<template lang="pug">
.Team

  .Team-inner-wrapper

    template(v-if="trainerMentor")

      //- команды
      gg-collapse.Team__collapse-item(title='Команда "Москва"')

        template(#icon)

        template
          comand-item(
            v-bind="comandInfo"
          )

      //- создать команду
      gg-collapse.Team__collapse-item(title="Заявки в команду")
        table-applications

      gg-collapse.Team__collapse-item(
        title="Создать команду"
        :activeTab="Boolean($route.query.createcomand)"
      )
        create-comand

    template(v-else)
      .Team__title Команда "{{ comandName }}"

      comand-item(
        v-bind="comandInfo"
      )
</template>

<script>
import ComandItem from "@/components/pages/ComandItem";
import GgCollapse from "@/components/Base/GgCollapse";
import TableApplications from "./Applications";
import CreateComand from "./CreateComand";

import { mapActions, mapGetters } from "vuex";
export default {
  name: "team",
  components: {
    ComandItem,
    GgCollapse,
    TableApplications,
    CreateComand
  },
  props: {
    createcomand: Boolean
  },
  data() {
    return {
      comandName: "Moscow",
      comandInfo: {
        comand: Array(7).fill({
          flag: "flags/flag.png",
          image: "test-info-people.jpg",
          ratingStars: "5",
          ratingCount: "228",
          type: "жмых",
          name: "Владимир Путин Молодец"
        }),
        comandFlag: "flags/flag.png",
        name: "Армения",
        country: {
          name: "Наша Раша",
          countryFlag: "flags/flag.png"
        },
        rating: "3000434",
        about: `
Я в своем познании настолько преисполнился, что я как будто бы уже
сто триллионов миллиардов лет проживаю на триллионах и
триллионах таких же планет, как эта Земля, мне этот мир абсолютно
понятен, и я здесь ищу только одного - покоя, умиротворения и
вот этой гармонии, от слияния с бесконечно вечным...`
      }
    };
  },

  computed: {
    ...mapGetters("userInformation", ["getIsMentor", "getIsTrainer"]),

    trainerMentor() {
      return this.getIsTrainer || this.getIsMentor;
    }
  }
};
</script>

<style lang="sass" scoped>
.Team-inner-wrapper
  padding: 20px

.Team__title
  +afs(24px, 18px, 16px)
  text-transform: uppercase
  margin-bottom: 20px

.Team__collapse-item
  margin-bottom: 20px
</style>
