<template>
  <div class="main">
    <div class="title">
      <h3>我的频道</h3>
      <van-button
        plain
        size="mini"
        type="danger"
        round
        @click="clsShow = !clsShow"
        ><div class="van-ellipsis">
          {{ clsShow ? "完成" : "编辑" }}
        </div></van-button
      >
    </div>
    <van-row gutter="11">
      <van-col span="6" v-for="(item, index) in channels" :key="item.id">
        <div class="inner" @click="onAdd(index)">
          <p :style="{ color: active === index ? 'red' : '' }">
            {{ item.name }}
          </p>
          <van-icon name="close" v-show="clsShow" v-if="index !== 0" />
        </div>
      </van-col>
    </van-row>
    <div class="list">
      <h3>推荐频道</h3>
      <!-- <van-button plain size="mini" type="danger" round>编辑</van-button> -->
    </div>
    <van-row gutter="11">
      <van-col
        span="6"
        v-for="item in allList"
        :key="item.id"
        @click="add(item.id)"
      >
        <div class="inner">
          <div class="van-ellipsis">+{{ item.name }}</div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
import { getAllArtLists } from '@/api/user'
const CHANNELS = 'channels'
export default {
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllList()
  },
  data () {
    return {
      allList: [],
      clsShow: false
    }
  },
  methods: {
    onAdd (index) {
      if (this.clsShow) {
        if (index === 0) { return }
        // 删除
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.allList.push(obj)
        // console.log(index)
        // console.log(this.active)
        if (index < this.active) {
          // console.log(1)
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 切换
        this.$emit('change-active', index)
      }
    },
    add (id) {
      const index = this.allList.findIndex(item => item.id === id)
      this.channels.push(this.allList[index])
      this.allList.splice(index, 1)
    },
    async getAllList () {
      try {
        const res = await getAllArtLists()
        // console.log(res)
        this.allList = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
        // console.log(this.allList)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) {
          // console.log(newVal)
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, saq: index })
          })
          // console.log(arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (error) {
            console.log(error)
          }
        } else {
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  .title,
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
  }
  h3 {
    font-weight: normal;
    font-size: 26px;
    color: #333;
  }

  .van-button {
    padding: 5px 25px;
    font-size: 13px;
    // line-height: 12px;
    color: red;
    border-color: red;
  }
  .van-row {
    padding: 0 23px;
    margin-bottom: 20px;
    .van-col {
      margin-top: 20px;
      // background-color: #eee;
      .inner {
        position: relative;
        width: 160px;
        height: 86px;
        background-color: #f4f5f6;
        border-radius: 6px;
        text-align: center;
        font-size: 24px;
        line-height: 84px;
        letter-spacing: 1px;
        color: #646566;
        i {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(50%, -50%);
          font-size: 34px;
        }
      }
    }
  }
}
</style>
