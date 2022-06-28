<template>
  <div class="main">
    <div v-if="user && user.token" class="header header-login">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            round
            :src="this.userinfo.photo"
          />
          <span>{{this.userinfo.name}}</span>
        </div>
        <div class="btn">编辑资料</div>
      </div>
      <ul class="lists">
        <li>
          <p>{{userinfo.art_count}}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{userinfo.follow_count}}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{userinfo.fans_count}}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{userinfo.like_count}}</p>
          <p>赞赏</p>
        </li>
      </ul>
    </div>
    <div v-else class="header header-nologin">
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-button
      type="default"
      @click="logout"
      v-if="$store.state.user && $store.state.user.token"
      block
      >退出登录</van-button
    >
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'my',

  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userinfo = res.data.data
      } catch (e) {
        console.log(e)
      }
    }
  },
  data () {
    return { userinfo: {} }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '是否确认退出登陆？' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  background-color: #3296fa;
  background: rgba(50, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-nologin {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  p {
    font-size: 28px;
    font-weight: 400px;
    color: #fff;
    padding: 0;
    margin: 0;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 45px;
    padding: 0 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      // .van-image {
      //   vertical-align: middle;
      // }
      span {
        font-size: 30px;
        color: #ffffff;
        margin-left: 22px;
      }
    }
    .btn {
      font-size: 20px;
      line-height: 32px;
      color: #666666;
      width: 116px;
      height: 33px;
      font-weight: 400;
      background-color: #ffffff;
      border-radius: 16px;
      text-align: center;
    }
  }
}
.lists {
  display: flex;
  li {
    flex: 1;
    text-align: center;
    p {
      font-weight: 400;
      color: #fff;
      &:nth-child(1) {
        font-size: 36px;
      }
      &:nth-child(2) {
        font-size: 23px;
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
.van-cell {
  height: 100px;
}
.van-cell-group {
  padding: 9px 0;
}
.van-button {
  color: #d86262;
}
</style>
