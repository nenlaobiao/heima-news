<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="$router.back()"
        autofocus
        @focus="isSearch = false"
      />
    </form>
    <SearchHistory v-if="searchText === '' " @search="onSearch"></SearchHistory>
    <template v-else>
      <SeachResult v-if="isSearch"  :searchText="searchText"></SeachResult>
      <SeachSuggest
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></SeachSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from '@/views/Search/components/SearchHistory.vue'
import SeachResult from '@/views/Search/components/SeachResult.vue'
import SeachSuggest from './components/SeachSuggest.vue'
export default {
  created () { },
  data () {
    return {

      searchText: '',
      isSearch: false
    }
  },
  methods: {
    onSearch (str) {
      this.searchText = str
      this.isSearch = true
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    SearchHistory,
    SeachResult,
    SeachSuggest
  }
}
</script>

<style scoped>
</style>
