<template>
  <div :class="asideClass">
    <div class="menu" ref="menu">
      <b-menu
        :menu="menuList"
        vertical
        item-width="100%"
        item-height="50px"
        :text-color="theme == 'dark' ? 'var(--dark-text-color)' : ''"
        :active-color="getActiveColor"
      >
      </b-menu>
      <div class="my-music-list" v-if="playList.length">
        <p class="title">创建的歌单</p>
        <ul class="my-music-list-main" style="overflow: 'auto'">
          <li
            v-for="(item, index) in playList"
            :key="index"
            @click="enterMusicListDetail(index)"
          >
            <img :src="item.cover" alt="" />
            <div class="my-music-list-main-name">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { theme } from "@/mixin/global/theme.js";
import { _getSongList, PlayList } from "@/network/user";
export default {
  name: "LayoutAside",
  mixins: [theme],
  data() {
    return {
      menuList: [
        {
          link: "/individuation",
          icon: "iconfont icon-music",
          content: "发现音乐",
        },
        { link: "/allmusiclist", icon: "iconfont icon-gedan", content: "歌单" },
        {
          link: "/ranklist",
          icon: "iconfont icon-PCbofangye_paihangbang",
          content: "排行榜",
        },
        {
          link: "/artist-list",
          icon: "iconfont icon-mansingle",
          content: "歌手",
        },
        { link: "/mv", icon: "iconfont icon-shipin", content: "MV" },
        // { link: "/mv-list", icon: "iconfont icon-MV", content: "全部MV" },
        {
          link: "/new-songs",
          icon: "iconfont icon-musicnoteeighth",
          content: "最新音乐",
        },
      ],
      playList: [],
    };
  },
  computed: {
    asideClass() {
      return [
        `${this.program + "aside"}`,
        `${this.program + "aside-" + this.theme}`,
      ];
    },
    getUserId() {
      return this.$store.getters.getUserId;
    },
  },
  methods: {
    getPriPlayList() {
      //这个函数写的不好
      this.playList = [];
      _getSongList(this.getUserId).then((res) => {
        let playlist = res.data.playlist;
        for (let i in playlist) {
          let playList = new PlayList(playlist[i]);
          this.playList.push(playList);
          if (i == playlist.length - 1) {
            // localStorage目前只能存储字符串，想存储复杂类型可行要使用JSON.stringify(this.playList)格式转换
            localStorage.setItem("playList", JSON.stringify(this.playList));
          }
        }
      });
    },
    /**进入歌单详情 */
    enterMusicListDetail(index) {
      this.$router.push(
        "/musiclistdetail/" +
          this.playList[index].id +
          "/" +
          new Date().getTime()
      );
    },
  },
  created() {
    /**首先从本地存储获取歌单，没有则请求数据 */
    if (localStorage.getItem("playList")) {
      this.playList = JSON.parse(localStorage.getItem("playList"));
    } else {
      if (this.getUserId) this.getPriPlayList();
    }
  },
  watch: {
    getUserId() {
      this.getPriPlayList();
    },
  },
};
</script>

<style lang="less" scoped>
.dance-music-aside {
  height: calc(100% - 50px - 60px);
  width: 18%;
  float: left;
  padding-left: 1px;
  overflow: scroll;
  &-light {
    background: var(--light-aside-bg-color);
  }
  &-dark {
    background: var(--dark-aside-bg-color);
    color: var(--dark-text-color);
  }
  &-green {
    background: var(--green-aside-bg-color);
  }
}
.menu {
  height: 50%;
}
.my-music-list {
  height: calc(50% -60px);
  padding: 10px 0px;
  .title {
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    font-size: 17px;
  }
  &-main {
    list-style-type: none;
    padding-left: 20px;
    li {
      height: 30px;
      font-size: 13px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;
      img {
        height: 80%;
        border-radius: 2px;
      }
    }
    &-name {
      padding: 0px 10px;
    }
  }
}
</style>
