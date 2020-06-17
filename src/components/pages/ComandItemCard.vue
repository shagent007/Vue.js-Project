<template lang="pug">
.comand-card

  img.comand-card__flag(
      :src="flag"
      height="100%"
      alt=""
    )

  gg-confirm
    gg-tooltip(tooltipText="Исключить участника")
      svg-delete-team-participant.comand-card__delete

  img.comand-card__image(
      :src="image"
      height="100%"
      alt=""
    )

  //- пока не используется, когда будет нужно - раскомментить
    .comand-card__rating(v-if="ratingCount && ratingStars")
      star-rating(
        :starsCount="ratingCount"
        :stars="ratingStars"
      )

  p.comand-card__type {{ type }}

  p.comand-card__name {{ name }}

</template>

<script>
import StarRating from "@/components/pages/StarRating";
import GgTooltip from "@/components/Base/GgTooltip";
import GgConfirm from "@/components/Base/GgConfirm";

export default {
  components: {
    StarRating,
    GgTooltip,
    GgConfirm,
    "svg-delete-team-participant": () =>
      import("@/components/svg/DeleteTeamParticipant")
  },

  props: {
    flag: String,
    image: String,
    ratingStars: String,
    ratingCount: String,
    type: String, // наставник, тренер, участник
    name: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

/* контейнер */
.comand-card
  position: relative

/* флаг слева вверху */
.comand-card__flag
  position: absolute
  max-width: 40px
  max-height: 40px

/* фото участника */
.comand-card__image
  width: 100%
  min-height: 180px

  object-fit: cover
  object-position: 50% 50%

/* рейтинг участника */
.comand-card__rating
  display: flex
  justify-content: flex-end

/* информация о участнике */
.comand-card__type, .comand-card__name
  text-align: center

.comand-card__name
  font-weight: bold

/* удаление участника */
.comand-card__delete
  position: absolute
  top: 0
  right: 0
  background-color: $White
  box-shadow: -3px 3px 3px 1px $Grey
</style>
