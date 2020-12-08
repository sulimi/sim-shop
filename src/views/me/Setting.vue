<template>
  <div class="setting-wrapper">
    <ItemHeader title="账号管理" icon-right="more" router-name="user"/>
    <div class="message-btn">
      <van-field v-model="loginName" readonly label="账号"/>
      <van-field v-model="nickName" label="昵称"/>
      <van-field v-model="introduceSign" label="个性签名"/>
      <van-field v-model="password" type='password' label="修改密码"/>
    </div>
    <van-button class="save-btn" color="#1baeae" type="primary" @click="save" block>保存修改</van-button>
    <van-button class="save-btn" color="#1baeae" type="primary" @click="logout" block>退出登录</van-button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {EditUserInfo, getUserInfo, logout} from '@/service/user';
  import {Toast} from 'vant';
  import {setLocal} from '@/assets/ts/utils';

  @Component({
    components: {ItemHeader}
  })
  export default class Setting extends Vue {
    nickName = '';
    introduceSign = '';
    password = '';
    loginName = '';

    async mounted() {
      const {data} = await getUserInfo();
      this.nickName = data.nickName;
      this.introduceSign = data.introduceSign;
      this.loginName = data.loginName;
    }

    async save() {
      if (!this.password) {
        Toast.fail('请输入原始密码或者新密码哦');
        return;
      }
      const params = {
        introduceSign: this.introduceSign,
        nickName: this.nickName,
        passwordMd5: Vue.prototype.$md5(this.password)
      };
      try {
        await EditUserInfo(params);
        Toast.success('保存成功');
        setTimeout(() => {
          this.$router.push('/user');
        }, 500);
      } catch (e) {
        return;
      }
    }

    async logout() {
      try {
        await logout();
        setLocal('token', '');
        Toast.success('退出成功');
        await this.$router.push('/')
        window.location.reload()
      } catch (e) {
        return;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";

  .setting-wrapper {
    padding-top: 40px;

    .message-btn {
      ::v-deep.van-cell {
        &:last-child {
          .van-field__body {


            .van-field__control {
              background: #f9f9f9;
              width: 80%;
              padding: 0 10px;
            }
          }
        }
      }
    }

    .save-btn {
      width: 80%;
      margin: 20px auto;
    }
  }
</style>