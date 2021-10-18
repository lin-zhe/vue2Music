<template>
  <div>
    <div
      :class="['dance-music-split', `${'dance-music-split' + getTheme}`]"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Split",
  computed: {
    /**获取当前theme */
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
};
</script>

<style lang="less" scoped>
.dance-music-split {
  border-bottom: 1px solid var(--border-tt);
  &-dark {
    border-bottom: 1px solid var(--dark-border-color);
  }
  // 在黑色主题下，改变边框的颜色
}
</style>
