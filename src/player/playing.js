export const playing = {
  data() {
    return {
      playIndex: 0.5,
      playName: null,
      playId: null,
    };
  },
  mounted() {
    /**音乐播放时发射playing事件
     * @param1 对应歌单正在播放音乐的歌曲下标
     * @param2 正在播放歌曲的音乐名字
     */
    // 这应该是监听Player.vue emit的事件
    this.$bus.$on("Playing", (index, name, id) => {
      this.playIndex = index;
      this.playName = name;
      this.playId = id;
    });
  },
};
