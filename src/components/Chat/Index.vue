<template lang="pug">
transition(name="fade")
  .chat-wrapper(v-show="visible" ref="chat")
    .layer
    .chat(v-if="LOADED")
      transition(name="menu")
        gg-chat-menu.menu-chat(
          v-show="showMenu"
          :content="CHAT_LIST"
          :currentChat="CURRENT_CHAT"
          @pickDialog="id => this.changeChat(id)"
          @closeMenu="closeMenu"
        )
        
      template(v-if="CURRENT_DIALOG")
        gg-chat-messages.user-chat(
          :info="CURRENT_DIALOG.info"
          :messages="CURRENT_DIALOG.messages"
          @sendMessage="message => this.sendMessage(message)"
          @closeChat="$emit('closeChat', !visible)"
          @showMenu="showMenu = true"
        )
      template(v-else)
        button.close(@click="$emit('closeChat', !visible)")
          img(src="@/assets/ui/close.svg")
        .user-chat.empty Выберите пожалуйста диалог
</template>

<script>
import GgChatMenu from "./Menu";
import GgChatMessages from "./Messages";

import { mapGetters, mapActions } from "vuex";
export default {
  model: {
    prop: "visible",
    event: "closeChat"
  },

  props: {
    visible: Boolean
  },

  data() {
    return {
      showMenu: true
    };
  },

  computed: {
    ...mapGetters("chat", [
      "CHAT_LIST",
      "LOADED",
      "CURRENT_CHAT",
      "CURRENT_DIALOG"
    ])
  },

  mounted() {
    if (!this.CHAT_LIST.length) {
      this.fetchChatList();
    }
  },

  methods: {
    ...mapActions("chat", ["fetchChatList", "sendMessage", "changeChat"]),

    closeMenu() {
      if (this.CURRENT_CHAT === null) return;
      this.showMenu = false;
    }
  },

  components: {
    GgChatMenu,
    GgChatMessages
  }
};
</script>

<style lang="sass" scoped>
.layer
  z-index: 9997
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%

.menu-enter-active.menu-chat, .menu-leave-active.menu-chat
  -webkit-transition: width .5s ease-in-out, opacity .5s
  -moz-transition: width .5s ease-in-out, opacity .5s
  -o-transition: width .5s ease-in-out, opacity .5s
  transition: width .5s ease-in-out, opacity .5s

.menu-enter.menu-chat, .menu-leave-to.menu-chat
  width: 300px
  opacity: 0

.fade-enter-active, .fade-leave-active
  -webkit-transition: opacity .5s
  -moz-transition: opacity .5s
  -o-transition: opacity .5s
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

.chat-wrapper
  z-index: 9999
  position: fixed
  top: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.1)
  display: flex
  flex-flow: row nowrap
  justify-content: center
  align-items: center

  .chat
    z-index: 9998
    background-color: $White
    display: flex
    flex-flow: row nowrap
    max-height: 90vh
    position: relative

.menu-chat, .user-chat
  max-height: inherit
  display: flex
  flex-flow: column nowrap

  @media screen and (max-width: $SmDesktopWidth)
    height: 500px

.menu-chat
  width: 400px
  z-index: 99

  @media screen and (max-width: $SmDesktopWidth)
    background-color: $White
    position: absolute
    left: 0

  @media screen and (max-width: $PhoneWidth)
    width: 300px

.user-chat
  width: 500px

  @media screen and (max-width: $SmDesktopWidth)
    width: 600px

  @media screen and (max-width: $PhoneWidth)
    width: 300px

  &.empty
    display: flex
    justify-content: center
    align-items: center

.close
  padding: 2rem
  position: absolute
  top: 0
  right: 0
  cursor: pointer
  border: 0
  background-color: inherit

//  т.к. в списке и в заголовке
//  сообщений одни и те же
//  стили, решил сделать их глобальными
//  для этого компонента
//  --------------------------------
//  вынести в отдельный компонет
//  нормально не получилось

/deep/ .name-image
  .image,
  .center,
  .right
    display: flex

  .image
    justify-content: center
    align-items: center

    img
      object-fit: cover
      object-position: 50% 50%

    .wrap
      position: relative

    .circle.online
      width: 15px
      height: 15px
      border: 3px solid $White
      background-color: $Turquoise
      border-radius: 50%
      position: absolute
      bottom: -5px
      right: -5px

      @media screen and (max-width: $PhoneWidth)
        width: 10px
        height: 10px
        border-width: 2px

  .center
    flex-flow: column nowrap
    justify-content: space-around

    .name
      font-weight: 600
      +afs(16px, 16px, 14px)

    .underName
      +afs(14px, 14px, 12px)
      color: $LightGrey

  .right
    justify-content: center
    +afs(14px, 14px, 12px)
</style>
