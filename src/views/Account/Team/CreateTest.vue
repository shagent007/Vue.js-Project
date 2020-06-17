<template lang="pug">
.CreateTest
	test-edit(testTitle="Modify")

	//- абсолютный путь, по другому не работает :)
	router-link.CreateTest__button(
		to="/account/team?createcomand=true"
	)
		gg-button(
			color="red"
		) сохранить
</template>

<script>
import TestEdit from "@/views/Account/Files/Edit/Test";
import GgButton from "@/components/Base/GgButton";

export default {
  components: {
    TestEdit,
    GgButton
  }
};
</script>

<style lang="sass" scoped>
.CreateTest ::v-deep .BottomButtons
	display: none

/* кнопка */
.CreateTest__button
	display: flex
	justify-content: flex-end
	margin-top: 30px
</style>
