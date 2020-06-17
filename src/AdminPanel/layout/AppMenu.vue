<template lang="pug">
.Menu(:class="[{ 'fullscreen': consolePage, 'page-selected': !consolePage }, selectedProject]")

  //- кнопка консоль, закомментил, т.к. выглядит странно и я не понимаю зачем она

    router-link.Menu__console(:to="{ name: 'AdminPanel' }")
      base-button.Menu__button(
        rounded
        :disable=consolePage"
        @click.stop
      )
        img.Settings__icon(src="@/AdminPanel/assets/settings.svg")
        span Консоль

  //- появляется, когда ширина экрана равна телефону

  user-info.UserInfo(
    v-if="consolePage"
    :name="user.name"
    :image="user.image"
  )

  .ProjectButtons

    //- кнопка проекта глобальная игра

    project-button.ProjectButtons__button.ProjectButton__GlobalGame(
      text="глобальная игра"
      :dropDownActive="selectedProject === 'globalGame'"
      :currentPage="currentPage"
      :fullscreen="consolePage"
      @pick="pickProject('globalGame')"
    )

    //- кнопка проекта глобальная игра

    project-button.ProjectButtons__button.ProjectButton__MenegmentLeader(
      text="лидеры управления"
      :dropDownActive="selectedProject === 'menegmentLeader'"
      :currentPage="currentPage"
      :fullscreen="consolePage"
      @pick="pickProject('menegmentLeader')"
    )

    //- кнопки выбора страницы проекта глобальной игры

    global-game-links.ProjectButtons__links(
      v-if="selectedProject === 'globalGame'"
      :fullscreen="consolePage"
      :currentPage="currentPage"
    )

    //- кнопки выбора страницы проекта лидеры управления

    menegment-leader-links.ProjectButtons__links(
      v-if="selectedProject === 'menegmentLeader'"
      :fullscreen="consolePage"
      :currentPage="currentPage"
    )

    //- кнопка проекта стратегия победителя

    project-button.ProjectButtons__button.ProjectButton__StrategyWinner(
      text="стратегия победителя"
      :dropDownActive="selectedProject === 'strategyWinner'"
      :currentPage="currentPage"
      :fullscreen="consolePage"
      @pick="pickProject('strategyWinner')"
    )

    //- кнопка проекта бизнесс знакомства

    project-button.ProjectButtons__button.ProjectButton__BusinessDating(
      text="бизнес знакомства"
      :dropDownActive="selectedProject === 'businessDating'"
      :currentPage="currentPage"
      :fullscreen="consolePage"
      @pick="pickProject('businessDating')"
    )

    //- кнопки выбора страниц проекта стратегия победителя

    strategy-winner-links.ProjectButtons__links(
      v-if="selectedProject === 'strategyWinner'"
      :fullscreen="consolePage"
      :currentPage="currentPage"
    )

    //- кнопки выбора страниц проекта бизнесс знакомства

    business-dating-links.ProjectButtons__links(
      v-if="selectedProject === 'businessDating'"
      :fullscreen="consolePage"
      :currentPage="currentPage"
    )

  //- кнопка закрытия консоли
  .console-close(v-if="consolePage && currentPage")
    base-button.console-close__button(
      @click="$emit('openCloseConsole', false)"
      text="закрыть консоль"
    )

</template>

<script>
import BaseButton from "@/AdminPanel/ui/BaseButton";
import ProjectButton from "@/AdminPanel/ui/ProjectButton";
import UserInfo from "@/AdminPanel/ui/UserInfo";

export default {
  model: {
    prop: "consolePage",
    event: "openCloseConsole"
  },

  components: {
    UserInfo,
    BaseButton,
    ProjectButton,

    "global-game-links": () =>
      import("@/AdminPanel/ui/ProjectButtonsLinks/GlobalGame"),
    "business-dating-links": () =>
      import("@/AdminPanel/ui/ProjectButtonsLinks/BusinessDating"),
    "menegment-leader-links": () =>
      import("@/AdminPanel/ui/ProjectButtonsLinks/MenegmentLeader"),
    "strategy-winner-links": () =>
      import("@/AdminPanel/ui/ProjectButtonsLinks/StrategyWinner")
  },

  props: {
    consolePage: Boolean
  },

  data() {
    return {
      currentPage: "",
      selectedProject: "",
      user: {
        name: "Сергей Борисович",
        image: require("@/AdminPanel/assets/logo-ded-small.jpg")
      }
    };
  },

  watch: {
    $route(route) {
      if (route.matched.length > 1) {
        this.setPageByRoute();
        this.setProjectByRoute();

        this.$emit("openCloseConsole", false);
      } else {
        this.currentPage = "";
        this.selectedProject = "";

        this.$emit("openCloseConsole", true);
      }
    }
  },

  mounted() {
    if (this.$route.matched.length > 1) {
      this.setPageByRoute();
      this.setProjectByRoute();

      this.$emit("openCloseConsole", false);
    }
  },

  methods: {
    pickProject(project) {
      if (this.selectedProject === project) {
        return (this.selectedProject = "");
      }

      this.selectedProject = project;
    },

    setProjectByRoute() {
      switch (this.$route.fullPath.split("/")[2]) {
        case "gg":
          this.selectedProject = "globalGame";
          break;
        case "bd":
          this.selectedProject = "businessDating";
          break;
        case "ml":
          this.selectedProject = "menegmentLeader";
          break;
        case "sw":
          this.selectedProject = "strategyWinner";
      }
    },

    setPageByRoute() {
      this.currentPage = this.$route.fullPath.split("/")[3];
    }
  }
};
</script>

<style lang="sass" scoped>
.Menu
  height: 100%
  width: 300px
  padding-top: 2.5rem
  display: flex
  flex-flow: column nowrap

.Menu.fullscreen
  width: 100%
  display:  flex
  flex-wrap:  wrap
  box-shadow: inset 5px 5px 10px #A6ABBD, inset -5px -5px 10px #FAFBFF

::v-deep .ap-button__text
  font-size: 14px
  padding: 1rem .5rem
  text-transform: uppercase
  font-weight: bold


/* информиция юзера */
.UserInfo
  display: none

.Menu.fullscreen .UserInfo
  @media screen and (max-width: $TableWidth)
    display: flex
    justify-content: space-around
    margin: 20px

/* настройка кнопки КОНСОЛЬ */

.Menu.fullscreen .Menu__console ::v-deep .ap-button .ap-button__text
  padding: 1rem 3rem

.Menu__console ::v-deep .ap-button .ap-button__text
  padding: .5rem

.Menu.fullscreen .Menu__link.Menu__console
  width: 50%

.Menu__console
  width: 100%
  margin-bottom: 20px

.Menu__console .Menu__button
  width: 90%

.Menu.fullscreen .Menu__console .Menu__button
  width: fit-content

.Settings__icon
  margin-right: 10px

.Menu__button
  width: 100%
  border-radius: 10px

/* кнопки выбора панели проекта */
.Menu.fullscreen .ProjectButtons
  display: flex
  flex-flow: row wrap
  justify-content: space-around

  @media screen and (max-width: $TableWidth)
    flex-flow: column wrap

.Menu.fullscreen .ProjectButtons__button
  width: 35%
  margin-bottom: 25px

  @media screen and (max-width: $TableWidth)
    width: 100%

.ProjectButtons
  display: flex
  flex-flow: column nowrap

.ProjectButtons__button
  width: 100%

.ProjectButtons .ProjectButtons__button ::v-deep .ap-button__text
  font-size: 19px
  padding: 1rem 0

// правка ширины кнопок
.Menu .ProjectButtons .ProjectButtons__button ::v-deep .Menu__link
  width: 100%

/* изменение порядка кнопок в сайд меню */

// если выбрана гг, все кнопки вниз // здесь применена вложенность!!!!!!!!
.Menu.page-selected.globalGame
  .ProjectButton__MenegmentLeader,
  .ProjectButton__StrategyWinner,
  .ProjectButton__BusinessDating
    order: 1

// на полный экран когда они в ряд идут
.Menu.fullscreen.globalGame
  .ProjectButton__MenegmentLeader,
  .ProjectButton__StrategyWinner,
  .ProjectButton__BusinessDating
    @media screen and (max-width: $TableWidth)
      order: 1

// если стратегия победителя, бизнес вниз
.Menu.page-selected.strategyWinner
  .ProjectButton__BusinessDating
    order: 1

// то же самое
.Menu.fullscreen.strategyWinner
  .ProjectButton__BusinessDating
    @media screen and (max-width: $TableWidth)
      order: 1

// в остальных случаях всё норм

/* кнопки выбора категории */
.ProjectButtons__links
  margin: 30px 0
  width: 100%

.Menu.fullscreen .ProjectButtons__links
  margin: 10px 0

/* стилизация кнопки консоли */
.Menu .console-close
  width: 95%
  margin: auto

.Menu .console-close__button
  margin: 10px 0 20px
  color: $Red
  font-size: 20px
  text-transform: uppercase
  font-weight: bold

/* показывать кнопку, если открыта консоль */
.Menu .console-close
  display: none

.Menu.fullscreen .console-close
  display: block
</style>
