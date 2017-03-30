<template lang="html">
  <md-dialog-prompt
    :md-title="title"
    :md-ok-text="ok"
    :md-cancel-text="cancel"
    ref="createMenuDialog"
    @open="onOpen"
    @close="onClose">
  </md-dialog-prompt>
</template>

<script>
export default {
  data() {
    return {
      title: 'What\'s your name?',
      ok: 'Done',
      cancel: 'Cancel',
      id: 'name',
      name: 'name',
      placeholder: 'Type your name...',
      maxlength: 30,
      value: ''
    }
  },
  methods: {
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
    }
  }
}
</script>

<style lang="css">
</style>
