<template>
  <div class="simiSonglist">
    <span>包含这首歌的歌单：</span>
    <table border="0" cellpadding="0" cellspacing="0">
      <tr
        v-for="(item, index) in simisongs"
        :key="index"
        class="simiSongs"
        @click="enterMusicListDetail(item)"
      >
        <td><img v-lazy="item.coverImgUrl" alt="" /></td>
        <td>{{ item.name }}</td>
        <!-- <td v-for="(item, index1) in item.artists" :key="index1">
          {{ item.name }}
        </td> -->
      </tr>
    </table>
  </div>
</template>

<script>
import { playMusic } from "@/mixin/global/play-music";
import { playing } from "@/player/playing";
export default {
  name: "simisongslist",
  props: {
    simisongs: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  mixins: [playMusic, playing],
  // inject: ["eventBus"],
  methods: {
    /**处理双击事件 */
    // handleDbclick(item) {
    //   // console.log(item);
    //   //  有播放器的时候， emit到父组件 处理切换歌曲时间，要遭player.vue里定义监听事件
    //   this.$emit("PlayChangeMusicListItem", item);
    //   this.$bus.$emit("reRequest", item);
    // },
    enterMusicListDetail(index) {
      this.$router.push(
        "/musiclistdetail/" + index.id + "/" + new Date().getTime()
      );
    },
  },
};
</script>

<style lang="less" scoped>
.simiSonglist {
  span {
    font-weight: bolder;
  }
  position: absolute;
  top: 30%;
  border-bottom: 1px solid rgb(110, 103, 103);
  .simiSongs {
    font-size: 7px;
    align-items: center;
  }
  .simiSongs:hover {
    background-color: rgba(192, 176, 233, 0.59);
    width: 100%;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 4px;
  }
}
</style>
