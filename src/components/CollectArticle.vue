<template>
  <van-loading v-if="isLoading" size=".533333rem" />
  <van-icon
    v-else
    color="#777"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onClick"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }

  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      this.isLoading = true
      console.log(this.isLoading)
      if (this.is_collected) {
        try {
          // console.log(this.$route.params.article_id)
          await delCollect(this.$route.params.article_id)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await addCollect(this.$route.params.article_id)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (error) {
          console.log(error)
        }
      }
      this.isLoading = false
      console.log(this.isLoading)
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
