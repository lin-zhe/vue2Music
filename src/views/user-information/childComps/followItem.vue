<template>
  <div class="followItem">
    <div class="itemNumber">{{ itemNumber }}</div>
    <div class="itemName">{{ itemName }}</div>
  </div>
</template>

<script>
export default {
  name: "followItem",
  props: {
    itemName: {
      type: String,
      default: "",
    },
    itemNumber: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="less" scoped>
.followItem {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  border-right: 1px solid #eee;
  text-align: center;
  align-items: center;
  color: rgb(94, 91, 91);
}
.itemNumber {
  font-weight: 1000;
  font-size: 20px;
}
</style>
