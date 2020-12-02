<template>
  <div class="login">
    <ItemHeader :title="type==='login'?'登录':'注册'"/>
    <img src="../assets/login.jpg" alt="登录">
    <div class="login-message">
      <van-form @submit="onSubmit" class="login-from">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="verify">
          <Verify :showButton="false" :width="'100%'" :height="'40px'" :fontSize="'16px'" :type="1"/>
        </div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import Verify from '../../node_modules/vue2-verify/src/components/Verify.vue'

  @Component({
    components: {ItemHeader,Verify}
  })
  export default class Login extends Vue {
    type = 'login';
    username = '';
    password = '';

    onSubmit(values: string) {
      console.log('submit', values);
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/common/style/mixin";
  .login {
    img {
      width: 100%;
    }
    .login-message{
      .login-from{
        .verify{
          ::v-deep:nth-child(1){
            .fjcc();
            height: 40px;
            .verify-code{
              margin: 0;
            }
            .cerify-code-panel{
              .fjbt();
              height: 40px;
            }
            .verify-change-area{
              font-size: 12px;
            }
            .verify-code-area{
              height: 100%;
            }
            .verify-input-area{
              padding-left: 6px;
              height: 100%;
            }
            .varify-input-code{
              height: 90%;
              border: 1px solid #ddd;
              padding: 0 6px;
            }
          }
        }
      }
    }
  }
</style>