<template>
  <div class="recommendSonglistClass">
    <re-base-info @playMusic="playMusic" />
    <re-songlist :music-list="musicList" ref="songList" :length="length" />
  </div>
</template>

<script>
import reSonglist from "@/components/content/recommendSong/reSonglist";
import { playMusic } from "@/mixin/global/play-music";
import { _getRecommendSongs } from "@/network/discover";
import reBaseInfo from "@/components/content/recommendSong/reBaseInfo";

export default {
  name: "recommendSonglist",
  components: {
    reSonglist,
    reBaseInfo,
  },
  mixins: [playMusic],
  data() {
    return {
      musicList: [],
      length: 0,
    };
  },
  created() {
    _getRecommendSongs().then((res) => {
      this.musicList = res.data.data.dailySongs;
      this.length = res.data.data.dailySongs.length;
      this.getSongArtist(this.musicList, this.length);
    });
  },
  methods: {
    getSongArtist(list, length) {
      for (let i = 0; i <= length - 1; i++) {
        let artistGroup = list[i].ar;
        let artistName = [];
        for (let j = 0; j <= artistGroup.length - 1; j++) {
          artistName.push(artistGroup[j].name);
          if (j == artistGroup.length - 1) {
            this.musicList[i].ar[0].name = artistName.join("/");
          }
        }
      }
    },
  },
};
</script>

<style></style>
