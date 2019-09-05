
<template>
  <div class="brushHead">
    <van-circle v-model="currentRate" :rate="rate" :color="gradientColor" text="渐变色" :speed="100" :text="text" />
  
  </div>
</template>

<script>
import { Circle } from "vant";
export default {
  components: {
    vanCircle:Circle,
  },
  name: "brushHead",
  data() {
    return {
      currentRate: 0,
      gradientColor: {
        '0%': '#ffd01e',
        '100%': '#ee0a24'
      },
      rate:100,
    };
  },
  computed: {
     text() {
      return this.currentRate.toFixed(0) + '%'
    }
  },

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.brushHead{
  position: relative;
}
</style>