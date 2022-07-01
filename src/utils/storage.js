/**
 * 获取本地存储数据
 * @param {*} key 键值
 * @returns  取到的数据
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}
/**
 * 设置本地存储数据
 * @param {*} key 键值
 * @param {*} value 储存数据
 */
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
/**
 * 根据Key删除本地存储中其中的一个
 * @param {*} key
 */
export function reomveItem (key) {
  window.localStorage.reomveItem(key)
}
/**
 *  删除所有的本地存储
 */
export function clearItem () {
  window.localStorage.clearItem()
}
