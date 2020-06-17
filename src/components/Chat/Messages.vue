<template lang="pug">
.wrapper-messages

  .full-screen-avatar(
    v-if="fullScreenAvatar"
    @click="fullScreenAvatar = false"
  )
    img.avatar(src="@/assets/ui/chat-icon-fullscreen.png" alt="")

  .name-image
    .burger(@click="$emit('showMenu')")
      img(src="@/assets/ui/burger-grey.svg")

    .image
      .wrap(@click="fullScreenAvatar = true")
        img(src="@/assets/ui/chat-icon-small.png" alt="" width="100%" height="100%")
        .circle(:class="{ online: info.online }")

    .center
      .name {{ info.name }}
      .underName 
        template(v-if="info.online") Сейчас в сети
        template(v-else) Был(а) в сети {{ info.lastOnline }} назад

    .right
      gg-dropdown
        button.menu
          img(src="@/assets/ui/three-dots.svg")
        template(#content)
          .chat-settings
            button.settings-item Очистить чат
            button.settings-item Экспорт чата
            button.settings-item Выйти из группы

      button.close(@click="$emit('closeChat')")
        img(src="@/assets/ui/close.svg")

  .messages(ref="messages")
    .date

    .message(
      v-for="(message, index) in messages"
      :class="{ left: !message.self, right: message.self }"
    ) {{ message.text }}

  .input-field
    .icon.smile
      img(src="@/assets/ui/smile.svg" width="25" height="25" role="button")
    .icon.upload
      img(src="@/assets/ui/upload-image.svg" width="25" height="25" role="button")
    textarea.input(
      v-model="inputMessage" 
      type="text"
      @keydown.enter.prevent="sendMessage"
      ref="textarea"
    )
    .icon.send(@click="sendMessage")
      img(src="@/assets/ui/send-icon.svg" width="21" height="18" role="button")

</template>

<script>
import GgDropdown from "@/components/Base/GgDropdown";

export default {
  props: {
    info: {
      image: String,
      online: Boolean,
      name: String,
      lastOnline: String
    },
    messages: Array
  },

  data() {
    return {
      inputMessage: "",
      fullScreenAvatar: false
    };
  },

  mounted() {
    this.scrollToStart();
  },

  watch: {
    messages() {
      const mess = this.$refs.messages;
      if (mess.offsetHeight + mess.scrollTop <= mess.scrollHeight - 10) return;
      this.scrollToStart();
    }
  },

  methods: {
    scrollToStart() {
      this.$nextTick(() => {
        this.$refs.messages.scrollTo(0, this.$refs.messages.scrollHeight);
      });
    },
    sendMessage(event) {
      // если нажата клавиша shift, делаем перевод каретки вручную
      if (event.shiftKey) {
        this.inputMessage += "\n";
        return;
      }

      // если строка пустая, то ничего не делаем
      if (!this.inputMessage.trim()) return;

      this.$emit("sendMessage", this.inputMessage);
      this.inputMessage = "";

      console.log(1 + this.inputMessage + 1);

      this.scrollToStart();
    }
  },

  components: {
    GgDropdown
  }
};
</script>

<style lang="sass" scoped>
.wrapper-messages
  position: relative

.name-image
  display: grid
  grid-template-columns: 1fr 3fr 1fr
  padding: 1rem

  @media screen and (max-width: $PhoneWidth)
    column-gap: 5px

  @media screen and (max-width: $SmDesktopWidth)
    grid-template-columns: 1fr 1fr 3fr 1fr

  .burger
    display: none
    cursor: pointer

    @media screen and (max-width: $SmDesktopWidth)
      display: block
  .right
    align-items: center
    justify-content: space-around

    .menu, .close
      cursor: pointer
      border: 0
      background-color: inherit

    .close
      margin-left: 1rem

  .wrap
    width: 40px
    height: 40px

    @media screen and (max-width: $PhoneWidth)
      width: 30px
      height: 30px

.messages, .input-field
  background-color: $LightBlue

.messages
  flex: 1
  overflow: auto
  display: flex
  flex-flow: column nowrap

  .message
    margin: 1rem
    padding: 1rem
    max-width: 80%
    border-radius: 50%

    &.left
      align-self: flex-start
      background-color: $White
      border-radius: 25px 25px 25px 0

    &.right
      align-self: flex-end
      background-color: $Purple
      border-radius: 25px 25px 0 25px
      color: $White

.full-screen-avatar
  position: absolute
  width: 100%
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  background: rgba(0, 0, 0, 0.5)

.chat-settings
  display: flex
  flex-flow: column nowrap

  .settings-item
    white-space: nowrap
    cursor: pointer
    text-align: left
    border: 0
    background-color: inherit

    &:not(:last-child)
      margin-bottom: 1rem


.input-field
  padding: 1.5rem 1rem
  display: grid
  grid-template-columns: 1fr 1fr 6fr 1fr

  .input
    box-shadow: 0px 2px 4px rgba(222, 221, 239, 0.24), 0px 4px 20px #DEDDEF
    border: 0
    width: 100%
    height: 2rem
    padding: 0.5rem
    box-sizing: border-box
    max-height: 150px
    resize: none

  .icon
    cursor: pointer
    display: flex
    justify-content: center
    align-items: flex-end
    padding-bottom: 5px

    &.send
      padding-bottom: 9px
</style>
