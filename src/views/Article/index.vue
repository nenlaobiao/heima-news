<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <template v-else>
        <!-- 加载完成-文章详情 -->
        <div class="article-detail" v-if="article.art_id">
          <!-- 文章标题 -->
          <h1 class="article-title">{{ article.title }}</h1>
          <!-- /文章标题 -->

          <!-- 用户信息 -->
          <van-cell class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="article.aut_photo"
            />
            <div slot="title" class="user-name">黑马头条号</div>
            <div slot="label" class="publish-date">
              {{ article.pubdate | dateformat }}
            </div>
            <FollowUser
              v-model="article.is_followed"
              :target="article.aut_id"
            ></FollowUser>
          </van-cell>
          <!-- /用户信息 -->

          <!-- 文章内容 -->
          <div
            class="article-content markdown-body"
            v-html="article.content"
          ></div>
          <van-divider>正文结束</van-divider>
          <ArticleComment
            :artId="article.art_id"
            :type="'a'"
            @commnum="count = $event"
            :commentList="commentList"
            @replay-show="
              comment = $event;
              isReplayShow = true;
            "
          ></ArticleComment>
        </div>
        <!-- /加载完成-文章详情 -->

        <!-- 加载失败：404 -->
        <div class="error-wrap" v-else-if="is404error">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->

        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div class="error-wrap" v-else>
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button class="retry-btn" @click="rea()">点击重试</van-button>
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      </template>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom" v-if="!isLoading && article.art_id">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="popupShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="count" color="#777" />
      <!-- <van-icon color="#777" name="star-o" /> -->
      <CollectArticle
        :is_collected.sync="article.is_collected"
      ></CollectArticle>
      <van-icon color="#777" name="good-job-o" />
      <van-icon
        name="share"
        color="#777777"
        @click="showShare = true"
      ></van-icon>
    </div>
    <!-- <van-cell title="显示分享面板" @click="showShare = true" /> -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
    <!-- /底部区域 -->
    <van-popup v-model="popupShow" position="bottom">
      <AddComment
        v-if="popupShow"
        :target="article.art_id"
        @addCommt="addCommt($event)"
      ></AddComment>
    </van-popup>
    <van-popup
      v-model="isReplayShow"
      :style="{ height: '100%' }"
      position="bottom"
    >
      <ReplayComment
      v-if='isReplayShow'
        :comment="comment"
        @offReplay="isReplayShow = false"
      ></ReplayComment>
    </van-popup>
  </div>
</template>

<script>
import ReplayComment from './components/ReplayComment.vue'
import AddComment from './components/AddComment.vue'
import ArticleComment from './components/ArticleComment.vue'
import { Toast, ImagePreview } from 'vant'
import 'github-markdown-css'
import { getArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: { ArticleComment, AddComment, ReplayComment },
  props: {
    article_id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      comment: {},
      isReplayShow: false,
      commentList: [],
      popupShow: false,
      count: null,
      isLoading: true,
      article: {},
      is404error: false,
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  },
  watch: {},
  created () {
    this.getArticle()
  },
  mounted () { },
  methods: {
    addCommt (obj) {
      this.commentList.unshift(obj)
      this.popupShow = false
    },
    rea () {
      this.getArticle()
    },
    update (value) {
      this.article.is_collected = value
    },
    onSelect (option) {
      Toast(option.name)
      this.showShare = false
    },
    async getArticle () {
      try {
        const res = await getArticle(this.article_id)
        this.isLoading = false
        this.article = res.data.data
        console.log(this.article)
      } catch (error) {
        if (error.request && error.request.status === 404) {
          this.is404error = true
        }
        console.log(error.request.status)
      }
      this.isLoading = false
      this.$nextTick(() => {
        const arr = document.querySelectorAll('.article-content img')
        if (arr.length === 0) return
        const imgsSrc = []
        arr.forEach((img, ind) => {
          imgsSrc.push(img.src)
          img.onclick = function () {
            ImagePreview({
              images: imgsSrc,
              startPosition: ind,
              maxZoom: 3,
              showIndicators: true
            })
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
.van-nav-bar {
  /deep/.van-icon {
    color: #fff !important;
  }
}
</style>
