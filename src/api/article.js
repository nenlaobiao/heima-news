import request from '@/utils/request'
/**
 * 获取文章接口
 * @param { Number} article_id 文章id
 * @returns
 */
export const getArticle = (article_id) => {
  return request({
    url: `articles/${article_id}`
  })
}
/**
 *  添加关注
 * @param {Number,String} target 作者id
 * @returns
 */
export const addFollow = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}
/**
 * 取消作者关注
 * @param {Number,String} target 作者id
 * @returns
 */
export const delFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}
/**
 *  文章收藏接口
 * @param {*} target 传入文章id
 * @returns
 */
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}
/**
 *  取消文章收藏接口
 * @param {*} target 传入文章id
 * @returns
 */
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
  })
}
