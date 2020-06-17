<template lang="pug">
footer.Footer
  .container.Footer__container

    //- показывается только на мобильных
    .Footer__logo-phone 
      img.Footer__logo-phone-image(
        src="@/assets/logo/Globalgamelogo.png"
        alt="Логотип лидеры управление"
      )
      .Footer__logo-phone-text глобальная игра

    //- вспомогательный класс для сетки на телефонах 
    .Footer__wrapper

      .Footer__about

        //- логотип
        .Footer__logo
          img.Footer__logo-image(
            src="@/assets/logo/Logo-footer.png"
            alt="Логотип лидеры управление"
          )
          //-.Footer__logo-name {{GG_FOOTER.title}}

        //- информация о проекте
        .Footer__description
          .Footer__description-title {{ GG_FOOTER.aboutProject }}
          .Footer__description-info {{ GG_FOOTER.informationAboutProject }}

      //- навигация  
      nav.Footer__navigation
        ul.Footer__navigation-list
          li.Footer__navigation-item(
            v-for="(item,index) in GG_FOOTER.menu" 
            :key="index"
          ) 
            router-link.Footer__navigation-link(:to="item.path") {{ item.title }}

      .Footer__info

        //- подписка на рассылку
        .Footer__email

          .Footer__email-title {{ GG_FOOTER.contact.title }}

          .Footer__email-container

            .Footer__email-input-container
              img.Footer__email-icon(src="@/assets/social/message-blue.svg")

              input.Footer__email-input(
                :placeholder="GG_FOOTER.emailPlaceHolder" 
                type="email" 
                v-model="sendEmail" 
              )

            gg-button.Footer__email-button(
              color="red" 
              @click="submittingSend"
            ) {{ GG_FOOTER.contact.buttonName }}

        .Footer__contacts-and-social

          //- контакты
          .Footer__contacts

            .Footer__contacts-row
              img.Footer__contacts-image(
                src="@/assets/social/telephone-blue.svg"
              )
              a.Footer__contacts-info(
                :href="'tel:' + GG_FOOTER.contact.numberPhone"
              ) {{ GG_FOOTER.contact.numberPhone }}

            .Footer__contacts-row
              img.Footer__contacts-image(
                src="@/assets/social/mail-blue.svg"
              )
              a.Footer__contacts-info(
                :href="'mailto:' + GG_FOOTER.contact.email"
              ) {{ GG_FOOTER.contact.email }}

            .Footer__contacts-row
              img.Footer__contacts-image(
                src="@/assets/ui/geo.svg"
              )
              .Footer__contacts-info {{ GG_FOOTER.contact.location }}

          .Footer__social-and-feedback
            //- соц сети
            .Footer__social

              a.Footer__social-link(href="#")
                img.Footer__social-image(
                  src="@/assets/social/vk-reverse.svg"
                )

              a.Footer__social-link(href="#")
                img.Footer__social-image(
                  src="@/assets/social/youtube-reverse.svg"
                )

              a.Footer__social-link(href="#")
                img.Footer__social-image(
                  src="@/assets/social/facebook-reverse.svg"
                )

              a.Footer__social-link(href="#")
                img.Footer__social-image(
                  src="@/assets/social/zen-reverse.svg"
                )

              a.Footer__social-link(href="#")
                img.Footer__social-image(
                  src="@/assets/social/instagram.svg"
                )

              a.Footer__social-link(href="#")
                img.Footer__social-image(
                  src="@/assets/social/telegram.svg"
                )

            //- фидбек
            router-link.Footer__feedback(to="/feedback")

              img.Footer__feedback-image(
                src="@/assets/ui/modal-question.svg" 
                width="40px"
              )

              .Footer__feedback-text
                div Остались вопросы?
                div Свяжитесь с нами.
</template>

<script>
import GgButton from "@/components/Base/GgButton";

const KEY_COMPONENT = "GgFooter";
import { mapGetters } from "vuex";
export default {
  name: "gg-footer",
  data() {
    return {
      nameForm: "newsLetterSubscription",
      sendEmail: ""
    };
  },
  computed: {
    ...mapGetters("staticData", ["GG_FOOTER"])
  },
  components: {
    GgButton
  },
  watch: {
    sendEmail() {
      if (!this.sendEmail) {
        console.log("hello");
      }
    }
  },
  methods: {
    submittingSend(e) {
      e.preventDefault();

      this.$store
        .dispatch(
          "userInformation/newsLetterSubscription",
          document.forms[this.nameForm]
        )
        .then(flag => {
          switch (flag) {
            case "":
              this.sendEmail = "";
              break;
            default:
              console.group(KEY_COMPONENT);
              console.info("Не обработанная ошибка");
              console.log(flag);
              console.groupEnd();
          }
        });
    }
  }
};
</script>

<style lang="sass" scoped>
.Footer
  background-color: $White
  margin-top: 2rem

/* контейнер */
.Footer__wrapper
  padding: 20px 0px
  display: flex
  position: relative

  @media screen and (max-width: $PhoneWidth)
    padding: 0 0 80px
    // flex-flow: column nowrap

/* о сайте */
.Footer__about
  flex: 1

  @media screen and (max-width: $PhoneWidth)
   display: none

/* логотип на телефонах */
.Footer__logo-phone
  display: none

  @media screen and (max-width: $PhoneWidth)
    display: flex
    align-items: center
    justify-content: center
    padding: 20px 0

.Footer__logo-phone-image
  width: 100px

.Footer__logo-phone-text
  padding-right: 10px
  text-transform: uppercase
  color: $Red
  font-size: 14px
  font-weight: bold

/* логотип */

.Footer__logo
  display: flex
  align-items: center

.Footer__logo-image
  width: 100%

/* информация о проекте */
.Footer__description
  +afs(16px, 14px, 12px)
.Footer__description-title
  padding-bottom: 10px

/* навигация */
.Footer__navigation
  padding: 20px

  @media screen and (max-width: $TableWidth)
    display: none

.Footer__navigation-list
  margin: 0
  padding: 0
  height: 100%

  box-sizing: border-box

  display: flex
  flex-flow: column nowrap
  justify-content: space-between

.Footer__navigation-item
  list-style: none

.Footer__navigation-link
  color: $Black
  font-size: 18px

/* контакты и подписка на рассылку */
.Footer__info
  flex: 2

  display: flex
  flex-flow: column nowrap

  @media screen and (max-width: $PhoneWidth)
    flex: 1

/* подписка на рассылку */
.Footer__email
  @media screen and (max-width: $PhoneWidth)
    order: 1

.Footer__email-title
  font-size: 20px
  padding: 10px 0
  font-weight: 500

.Footer__email-container
  width: 100%
  display: flex

.Footer__email-button
  width: 40%
  display: flex
  align-items: center
  font-weight: bold
  // понадбилась более гибкая настройка чем просто +afs
  @media screen and ( max-width: $TableWidth )
    font-size: 16px
  @media screen and ( max-width: $PhoneWidth )
    font-size: 12px
    letter-spacing: 1px
  @media screen and ( min-width: $TableWidth )
    font-size: 18px
  @media screen and ( min-width: $SmDesktopWidth )
    font-size: 22px


.Footer__email-input-container
  width: 60%
  position: relative
  box-shadow: 0px 6px 12px rgba(8, 35, 48, 0.14), 0px 16px 24px rgba(8, 35, 48, 0.08)

.Footer__email-icon
  position: absolute
  top: 50%
  transform: translate(10px, -50%) // позиционирование по центру по вертикали

.Footer__email-input
  width: 100%
  padding: 10px 0 10px 35px
  +afs(18px, 16px, 14px)
  border: 4px solid white
  box-sizing: border-box

/* контейнер для контактов и соц сетей */
.Footer__contacts-and-social
  display: flex
  height: 100%
  padding: 15px 10px

  @media screen and (max-width: $TableWidth)
    padding: 10px

  @media screen and (max-width: $PhoneWidth)
    padding: 0

/* контейнер для контактов и соц сетей */
.Footer__social-and-feedback

  @media screen and (max-width: $PhoneWidth)
    position: absolute
    bottom: 20px
    left: 0
    width: 100%

/* контакты */
.Footer__contacts
  @media screen and (max-width: $PhoneWidth)
    width: 100%

.Footer__contacts-image
  padding-right: 10px

  @media screen and (max-width: $PhoneWidth)
    min-width: 1.5rem

.Footer__contacts-row
  display: flex
  margin-bottom: 1rem

  @media screen and (max-width: $PhoneWidth)
    padding-bottom: 10px

.Footer__contacts,
.Footer__social-and-feedback
  flex: 1

  display: flex
  flex-flow: column nowrap
  justify-content: space-around

.Footer__contacts-info
  display: flex
  align-items: center
  +afs(16px, 14px, 16px)


/* соц сети */
.Footer__social
  display: flex
  justify-content: space-between
  flex-flow: wrap
  @media screen and (min-width: $PhoneWidth) and (max-width: $SmDesktopWidth)
    a
      flex-basis: 33.3333%
      text-align: center
      margin-bottom: 1rem

  @media screen and (max-width: $PhoneWidth)
    justify-content: space-around

/* фидбек */
.Footer__feedback
  display: flex
  align-items: center
  justify-content: center

  @media screen and (max-width: $PhoneWidth)
    display: none

.Footer__feedback-text
  color: $Black
  padding-left: 10px

  font-style: italic
  font-weight: 500
  font-size: 14px
</style>
