<template>
  <div class="dance-music-newsongs">
    <div class="newsongs-title">
      <b-menu
        class="newsongs-menu"
        :menu="areas"
        item-height="30px"
        item-width="45px"
        :active-color="getActiveColor"
        @click="handleAreasClick"
      />
      <split />
      <!-- 这个newsongs 相当于给子组件song-list的props中的newsongs设置为true -->
      <song-list :music-list="musicList" newsongs :length="100" />
    </div>
  </div>
</template>

<script>
import { theme } from "@/mixin/global/theme"; //这里引入getActiveColor函数
import { _getTopSongs } from "@/network/discover";
import { _getSongsDetail, songDetail } from "@/network/detail";
import Split from "@/components/common/split/split";
import SongList from "@/components/common/song-list/song-list";
export default {
  name: "NewSongs",
  mixins: [theme],
  components: {
    Split,
    SongList,
  },
  data() {
    return {
      areas: [
        { value: 0, content: "全部" },
        { value: 7, content: "华语" },
        { value: 96, content: "欧美" },
        { value: 16, content: "韩国" },
        { value: 8, content: "日本" },
      ],
      currentArea: 0,
      page: 1,
      musicList: [],
    };
  },
  created() {
    //该开始时默认为0，因此为全部
    this.getTopSongs();
  },
  methods: {
    // 切换所选的地区，然后获取相应的歌曲
    handleAreasClick(index) {
      this.currentArea = this.areas[index].value;
      this.getTopSongs();
    },
    //获取相应的歌曲
    getTopSongs() {
      this.musicList = [];
      _getTopSongs(this.currentArea).then((res) => {
        let list = res.data.data;
        for (let i in list) {
          _getSongsDetail(list[i].id).then((res) => {
            let song = new songDetail(res.data.songs);
            this.musicList.push(song);
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dance-music-newsongs {
  padding: 10px 50px 0px 50px;
}
::v-deep .vbestui-menu-item-container i {
  margin-right: 0px !important;
}
.newsongs {
  &-title {
    font-size: 14px;
  }
}
</style>
