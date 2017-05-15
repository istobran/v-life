<template lang="html">
  <md-dialog ref="createBookmarkDialog" @close="close">
    <md-dialog-title>
      <span>新建便签</span>
      <md-button-toggle md-single>
        <md-button class="md-icon-button">
          <md-icon>format_bold</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>format_italic</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>strikethrough_s</md-icon>
        </md-button>
        <md-button class="md-icon-button md-toggle">
          <md-icon>title</md-icon>
        </md-button>
      </md-button-toggle>
    </md-dialog-title>
    <md-dialog-content>
      <md-input-container @keyup.enter.native="createMenu">
        <label>日历名称</label>
        <md-input v-model="inputValue"></md-input>
      </md-input-container>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click.native="closeDialog">取消</md-button>
      <md-button class="md-primary" @click.native="createMenu">新建</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      inputValue: "",
    }
  },
  computed: {
    ...mapGetters({ show: 'showBookmarkDialog' })
  },
  watch: {
    show() {
      if (this.show) {
        this.$refs["createBookmarkDialog"].open();
      }
    }
  },
  methods: {
    closeDialog() {

    },
    createMenu() {

    },
    close() {

    }
  }
}
</script>

<style lang="sass">
</style>
