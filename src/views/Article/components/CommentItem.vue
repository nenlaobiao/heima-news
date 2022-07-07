<template>
  <van-cell>
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d" slot="title">hello</span>
    <div slot="label">
      <p style="color: #363636">{{ item.content }}</p>
      <p>
        <span style="margin-right: 10px">{{ item.pubdate | dateformat }}</span>
        <van-button size="mini" type="default" @click='$emit("replay-show",item)'
          >{{ item.reply_count ? item.reply_count : "" }} 回复</van-button
        >
      </p>
    </div>
    <van-loading v-if="isLoading" />
    <van-icon
      v-else
      slot="right-icon"
      :color="item.is_liking ? 'red' : ''"
      :name="item.is_liking ? 'like' : 'like-o'"
      @click="likeFn()"
      >{{ item.like_count ? item.like_count : "赞" }}</van-icon
    >
  </van-cell>
</template>

<script>
import { addLike, delLike } from '@/api/comment'
export default {
  props: {
    item: {
      type: Object,
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
    likeFn () {
      if (this.item.is_liking) {
        this.delLike()
      } else {
        this.addLike()
      }
    },
    async addLike () {
      this.isLoading = true
      try {
        await addLike(this.item.com_id)
        this.item.like_count++
        this.item.is_liking = true
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false
    },
    async delLike () {
      this.isLoading = true

      try {
        await delLike(this.item.com_id)
        this.item.like_count--
        this.item.is_liking = false
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false
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
