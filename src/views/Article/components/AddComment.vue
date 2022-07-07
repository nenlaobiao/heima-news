<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入评论"
    show-word-limit
    ref="field"
  >
    <template #extra>
      <van-button type="default" @click="onClick" :disabled="message === ''"
        >发布</van-button
      >
    </template>
  </van-field>
</template>

<script>
import { Toast } from 'vant'
import { addComment } from '@/api/comment'
export default {
  props: {
    art_id: {
      type: [Number, String]
    },
    target: {
      type: [Number, String],
      required: true
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    onClick () {
      this.addComment()
    },
    async addComment () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message
        })
        this.$emit('addCommt', res.data.data.new_obj)
        Toast('评论成功')
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  mounted () {
    this.$refs.field.$el.querySelector('textarea').focus()
  },
  components: {}
}
</script>

<style scoped lang='less'>
.van-field {
  align-items: center;
  padding-right: 0px;
}
/deep/ .van-field__value {
  background-color: #f5f7f9;
}
</style>
