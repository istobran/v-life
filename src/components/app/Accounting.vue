<template lang="html">
  <div id="accounting">
    <h1>账务信息</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "账务信息"
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
