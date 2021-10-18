<template>
  <div :class="[`${program + 'mv'}`]">
    <div class="mv-title">
      <div class="mv-title-left">
        <h4>最新MV</h4>
      </div>
      <div class="mv-right">
        <b-menu
          class="item-menu"
          :menu="areas"
          item-height="30px"
          item-width="40px"
          :active-show-border="false"
          :active-color="getActiveColor"
          @click="handleAreasClick"
        />
      </div>
      <div class="mv-title-forword">
        <router-link to="/mv-list" title="查看更多MV"
          ><i class="vbestui-iconfont icon-qian icon"></i
        ></router-link>
      </div>
    </div>
    <mv-list :mv-list="mvList" />
    <h4 class="mv-h4">推荐MV</h4>
    <mv-list :mv-list="perMV" />
    <div class="mv-title">
      <div class="mv-title-left">
        <h4>MV排行榜</h4>
      </div>
      <div class="mv-right">
        <b-menu
          class="item-menu"
          :menu="mvRank"
          item-height="30px"
          item-width="40px"
          :active-show-border="false"
          :active-color="getActiveColor"
          @click="handleRankMvClick"
        />
      </div>
      <div class="mv-title-forword">
        <!-- 转到全部mv -->
        <router-link to="/mv-list" title="查看更多MV"
          ><i class="vbestui-iconfont icon-qian icon"></i
        ></router-link>
      </div>
    </div>
    <mv-rank-list class="mv-rank-list" :top-mv="topMv" />
  </div>
</template>

<script>
import { theme } from "@/mixin/global/theme";
// 引入的MV不是数据源，而是一个类
import { _getNewMV, MV, _Personalized, _getTopMv } from "@/network/mv";
import MvList from "@/components/content/mv-list/mv-list";
import MvRankList from "@/components/content/mv-rank-list/mv-rank-list";
export default {
  mixins: [theme],
  components: { MvList, MvRankList },
  data() {
    return {
      areas: ["内地", "港台", "欧美", "日本", "韩国"],
      mvRank: ["内地", "港台", "欧美", "日本", "韩国"],
      limit: 8,
      topMv: [], //排行榜MV
      mvList: [], //最新MV
      perMV: [], //推荐MV
      currentArea: "内地",
      currentRankMV: "内地",
      offset: 1, //MV排行榜分页
    };
  },
  created() {
    this.getNewMv();
    this.Personalized();
    this.getTopMv();
    this.$Notice.info({
      title: "系统提示：",
      desc: "点击更多按钮可查看全部MV哦~",
    });
  },
  methods: {
    handleAreasClick(index) {
      this.currentArea = this.areas[index];
      this.mvList = [];
      this.getNewMv();
    },
    handleRankMvClick(index) {
      this.currentRankMV = this.mvRank[index];
      this.getTopMv();
    },
    getNewMv() {
      _getNewMV(this.limit, this.currentArea).then((res) => {
        for (let i of res.data.data) {
          let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
          this.mvList.push(mv);
        }
      });
    },
    /**MV排行榜 */
    getTopMv() {
      this.topMv = [];
      _getTopMv(10, this.currentRankMV, this.offset).then((res) => {
        for (let i of res.data.data) {
          let mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount);
          this.topMv.push(mv);
        }
      });
    },
    Personalized() {
      _Personalized().then((res) => {
        let mvs = res.data.result;
        for (let i in mvs) {
          let mv = new MV(
            mvs[i].id,
            mvs[i].picUrl,
            mvs[i].name,
            mvs[i].artistName,
            mvs[i].playCount
          );
          this.perMV.push(mv);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dance-music-mv {
  padding: 10px 30px 0px 30px;
}
.item-menu {
  font-size: 13px;
}
.mv-title {
  display: flex;
  align-items: flex-end;
  padding: 0px 20px;
  position: relative;
  h4 {
    padding: 10px 0px;
  }
  &-forword {
    position: absolute;
    right: 18px;
    opacity: 0.6;
  }
  &-forword:hover {
    opacity: 1;
  }
}
a {
  color: inherit;
  text-decoration: none;
}
.mv-h4 {
  padding: 10px 20px;
}
.mv-rank-list {
  padding: 0px 20px;
}
</style>
