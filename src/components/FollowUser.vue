<template>
  <div>
    <van-button
      :disabled="isAjax"
      :loading="isAjax"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      :icon="value ? '' : 'plus'"
      :plain="value"
      @click="follow()"
      >{{ value ? "已关注" : "关注" }}</van-button
    >
  </div>
</template>

<script>
import { Toast } from 'vant'
import { addFollow, delFollow } from '@/api/article'
export default {
  name: 'FollowUser',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    target: {
      type: [Number, String],
      required: true
    }
  },
  created () {

  },
  data () {
    return {
      isAjax: false
    }
  },
  methods: {
    async follow () {
      this.isAjax = true
      if (this.value) {
        try {
          const res = await delFollow(this.target)
          this.$emit('input', !this.value)
          console.log(res)
        } catch (error) {
          console.log(error)
          Toast('关注失败')
        }
      } else {
        try {
          const res = await addFollow(this.target)
          this.$emit('input', !this.value)
          console.log(res)
        } catch (error) {
          console.log(error)
          Toast('关注失败')
        }
      }
      this.isAjax = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
