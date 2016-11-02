<template lang="html">
  <div id="international-clock">
    <h1>国际时钟</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "国际时钟"
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
