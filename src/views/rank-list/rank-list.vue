<template>
  <div :class="[`${program + 'ranklist'}`, `${program + 'ranklist-' + theme}`]">
    <h4>官方榜</h4>
    <div class="official-list">
      <rank-list-item
        v-if="ranklist[0] && ranklist[0].id"
        :rank-id="ranklist[0].id"
        :title="ranklist[0].name.slice(-3).split('')"
        :bg-color="['#56a1e3', '#5a8beb']"
      />
      <!-- slice负数从后面开始算起，然后将其分割出来 切割出来的是一个字符串数组 -->
      <rank-list-item
        v-if="ranklist[1] && ranklist[1].id"
        :rank-id="ranklist[1].id"
        :title="ranklist[1].name.slice(-3).split('')"
        :bg-color="['#34aabe', '#56c2cd']"
      />
      <rank-list-item
        v-if="ranklist[2] && ranklist[2].id"
        :rank-id="ranklist[2].id"
        :title="ranklist[2].name.slice(-3).split('')"
        :bg-color="['#d53d6a', '#eb638d']"
      />
      <rank-list-item
        v-if="ranklist[3] && ranklist[3].id"
        :rank-id="ranklist[3].id"
        :title="ranklist[3].name.slice(-3).split('')"
        :bg-color="['#c7523c', '#cc7455']"
      />
      <!-- 这个与全球榜的重了 -->
      <!-- <rank-list-item
        v-if="ranklist[4] && ranklist[4].id"
        :rank-id="ranklist[4].id"
        :title="ranklist[4].name.slice(-3).split('')"
        :bg-color="['#9455ce', '#9946c9']"
      /> -->
    </div>
    <h4>全球榜</h4>
    <div class="play-list">
      <!--  .slice(4)是要给将前面5个的数据给的offcial-list做数据源 这个disable-slide似乎没什么用啊 -->
      <music-list empty-desc :music-list="ranklist.slice(4)" disable-slide />
    </div>
  </div>
</template>

<script>
import { theme } from "@/mixin/global/theme";
import { _getRankList } from "@/network/discover";
import RankListItem from "./childComps/RankListItem";
import MusicList from "@/components/content/musiclist/MusicList";

export default {
  name: "RankList",
  mixins: [theme],
  data() {
    return {
      ranklist: [],
    };
  },
  components: { RankListItem, MusicList },
  created() {
    _getRankList().then((res) => {
      //获取歌单列表并给data的ranklist
      this.ranklist = res.data.list;
    });
  },
  //原本这里有scroll组件，并且有refresh的方法，用过emit来接受，并触发，但是这里却被注释掉了
};
</script>

<style lang="less" scoped>
// 没有这个，暂时先注释掉
// .scroll {
//   height: calc(100vh - 58px - 60px);
// }
.dance-music-ranklist {
  height: 100%;
  padding: 10px 100px 0px 100px;
}
.official-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 10px;
}
.play-list {
  padding: 0px 0px;
}
</style>
