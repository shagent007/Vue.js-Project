<template lang="pug">
select(:name="String" @change="$emit('input', $event.target.value)")
  option(v-if="placeholder" disabled selected) {{placeholder}}
  option(v-for="(item,index) in options" :key="index") {{item}} 
</template>

<script>
export default {
  name: "gg-options",
  props: {
    options: Array,
    placeholder: String,
    name: String,
    value: String
  }
};
</script>

<style lang="sass">
select
    border: none
    border-bottom: 1px solid #000
    transition: .3s
    font-family: "Gotham pro"
    width: 100%
    +afs(18px,16px,12px)
select:focus
    outline: none
    border-color: $Blue
</style>
