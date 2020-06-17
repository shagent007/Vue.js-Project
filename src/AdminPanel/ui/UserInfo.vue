<template lang="pug">
.User-info
  .User-info__greeting Здравствуйте, {{ name }}

  .User-info__image

    img(
      alt=""
      :src="image"
      width="100%"
      height="100%"
    )
</template>

<script>
export default {
  props: {
    name: String,
    image: String
  }
};
</script>

<style lang="sass" scoped>
.User-info
  display: flex
  align-items: center

.User-info__greeting
  font-weight: 600

/* картинка пользователя */

.User-info__image
  margin: 0 1rem

  // небольшой хак чтобы изображение было фиксированной ширины
  min-width: 50px
  min-height: 50px
  max-width: 50px
  max-height: 50px

  border-radius: 10px
  overflow: hidden
  box-shadow: 6px 2px 16px rgba(136, 165, 191, 0.54), -6px -2px 12px #FFFFFF
</style>
