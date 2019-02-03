import { POST } from '../methods';

export default {
  login: POST('user/login'), // 登录
  register: POST('user/register'), // 注册
};
