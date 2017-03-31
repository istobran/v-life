<template lang="html">
  <md-dialog md-open-from="#btnCreate" md-close-to="#btnCreate" ref="createMenuDialog">
    <md-dialog-title>新建自定义日历</md-dialog-title>
    <md-dialog-content>
      <form>
        <md-input-container>
          <label>日历名称</label>
          <md-input></md-input>
        </md-input-container>
      </form>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click.native="closeDialog()">取消</md-button>
      <md-button class="md-primary" @click.native="closeDialog()">新建</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({ show: 'showCreateMenuDialog' }),
  },
  watch: {
    show() {
      if (this.show) {
        this.$refs["createMenuDialog"].open();
      } else {
        this.$refs["createMenuDialog"].close();
      }
    }
  },
  methods: {
    ...mapMutations({ close: "closeCreateMenuDialog" }),
    closeDialog() {
      this.close();
    },
    createMenu() {
      this.close();
    }
  }
}
</script>

<style lang="css">
</style>
