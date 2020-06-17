<template lang="pug">
.stars
  span.star(
    v-for="star in 5"
    :key="star"
  )
    img(src="@/assets/ui/GreyStar.svg" v-if="star > parsedStars")
    img(src="@/assets/ui/GoldStar.svg" v-else)

  span.count {{starsCount}}
</template>

<script>
export default {
  props: ["starsCount", "stars"], // сделал так, чтобы можно было кидать и строку и число

  computed: {
    parsedStars() {
      return parseInt(this.stars);
    }
  }
};
</script>

<style lang="sass" scoped>
.stars
  display: flex
  align-items: center
  line-height: 0
  font-size: 10px
  letter-spacing: 0
  font-weight: bold

.star
  padding-right: 5px

.count
  color: $Grey
  padding-top: 2px
</style>
