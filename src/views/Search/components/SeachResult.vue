
<template>
  <div class="container">
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(obj, ind) in searchList"
          :key="ind"
          :article="obj"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getSearchList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchList()
  },
  data () {
    return {
      searchList: [],
      page: 1,
      per_page: 20,
      loading: false,
      finished: false,
      count: 0,
      isLoading: false
    }
  },
  methods: {
    onRefresh () {
      this.searchList = []
      this.page = 1
      this.onLoad()
      this.isLoading = false
    },
    onLoad () {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.page++
        this.getSearchList()
      }, 500)
    },
    async getSearchList () {
      try {
        const res = await getSearchList({ page: this.page, per_page: this.per_page, q: this.searchText })
        // console.log(res)
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.searchList.push(...res.data.data.results)
        this.loading = false
        console.log(this.searchList)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {
  },
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.container {
  height: calc(100vh - 108px);
  overflow: auto;
}
</style>
