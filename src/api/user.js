import instance from '@/utils/request'
import store from '@/store'
/**
 * 获取短信验证码接口
 * @param {Number} mobile 手机号
 * @returns promise
 */
export const getSmsCode = (mobile) => {
  return instance({
    url: `/sms/codes/${mobile}`
  })
}

export const login = ({ mobile, code }) => {
  return instance({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
export const getUserInfo = () => {
  return instance({
    url: '/user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
