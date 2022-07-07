<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="$emit('offReplay')"
      fixed
      placeholder
    >
      <template #left>
        <van-icon name="cross" color="#ffffff" />
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" @replay-show="show = true"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      v-for="item in list"
      :item="item"
      :key="item.com_id"
    ></CommentItem>
    <div class="box"></div>
    <div class="bottom">
      <van-button type="info" block round plain @click="isAddCommentShow = true"
        >回复</van-button
      >
    </div>
    <van-popup position="bottom" v-model="isAddCommentShow"
      ><AddComment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddCommentShow"
        @addCommt="
          list.unshift($event);
          isAddCommentShow = fasle;
          comment.reply_count++
        "
    /></van-popup>

    <!-- 新添加评论 -->
  </div>
</template>

<script>
import { getCommentsAPI } from '@/api/comment'
import AddComment from './AddComment.vue'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentsAPI()
  },
  data () {
    return {
      isAddCommentShow: false,
      offset: null,
      limit: 10,
      show: false,
      list: []
    }
  },
  methods: {
    async getCommentsAPI () {
      try {
        const res = await getCommentsAPI({
          type: 'c',
          source: this.comment.com_id,
          offset: this.offset,
          limit: this.limit
        })
        console.log(res)
        this.list = res.data.data.results
        console.log(this.list)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (this.comment.reply_count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.box {
  height: 100px;
}
.bottom {
  width: 750px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: #3296fa;
}
</style>
