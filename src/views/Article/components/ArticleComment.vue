<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(obj, index) in commentList"
        :key="index"
        :item="obj"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentsAPI } from '@/api/comment'
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    },
    artId: {
      type: [Number, String],
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    console.log(this.artId)
    this.getComments()
  },
  data () {
    return {
      loading: false,
      finished: false,
      // commentList: [],
      paramObj: {
        type: this.type,
        source: this.artId,
        offset: null,
        limit: 10
      }
    }
  },
  methods: {
    onLoad () {
      this.getComments()
    },
    async getComments () {
      try {
        const res = await getCommentsAPI(this.paramObj)
        console.log(res)
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        this.$emit('commnum', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)
        this.paramObj.offset = res.data.data.last_id
        console.log(this.commentList)
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
