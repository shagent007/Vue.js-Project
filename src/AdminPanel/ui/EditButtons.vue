<template lang="pug">
.EditButtons

  button.EditButtons__button.Button__delete(
    @click="$emit('delete')"
  ) Удалить {{ type }}

  button.EditButtons__button.Button__save(
    @click="$emit('save')"
  ) сохранить изменения
  
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="sass" scoped>
.EditButtons
  margin-top: 20px

  width: 100%
  display: flex
  justify-content: space-between

  @media screen and (max-width: $PhoneWidth)
    flex-flow: column nowrap

.EditButtons__button
  background: #E4EDF7
  box-shadow: 4px 2px 10px rgba(136, 165, 191, 0.54), -5px -3px 12px #FFFFFF

  border-radius: 10px
  border: 0

  color: $Black
  font-size: 16px
  font-weight: bold
  letter-spacing: 2px
  text-transform: uppercase

  padding: 15px
  cursor: pointer

  @media screen and (max-width: $PhoneWidth)
    margin: 20px 0 0

.EditButtons__button:focus
  opacity: 0.5
  background: #E4EDF7
  box-shadow: inset 3px 3px 7px rgba(136, 165, 191, 0.6), inset -3px -3px 7px #FFFFFF

.Button__delete
  color: $Red
</style>
