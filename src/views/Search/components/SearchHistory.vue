<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDel">
        <span @click="delAll">全部删除</span>&nbsp;&nbsp;
        <span @click="isDel = !isDel">完成</span>
      </template>
      <van-icon name="delete" v-else @click="isDel = !isDel" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistoryList"
      @click="$emit('search', item)"
      :key="index"
    >
      <van-icon name="close" v-if="isDel" @click.stop="del(index)" />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isDel: false
    }
  },
  computed: {
    ...mapState(['searchHistoryList'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    del (num) {
      this.$store.commit('delHistory', num)
    },
    delAll () {
      this.$store.commit('delAllHistory')
      this.isDel = false
    }
  }
}
</script>

<style scoped lang="less"></style>
