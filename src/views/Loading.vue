<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: "Loading", // 定义的组件名称 使用时写法：loading
};
</script>

<style>
.loading {
  background: url("../assets/logo.png") center center no-repeat #00ff00;
  width: 1200px;
  height: 1200px;
  background-size: 200px auto;
  display: inline-block;
}
