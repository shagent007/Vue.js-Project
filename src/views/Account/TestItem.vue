<template lang="pug">
.wrapper-test-item
  gg-input(icon="fas fa-pen" :label="ACCOUNT_FUNCTIONAL.test.Labels.questionNum + (index+1)")
  .radio
    .item
      input(:id="`question${index}1`" type="radio" :name="'question'+index" @click="item.isVariant = true" checked="true")
      label(:for="`question${index}1`") {{ACCOUNT_FUNCTIONAL.test.isVariant}}
    .item  
      input(:id="`question${index}2`" type="radio" :name="'question'+index" @click="item.isVariant = false")  
      label(:for="`question${index}2`") {{ACCOUNT_FUNCTIONAL.test.noVariant}}
  .inputs(v-if="item.isVariant")
    gg-input(
      v-for="answer in 4" 
      :key="answer" 
      :label="ACCOUNT_FUNCTIONAL.test.Labels.answerNum.start + answer + ACCOUNT_FUNCTIONAL.test.Labels.answerNum.end")
  .inputs(v-if="!item.isVariant") 
    gg-input( :label="ACCOUNT_FUNCTIONAL.test.Labels.variant")
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    ...mapGetters("staticData", ["ACCOUNT_FUNCTIONAL"])
  }
};
</script>
