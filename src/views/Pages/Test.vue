<template lang="pug">
main-layout
	.container
		.QaItem(v-for="(item,index) in TEST" :key="index")
			.question
				.title {{TEST_PAGE.questionNum}} {{index+1}} 
				.text {{item.question}}
			.answer(ref="answer")
				.test(v-if="item.isVariant")
					.item( v-for="(answer,AnswerIndex) in item.answer" :key="AnswerIndex")
						.title {{TEST_PAGE.variantNum}} {{AnswerIndex+1}} 
						input(
              :id="`test${index}I${AnswerIndex}`" 
              type="radio" :name="`test${index}`" 
              :value="answer.variant" 
            )
						label(:for="`test${index}I${AnswerIndex}`") {{answer.text}}
				.text-answer(v-if="!item.isVariant")
					gg-input(icon="fas fa-pen" :label="TEST_PAGE.answer" borderType="dashed") 
		gg-button(color="red" @click.prevent="results") {{TEST_PAGE.button}}
</template>

<script>
import GgInput from "@/components/Base/GgInput";
import GgButton from "@/components/Base/GgButton";
import { mapGetters } from "vuex";
export default {
  name: "test",
  data() {
    return {
      answers: []
    };
  },
  computed: {
    ...mapGetters("test", ["TEST"]),
    ...mapGetters("staticData", ["TEST_PAGE"])
  },
  methods: {
    results() {
      this.$refs.answer.forEach(element => {
        switch (element.children[0].className[2]) {
          case "s":
            element.children[0].children.forEach(item => {
              if (item.children[1].checked)
                this.answers.push(item.children[1].value);
            });
            break;
          case "x":
            this.answers.push(
              element.children[0].children[0].children[1].value
            );
            break;
        }
      });
      console.log(this.answers);
    }
  },
  components: {
    GgInput,
    GgButton
  }
};
</script>

<style lang="sass" scoped>
.QaItem
  margin-bottom: 4rem

.title
  +afs(18px,16px , 14px)
  color: $Grey
  margin-bottom: 1rem

.question
  margin-bottom: 2rem
  .text
    border-bottom: 1px solid $Black
    padding: 0rem .5rem
    font-weight: 500

.answer
  .test
    display: grid
    grid-gap: 1rem


.item
  label
    display: grid
    grid-template-columns: auto 1fr
    grid-gap: 1rem
    border-bottom: 1px dashed $Grey
    padding-bottom: 1rem
    padding-left: 1rem
    align-items: center
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
    height: 20px
    width: 20px
    text-align: center
    vertical-align: middle
    transition: color ease .3s
input[type=radio]:checked + label:before
    color: rgb(31,142,79)
    border-color: rgb(31,142,79)

.btn-red
  padding: 0.5rem 2rem
  margin: 0rem 0rem 0rem auto
</style>
