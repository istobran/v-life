<template lang="html">
  <div id="server-status">
    <h1>服务器状态</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "服务器状态"
    };
  },
  computed: {},
  created() {},
  beforeMount() {
    window.document.title = this.title;
  },
  mounted() {},
  methods: {},
  components: {}
};
</script>

<style lang="css">
</style>
