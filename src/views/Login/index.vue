<template>
  <div class="main">
    <van-nav-bar title="登录" left-arrow placeholder>
      <template #left><van-icon name="cross" color="white" /></template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '不符合手机号格式',
          },
        ]"
        ><i class="toutiao toutiao-shouji" slot="left-icon"></i
      ></van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          {
            pattern: /^\d{6}$/,
            message: '验证吗长度必须是6位',
          },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-button
            v-if="isCountDownShow"
            round
            size="small"
            color="#ededed"
            native-type="button"
            class="tijiao"
            @click="onSendSms"
            >发送验证码</van-button
          >
          <van-count-down
            class="djs"
            :time="time"
            v-else
            format="ss秒"
            @finish="timeFn"
          /> </template
      ></van-field>
      <div style="margin: 16px">
        <van-button block type="info" class="login" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      isCountDownShow: true,
      time: 30 * 1000,
      mobile: '13911111111',
      code: '246810'
    }
  },
  methods: {
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = false
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail(err.response.data.message)
        }
        console.log('验证通过')
      } catch (err) {
        console.log('失败')
        console.log(err)
        return this.$toast.fail('手机号格式不对')
      }
    },
    timeFn () {
      this.isCountDownShow = true
      console.log(1)
    },
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.main {
  height: 1334px;
  background-color: rgb(245, 245, 245);
  .toutiao {
    font-size: 37px;
  }
  .tijiao {
    width: 165px;
    height: 50px;
    line-height: 18px;
    .van-button__text {
      color: #666666;
    }
  }
  .login {
    background-color: #6db4fb;
    border-radius: 10px;
    border: 0px;
  }
}
van-count-down {
  line-height: 50px;
  height: 50px;
}
</style>
