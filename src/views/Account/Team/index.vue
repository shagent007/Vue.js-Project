<template lang="pug">
.account-item-header
	//- здесь будет появляться либо информация 
		о командах, либо создание теста, в зависимости
		от ссылки
	.router-view
		router-view
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
.router-view
	padding: 20px
.router-view ::v-deep .account-item-header
	padding: 0
</style>
