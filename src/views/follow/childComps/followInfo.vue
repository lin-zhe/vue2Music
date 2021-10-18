<template>
  <div class="followDetail">
    <div class="followDetail-left">
      <el-avatar :src="followDetailItem.avatarUrl" round :size="100">
      </el-avatar>
    </div>
    <div class="followDetail-right">
      <div class="followDetail-right-name">
        <span>{{ followDetailItem.nickname }}</span>
      </div>
      <div class="followDetail-right-follow">
        <div class="follows">
          <span>{{ followsItemName }} :</span>
          <span>{{ followDetailItem.follows }}</span>
        </div>
        <span>|</span>
        <div class="followed">
          <span>{{ followedItemName }} :</span>
          <span>{{ followDetailItem.followeds }}</span>
        </div>
      </div>
      <div class="followDetail-right-signature">
        <span>{{ followDetailItem.signature }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import followItem from "@/views/user-information/childComps/followItem";
export default {
  name: "followInfo",
  // components: { followItem },
  props: {
    followDetailItem: Object,
    default: function () {
      return {};
    },
  },
  methods: {
    gotoUserPage() {
      this.$router.push();
    },
  },
  data() {
    return {
      followedItemName: "粉丝数",
      followsItemName: "关注数",
    };
  },
};
</script>

<style lang="less" scoped>
.followDetail {
  position: relative;
  display: flex;
  &-right {
    display: flex;
    flex-direction: column;
    &-name {
      display: flex;
      flex: 1;
    }
    &-follow {
      display: flex;
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    &-signature {
      span {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
