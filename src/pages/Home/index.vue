<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor v-for="item in floorData" :key="item.id" :list="item" />
    <Brand />
  </div>
</template>

<script>
import Brand from "@/pages/Home/Brand";
import Floor from "@/pages/Home/Floor";
import Like from "@/pages/Home/Like";
import ListContainer from "@/pages/Home/ListContainer";
import Rank from "@/pages/Home/Rank";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import { mapState } from "vuex";
export default {
  name: "RouterHome",
  computed: {
    ...mapState({
      floorData: (state) => state.home.floorData,
    }),
  },
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
  },
  mounted() {
    this.$store.dispatch("getFloorData");
  },
};
</script>

<style>
</style>