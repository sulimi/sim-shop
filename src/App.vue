<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router-view"/>
    </transition>
    <nav-bar v-if="isShowNav"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import NavBar from '@/components/NavBar.vue';
  import {Route} from 'vue-router/types/router';

  @Component({
    components: {NavBar}
  })
  export default class App extends Vue {
    isShowNav = false;
    routeList = ['/', '/home', '/category', '/cart', '/user'];

    @Watch('$route', {immediate: true, deep: true})
    onRouteChange(newVal: Route, oldVal: Route) {
      //TODO 这里可以用路由元信息判断来做一些事情
      this.isShowNav = this.routeList.indexOf(newVal.path) > -1;
    }

    transitionName = 'slide-left';
  }
</script>

<style lang="less">
  @import "common/style/mixin.less";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 14px;
  }
</style>