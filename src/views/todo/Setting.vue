<template lang="html">
  <main
    id="setting"
    class="clearfix"
  >
    <div class="system-setting pull-left">
      <h1 class="md-title">
        系统设置
      </h1>
      <div class="spliter" />
      <p class="clearfix">
        <span class="pull-left">
          同步到云端
        </span>
        <v-switch
          v-model="checked1"
          class="pull-right"
        />
      </p>
      <p class="clearfix">
        <span class="pull-left">
          同步到谷歌日历
        </span>
        <v-switch
          v-model="checked2"
          class="pull-right"
        />
      </p>
    </div>
    <div class="personal-setting pull-left">
      <h1 class="md-title">
        个人设置
      </h1>
      <div class="spliter" />
      <p class="clearfix">
        <span class="pull-left">
          用户名：
        </span>
        <span class="pull-right">
          {{ user.username }}
        </span>
      </p>
      <p class="clearfix">
        <span class="pull-left">
          绑定邮箱：
        </span>
        <v-input
          type="email"
          class="pull-right"
          label="请输入绑定邮箱"
        />
      </p>
      <p class="clearfix">
        <span class="pull-left">
          修改密码：
        </span>
        <v-input
          type="password"
          class="pull-right"
          label="请输入新密码"
        />
      </p>
      <p class="clearfix">
        <span class="pull-left">
          确认密码：
        </span>
        <v-input
          type="password"
          class="pull-right"
          label="请再次确认新密码"
        />
      </p>
    </div>
  </main>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      checked1: true,
      checked2: true,
      user: {
        avatarUrl: 'http://en.gravatar.com/userimage/99616975/827489fdfb37acbf6ed0254f4f311417.jpg?size=48',
        username: 'BangZ',
        email: 'i@bangz.me'
      }
    }
  },
  computed: {
    ...mapGetters(['showMenu'])
  }
}
</script>
<style lang="sass">
#setting
  .system-setting
    padding: 20px 25px
    width: 50%
  .personal-setting
    padding: 20px 25px
    width: 50%
    p.clearfix
      display: flex
      flex-direction: row nowrap
      align-items: center
      span.pull-left
        text-align: right
        width: 80px
        flex: 0 0 80px
      .pull-right
        flex: 1 1 auto
        margin-left: 10px
  .spliter
    margin: 10px 0
    border-bottom: 2px solid #979797
  p
    margin-top: 20px
    padding: 0 10px
    span
      display: inline-block
      font-size: 14px
      height: 46px
      line-height: 46px
</style>
