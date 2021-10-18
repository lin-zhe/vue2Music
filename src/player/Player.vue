/* eslint-disable no-self-assign */
<template>
  <div :class="playerClass">
    <!-- 播放器歌曲封面 -->
    <player-cover :song="playList[currentIndex]" class="player-cover" />
    <lyric
      :lyric="lyric"
      :disable-bar="true"
      :currentTime="currentTime"
      height="40px"
      ref="lyric"
      class="player-lyric-simple"
      v-show="isShowLyric"
    />
    <transition name="player-side">
      <player-list
        class="player-list"
        :music-list="musicList"
        v-show="isShowList"
      />
    </transition>
    <transition name="player-pure-side">
      <player-pure
        :song="playList[currentIndex]"
        :lyric="lyric"
        :current-time="currentTime"
        v-show="isPure"
        @PlayChangeMusicListItem="playWithNewMusic($event)"
      />
    </transition>
    <audio
      :src="getSongSrc"
      autoplay
      :loop="schemaIndex === 2 ? true : false"
      ref="audio"
      @timeupdate="audioTimeUpdate()"
      @pause="musicPause()"
      @ended="musicEnded()"
      @play="playLoad()"
      @playing="musicPlaying()"
      @error="musicErr()"
    ></audio>
    <div class="handleSong">
      <div class="player-toggle" :class="[`${'player-toggle-' + theme}`]">
        <div class="player-pre player-toggle-item" @click="preMusic">
          <i class="player-icon iconfont icon--previous"></i>
        </div>
        <div class="player-player-type player-toggle-item" @click="toggle()">
          <i
            class="player-icon-type iconfont icon-bofang1"
            v-show="!isPlay"
          ></i>
          <i class="player-icon-type iconfont icon-zanting" v-show="isPlay"></i>
        </div>
        <div class="player-next player-toggle-item" @click="nextMusic()">
          <i class="player-icon iconfont icon-next"></i>
        </div>
      </div>
      <div class="player-progress">
        <div class="player-progress-current-time">{{ getCurrentTime }}</div>
        <div class="player-progress-main">
          <b-progress
            :percent.sync="percent"
            :stroke-width="4"
            :track-base-color="getProgressBaseColor"
            :track-color="iconActiveColor"
            show-thumb
            hover-show-thumb
            allow-click
            allow-drag
            is-active
            :disable-transition="currentTime == 0"
            @click="handleAudioProgress"
            @dragend="handleAudioDragEnd"
            @dragbegin="handleAudioBeginDrag"
          />
        </div>
        <div class="player-progress-time">{{ getDurationTime }}</div>
        <div class="player-volumn">
          <b-poptip
            class="pop-item"
            theme="light"
            placement="top-start"
            max-length="200px"
            trigger="click"
          >
            <span>
              <i class="player-small-icon iconfont icon-V" v-show="!isVolume" />
              <i
                class="player-small-icon iconfont icon-jingyin"
                v-show="isVolume"
              />
            </span>
            <b-button
              @click="toggleVolumn"
              slot="content"
              class="player-volumn-content-button"
            >
              <i class="player-small-icon iconfont icon-V" v-show="!isVolume" />
              <i
                class="player-small-icon iconfont icon-jingyin"
                v-show="isVolume"
              />
            </b-button>
            <div slot="content">
              <b-progress
                :percent.sync="volumnPercent"
                :stroke-width="3"
                :track-base-color="getProgressBaseColor"
                :track-color="iconActiveColor"
                show-thumb
                hover-show-thumb
                allow-click
                allow-drag
                is-active
                @click="handleVolumn"
                @dragend="handleVolumn"
                class="player-volumn-progress"
              />
            </div>
          </b-poptip>
        </div>
        <div class="player-tool">
          <div class="player-tool-schema" @click="toggleSchema()">
            <a href="#" title="顺序播放" v-show="schemaIndex == 0"
              ><i class="player-small-icon iconfont icon-shunxu"
            /></a>
            <a href="#" title="随机播放" v-show="schemaIndex == 1"
              ><i class="player-small-icon iconfont icon-suiji"
            /></a>
            <a href="#" title="单曲播放" v-show="schemaIndex == 2"
              ><i class="player-small-icon iconfont icon-danqu"
            /></a>
          </div>
          <div class="player-tool-lyric" @click="toggleLyric">
            <a href="#" title="歌词">
              <i
                class="player-small-icon iconfont icon-lyric"
                :class="[this.isShowLyric ? `${'player-icon-' + theme}` : '']"
              />
            </a>
          </div>
          <div class="player-tool-list" @click="toggleMusicList">
            <a href="#" title="歌单"
              ><i
                class="player-small-icon iconfont icon-gedan"
                :class="[this.isShowList ? `${'player-icon-' + theme}` : '']"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const prefixCls = "player";
import PlayerCover from "./player-cover";
import { _getLyric } from "@/network/detail";

import { theme } from "@/mixin/global/theme";
import { formatDate } from "@/utils/tool";
import Lyric from "./player-lyric";
import PlayerList from "./player-list";
import PlayerPure from "./player-pure";
//import { SimiSong } from "./init-songs";
export default {
  name: "Player",
  mixins: [theme],
  components: { PlayerCover, Lyric, PlayerList, PlayerPure },
  data() {
    return {
      prefixCls: prefixCls,
      isPlay: false, //true正在播放
      percent: 0, //音乐进度百分比
      volumnPercent: 100, //音量百分比
      currentTime: 0, //当前音乐播放时间
      duration: 0, //音乐总时间
      schemaIndex: 0, //音乐播放方式--0:顺序、1：随机、2：单曲
      playList: [] /**播放列表
      @params {
      this.index=index;
      this.name=song.name;
      this.artist=song.artist;
      this.src=url;
      this.pic=song.pic;
      this.id=id;
      }
      */,
      currentIndex: 0, //当前播放音乐
      musicList: [], //歌单
      isMusicDrag: false, //是否音乐进度条正在拖拽正在拖拽
      isVolume: false, //是否静音true静音
      preVolumnPercent: 0, //在设置音量切换时暂时保存之前音量百分比
      lyric: null, //歌词
      isShowLyric: false, //是否显示歌词,
      isShowList: false, //是否显示播放列表
      isPure: false, //是否是纯净模式
      id: null, //接收传来的播放列表唯一标识
      simiSongUrl: "", //相似歌曲的url
    };
  },
  computed: {
    /**获取歌词播放地址 */
    getSongSrc() {
      return (
        (this.playList[this.currentIndex] &&
          this.playList[this.currentIndex].src) ||
        ""
      );
    },
    /**播放器class样式 */
    playerClass() {
      return [`${this.prefixCls}`];
    },
    /**格式化audio currentTime => 'MM:dd' */
    getCurrentTime() {
      /* new Date()传入的是毫秒，而$refs.audio.currentTime返回的是秒*/
      return formatDate(new Date(this.currentTime * 1000), "mm:ss") || "00:00";
    },
    /**格式化duration => 'mm:dd' */
    getDurationTime() {
      return formatDate(new Date(this.duration * 1000), "mm:ss") || "00:00";
    },
    /**进度条背景颜色 */
    getProgressBaseColor() {
      let color = "";
      color = this.theme == "dark" ? "#171719" : "";
      return color;
    },
  },
  mounted() {
    this.$bus.$on("playMusic", (playList, index, musicList, id) => {
      this.id = id;
      this.musicList = musicList;
      // console.log(this.musicList);
      /**初始化播放列表 */
      this.playList = [];
      /**对playList进行处理 */
      let transferList = [];
      /**过滤掉没有音乐地址的歌曲 */
      transferList = playList.filter((item) => {
        return item.src;
      });
      this.playList = transferList;

      /**在请求歌曲的时候可能有的歌曲不可用，或丢失。导致在播放器中的歌曲列表和页面展示存在差异，可能会出现指定的播放歌曲不服
       * 用一次查找解决问题
       */
      this.setCurrentIndex(index);
    });
    /**监听子组件播放列表双击切换歌曲 */
    this.$bus.$on("PlayMusicListItem", (index) => {
      this.setCurrentIndex(index);
    });
  },
  // provide: function () {
  //   //依赖注入
  //   return {
  //     eventBus: this.eventBus,
  //   };
  // },
  methods: {
    //   playWithNewMusic(item) {
    //     this.getNewSongUrl(item.id);
    //     // console.log(this.simiSongUrl);
    //     let song = new SimiSong(
    //       this.currentIndex,
    //       item.album.name,
    //       item.album.artists[0].name,
    //       this.simiSongUrl,
    //       item.album.id,
    //       item.album.pic,
    //       item.album.picUrl
    //     );
    //     this.playList.splice(this.currentIndex, 0, song);
    //     this.musicList = this.playList;
    //     console.log(this.playList);
    //     this.setCurrentIndex(this.currentIndex);
    //     this.playLoad();
    //   },
    //   getNewSongUrl(id) {
    //     _getMusicUrl(id).then((res) => {
    //       // console.log(res.data.data[0].url);
    //       this.simiSongUrl = res.data.data[0].url;
    //     });
    //   },
    /**音量进度条点击、拖拽事件 */
    handleVolumn() {
      this.setVolume();
    },
    /**设置要播放的音乐 */
    setCurrentIndex(index) {
      for (let i in this.playList) {
        if (this.playList[i].index == index) {
          this.currentIndex = i;
          break; //break跳出循环------continue跳出本次循环
        }
      }
    },
    /**音乐进度条正在拖拽
     * isMusicDrag设置为true,关闭audio的timeupdate设置进度
     */
    handleAudioBeginDrag() {
      this.isMusicDrag = true;
    },
    /**音乐进度条拖拽结束 */
    handleAudioDragEnd() {
      this.isMusicDrag = false;
      this.setMusicCurrent();
    },
    /**处理音乐进度条点击 */
    handleAudioProgress() {
      this.setMusicCurrent();
    },
    /**暂停或播放音乐 */
    toggle() {
      this.isPlay = !this.isPlay;
      if (this.isPlay && this.$refs.audio.readyState == 4)
        this.$refs.audio.play();
      else {
        this.$refs.audio.pause();
      }
    },
    /**监听音乐加载 */
    playLoad() {
      this.duration = this.$refs.audio.duration;
      _getLyric(this.playList[this.currentIndex].id).then((res) => {
        // console.log(this.currentIndex);
        // console.log(this.playList[this.currentIndex].id);
        this.lyric = (res.data.lrc && res.data.lrc.lyric) || "暂无歌词";
        // console.log(this.lyric);
      });
    },
    /**返回当前的播放时间 */
    audioTimeUpdate() {
      if (this.$refs.audio != null) {
        /**获取currentTime */
        this.currentTime = this.$refs.audio.currentTime;
        /**计算音乐播放进度百分比
         * 在拖拽时不设置
         */
        if (!this.isMusicDrag)
          this.percent = (this.currentTime / this.duration) * 100;
      }
    },
    toggleLyric() {
      this.isShowLyric = !this.isShowLyric;
    },
    toggleMusicList() {
      this.isShowList = !this.isShowList;
    },
    /**监听音乐播放结束、并判断播放方式 */
    musicEnded() {
      console.log("end:" + this.schemaIndex);
      switch (this.schemaIndex) {
        case 0:
          this.currentIndex >= this.playList.length - 1
            ? 0
            : this.currentIndex++; //循环播放
          break;
        case 1:
          this.currentIndex = Math.floor(Math.random() * this.playList.length); //随机播放
          break;
        case 2: //单曲循环
          // eslint-disable-next-line no-self-assign
          this.currentIndex = this.currentIndex;
          break;
      }
    },
    /**监听音乐已开始播放 */
    musicPlaying() {
      this.isPlay = true;
      /**currentIndex并不等于歌单里音乐，music数组里每个属性index才对应歌单里的顺序 */

      /**音乐播放时发射playing事件
       * @param1 对应歌单正在播放音乐的歌曲下标
       * @param2 正在播放歌曲的音乐名字
       */
      this.$bus.$emit(
        "Playing",
        this.playList[this.currentIndex].index,
        this.playList[this.currentIndex].name,
        this.id
      );
      if (this.$refs.player != null) this.$refs.player.isPlay = true;
    },
    /**对播放暂停进行监视 */
    musicPause() {
      this.isPlay = false;
      if (this.$refs.player != null) this.$refs.player.isPlay = false;
    },
    /**音乐出现错误 */
    musicErr() {
      this.$Toast.error("当前音频不可用");
      this.currentIndex++;
    },
    toggleSchema() {
      if (this.schemaIndex >= 2) {
        this.schemaIndex = 0;
      } else {
        this.schemaIndex++;
      }
    },
    preMusic() {
      if (this.currentIndex <= 0 && this.schemaIndex == 0) {
        this.currentIndex = this.playList.length - 1;
      } else if (this.schemaIndex == 1) {
        this.currentIndex = Math.floor(Math.random() * this.playList.length);
      } else {
        this.currentIndex--;
      }
      this.$refs.audio.src = this.playList[this.currentIndex].src;
    },
    /**加载下一首音乐 */
    nextMusic() {
      if (
        this.currentIndex >= this.playList.length - 1 &&
        this.schemaIndex == 0
      ) {
        this.currentIndex = 0;
      } else if (this.schemaIndex == 1) {
        this.currentIndex = Math.floor(Math.random() * this.playList.length);
      } else this.currentIndex++;
      this.$refs.audio.src = this.playList[this.currentIndex].src;
    },
    /**设置浏览器音量 */
    setVolume() {
      if (this.$refs.audio) this.$refs.audio.volume = this.volumnPercent / 100;
    },
    // 切换音量
    toggleVolumn() {
      this.isVolume = !this.isVolume;
      //静音设置
      if (this.isVolume) {
        this.preVolumnPercent = this.volumnPercent;
        this.$refs.audio.volume = 0.0;
        this.volumnPercent = 0;
      } else {
        this.$refs.audio.volume = this.preVolumnPercent / 100;
        this.volumnPercent = this.preVolumnPercent;
      }
    },
    /**设置音乐进度
     * @param 设置的百分比
     */
    setMusicCurrent() {
      this.$refs.audio.currentTime =
        (this.percent / 100) * this.$refs.audio.duration;
      this.percent =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100;
    },
  },
  watch: {
    $route() {
      /**路由切换关闭一些播放器选项 */
      this.isPure = false;
      this.isShowList = false;
    },
  },
};
</script>

<style lang="less" scoped>
.player {
  width: 100%;
  height: 60px;
  display: flex;
  position: relative;
  a {
    text-decoration: none;
    color: inherit;
  }
  &-icon-light {
    color: var(--light-icon-active-color);
  }
  &-icon-dark {
    color: var(--dark-icon-active-color);
  }
  &-icon-green {
    color: var(--green-icon-active-color);
  }
}
// .player-cover {
//   display: flex;
//   flex: 2;
// }
.handleSong {
  //使其右对齐
  margin-left: auto;
  display: flex;
  flex: 0.82;
}
.player-toggle {
  padding: 0px 10px;
  display: flex;
  flex: 0.5;
  align-items: center;
  justify-content: center;
  &-item {
    padding: 0px 20px;
    text-align: center;
    cursor: pointer;
  }
  &-light {
    color: var(--light-main-color);
  }
  &-dark {
    color: var(--dark-main-color);
  }
  &-green {
    color: var(--green-main-color);
  }
}
.player-progress {
  flex: 3;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  &-current-time {
    width: 50px;
    text-align: left;
  }
  &-time {
    width: 50px;
    text-align: right;
  }
  &-main {
    flex: 1;
  }
}
.player-volumn {
  position: relative;
  width: 200px;
  padding: 0px 10px;
  cursor: pointer;
  &-progress {
    float: left;
    width: 65%;
    height: 100%;
    margin: auto;
    padding-left: 10px;
  }
  &-content-button {
    float: left;
    width: 30%;
    height: 100%;
    border-right: 2px solid rgb(71, 31, 31);
  }
}
.player-tool {
  width: 200px;
  display: flex;

  align-items: center;
  padding: 0px 10px;
  text-align: center;
  &-schema {
    width: calc(33%);
  }
  &-lyric {
    width: calc(33%);
  }
  &-list {
    width: calc(33%);
  }
}
/**player iconfont */
.player-icon {
  font-size: 26px;
}
/**toggle图标 */
.player-icon-type {
  font-size: 30px;
}
// 右侧小图标
.player-icon {
  font-size: 24px;
}
// 歌词
.player-lyric-simple {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 70px;
  margin: auto;
}
.player-list {
  position: absolute;
  right: 0px;
  bottom: 60px;
  z-index: 9;
}
.player-side-enter-active {
  animation: slideInRight var(--animation-base-time);
}
.player-side-leave-active {
  animation: slideInRight var(--animation-base-time) reverse;
}
.player-pure-side-enter-active {
  animation: slideInUp var(--animation-base-time);
}
.player-pure-side-leave-active {
  animation: slideInUp var(--animation-base-time) reverse;
}
</style>
