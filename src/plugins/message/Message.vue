<template>
  <v-snackbar
    v-model="active"
    class="application"
    :timeout="timeout"
    :color="color"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
  >
    <v-icon
      v-if="icon.length"
      dark
      left
    >{{ icon }}</v-icon>
    {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: { type: String, default: 'info' },
    x: { type: String, default: 'right' },
    y: { type: String, default: 'top' },
    mode: { type: String, default: '' },
    timeout: { type: Number, default: 3e3 },
    color: { type: String, default: 'info' },
    icon: { type: String, default: '' },
  },
  data: () => ({
    active: false,
  }),
  watch: {
    active(newVal, oldVal) {
      if (!newVal && oldVal) {
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    },
  },
  destroyed() {
    document.body.removeChild(this.$el);
  },
  methods: {
    open() {
      this.active = true;
    },
    close() {
      this.active = false;
    },
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy();
    },
  },
};
</script>
