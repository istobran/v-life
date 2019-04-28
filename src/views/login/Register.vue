<template lang="html">
  <div id="login">
    <Slideshow />
    <div class="register-container">
      <div class="register-avatar">
        <i class="fa fa-user" />
      </div>
      <h1 class="register-title">
        新用户注册
      </h1>
      <input
        v-model="email"
        type="email"
        placeholder="请输入邮箱"
      ><br>
      <span data-tip="用户名需以字母开头，且仅由数字和字母组成">
        <input
          v-model="username"
          type="text"
          placeholder="请输入用户名"
        >
      </span><br>
      <span data-tip="密码需至少 6 位">
        <input
          v-model="password"
          type="password"
          placeholder="请输入密码"
        >
      </span><br>
      <input
        v-model="cpassword"
        type="password"
        placeholder="请再次输入密码"
        @keyup.enter="register"
      ><br>
      <button
        class="register-button"
        name="register"
        @click="register"
      >
        注&nbsp;&nbsp;&nbsp;册
      </button>
      <div class="login-hint">
        <span>
          已拥有账号？<RouterLink
            class="btn-login"
            to="/login"
          >
            去登录>>
          </RouterLink>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import MD5 from 'js-md5'
import { UserService, successFilter, errToast } from 'Apis'
import Slideshow from './Slideshow.vue'

export default {
  components: { Slideshow },
  data () {
    return {
      email: '',
      username: '',
      password: '',
      cpassword: ''
    }
  },
  methods: {
    register () {
      /**
       * 至少6位
       * 或者至少一个小写字母和大写字母
       * 或者至少一个小写字母和数字的组合
       * 或者至少一个大写字母和数字的组合
       */
      // 验证表单
      this.email = this.email.trim()
      if (!this.email) {
        this.$message.error('请输入邮箱！', '提示')
        return
      }
      this.username = this.username.trim()
      if (!this.username) {
        this.$message.error('请输入用户名！', '提示')
        return
      } if (!/^[A-Za-z][A-Za-z0-9]+$/.test(this.username)) {
        this.$message.error('用户名需以字母开头，且仅由数字和字母组成', '用户名不合规则')
        return
      }
      this.password = this.password.trim()
      if (!this.password) {
        this.$message.error('请输入密码！', '提示')
        return
      } if (this.password.length < 6) {
        this.$message.error('密码需至少 6 位', '密码强度不足')
        return
      }
      this.cpassword = this.cpassword.trim()
      if (!this.cpassword) {
        this.$message.error('请再次输入确认密码', '提示')
        return
      }
      if (this.password !== this.cpassword) {
        this.$message.error('两次输入的密码不一致！', '提示')
        return
      }
      UserService.register({
        username: this.username,
        password: MD5.hex(this.password),
        email: this.email
      }).then(successFilter)
        .then(() => {
          this.$message.success('激活邮件已经发送到您的邮箱，请到邮箱中点击链接激活您的账号，账号激活后便可正常登录')
        })
        .catch(errToast)
    }
  }
}
</script>

<style lang="scss">
[data-tip] {
  position: relative;
}
[data-tip]:before {
  content: '';
  /* hides the tooltip when not hovered */
  display: none;
  content: '';
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #1a1a1a;
  position: absolute;
  top: 30px;
  left: 35px;
  z-index: 8;
  font-size: 0;
  line-height: 0;
  width: 0;
  height: 0;
}
[data-tip]:after {
  display: none;
  content: attr(data-tip);
  position: absolute;
  top: 35px;
  left: 0px;
  padding: 5px 8px;
  background: #1a1a1a;
  color: #fff;
  z-index: 9;
  font-size: 0.75em;
  height: 18px;
  box-sizing: content-box;
  line-height: 18px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  white-space: nowrap;
  word-wrap: normal;
}
[data-tip]:hover:before,
[data-tip]:hover:after {
  display: block;
}
.register-container {
  background: rgb(255, 255, 255);
  opacity: .9;
  width: 364px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-bottom: 20px;
  text-align: center;
  a {
    text-decoration: none;
    color: #004670;
    &:hover {
      color: #46B9FE;
    }
  }
  .register-avatar {
    background: #22B13D;
    width: 100px;
    height: 100px;
    margin: -50px auto 0;
    text-align: center;
    border: 3px solid white;
    border-radius: 50%;
    box-sizing: border-box;
    line-height: 100px;
    color: white;
    font-size: 2em;
  }
  .register-title {
    margin: 25px auto 30px;
    font-size: 30px;
    line-height: 30px;
    color: #666666;
    display: block;
    text-align: center;
  }
  input[type="email"], input[type="text"], input[type="password"] {
    background: #D8D8D8;
    border: none;
    padding: 5px 15px;
    font-size: 18px;
    width: 283px;
    height: 42px;
    box-sizing: border-box;
    margin: 0 auto 15px;
  }
  .register-button {
    margin: 5px auto 0;
    background: #30B248;
    color: #FFFFFF;
    width: 283px;
    height: 50px;
    font-size: 22px;
    line-height: 50px;
  }
  .login-hint {
    font-size: 14px;
    text-align: right;
    width: 283px;
    margin: 15px auto 0;
  }
}
</style>
