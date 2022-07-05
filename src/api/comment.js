import request from '@/utils/request'

/**
 * 获取评论或评论回复
 * @param type 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param source 源id，文章id或评论id
 * @param offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @param limit 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * @returns
 */
export const getCommentsAPI = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: {
      type, source, offset, limit
    }
  })
}
/**
 *  文章评论点赞接口
 * @param {*} target 评论id
 * @returns
 */
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: 'comment/likings',
    data: {
      target
    }
  })
}
/**
 *  文章评论取消点赞接口
 * @param {*} target 评论id
 * @returns
 */
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}
/**
 *  target 文章id或者评论id
 * content内容
 * art_id 文章id  对评论内容发表回复时需要携带此id、表明所属文章id、对文章进行评论不需要传此参数
 * @param {*} data
 * @returns
 */
export const addComment = (data) => {
  return request({
    method: 'POST',
    url: 'comments',
    data
  })
}
