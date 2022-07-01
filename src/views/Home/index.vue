<template>
  <div>
    <van-nav-bar title="标题" fixed placeholder>
      <template #title>
        <van-button type="info" icon="search" class="search-btn"
          >搜索
        </van-button>
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated>
      <van-tab :title="obj.name" v-for="obj in channels" :key="obj.id">
        <ArticleList :listId="obj.id"> 内容</ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu" @click="menuShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="menuShow"
      position="bottom"
      :style="{ height: '95%', paddingTop: '1.2rem' }"
      closeable
      close-icon-position="top-left"
      ><SetChannelMenu
        @del-evebnt="delEvent($event)"
        @change-active="changeAct($event)"
        :channels="channels"
        :active="active"
      ></SetChannelMenu>
    </van-popup>
  </div>
</template>

<script>
import SetChannelMenu from './components/SetChannelMenu.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMychannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'channels'
export default {
  name: 'Home',
  created () {
    this.getChannelsLists()
  },
  data () {
    return {
      active: 0,
      channels: [],
      menuShow: false
    }
  },
  methods: {
    delEvent (index) {
      this.active = index
    },
    changeAct (index) {
      this.active = index
      this.menuShow = false
    },
    async getChannelsLists () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMychannels()
          // console.log(res)
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }

  },
  computed: {},

  filters: {},
  components: { ArticleList, SetChannelMenu }
}
</script>

<style scoped lang='less'>
/deep/.van-tab__pane {
  margin-top: 90px;
}
.search-btn {
  color: #fff;
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
.van-icon {
  font-size: 32px;
  color: #fff;
}
/deep/.van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
  border-bottom: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: #3296fa;
  border-radius: 3px;
}
.menu {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  // background-color: #666;
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  font-size: 33px;
  font-weight: 600;
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
}
/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
