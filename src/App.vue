<template>
  <van-nav-bar
    title="Trello Board"
    left-text="Back"
    left-arrow
    @click-left="onClickLeft"
  />
  <router-view />
</template>

<script setup>
const onClickLeft = () => history.back();
</script>

<style lang="less" scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-background-soft);
}
</style>
