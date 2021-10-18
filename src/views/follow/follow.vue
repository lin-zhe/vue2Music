<template>
  <div>
    <div class="nickname">
      <span class="nickname" v-if="isFollowed"> {{ nickname }}的粉丝</span>
      <span class="nickname" v-if="isFollow"> {{ nickname }}关注的人 </span>
    </div>

    <div class="follower-list">
      <div
        v-for="(item, index) in followDetail"
        :key="index"
        class="follower-list-item"
      >
        <div class="followDetail">
          <div class="followDetail-left" @click="gotoUserPage(index)">
            <el-avatar :src="item.avatarUrl" round :size="100"> </el-avatar>
          </div>
          <div class="followDetail-right">
            <div class="followDetail-right-name">
              <span>{{ item.nickname }}</span>
            </div>
            <div class="followDetail-right-follow">
              <div class="follows">
                <span>关注 :</span>
                <span>{{ item.follows }}</span>
              </div>
              <span>|</span>
              <div class="followed">
                <span>粉丝 :</span>
                <span>{{ item.followeds }}</span>
              </div>
            </div>
            <div class="followDetail-right-signature">
              <div class="item">
                <div class="item-con">{{ item.signature }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- <follow-info :followDetailItem="item" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { _getUserFollowed, _getUserFollows } from "@/network/user";
// import followInfo from "./childComps/followInfo";

export default {
  data() {
    return {
      nickname: null,
      isFollowed: false,
      isFollow: false,
      followDetail: [],
    };
  },
  // components: { followInfo },
  methods: {
    getUserFollowInfo(params) {
      this.nickname = this.$route.params.nickname;
      if (params == "followed") {
        this.isFollowed = true;
        this.isFollow = false;
        this.getUserFollowed(this.$route.params.userId);
      } else if (params == "follows") {
        this.isFollow = true;
        this.isFollowed = false;
        this.getUserFollows(this.$route.params.userId);
      }
    },
    getUserFollowed(param) {
      _getUserFollowed(param).then((res) => {
        this.followDetail = res.data.followeds;
        console.log(this.followDetail);
      });
    },
    getUserFollows(param) {
      _getUserFollows(param).then((res) => {
        this.followDetail = res.data.follow;
        console.log(res.data);
      });
    },
    gotoUserPage(index) {
      const userId = this.followDetail[index].userId;
      this.$router.push("/user-information" + "/" + userId);
    },
  },
  created() {
    this.getUserFollowInfo(this.$route.params.follow);
  },
  watch: {
    $route() {
      this.getUserFollowInfo(this.$route.params.follow);
    },
  },
};
</script>
l
<style lang="less" scoped>
.nickname {
  font-size: 20px;
  margin-bottom: 20px;
}
.follower-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  &-item {
    width: calc(100% / 3);

    // padding: 5px 20px;
    cursor: pointer;
    .followDetail {
      display: flex;
      &-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &-name {
          flex: 1;
        }
        &-follow {
          flex: 1;
          display: flex;
          width: 100%;
          flex-direction: row;
          justify-content: space-between;
        }
        &-signature {
          flex: 1;
          .item {
            display: flex;
            width: 293px;
            .item-con {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>
