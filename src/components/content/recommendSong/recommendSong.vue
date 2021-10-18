<template>
  <div :class="program + 'recommend'">
    <div
      class="recommend-item"
      @mouseenter="handleEnter()"
      @mouseleave="handleLeave()"
      @click="enterRecommendListDetail()"
    >
      <div class="recommend-item-container">
        <!-- 内部图片容器 -->
        <div class="recommend-item-container-group">
          <transition name="recommend-slide"> </transition>
          <img src="@/assets/img/loading.png" alt="/" />
          <transition name="dance-music-opacity">
            <div class="recommend-play" v-show="isEnter">
              <i class="iconfont icon-icon_play"></i>
            </div>
          </transition>
        </div>
        <div
          class="recommend-name"
          :class="[`${program + 'recommend-name' + theme}`]"
        >
          每日歌曲推荐
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { theme } from "@/mixin/global/theme.js";
// import { imgLoadMixin } from "@/mixin/global/imgLoad.js";
export default {
  name: "RecommendSong",
  mixins: [theme],
  data() {
    return {
      currentIndex: null, //控制描述信息、播放次数显示隐藏
      isEnter: false,
    };
  },
  methods: {
    handleEnter() {
      this.isEnter = true;
    },
    handleLeave() {
      this.isEnter = false;
    },
    enterRecommendListDetail() {
      this.$router.push("/RecommendSonglistDetail/");
    },
  },
};
</script>

<style lang="less" scoped>
.dance-music-recommend {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .recommend-item {
    width: calc(20%);
    padding: 5px 10px;
    img {
      width: 100%;
      border-radius: 4px;
    }
  }
  &-recommend-name-dark {
    color: #ffffff;
  }
}
.recommend-item-container {
  cursor: pointer;
  overflow: hidden;
  &-group {
    position: relative;
  }
}
.recommend-name {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
}
.recommend-play {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 5px;
  bottom: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center; //这个的作用是使红色三角形放在几乎透明圆形的中间
  .icon-icon_play {
    font-size: 18px;
    color: var(--main-color);
  }
}
.recommend-slide-enter-active {
  animation: slideInDown 0.4s;
}
.recommend-slide-leave-active {
  animation: slideInDown 0.4s reverse;
}
</style>
