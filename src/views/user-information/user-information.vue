<template>
  <div>
    <div class="base-info">
      <el-avatar :src="avatar" round :size="175" class="base-info-user-avatar">
      </el-avatar>
      <div class="base-info-textarea">
        <div class="base-info-textarea-nickname">{{ nickname }}</div>
        <div class="base-info-textarea-follower">
          <follow-item
            :itemName="followedItemName"
            :itemNumber="followeds"
            @click.native="gotofolloweds"
          />
          <follow-item
            :itemName="followsItemName"
            :itemNumber="follows"
            @click.native="gotofollows"
          />
        </div>
        <div class="base-info-textarea-gender">
          <span>性别:</span>{{ gender }}
        </div>
        <div class="base-info-textarea-signature">
          <span>简介：</span>{{ signature }}
        </div>
      </div>
    </div>
    <div class="userClasslist">
      {{ nickname }}收藏和创建的歌单<span>({{ createPlaylist.length }})</span>
      <div class="all-musiclist">
        <music-list empty-desc :music-list="createPlaylist" />
      </div>
    </div>
  </div>
</template>

<script>
import followItem from "./childComps/followItem.vue";
import MusicList from "@/components/content/musiclist/MusicList";
import { _getUserDetail, _getSongList } from "@/network/user";
export default {
  name: "userInformation",
  data() {
    return {
      nickname: null,
      followeds: 0,
      followedItemName: "粉丝数",
      follows: 0,
      followsItemName: "关注数",
      gender: "♂",
      signature: null,
      createPlaylist: [],
      avatar: "",
    };
  },
  components: { followItem, MusicList },
  computed: {
    getUserId() {
      return this.$store.getters.getUserId;
    },
    getAvatar() {
      return this.$store.getters.getAvatar;
    },
  },
  created() {
    this.getUserInformation();
    this.createPlaylist = JSON.parse(localStorage.getItem("playList"));
  },
  methods: {
    getUserInformation() {
      _getUserDetail(this.getUserId).then((res) => {
        this.userId = res.data.profile.userId;
        this.signature = res.data.profile.signature;
        this.nickname = res.data.profile.nickname;
        this.followeds = res.data.profile.followeds;
        this.follows = res.data.profile.follows;
        this.gender = this.gerderNumberToString(res.data.profile.gender);
        this.avatar = res.data.profile.avatarUrl;
      });
    },
    getUserFollowInformation(params) {
      this.getFollowSongList(params);
      _getUserDetail(params).then((res) => {
        this.userId = res.data.profile.userId;
        this.signature = res.data.profile.signature;
        this.nickname = res.data.profile.nickname;
        this.followeds = res.data.profile.followeds;
        this.follows = res.data.profile.follows;
        this.gender = this.gerderNumberToString(res.data.profile.gender);
        this.avatar = res.data.profile.avatarUrl;
      });
    },
    gerderNumberToString(genderNumber) {
      if (genderNumber == 1) {
        return "♂";
      } else if (genderNumber == 2) {
        return "♀";
      }
    },
    getFollowSongList(id) {
      // console.log("yes");
      _getSongList(id).then((res) => {
        this.createPlaylist = res.data.playlist;
      });
    },
    gotofolloweds() {
      this.$router.push(
        "/followPage/" + this.userId + "/" + this.nickname + "/followed"
      );
    },
    gotofollows() {
      this.$router.push(
        "/followPage/" + this.userId + "/" + this.nickname + "/follows"
      );
    },
  },
  watch: {
    $route() {
      if (this.$route.path == "/user-information/" + this.$route.params.uid) {
        this.getUserFollowInformation(this.$route.params.uid);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.base-info {
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-right: 20px;
  &-user-avatar {
    display: flex;
    flex: 1;
  }
  &-textarea {
    flex: 8;
    flex-direction: column;
    &-nickname {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 5px;
      padding-left: 10px;
    }
    &-follower {
      display: flex;
      flex-direction: row;
    }
    &-gender {
      margin-top: 5px;
      display: flex;
      flex-direction: row;
      padding-left: 10px;
      span {
        padding-right: 5px;
        color: rgb(94, 91, 91);
      }
    }
    &-signature {
      margin-top: 5px;
      flex-direction: row;
      flex-wrap: wrap;
      padding-left: 10px;
      span {
        overflow: hidden;
        padding-right: 5px;
        color: rgb(94, 91, 91);
      }
    }
  }
}
.userClasslist {
  margin-top: 20px;
  border-top: 2px solid rgb(142, 142, 142);
  span {
    font-size: 5px;
    color: rgb(86, 84, 84);
  }
}
</style>
