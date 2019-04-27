import Alarm from 'Images/alarm.jpg'

function Install (Vue) {
  Vue.prototype.$notify = (title, text) => {
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
      Notification.requestPermission(permission => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          const notification = new Notification(title, options)
          setTimeout(notification.close.bind(notification), 5000)
        }
      })
    }
  }
}

export default Install
