<template>
  <div class="user-wrapper">
    <ItemHeader title="我的" icon-right="more"/>
    <div class="user-message">
      <img src="../assets/head.jpg"/>
      <div class="content-text">
        <span>昵称：{{userData.nickName}}</span>
        <span>登录名：{{userData.loginName}}</span>
        <span class="words">个性签名：{{userData.introduceSign}}</span>
      </div>
    </div>
    <ul class="message-list">
      <li @click="goTo('我的订单')">
        <span>我的订单</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>账号管理</span>
        <Icon name="right"/>
      </li>
      <li @click="goTo('地址管理')">
        <span>地址管理</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>关于我们</span>
        <Icon name="right"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import Icon from '@/components/Icon.vue';
  import {getUserInfo} from '@/service/user';
  import {Toast} from 'vant';

  @Component({
    components: {Icon, ItemHeader}
  })
  export default class User extends Vue {
    userData = {};
    async mounted() {
      try {
        const {data} = await getUserInfo();
        this.userData = data;
      } catch (e) {
        Toast.fail(e.message);
      }
    }
    goTo(value: string){
      if (value==='地址管理'){
        this.$router.push('/addressmanage?user=user')
      }else if (value==='我的订单'){
        this.$router.push('/mypay?user=user')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";

  .user-wrapper {
    .user-message {
      width: 94%;
      margin: 50px 10px 10px;
      padding: 10px;
      height: 115px;
      background: linear-gradient(90deg, @primary, #51c7c7);
      box-shadow: 0 2px 5px #269090;
      border-radius: 6px;
      .fjbt();

      img {
        .wh(60px, 60px);
        border-radius: 50%;
        margin: 4px;
      }

      .content-text {
        flex-grow: 1;
        height: 100%;
        .fjcc(column);
        margin-left: 10px;
        font-size: 14px;
        color: #fff;
        .ellipsisSingle;

        span {
          width: 100%;
          text-align: left;
          padding: 2px 0;
          .ellipsisSingle;
        }
      }
    }

    .message-list {
      padding: 0 20px;
      margin-top: 20px;

      li {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e9e9e9;
        .fjbt();
        font-size: 14px;

        .icon {
          fill: #aaa;
        }
      }
    }
  }
</style>