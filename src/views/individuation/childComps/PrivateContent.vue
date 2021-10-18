<template>
  <div class="pri" v-if="pri != null">
    <h4 class="top">{{ pri.name }}</h4>
    <div class="content">
      <!-- index为0，1，2表示序号，然后item是获取的内容，通过item.picUrl等属性渲染项 -->
      <div
        class="item"
        v-for="(item, index) in pri.result"
        :key="index"
        @click="playMV(item.id)"
      >
        <div class="loco">
          <i class="iconfont icon-shipin"></i>
        </div>
        <img v-lazy="item.picUrl" alt />
        <div class="bottom" :class="[`${program + 'bottom' + theme}`]">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { theme } from "@/mixin/global/theme.js";
export default {
  name: "PrivateContent",
  mixins: [theme],
  props: {
    pri: {
      type: Object,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    playMV(id) {
      this.$router.push("/mv-detail/" + id);
    },
  },
};
</script>

<style lang="less" scoped>
.private {
  width: 100%;
  padding: 20px 0;
}
h4 {
  padding-left: 10px;
}
.content {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.item {
  position: relative;
  width: calc(33% - 20px);
  margin: 0px 10px;
  overflow: hidden;
}
.item img {
  width: 100%;
}
.bottom {
  font-size: 13px;
}
.loco {
  position: absolute;
  left: 2px;
  top: 2px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loco img {
  width: 20px;
  border: 50%;
}
.iconfont {
  color: #ffffff;
}
.dance-music-bottom {
  &-dark {
    color: var(--dark-article-color);
  }
}
</style>
