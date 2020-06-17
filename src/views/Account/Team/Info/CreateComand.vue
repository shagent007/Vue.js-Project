<template lang="pug">
.CreateComand
	.ImageLoad
		.ImageLoad__image
			img(
				src="@/assets/ui/load-photo-mask.jpg"
				height="100%"
				alt=""
			)
		.ImageLoad__description Для загрузки эмблемы, кликните на аватар

	gg-input.CreateComand__input(
		label="Название команды"
		v-model="comandName"
	)

	gg-input.CreateComand__input(
		label="Описание команды"
		v-model="comandDesc"
	)

	gg-button.CreateComand__Button(color="red") СОЗДАТЬ КОМАНДУ
</template>

<script>
import GgInput from "@/components/Base/GgInput";
import GgButton from "@/components/Base/GgButton";
export default {
  components: {
    GgInput,
    GgButton
  },

  data() {
    return {
      comandName: "",
      comandDesc: ""
    };
  }
};
</script>

<style lang="sass" scoped>

.ImageLoad
	display: flex
	align-items: center

/* картинка загрузки */
.ImageLoad__image
	height: 130px

/* поле ввода */
.CreateComand__input
	margin-top: 40px

/* Кнопка чоздать команду */
.CreateComand__Button
	margin: 1rem 0rem 0rem auto

/* создание теста */
.CreateTest
	margin-top: 20px

	display: flex
	align-items: center

	font-size: 18px
	color: $Blue

.CreateTest__description
	position: relative
	font-style: italic
	margin-right: 10px

.CreateTest__description::before
	content: ""
	width: 100%
	height: 3px
	background-color: $Blue
	position: absolute
	bottom: -5px
</style>
