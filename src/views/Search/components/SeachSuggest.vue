
<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in searchList"
      @click="$emit('search', item)"
      :key="index"
    >
      <template>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      searchList: []
    }
  },
  methods: {
    highlight (str) {
      try {
        const reg = new RegExp(this.searchText, 'g')
        return str.replace(reg, `<span style = "color:red">${this.searchText}</span>`)
      } catch (error) {

      }
    },
    async getSuggestList (text) {
      try {
        const res = await getSuggestList(text)
        console.log(res)
        this.searchList = res.data.data.options
        this.$emit('search', this.searchText)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.getSuggestList(newVal)
        }, 200)
      },
      immediate: true
    }
  },
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
