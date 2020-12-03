<template>
  <!--  better-scroll 公用丝滑滚动组件-->
  <div ref="wrapper" class="scroll-wrapper">
    <slot/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import BScroll from 'better-scroll';

  @Component
  export default class ListScroll extends Vue {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    @Prop(Number) probeType!: number | 1;
    // 点击列表是否派发click事件
    @Prop(Boolean) click!: boolean | true;
    // 是否开启横向滚动
    @Prop(Boolean) scrollX!: boolean | false;
    // 是否派发滚动事件
    @Prop(Array) scrollData!: [] | null;
    // 列表的数据
    @Prop(Boolean) listenScroll!: boolean | true;
    // 是否派发滚动到底部的事件，用于上拉加载
    @Prop(Boolean) pullup!: boolean | false;
    // 是否派发顶部下拉的事件，用于下拉刷新
    @Prop(Boolean) pulldown!: boolean | false;
    // 是否派发列表滚动开始的事件
    @Prop(Boolean) beforeScroll!: boolean | false;
    // 当数据更新后，刷新scroll的延时
    @Prop(Number) refreshDelay!: number | 20;
    scroll: any;

    // 监听数据的变化，重新计算高度
    @Watch('$data')
    dataChange() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }


    // 初始化滚动组件，拿不到 this.$refs.wrapper 代码不往下走
    mounted() {
      // better-scroll 初始化， 传入配置项参数
      this.scroll = new BScroll((this.$refs.wrapper as any), {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX
      });
    }


    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', (position: any) => {
          this.$emit('scroll', position);
        });
      }
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            // 派发滚动到底部的事件
            this.$emit('scrollToEnd');
          }
        });
      }
      if (this.pulldown) {
        this.scroll.on('touchend', (pos: any) => {
          // 下拉动作
          if (pos.y > 50) {
            // 下拉刷新
            this.$emit('pulldown');
          }
        });
      }
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          // 列表滚动前触发
          this.$emit('beforeScroll');
        });
      }
    }

    disable() {
      // 代理 better-scroll 的 disable 方法
      this.scroll && this.scroll.disable();
    }

    enable() {
      // 代理 better-scroll 的 enable 方法
      this.scroll && this.scroll.enable();
    }

    refresh() {
      // 代理 better-scroll 的 refresh 方法
      this.scroll && this.scroll.refresh();
    }

    scrollTo() {
      // 代理 better-scroll 的 scrollTo 方法
      this.scroll && this.scroll.scrollTo();
    }

    scrollToElement() {
      // 代理 better-scroll 的 scrollToElement 方法
      this.scroll && this.scroll.scrollToElement();
    }
  }
</script>

<style lang="scss" scoped>

</style>