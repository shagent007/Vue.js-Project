<template lang="pug">
gg-search-field.SearchField(
  :placeholder="`Найти ${type}...`" 
  :value="searchInput"

  textButton="Поиск"
  
  @input="input => $emit('input', input)"
  @search="$emit('search')"
)
</template>

<script>
import GgSearchField from "@/components/Base/GgSearchField";

export default {
  model: {
    prop: "searchInput",
    event: "input"
  },

  components: {
    GgSearchField
  },

  props: {
    type: {
      type: String,
      required: true
    },
    searchInput: String
  }
};
</script>

<style lang="sass" scoped>
.SearchField
  width: 100%
  height: 100%

.SearchField ::v-deep .button
  height: initial

.SearchField ::v-deep .input.search-input
  padding: 15px

.SearchField ::v-deep .search-bar__button,
.SearchField ::v-deep .input.search-input
  overflow: hidden
  background: #E4EDF7
  box-shadow: 4px 2px 10px rgba(136, 165, 191, 0.54), -5px -3px 12px #FFFFFF
  border-radius: 10px
</style>
