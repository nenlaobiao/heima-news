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
export const getAllArtLists = () => {
  return instance(
    { url: '/channels' })
}
/**
 *  获取用户信息
 * @returns
 */
export const getUserProfile = () => {
  return instance({
    url: '/user/profile'
  })
}
/**
 * 修改用户信息接口
 * @param {*} profile 传入新的个人信息
 * @returns
 */
export const updataUserProfile = profile => {
  return instance({
    method: 'PATCH',
    url: 'user/profile',
    data: profile
  })
}
