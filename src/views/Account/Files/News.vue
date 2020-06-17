<template lang="pug">
.wrapper-news
  h2.block-title Мои новости
  .news(
    v-for="(article, index) in news"
    :key="index"
    :class="{ 'no-image': !article.picture }"
  )
    img(
      v-if="article.picture"
      src="../../../../public/test-info-people.jpg"
      width="100%"
    )
    .right
      .info
        .title {{ article.title }}
        .desc {{ article.desc }}
      .edit
        router-link(:to="{ name: 'AccountEditNews' }")
          gg-button.edit-button(color="deepRed" @click="") редактировать
        gg-tooltip(tooltipText="Удалить новость")
          gg-confirm
            button-delete
</template>

<script>
import GgButton from "@/components/Base/GgButton";
import GgConfirm from "@/components/Base/GgConfirm";
import GgTooltip from "@/components/Base/GgTooltip";
import ButtonDelete from "./ButtonDelete";

export default {
  data() {
    return {
      news: [
        {
          picture: "",
          title: "формирование управленченской команды, кнр",
          desc:
            "Власти Австрии собираются с 1 мая отменить ограничения по выходу на улицу для населения, введенные в связи с пандемией коронавируса. Об этом сообщил во вторник глава Минздрава страны Рудольф Аншобер."
        },
        {
          picture: "test",
          title: "формирование управленченской команды, кнр",
          desc:
            "Власти Австрии собираются с 1 мая отменить ограничения по выходу на улицу для населения, введенные в связи с пандемией коронавируса. Об этом сообщил во вторник глава Минздрава страны Рудольф Аншобер."
        }
      ],
      public: process.env.BASE_URL
    };
  },
  components: {
    ButtonDelete,
    GgButton,
    GgConfirm,
    GgTooltip
  }
};
</script>

<style lang="sass" scoped>
.news
  padding-top: 1rem
  display: grid
  grid-template-columns: 1fr 1fr
  column-gap: 1rem

  @media screen and (max-width: $PhoneWidth)
    display: flex
    flex-flow: column nowrap

  &.no-image
    grid-template-columns: 1fr

    .right
      display: grid
      grid-template-columns: 3fr 1fr

      @media screen and (max-width: $TableWidth)
        display: flex
        flex-flow: column nowrap

    .edit
      flex-flow: column nowrap
      align-items: flex-end

      @media screen and (max-width: $TableWidth)
        flex-flow: row nowrap
        justify-content: space-between

    .edit-button
      order: 1

      @media screen and (max-width: $TableWidth)
        order: 0
  img
    @media screen and (max-width: $TableWidth)
      height: 100%
      object-fit: cover

  .title
    padding-bottom: 1rem
    font-size: 24px
    +afs(24px, 20px, 18px)
    font-weight: 500
    text-transform: uppercase

  .info
    @media screen and (max-width: $TableWidth)
      padding: 1rem 0

  .desc
    font-size: 18px

  .right
    display: flex
    flex-flow: column nowrap
    justify-content: space-between

    .edit
      display: flex
      justify-content: space-between
</style>
