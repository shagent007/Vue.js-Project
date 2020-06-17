<template lang="pug">
.error(v-if="error.$error")

  p(
    v-if="!error.required && error.required !== undefined"
  ) {{GG_VALIDATION_ERROR.importantField}}

  p(
    v-else-if="!error.minLength && error.minLength != undefined"
  ) {{GG_VALIDATION_ERROR.minSymbols}}

  p(
    v-else-if="!error.maxLength && error.maxLength !== undefined"
  ) {{GG_VALIDATION_ERROR.maxSymbols}}

  p(
    v-else-if="!error.sameAsPassword && error.sameAsPassword !== undefined"
  ) {{GG_VALIDATION_ERROR.passwordMismatch}}

  p(
    v-else-if="!error.valid && error.valid !== undefined"
  ) {{GG_VALIDATION_ERROR.fieldIncorrect}}

  p(
    v-else-if="!error.newPasswordInvalid && error.newPasswordInvalid !== undefined"
  ) {{GG_VALIDATION_ERROR.newPasswordSameOldOne}}

  p(
    v-else-if="!error.sameAsOldPassword && error.sameAsOldPassword !== undefined"
  ) {{GG_VALIDATION_ERROR.sameAsOldPassword}}

</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    error: Object
  },
  computed: {
    minSymbols() {
      return `Поле должно содержать как минимум ${this.error.$params.minLength.min} символов`;
    },
    maxSymbols() {
      return `Поле не должно содержать более ${this.error.$params.maxLength.max} символов`;
    },
    ...mapGetters("staticData", ["GG_VALIDATION_ERROR"])
  }
};
</script>

<style lang="sass" scoped>
.error
  font-size: 0.75rem
  line-height: 1
  color: $Red

  p
    margin: 0
</style>
