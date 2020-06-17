<template lang="pug">
main-layout
  .Team.container

    .Team__header
      .Team__title команда "{{ comandName }}"
      .Team__status
        gg-tooltip(tooltipText="Открыт набор в команду")
          recruitment-comand(
            recruitmentOpen
          )

    comand-item(
      v-bind="comandInfo"
    )

    .Team__button
      gg-button(
        color="red"
      ) Пригласить в команду
</template>

<script>
import ComandItem from "@/components/pages/ComandItem";
import RecruitmentComand from "@/components/pages/RecruitmentComand";
import GgButton from "@/components/Base/GgButton";
import GgTooltip from "@/components/Base/GgTooltip";

export default {
  components: {
    ComandItem,
    GgButton,
    RecruitmentComand,
    GgTooltip
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
  }
};
</script>

<style lang="sass" scoped>
.Team__header
	display: flex
	justify-content: space-between
.Team__title
	text-transform: uppercase
	+afs(36px, 32px, 24px)
.Team__status
	cursor: pointer

.Team__button
  margin-top: 20px
  display: flex
  justify-content: flex-end
</style>
