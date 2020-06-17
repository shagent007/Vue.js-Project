<template lang="pug">
.wrapper-news
  .account-item-header
    h1.title-edit Редактировать новость
    .image(:class="{ 'no-image': !false }")
      img.previow( ref="previow" )
      input(type="file" accept="image/*" ref="file" name="image" style="display: none" @change="Upload")
      gg-button.upload(
        color="black" 
        :reverse="true" 
        :transparent="true"
         @click="$refs.file.click()"
      ) 
        span Загрузить превью
        img(src="@/assets/ui/upload.svg")
    .form
      gg-input.input-edit(label="Название" v-model="name" icon="fas fa-pen")
      gg-input.input-edit(label="Краткое описание" v-model="desc" icon="fas fa-pen")
      gg-text-area.area-edit(label="Текст новости" v-model="text" icon="fas fa-pen")      
  bottom-buttons(type="новость" @save="save")
</template>

<script>
import GgButton from "@/components/Base/GgButton";
import GgInput from "@/components/Base/GgInput";
import GgTextArea from "@/components/Base/GgTextArea";

import BottomButtons from "./BottomButtons";

import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      desc: "",
      text: "",
      none: false
    };
  },
  computed: {
    ...mapGetters("accountFiles", ["EDIT_NEWS"])
  },

  methods: {
    ...mapActions("accountFiles", ["cancelEditing"]),

    Upload() {
      if (this.$refs.file.files[0]) {
        this.$refs.previow.src = URL.createObjectURL(this.$refs.file.files[0]);
        this.none = !this.none;
      }
    },

    save() {
      this.cancelEditing();
      this.$router.push({ name: "AccountFiles" });
    }
  },

  components: {
    GgButton,
    GgInput,
    GgTextArea,
    BottomButtons
  }
};
</script>

<style lang="sass" scoped>
.title-edit
  margin: 0
  margin-left: 1rem
.image
  position: relative
  padding: 1rem
  .upload
    position: absolute
    top: 50%
    left: 50%
    margin-left: -15%
    font-style: italic
    text-decoration: underline

  &.no-image
    min-height: 300px

  .previow
    width: 100%

.form
  padding: 1rem

.input-edit
  box-sizing: border-box
  padding: 1rem

.area-edit
  margin-top: 2rem
  padding: 0rem 1rem
.none
  display: none !important
</style>
