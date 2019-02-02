<template>
  <p class="day-context"
   :contenteditable="flag"
   @input="changeText"
   @blur="loseFocus"></p>
</template>
<script>
export default {
  props: ['value', 'flag'],
  data() {
    return {
      innerText: this.value,
    };
  },
  mounted() {
    this.$el.innerHTML = this.innerText;
    this.$parent.$on('updateContext', (_) => {
      this.innerText = this.value;
      this.$el.innerHTML = this.innerText;
    });
  },
  methods: {
    changeText() {
      this.innerText = this.$el.innerHTML;
      this.$emit('input', this.innerText);
    },
    loseFocus() {
      this.$emit('blur');
    },
  },
};
</script>
