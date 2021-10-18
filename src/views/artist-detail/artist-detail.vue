<template>
  <div :class="[`${program + 'artist-detail'}`]">
    <artist-baseinfo :artist="getArtist" :mv-count="getMvCount" />
    <b-menu
      :class="[`${program + 'artist-detail-menu'}`]"
      :menu="list"
      :active-color="getActiveColor"
      @click="handleMenuClick"
    ></b-menu>
    <album-list
      v-show="isShow === 'album'"
      :id="getArtistId"
      @enter="handleEnter"
      @leave="handleLeave"
    />
    <artist-mvs
      :show-artist="false"
      :line-num="6"
      :mv-list="mvList"
      v-show="isShow === 'MV'"
    />
    <artist-desc-detail
      :id="getArtistId"
      :name="artist.name"
      v-show="isShow === 'desc'"
    />
    <artist-simi :id="getArtistId" v-show="isShow === 'simi'" />
  </div>
</template>

<script>
import { formatDate } from "@/utils/tool";
import { theme } from "@/mixin/global/theme";
import { _getArtistMv } from "@/network/artist";
import { MV } from "@/network/mv";
import ArtistMvs from "@/components/content/mv-list/mv-list";
import ArtistBaseinfo from "./childsComps/artist-baseinfo";
import ArtistDescDetail from "./childsPage/artist-desc-detail";
import AlbumList from "./childsPage/album-list";
import ArtistSimi from "./childsPage/artist-simi";

export default {
  name: "ArtistDetail",
  components: {
    ArtistBaseinfo,
    AlbumList,
    ArtistMvs,
    ArtistDescDetail,
    ArtistSimi,
  },
  mixins: [theme],
  data() {
    return {
      artist: null,
      list: ["专辑", "MV", "歌手详情", "相似歌手"],
      isWheel: false, //是否禁用wheel
      isShow: "album",
      mvList: [],
    };
  },
  created() {
    this.artist = this.$route.query.artist;
    // console.log(this.artist);
    this.initRequest();
    // console.log(this.mvList.length);
  },
  computed: {
    /**获取歌手初始数据 */
    getArtist() {
      return this.artist;
    },
    getMvCount() {
      return this.mvList.length;
    },
    /**获取歌手id */
    getArtistId() {
      if (this.artist.id) {
        return this.artist.id;
      } else {
        return null;
      }
    },
  },
  methods: {
    handleMenuClick(index) {
      switch (index) {
        case 0:
          this.isShow = "album";
          break;
        case 1:
          this.isShow = "MV";
          break;
        case 2:
          this.isShow = "desc";
          break;
        case 3:
          this.isShow = "simi";
          break;
      }
    },
    initRequest() {
      _getArtistMv(this.artist.id).then((res) => {
        let mvs = res.data.mvs;
        // console.log(mvs);
        for (let i in mvs) {
          let mv = new MV(
            mvs[i].id,
            mvs[i].imgurl,
            mvs[i].name,
            mvs[i].artistName,
            mvs[i].playCount,
            formatDate(new Date(mvs[i].duration), "MM:dd")
          );
          // console.log(mv);
          this.mvList.push(mv);
        }
      });
    },
    handleEnter() {
      this.isWheel = true;
    },
    handleLeave() {
      this.isWheel = false;
    },
    reset() {
      this.mvList = [];
      this.isShow = "album";
    },
  },
  watch: {
    /**路由变化数据置空 */
    $route() {
      if (this.$route.path.indexOf("artist-detail") > 0) {
        this.artist = this.$route.query.artist;
        this.reset();
        this.initRequest();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.dance-music-artist-detail {
  padding: 0px 20px;
  &-menu {
    padding: 0px 20px;
    margin: 0px 0px 10px 0px;
  }
}
</style>
