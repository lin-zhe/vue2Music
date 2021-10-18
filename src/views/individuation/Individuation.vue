<template>
  <div :class="indiviClass">
    <div class="dance-music-group">
      <swiper :banner="banner" class="swiper" />
      <h4
        :class="[
          `${program + 'indivi-h4'}`,
          `${program + 'indivi-h4' + theme}`,
        ]"
      ></h4>
      <recommend-song />
      <music-list :music-list="personalized" @refresh="handleRefresh" />
      <private-content :pri="privateContent" />
      <new-songs :music-list="songList" @newSongImgLoad="handleRefresh" />
    </div>
  </div>
</template>

<script>
import { theme } from "@/mixin/global/theme.js";
import {
  _getNewSong,
  _getPersonalized,
  _getPrivateContent,
  _getBanner,
} from "@/network/discover";
import Swiper from "@/components/common/swiper/Swiper";
import MusicList from "@/components/content/musiclist/MusicList";
import recommendSong from "@/components/content/recommendSong/recommendSong";
import PrivateContent from "@/views/individuation/childComps/PrivateContent";
import NewSongs from "@/views/individuation/childComps/newSongs";
export default {
  name: "Individuation",
  mixins: [theme],
  components: { Swiper, MusicList, recommendSong, PrivateContent, NewSongs },
  computed: {
    //样式类设置
    indiviClass() {
      return [
        `${this.program + "indivi"}`,
        `${this.program + "-indivi-" + this.theme}`,
      ];
    },
  },
  data() {
    return {
      banner: null,
      limit: 10,
      personalized: null,
      privateContent: null,
      songList: null,
      musicList: [],
      RecommendSong: null,
    };
  },
  created() {
    if (this.$store.state.cookie != null && this.$store.state.cookie != "") {
      this.limit = 11;
    }
    /**轮播图数据 */
    _getBanner().then((res) => {
      // console.log(res.data.banners.slice(0, 6));
      this.banner = res.data.banners.slice(0, 6);
    });
    /**推荐歌单*/
    _getPersonalized(this.limit).then((res) => {
      this.personalized = res.data.result;
      //console.log(this.personalized);
    });

    /**独家放送*/
    _getPrivateContent().then((res) => {
      this.privateContent = res.data;
    });

    _getNewSong().then((res) => {
      this.songList = res.data.result;
    });
  },
  methods: {
    handleRefresh() {
      // console.log("refresh");
    },
    // playMusic(index) {
    //   this.musiclist = [];
    //   for (let i in this.songList) {
    //     _getSongsDetail(this.songList[i].id).then((res) => {
    //       let song = new songDetail(res.data.songs);
    //       this.musiclist.push(song);
    //       if (i == this.songList.length - 1) {
    //         this.PlayMusic(index);
    //       }
    //     });
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
.dance-music-indivi {
  width: 100%;
  height: 100%;
  .swiper {
    width: calc(100% - 20px);
    margin-left: 10px;
  }
  .h4-dark {
    color: var(--dark-text-color);
  }
}
</style>
