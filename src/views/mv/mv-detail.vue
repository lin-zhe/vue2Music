<template>
  <div class="dance-music-mv-detail" v-if="id != null && detail != null">
    <div class="layout-left">
      <div class="title" v-if="detail != null">
        <b-tag plain color="var(--main-color)">MV</b-tag>
        <div class="name">{{ detail.name }}</div>
        <div class="artistName">{{ detail.artistName }}</div>
      </div>
      <div class="video" v-if="url != null">
        <video
          :src="url"
          controls
          autoplay
          width="100%"
          class="video-play"
        ></video>
        <!-- 可不可以加多功能 -->
      </div>
      <div class="recommend" ref="recom">
        <p class="p">评论</p>
        <recommends class="rec" :recommends="recommends" />
      </div>
    </div>
    <div class="right">
      <div class="desc" v-if="detail.desc">
        <p class="p">MV介绍</p>
        <div class="base">
          <div class="date">发布时间： {{ detail.publishTime }}</div>
          <div class="playCount">播放次数：{{ detail.playCount }}次</div>
          <div class="clear"></div>
        </div>
        <div
          class="mv-desc"
          ref="mvDesc"
          v-if="detail.desc != null"
          @mouseenter="enter"
        >
          <scroll :disable-wheel="true" class="desc-scroll" ref="descScroll">
            <span>简介：</span>
            {{ detail.desc }}
          </scroll>
        </div>
      </div>
      <div class="alia">
        <p class="p">相关推荐</p>
        <simi-mv-item :mv-list="simiMv" />
      </div>
    </div>
    <div class="mv-detail-bot">
      <el-pagination
        background
        :current-page.sync="offset"
        :page-count="10"
        @current-change="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import Recommends from "@/views/list-detail/childsComps/Recommends.vue";
import SimiMvItem from "@/views/mv/childsComps/SimiMvItem";
import {
  _getMvDetail,
  _getMVUrl,
  _getMVComment,
  _getSimiMv,
  MV,
} from "@/network/mv";
export default {
  name: "MvDetail",
  components: { Recommends, Scroll, SimiMvItem },
  data() {
    return {
      id: null,
      detail: null,
      url: null,
      recommends: null,
      offset: 1,
      limit: 20,
      simiMv: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id != null) {
      this.initRequest();
    }
  },
  methods: {
    pullingUp() {
      this.getComment();
    },
    /**处理分页 */
    onPageChange() {
      this.getComment();
    },
    getComment() {
      _getMVComment(this.id, this.limit, this.offset).then((res) => {
        this.recommends = res.data.comments;
        this.$nextTick(() => {
          let top = this.$refs.recom.offsetTop;
          this.$refs.scroll.scrollTo(-top, 0);
        });
      });
    },
    reset() {
      this.simiMv = [];
      this.offset = 1;
    },
    initRequest() {
      _getMvDetail(this.id).then((res) => {
        this.detail = res.data.data;
      });

      _getMVUrl(this.id).then((res) => {
        this.url = res.data.data.url;
      });

      _getMVComment(this.id, this.limit).then((res) => {
        this.recommends = res.data.comments;
      });

      _getSimiMv(this.id).then((res) => {
        let mvs = res.data.mvs;
        for (let i in mvs) {
          let mv = new MV(
            mvs[i].id,
            mvs[i].cover,
            mvs[i].name,
            mvs[i].artistName,
            mvs[i].playCount
          );
          this.simiMv.push(mv);
        }
      });
    },
    enter() {
      this.$refs.descScroll.refresh();
    },
  },
  watch: {
    $route() {
      this.id = this.$route.params.id;
      if (this.id != null) {
        this.reset();
        this.initRequest();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.dance-music-mv-detail {
  width: 100%;
  padding: 10px 10% 0px 10%;
}
.layout-left {
  display: inline-block;
  width: 70%;
}
.video-play {
  outline-style: none;
}
.right {
  padding-left: 20px;
  width: 30%;
  float: right;
}
.clear {
  clear: both;
}
.layout-left .title {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}
.title .left-mv {
  padding: 5px;
  display: inline-block;
  border: 1px solid red;
  color: red;
}
.title .name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px;
  margin-left: 5px;
}
.title .artistName {
  color: var(--color-text-an);
  margin-left: 5px;
}

.p {
  font-size: 18px;
  color: var(--color-text-tint);
  margin-bottom: 10px;
}
.base .date {
  float: left;
}
.base .playCount {
  float: right;
}
.mv-desc {
  max-height: 288px;
  width: 100%;
  overflow: hidden;
  line-height: 1.2em;
  font-size: 13px;
  text-overflow: ellipsis;
}
.decs-scroll {
  max-height: 288px;
}
.mv-desc span {
  color: var(--color-text-blue);
  font-size: 14px;
}
.recommend {
  margin-top: 10px;
}
</style>
