<template lang="pug">
.wrapper-test
  .account-item-header
    .test
      h1.title-edit {{testTitle}}
      .quest(
        v-for="(item, index) in tests"
        :key="index"
      )
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
  bottom-buttons(type="тест" @save="save")  
</template>

<script>
import GgInput from "@/components/Base/GgInput";
import BottomButtons from "./BottomButtons";

import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    testTitle: {
      type: String,
      default: "Создать тест"
    }
  },
  data() {
    return {
      tests: [
        {
          quest: "",
          isVariant: true,
          first: "",
          second: "",
          third: "",
          fourth: ""
        },
        {
          quest: "",
          isVariant: true,
          first: "",
          second: "",
          third: "",
          fourth: ""
        },
        {
          quest: "",
          isVariant: true,
          first: "",
          second: "",
          third: "",
          fourth: ""
        },
        {
          quest: "",
          isVariant: true,
          first: "",
          second: "",
          third: "",
          fourth: ""
        },
        {
          quest: "",
          isVariant: true,
          first: "",
          second: "",
          third: "",
          fourth: ""
        },
        {
          quest: "",
          isVariant: true,
          first: "",
          second: "",
          third: "",
          fourth: ""
        },
        {
          quest: "",
          isVariant: true,
          first: "",
          second: "",
          third: "",
          fourth: ""
        },
        {
          quest: "",
          isVariant: true,
          first: "",
          second: "",
          third: "",
          fourth: ""
        },
        {
          quest: "",
          isVariant: true,
          first: "",
          second: "",
          third: "",
          fourth: ""
        },
        {
          quest: "",
          isVariant: true,
          first: "",
          second: "",
          third: "",
          fourth: ""
        }
      ]
    };
  },

  computed: {
    ...mapGetters("staticData", ["ACCOUNT_FUNCTIONAL"])
  },

  methods: {
    ...mapActions("accountFiles", ["cancelEditing"]),
    save() {
      this.cancelEditing();
      this.$router.push({ name: "AccountFiles" });
    }
  },

  components: {
    GgInput,
    BottomButtons
  }
};
</script>

<style lang="sass" scoped>
.quest
  width: 100%
  margin: auto
  margin-top: 3rem

.test
  padding: 1rem
  padding-top: 0rem

.wrapper-test
  display: flex
  flex-flow: column nowrap

.account-item-header
  flex: 1

.title-edit
  margin-top: 0rem

// взял со страницы @/components/Account/Functional/TrainerMentor.vue
.testItem
  margin-bottom: 4rem
.radio
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 1rem
  margin-top: 1rem
  margin-bottom: 1rem
  input[type=radio]
    display: none
  input[type=radio] + label:before
    content: "\2714"
    color: transparent
    display: inline-block
    border: 1px solid $Black
    font-size: 20px
    font-weight: 900
    line-height: 22px
    margin: -5px 5px 0 0
    height: 20px
    width: 20px
    text-align: center
    vertical-align: middle
    transition: color ease .3s
  input[type=radio]:checked + label:before
    color: rgb(31,142,79)
    border-color: rgb(31,142,79)

.inputs
  display: grid
  row-gap: 1rem
</style>
