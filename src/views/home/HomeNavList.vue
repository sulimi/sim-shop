<template>
  <div class="show-list" @click="onClickIcon">
    <router-link :to="item.to" v-for="item in showList" v-bind:key="item.name">
      <Icon :name="item.icon"/>
      <span>{{item.name}}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  import {Toast} from 'vant';

  type ShowList = {
    icon: string;
    name: string;
    to: string;
  }
  @Component({
    components: {Icon}
  })
  export default class HomeNavList extends Vue {
    showList: ShowList[] = [
      {
        icon: 'chaoshi',
        name: '小马超市',
        to: ''
      },
      {
        icon: 'fushi',
        name: '小马服饰',
        to: ''
      },
      {
        icon: 'quanqiugou',
        name: '全球购',
        to: ''
      },
      {
        icon: 'shengxian',
        name: '小马生鲜',
        to: ''
      },
      {
        icon: 'songhuo',
        name: '小马到家',
        to: ''
      },
      {
        icon: 'chongzhi',
        name: '充值缴费',
        to: ''
      },
      {
        icon: 'pindan',
        name: '9.9元拼',
        to: ''
      },
      {
        icon: 'lingquan',
        name: '领券',
        to: ''
      },
      {
        icon: 'shengqian',
        name: '省钱',
        to: ''
      },
      {
        icon: 'duosefuzhu-gengduotiaojian',
        name: '更多',
        to: ''
      },
    ];
    onClickIcon() {
      Toast.setDefaultOptions({ duration: 500 });
      Toast('未开发');
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";

  .show-list {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 13px;
    font-size: 12px;


    a {
      display: flex;
      flex-direction: column;
      width: 20%;
      text-align: center;
      color: #2c3e50;

      .icon {
        fill: @primary;
        .wh(40px, 40px);
        margin: 13px auto 8px auto;
      }
    }
  }
</style>