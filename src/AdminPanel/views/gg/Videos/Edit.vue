<template lang="pug">
.VideosEdit.EditPage
  video-edit
  edit-buttons(type="видео")
</template>

<script>
import VideoEdit from "@/views/Account/Files/Edit/Video";
import EditButtons from "@/AdminPanel/ui/EditButtons";

export default {
  components: {
    VideoEdit,
    EditButtons
  }
};
</script>

<style lang="sass" scoped>
.VideosEdit
  margin: 0 20px 20px 0
  width: 100%
</style>
