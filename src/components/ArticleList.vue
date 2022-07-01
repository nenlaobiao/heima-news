<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in ArticleList"
          :key="index"
          :article="item"
        ></ArticleItem>
        <!-- <van-cell
          :title="item.title"
          v-for="(item, index) in ArticleList"
          :key="index"
          :label="item.pubdate"
        >
          <template>
            <van-image
              v-for="(src, index) in item.cover.images"
              :key="index"
              width="70"
              height="70"
              :src="src"
            /> </template
        ></van-cell> -->
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getArtList } from '@/api/home'
let ele = null
let scrollTop = 0
export default {
  props: {
    listId: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    // console.log(this.$refs.pullrefresh)
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      scrollTop = this.scrollTop
    })
  },
  activated () {
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      timestamp: +new Date(),
      ArticleList: []
    }
  },
  methods: {
    onLoad () {
      this.getList()
    },

    async getList () {
      try {
        const res = await getArtList({
          channelId: this.listId,
          timestamp: this.timestamp
        })
        // console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        this.ArticleList.push(...res.data.data.results)
        this.loading = false
        this.refreshing = false
        // console.log(this.ArticleList)
      } catch (error) {
        console.log(error)
      }
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false
      this.timestamp = +new Date()
      this.ArticleList = []
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
</style>
