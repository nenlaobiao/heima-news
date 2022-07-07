<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link @click="showInput">
      <van-image
        class="avatar"
        width="50px"
        height="50px"
        round
        :src="myInfo.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="myInfo.name"
      @click="
        isNameShow = true;
        name = myInfo.name;
      "
      is-link
    />
    <van-cell title="性别" :value="myInfo.gender === 0 ? '男' : '女'" is-link />
    <van-cell
      title="生日"
      :value="myInfo.birthday"
      is-link
      @click="isBirthdayShow = true"
    />
    <van-popup position="bottom" style="height: 100%" v-model="isNameShow">
      <van-nav-bar
        title="修改名字"
        left-text="取消"
        right-text="保存"
        @click-left="onNameCancel"
        @click-right="onNameSave"
      />
      <van-field
        :value="myInfo.name"
        @input="name = $event"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup>
    <van-popup position="bottom" style="height: 45%" v-model="isBirthdayShow">
      <van-datetime-picker
        @confirm="onConfirm"
        @cancel="onCancel"
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <van-popup position="bottom" style="height: 70%" v-model="isAvatarShow">
      <UpdateAvatar
        :imgSrc.sync="imgSrc"
        @close="isAvatarShow = false;
        myInfo.photo=$event"
      ></UpdateAvatar>
    </van-popup>
    <input
      type="file"
      name=""
      ref="file"
      style="display: none"
      accept="image/jpeg,image/png,image/gif,image/jpg"
      @change="onChange"
    />
  </div>
</template>

<script>
import UpdateAvatar from './components/UpdateAvatar.vue'
import { getUserProfile, updataUserProfile } from '@/api/user'
export default {
  created () {
    this.getUserProfile()
  },
  data () {
    return {
      isNameShow: false,
      isBirthdayShow: false,
      isAvatarShow: false,
      myInfo: {},
      name: '',
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2022, 8, 1),
      birthday1: '',
      imgSrc: ''
    }
  },
  methods: {
    onChange () {
      const src = window.URL.createObjectURL(this.$refs.file.files[0])
      this.imgSrc = src
      this.isAvatarShow = true
    },
    showInput () {
      this.$refs.file.click()
    },
    onConfirm () {
      this.myInfo.birthday = this.birthday1
      this.updataUserProfile()
      this.isBirthdayShow = false
    },
    onCancel () {
      this.isBirthdayShow = false
    },
    onNameCancel () {
      this.isNameShow = false
    },
    async onNameSave () {
      await this.updataUserProfile()
      this.isNameShow = false
    },
    async updataUserProfile () {
      try {
        this.myInfo.name = this.name
        const res = await updataUserProfile(this.myInfo)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    async getUserProfile () {
      try {
        const res = await getUserProfile()
        console.log(res)
        this.myInfo = res.data.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    currentDate: {
      get () {
        return new Date(this.myInfo.birthday)
      },
      set (newVal) {
        this.birthday1 = newVal.getFullYear() + '-' + (newVal.getMonth() + 1) + '-' + newVal.getDate()
      }
    }
  },
  watch: {
  },
  filters: {},
  components: { UpdateAvatar }
}
</script>

<style scoped lang='less'>
/deep/.van-icon {
  color: #fff !important;
}
/deep/.van-nav-bar__text {
  color: #fff !important;
}
</style>
