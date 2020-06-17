<template lang="pug">
.NewsEdit.EditPage
  news-edit
  edit-buttons(type="новость")
</template>

<script>
import NewsEdit from "@/views/Account/Files/Edit/News";
import EditButtons from "@/AdminPanel/ui/EditButtons";

export default {
  components: {
    NewsEdit,
    EditButtons
  }
};
</script>

<style lang="sass" scoped>
.NewsEdit
  margin: 0 20px 20px 0
  width: 100%
</style>
