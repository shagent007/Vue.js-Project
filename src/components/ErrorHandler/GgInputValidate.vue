<template lang="pug">
.form-group(:class="{ error: error.$error }")
  slot <!-- input -->
  gg-validation-error(:error="error" class="error-field")
</template>

<script>
import GgValidationError from "./GgValidationError";

export default {
  props: {
    error: Object
  },
  components: {
    GgValidationError
  }
};
</script>

<style lang="sass" scoped>
.form-group
  position: relative

  .error-field
    position: absolute
    bottom: -1rem

  &.error
    /deep/ .input
      .label
        color: $Red
      .underline
        background-color: $Red
</style>
