import Alarm from 'Images/alarm.jpg'
import _Vue from 'Vue'

function Install (Vue: typeof _Vue) {
  Vue.prototype.$notify = (title: string, text: string) => {
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
}

export default Install
