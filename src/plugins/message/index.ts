import Message from './Message.js'
import _Vue from 'vue'

interface IVuetifyMessagePluginOptions {
  property?: string
}

interface IMessageProps {
  text?: string,
  x?: string,
  y?: string,
  mode?: string,
  timeout?: number,
  color?: string,
  icon?: string,
}

const colors = <const> ['success', 'info', 'warning', 'error']
type ColorName = typeof colors[number]

type IMessageFunction = {
  (opts: IMessageProps): Element;
} & {
  [K in ColorName]: (text: string, opts: IMessageProps) => Element
}

function MessagePlugin (Vue: typeof _Vue, options: IVuetifyMessagePluginOptions): void {
  function createMessageCmp (opts: IMessageProps): Element {
    const messageComponent = new Message()
    Object.assign(messageComponent, Vue.prototype.$message.options || {}, opts)
    document.body.appendChild(messageComponent.$mount().$el)
    messageComponent.open()
    return messageComponent.$el
  }

  Vue.prototype.$message = (function () {
    function sourceShow (opts: IMessageProps = {}): Element {
      return createMessageCmp(opts)
    }

    sourceShow.success = (text: string, opts: IMessageProps): Element => sourceShow({ text, color: 'success', ...opts })
    sourceShow.info = (text: string, opts: IMessageProps): Element => sourceShow({ text, color: 'info', ...opts })
    sourceShow.warning = (text: string, opts: IMessageProps): Element => sourceShow({ text, color: 'warning', ...opts })
    sourceShow.error = (text: string, opts: IMessageProps): Element => sourceShow({ text, color: 'error', ...opts })

    return sourceShow
  })() as IMessageFunction // eslint-disable-line no-param-reassign

  Vue.prototype.$message.options = options // eslint-disable-line no-param-reassign
}

export default MessagePlugin
