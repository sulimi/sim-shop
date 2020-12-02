<template>
  <div class="home-wrapper">
    <HomeHeader/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HomeHeader from '@/components/HomeHeader.vue';

  @Component({
    components: {
      HomeHeader
    },
  })
  export default class Home extends Vue {
  }
</script>
<style lang="less" scoped>
  .home {
  }
</style>
