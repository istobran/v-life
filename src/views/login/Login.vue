<template lang="html">
  <div id="login">
    <slideshow></slideshow>
    <div class="login-container">
      <div class="login-avatar"><i class="fa fa-user"></i></div>
      <h1 class="login-title display-1">登录系统</h1>
      <input type="text" v-model="username" placeholder="请输入用户名"><br/>
      <input type="password" v-model="password" placeholder="请输入密码" @keyup.enter="login"><br/>
      <div class="login-option">
        <span class="login-remember">
          <input type="checkbox" class="cb_rem" id="remember"
            name="remember" v-model="rememberLogin">
          <label class="lb_rem" for="remember">记住我</label>
        </span>
        <span class="login-forget"><a class="btn-findpasswd" href="#">忘记密码？</a></span>
      </div>
      <button class="login-button" @click="login">登&nbsp;&nbsp;&nbsp;录</button>
      <div class="register-hint">
        <span>还没有账号？<router-link class="btn-register" to="/register">创建新账户>></router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
import MD5 from 'js-md5';
import { UserService, successFilter, errToast } from 'Apis';
import Slideshow from './Slideshow.vue';

export default {
  components: {
    Slideshow,
  },
  data() {
    return {
      rememberLogin: false,
      username: '',
      password: '',
    };
  },
  created() {
  },
  mounted() {
    const isLogin = Boolean(sessionStorage.getItem('isLogin'));
    if (isLogin) {
      this.$router.push({ path: '/app' });
    } else {
      const localStatus = Boolean(localStorage.getItem('isLogin'));
      if (localStatus) {
        sessionStorage.setItem('isLogin', localStatus);
        this.$router.push({ path: '/app' });
      }
    }
  },
  methods: {
    login() {
      // 验证表单
      this.username = this.username.trim();
      if (!this.username) {
        this.$message.error('请输入用户名！');
        return;
      }
      this.password = this.password.trim();
      if (!this.password) {
        this.$message.error('请输入密码！');
        return;
      }
      UserService.login({
        username: this.username,
        password: MD5.hex(this.password),
      }).then(successFilter)
        .then(resp => {
          sessionStorage.setItem('stoken', resp.data);
          if (this.rememberLogin) {
            localStorage.setItem('stoken', resp.data);
          }
          this.$router.push({ path: '/app' });
        })
        .catch(errToast);
    },
  },
};
</script>

<style lang="scss">
.login-container {
  background: rgb(255, 255, 255);
  opacity: .9;
  width: 364px;
  position: absolute;
  top: 50%;
  left: 50%;
  padding-bottom: 20px;
  transform: translate(-50%, -50%);
  text-align: center;
  a {
    text-decoration: none;
    color: #004670;
    &:hover {
      color: #46B9FE;
    }
  }
  .login-avatar {
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
  .login-title {
    margin: 25px auto 30px;
    font-size: 36px;
    line-height: 36px;
    color: #666666;
    display: block;
    text-align: center;
  }
  input[type="text"], input[type="password"] {
    background: #D8D8D8;
    border: none;
    padding: 5px 15px;
    font-size: 18px;
    width: 283px;
    height: 42px;
    box-sizing: border-box;
  }
  input[type="text"] {
    margin: 0 auto;
  }
  input[type="password"] {
    margin: 15px auto 0;
  }
  .login-option {
    margin: 20px auto;
    width: 283px;
    font-size: 14px;
    overflow: auto;
    zoom: 1;
    .login-remember {
      float: left;
      input[type="checkbox"] {
        display: none;
        position:absolute;
        z-index: 0;
        left:-1000px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        height:1px;
        width:1px;
        margin:-1px;
        padding:0;
        border:0;
      }
      input[type=checkbox].cb_rem + label.lb_rem {
        padding-left:20px;
        height:15px;
        display:inline-block;
        line-height:15px;
        background-repeat:no-repeat;
        background-position: 0 0;
        font-size:15px;
        vertical-align:middle;
        cursor:pointer;
      }
      input[type=checkbox].cb_rem:checked + label.lb_rem {
        background-position: 0 -15px !important;
      }
      label {
        background-image:url(~Images/checkbox.png);
        user-select: none;
      }
    }
    .login-forget {
      float: right;
    }
  }
  .login-button {
    margin: 5px auto 0;
    background: #30B248;
    color: #FFFFFF;
    width: 283px;
    height: 50px;
    font-size: 22px;
    line-height: 50px;
  }
  .register-hint {
    font-size: 14px;
    text-align: right;
    width: 283px;
    margin: 15px auto 0;
  }
}
</style>
