<template>
  <div class="newSongs" :class="[`${program + 'newsongs-' + theme}`]">
    <h4 class="top">最新音乐</h4>
    <div class="content">
      <!-- dbclick双击事件 -->
      <div
        class="item"
        v-for="(item, index) in musicList"
        :key="index"
        @dblclick="playMusic(index)"
      >
        <div class="number">
          <span
            v-show="
              !(
                playId == 'no-id' &&
                index == playIndex &&
                item.name == playName
              )
            "
          >
            <!-- 因为index从0开始，因此需要+1 -->
            {{ index + 1 }}
          </span>
          <i
            class="iconfont icon-V"
            v-show="
              playId == 'no-id' && index == playIndex && item.name == playName
            "
            :class="`${'icon-' + theme}`"
          ></i>
          <!-- playname还没有定义，因此不会显示 还没引入playMusic和playing-->
        </div>
        <div class="title">
          <img v-lazy="item.picUrl" alt @load="newSongImgLoad" />
          <div class="icon">
            <i class="iconfont icon-bofang"></i>
          </div>
        </div>
        <div class="mess">
          <div>{{ item.name }}</div>
          <br />
          <div class="bottom">
            {{ item.song.album.company }}
            <span v-if="item.song.album.company">/</span
            >{{ item.song.artists[0].name }}
          </div>
          <!-- 显示还是序号0-9的资料 之后来的不知道如何处理 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgLoadMixin } from "@/mixin/global/imgLoad.js";
import { theme } from "@/mixin/global/theme.js";
import { playMusic } from "@/mixin/global/play-music";
import { playing } from "@/player/playing";
export default {
  name: "newSongs",
  props: {
    musicList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  mixins: [imgLoadMixin, theme, playMusic, playing],
  // computed: {
  //   isPlay() {
  //     /**判断是否处于播放状态 */
  //     return (
  //       // eslint-disable-next-line no-undef
  //       this.playId == "no-id" && index == playIndex && item.name == playName
  //     );
  //   },
  // },
  methods: {
    newSongImgLoad() {
      // console.log(this.imgCount);
      if (this.imgCount == this.musicList.length) {
        this.$emit("newSongImgLoad");
        // 如果图片够了，就启动处理刷新函数，不过这里的handleRefresh没有实现
      }
      this.imgCount++;
    },
  },
};
</script>

<style lang="less" scoped>
.dance-music-newsongs {
  &-dark {
    color: var(--dark-article-color);
  }
}
.newSongs {
  width: 100%;
}
.top {
  border-bottom: 1px solid #b8b6b6;
}
.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap; //不换行的话，所有的项目就会排成一列
  // flex-wrap 属性规定弹性项目是否应换行。
}
.item {
  padding: 10px 10px;
  width: 50%;
  height: 70px;
  display: flex;
  cursor: pointer;
}
.number {
  height: 70px;
  width: 40px;
  text-align: center;
  line-height: 70px;
}
// 没写title导致播放键未居中
.title {
  position: relative;
  height: 100%;
}
.title img {
  height: 100%;
}
.icon {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 0px;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.icon img {
  width: 100%;
}
.mess {
  flex: 1;
  margin-left: 10px;
  font-size: 13px;
  position: relative;
}
.mess .bottom {
  position: absolute;
  bottom: 0px;
}
.icon-bofang {
  color: var(--dark-article-color);
}
</style>
