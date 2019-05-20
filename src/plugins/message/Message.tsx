import 'reflect-metadata'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { VSnackbar, VIcon } from 'vuetify/lib'

@Component
export default class Message extends Vue {
  @Prop({ default: 'info' })
  readonly text!: string
  @Prop({ default: 'right' })
  readonly x!: string
  @Prop({ default: 'top' })
  readonly y!: string
  @Prop({ default: '' })
  readonly mode!: string
  @Prop({ default: 3e3 })
  readonly timeout!: number
  @Prop({ default: 'info' })
  readonly color!: string
  @Prop({ default: '' })
  readonly icon!: string

  private active: boolean = false

  @Watch('active')
  onActiveChanged (newVal: boolean, oldVal: boolean) {
    if (!newVal && oldVal) {
      this.$el.addEventListener('transitionend', this.destroyElement)
    }
  }

  /**
   * 生命周期 destroyed
   */
  destroyed () {
    document.body.removeChild(this.$el)
  }

  /**
   * 弹出 message
   */
  open () {
    this.active = true
  }

  /**
   * 关闭 message
   */
  close () {
    this.active = false
  }

  /**
   * message 渐变消失
   */
  destroyElement () {
    this.$el.removeEventListener('transitionend', this.destroyElement)
    this.$destroy()
  }

  render () {
    const Snackbar = (content: string) => (
      <VSnackbar
        vModel={this.active}
        class="application"
        timeout={this.timeout}
        color={this.color}
        bottom={this.y === 'bottom'}
        left={this.x === 'left'}
        right={this.x === 'right'}
        top={this.y === 'top'}
        multiLine={this.mode === 'multi-line'}
        vertical={this.mode === 'vertical'}
      >
        {content}
      </VSnackbar>
    )
    const Icon = (icon: string) => (
      <VIcon
        v-if="icon.length"
        dark
        left
      >
        {icon}
      </VIcon>
    )
    return Snackbar(Icon(this.icon) + this.text)
  }
}
