import Alarm from 'Images/alarm.jpg'
import _Vue from 'Vue'

/**
 * 调用系统通知方法
 * @param title 通知标题
 * @param text  通知文本
 * @constructor
 */
function Notify (title: string, text: string) : void {
  const options = {
    body: text,
    icon: Alarm
  }

  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notification')
  } else if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    const notification = new Notification(title, options)
    setTimeout(notification.close.bind(notification), 5000)
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(result => {
      // If the user accepts, let's create a notification
      if (result === 'granted') {
        const notification = new Notification(title, options)
        setTimeout(notification.close.bind(notification), 5000)
      }
    })
  }
}

/**
 * 注册 Vue 插件的方法
 * @param Vue   Vue 类
 * @constructor
 */
function NotifyPlugin (Vue: typeof _Vue) {
  Vue.prototype.$notify = Notify
}

export default NotifyPlugin
