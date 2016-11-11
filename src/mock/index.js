import Mock from 'mockjs'
import Interface from './interface'

export default {
  url_list: [
    {rurl: /^.*\/calendar\/items$/, rtype: "post", tpl: Interface.calendarItems}
  ],
  install() {
    this.url_list.forEach(
      item => Mock.mock(item.rurl, item.rtype, item.tpl)
    );
  }
}
