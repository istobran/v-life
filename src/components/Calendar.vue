<template>
  <div id="calendar" class="calendar">
    <h1>{{ today }}</h1>
    <button v-on:click="render(2016, 08, 12)">Render</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      msg: 'Hello World!',
      today: new Date(),
      m_days: null,
      firstday: null,
      tr_num: null
    }
  },
  computed: function() {
    return {
      // m_days: function() {    //定义一个包含十二个月在内的月份总天数的数组
      //   return new Array(31, 28 + this.is_leap(ynow), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31);
      // }
      cal_body: function() {
        return this.render(ynow, mnow, dnow);
      },
      ynow: function() {
        return today.getFullYear()
      },
      mnow: function() {
        return today.getMonth();
      },
      dnow: function() {
        return today.getDay();
      }
    }
  },
  methods: {
    is_leap: function(year) {
      var res = 0;
      if (year % 100 === 0) {   // 判断是否能被100整除
        if (year % 400 === 0) {   // 判断是否能被400整除
          res = 1;    // 能被 100 又能被 400 整除，说明是闰年
        } else {
          res = 0;    // 能被 100 整除但不能被 400 整除，说明是平年
        }
      } else {
        if (year % 4 == 0) {    // 判断是否能被 4 整除
          res = 1;  // 不能被 100 整除，但能被 4 整除，说明是闰年
        } else {
          res = 0;  // 不能被 100 也不能被 4 整除，说明是平年
        }
      }
      return res;
    },
    buildCalHTML: function() {
      var tempStr = "<table>";
      var i, k; // 行，列计数器
      var idx, date_str;
      for (i = 0; i < this.tr_num; i++) {
          tempStr += "<tr>";
          for(k = 0; k < 7; k++) {        //内层for语句 - td标签
            idx = i * 7 + k;        //表格单元的自然序号
            date_str = idx - this.firstday + 1;        //计算日期
            if (date_str <= 0 || date_str > this.m_days[mnow]) {
              date_str = "&nbsp;";      // 处理无效日期
            } else {
              date_str = idx - this.firstday + 1;
            }
            //这里是处理有效日期代码
            if (date_str == dnow) {     //判断是否是今天
              tempStr += "<td style='border:1px solid red;'>" + date_str + "</td>";
            } else {
              tempStr += "<td>" + date_str + "</td>";
            }
          }
          tempStr += "</tr>";
      }
      tempStr += "</table>"
      return tempStr;
    },
    render: function() {
      // 定义一个包含十二个月在内的月份总天数的数组
      this.m_days =  new Array(31, 28 + this.is_leap(this.ynow), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31);
      // 计算处理月第一天是星期几
      this.firstday = new Date(this.ynow, this.mnow, this.dnow).getDay();
      // 使用以上两个条件计算日历所需的行数
      this.tr_num = Math.ceil( (this.m_days[this.mnow] + this.firstday) / 7 );
      // 建立表格
      var ifg = this.buildCalHTML();
      document.querySelector("#calendar").innerHTML = ifg;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
