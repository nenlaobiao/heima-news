import request from '@/utils/request'
/**
 * 获取用户频道接口
 * @returns
 */
export const getMychannels = () => {
  return request({
    url: '/user/channels'
  })
}

export const getArtList = ({ channelId, timestamp }) => {
  return request({
    url: 'articles',
    params: {
      channel_id: channelId,
      timestamp: timestamp
    }
  })
}
export const saveChannels = (channels) => {
  return request({
    url: '/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
