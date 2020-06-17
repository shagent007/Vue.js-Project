<template lang="pug">
.card

  router-link.info(to="#")

    .info__header

      .info__image
        img.info__image-img(
          v-if="image"
          :src="image"
          width="100%"
          height="100%"
        )

      .info__rating

        star-rating(
          starsCount="100"
          stars="2"
        )

        recruitment-comand(
          :recruitmentOpen="recruitmentOpen"
        )

    .info__name команда "{{ name }}"
    .info__count состав: {{ participantCount }} участников
    .info__trainer тренер: {{ trainer }}
    .info__mentor наставник: {{ mentor }}

  gg-button.card__button(
    color="red" 
    @click="$emit('buttonClick')"
  ) попроситься в команду
</template>

<script>
import GgButton from "@/components/Base/GgButton";
import StarRating from "@/components/pages/StarRating";
import RecruitmentComand from "@/components/pages/RecruitmentComand";

import { mapGetters } from "vuex";
export default {
  components: {
    GgButton,
    StarRating,
    RecruitmentComand
  },

  name: "information-card",
  props: {
    id: String,
    image: String,
    name: String,
    participantCount: String,
    recruitmentOpen: Boolean,
    trainer: String,
    mentor: String
  },
  data() {
    return {
      publicPath: process.env.BASE_URL + "groupPeoplesPage/dynamic/"
    };
  },
  methods: {
    routCardPage() {
      const { img, name, team, id, age, city, buttonName } = this;
      this.$emit("routCardPage", {
        img,
        name,
        team,
        id,
        age,
        city,
        buttonName
      });
    }
  }
};
</script>

<style lang="sass" scoped>
/* контейнер карточки */
.info
  border: 2px solid transparent
  text-align: center

  color: $Black
  background-color: $White

  display: block
  padding: 10px
  box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)

.info:focus
  border: 2px solid #C6CACC
  box-shadow: none

/* шапка карточки */
.info__header
  position: relative

/* картинка команды */
.info__image
  height: 100px

.info__image-img
  object-fit: contain
  object-position: 50% 50%
  width: 100%

/* статистика команды */
.info__rating
  position: absolute
  top: 0
  right: 0

  display: flex
  flex-flow: column nowrap
  align-items: center

/* самый разный текст */
.info__name
  +afs(24px, 18px, 14px)
.info__count
  +afs(12px, 12px, 10px)
.info__trainer
  +afs(16px, 16px, 14px)
.info__mentor
  +afs(14px, 14px, 12px)

.info__name,
.info__count,
.info__trainer,
.info__mentor
  text-transform: uppercase
  padding: 10px

/* кнопочка */
.card__button
  width: 80%
  margin: auto
  margin-top: 20px
  font-weight: bold
  text-shadow: 0px 1px 2px rgba(8, 35, 48, 0.24), 0px 2px 6px rgba(8, 35, 48, 0.16)
</style>
