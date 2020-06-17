<template lang="pug">
//- если открыта страница редактирования
router-view(v-if="$route.path.includes('edit')")

.Tests.Page__container(v-else)

  .Page__title Все тесты

  .Tests__search
    search-field(
      type="тест"
      v-model="testsSearch"
      @search="searchTests"
    )

  template(v-for="(label, indexx) in labels")

    .Page__title-inner {{ label }}
    
    .Tests__container
      .Tests__item(
        v-for="(test, index) in tests"
        :key="index"
      )
        .Tests__item-container
          router-link.Test__image(to="/admin")
            img(src="@/assets/img/test-image.png" width="100%" height="100%")

          .Edit
            router-link(:to="{ name: 'AdminPanelGGTestsEdit' }")
              button-doc-edit.Edit__button

            .Edit__date
              div Опубликовано {{ test.date }},
              div Автор: {{ test.author }}

            router-link(to="/admin/tests")
              button-delete.Edit__button
</template>

<script>
import SearchField from "@/AdminPanel/ui/SearchField";
import ButtonDelete from "@/views/Account/Files/ButtonDelete";
import ButtonDocEdit from "@/views/Account/Files/ButtonDocEdit";

export default {
  components: {
    ButtonDelete,
    ButtonDocEdit,
    SearchField
  },

  data() {
    return {
      labels: [
        "тесты за текущий месяц",
        "тесты за прошлый месяц",
        "тесты за 2020 год"
      ],
      testsSearch: "",
      tests: [
        {
          date: "03.04.20",
          author: "В. В. Путин"
        },
        {
          date: "03.04.20",
          author: "В. В. Путин"
        },
        {
          date: "03.04.20",
          author: "В. В. Путин"
        }
      ]
    };
  },

  methods: {
    searchTests() {
      console.log("hi");
    }
  }
};
</script>

<style lang="sass" scoped>
.Tests__container
  display: flex
  flex-flow: row wrap

.Tests__item
  width: calc( 100% / 3 - 40px )
  border-radius: 10px
  margin: 20px
  background: linear-gradient(180deg, #F0F4F7 0%, #DCE6F2 48.96%, #F3FAFF 100%)
  box-shadow: 6px 2px 16px rgba(136, 165, 191, 0.54), -6px -2px 12px #FFFFFF

  @media screen and (max-width: $TableWidth)
    width: calc( 100% / 2 - 40px )

  @media screen and (max-width: $PhoneWidth)
    width: 100%

.Tests__item:focus
  box-shadow: inset 3px 3px 7px rgba(136, 165, 191, 0.6), inset -3px -3px 7px #FFFFFF

.Tests__item-container
  padding: 20px

.Edit
  display: flex
  align-items: center

.Edit__button
  padding: .4rem .6rem
  background: linear-gradient(180deg, #F0F4F7 0%, #DCE6F2 48.96%, #F3FAFF 100%)
  box-shadow: 6px 2px 16px rgba(136, 165, 191, 0.54), -6px -2px 12px #FFFFFF
  border-radius: 4px

::v-deep .Edit__button svg
  width: 14px

.Edit__button:focus
  background: $White
  box-shadow: inset 3px 3px 7px rgba(136, 165, 191, 0.6), inset -3px -3px 7px #FFFFFF

.Edit__date
  flex: 1

  color: $Black
  text-align: center
  font-weight: 500
  font-size: 12px
  letter-spacing: 0.05em
</style>
