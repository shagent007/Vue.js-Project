<template lang="pug">
.MenuItems(:class="{ fullscreen }")

  .Menu__link-container

    .Menu__link
      router-link(:to="{ name: 'AdminPanelGGActivity' }")
        base-button.Menu__button(
          :class="{ active: currentPage === 'activity' }"
          text="Активность"
        )

    .Menu__link
      router-link(:to="{ name: 'AdminPanelGGVisits' }")
        base-button.Menu__button(
          :class="{ active: currentPage === 'visits' }"
          text="Статистика посещения"
        )

  .Menu__link-container

    .Menu__link
      router-link(:to="{ name: 'AdminPanelGGFinance' }")
        base-button.Menu__button(
          :class="{ active: currentPage === 'finance' }"
          text="Статистика финансов"
        )

    .Menu__link
      router-link(:to="{ name: 'AdminPanelGGTeams' }")
        base-button.Menu__button(
          :class="{ active: currentPage === 'teams' }"
          text="Статистика команд"
        )
  
  .Menu__link-container
      
    .Menu__link
      router-link(:to="{ name: 'AdminPanelGGNews' }")
        base-button.Menu__button(
          :class="{ active: currentPage === 'news' }"
          text="Все новости"
        )
        
    .Menu__link
      router-link(:to="{ name: 'AdminPanelGGVideos' }")
        base-button.Menu__button(
          :class="{ active: currentPage === 'videos' }"
          text="Все видео"
        )

  .Menu__link-container
      
    .Menu__link
      router-link(:to="{ name: 'AdminPanelGGTests' }")
        base-button.Menu__button(
          :class="{ active: currentPage === 'tests' }"
          text="Все тесты"
        )
</template>

<script>
import BaseButton from "@/AdminPanel/ui/BaseButton";

export default {
  components: {
    BaseButton
  },

  props: {
    currentPage: {
      type: String,
      required: true
    },

    fullscreen: {
      type: Boolean,
      required: true,
      default: false
    }
  }
};
</script>

<style lang="sass" scoped>
.MenuItems.fullscreen .Menu__link-container
  flex-flow: row nowrap

  @media screen and (max-width: $TableWidth)
    flex-flow: column wrap

.Menu.fullscreen .Menu__link
  width: 50%
  margin: 0 0 1rem

  @media screen and (max-width: $TableWidth)
    width: 100%

.Menu.fullscreen .Menu__button
  width: 70%

  @media screen and (max-width: $DesktopWidth)
    width: 80%

.Menu__link-container
  text-align: center
  width: 100%
  margin: auto
  display: flex
  flex-flow: column nowrap
  justify-content: center

.Menu__link-container:last-child
  justify-content: flex-start

.Menu__link
  box-sizing: border-box
  padding: 0 1rem 1rem
  width: 100%
  text-align: center
</style>
