<template>
  <div class="base-info">
    <div class="left">
      <img v-lazy="cover" alt />
    </div>
    <div class="right">
      <div class="right-item">
        <b-button
          background="var(--main-color)"
          color="#fff"
          :style="{ border: `none` }"
          round
          class="button"
          @click="handlePlayMusic"
        >
          <i class="iconfont icon-bofang" />播放全部
        </b-button>
      </div>
      <div class="right-item">
        <span>时间：{{ getCreateDate }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils/tool.js";
export default {
  name: "BaseInfo",
  props: {
    baseInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    albumDetail: {
      type: Object,
      default: () => {
        return {};
      },
    },
    cover: {
      type: String,
      default: "",
    },
  },
  computed: {
    getCreateDate() {
      return formatDate(new Date(), "MM-dd");
    },
  },
  methods: {
    handlePlayMusic() {
      this.$emit("playMusic");
    },
  },
};
</script>
<style lang="less" scoped>
.base-info {
  width: 100%;
  padding: 10px 0px;
  display: flex;
  position: relative;
  .left {
    width: 200px;
    img {
      width: 100%;
    }
  }
  .right {
    flex: 1;
    padding-left: 35px;
    h3 {
      padding: 5px 0px;
    }
    &-item {
      padding: 5px 0px;
      display: flex;
      align-items: center;
      font-size: 14px;
      .creator-name {
        margin: 0px 10px;
      }
      .iconfont {
        margin-right: 8px;
      }
      .button {
        margin-right: 15px;
      }
    }
  }
}
// .desc {
//   padding: 10px 0px;
//   font-size: 13px;
//   span {
//     color: var(--tag-color);
//   }
//   &-title {
//     padding-top: 5px;
//     display: -webkit-box;
//     overflow: hidden;
//     -webkit-box-orient: vertical;
//     -webkit-line-clamp: 2;
//   }
// }
// .play {
//   display: flex;
//   align-items: center;
//   position: absolute;
//   right: 10px;
//   top: 10px;
//   font-size: 13px;
//   &-left {
//     padding: 5px;
//     border-right: 1px solid var(--border);
//   }
//   &-right {
//     padding: 5px;
//   }
// }
</style>
