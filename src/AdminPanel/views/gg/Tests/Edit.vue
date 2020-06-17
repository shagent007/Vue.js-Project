<template lang="pug">
.TestEdit.EditPage
  test-edit
  edit-buttons(type="тест")
</template>

<script>
import TestEdit from "@/views/Account/Files/Edit/Test";
import EditButtons from "@/AdminPanel/ui/EditButtons";

export default {
  components: {
    TestEdit,
    EditButtons
  }
};
</script>

<style lang="sass" scoped>
.TestEdit
  margin: 0 20px 20px 0
  width: 100%
</style>
