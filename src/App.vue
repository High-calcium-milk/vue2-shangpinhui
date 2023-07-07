<template>
  <div id="app">
    <MyHeader v-show="this.$route.meta.notFind" />
    <router-view></router-view>
    <MyFooter v-show="this.$route.meta.footerShow" />
  </div>
</template>

<script>
import MyFooter from "@/components/Footer";
import MyHeader from "@/components/Header";
export default {
  name: "App",
  components: { MyFooter, MyHeader },
  mounted() {
    // 挂载完成请求导航数据
    this.$store.dispatch("getTypeNavList");
  },
};
</script>

<style>
</style>
