<template>
  <div class="login">
    <ItemHeader :title="type==='login'?'登录':'注册'" router-name="user"/>
    <img src="../../assets/login.jpg" alt="登录">
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
          <Verify ref="loginVerifyRef" :showButton="false" :width="'100%'" :height="'40px'" :fontSize="'16px'" :type="2"
                  @success="successFun" @error="errorFun"
          />
        </div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            {{type==='login'?'登录':'立即注册'}}
          </van-button>
        </div>
      </van-form>
      <div class="toggle-btn" @click="toggle">{{type==='login'?'没有账号？注册':'已有账号？登录'}}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import Verify from 'vue2-verify/src/components/Verify.vue';
  import {Toast} from 'vant';
  import {login, register} from '@/service/user';
  import {setLocal} from '@/assets/ts/utils';

  @Component({
    components: {ItemHeader, Verify}
  })
  export default class Login extends Vue {
    type = 'login';
    username = '';
    password = '';
    verify = false;

    async onSubmit(values: any) {
      const verifySubmit = () => {
        (this.$refs.loginVerifyRef as any).$refs.instance.checkCode();
      };//可以提取到外面，但是我为了方便看就放在这里
      verifySubmit();  //调用这个方法就会触发successFun/errorFun


      if (!this.verify) {
        Toast.fail('验证码未填或填写错误'); //这个方法可以哦——vant表单方法
      }

      //开始请求数据、提交数据
      if (this.type === 'login') {
        try {
          const {data} = await login({
            'loginName': values.username,
            'passwordMd5': Vue.prototype.$md5(values.password)
          });
          setLocal('token', data);//设置localStorage
          Toast.success('登录成功');
          await this.$router.push('/home') //回到首页？
        } catch (err) {
          Toast.fail(err.message);
        }
      } else {
        try {
          const {data} = await register({
            'loginName': values.username,
            'password': values.password
          });
          Toast.success('注册成功');//校验账号有没有被注册过是在后端完成
          this.type = 'login';
        } catch (err) {
          Toast.fail(err.message);
        }
      }

    }

    successFun(value: any) {
      // console.log('成功');
      this.verify = true;
      value.refresh();
    }

    errorFun(value: any) {
      // console.log('失败');
      this.verify = false;
      value.refresh();
    }

    toggle() {
      this.verify = false;
      if (this.type === 'login') {
        this.type = 'register';
      } else {
        this.type = 'login';
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";

  .login {
    img {
      width: 100%;
    }

    .login-message {
      padding: 16px;

      .login-from {
        .verify {
          margin-top: 16px;

          ::v-deep:nth-child(1) {
            .fjcc();
            height: 40px;

            .verify-code {
              margin: 0;
            }

            .cerify-code-panel {
              .fjbt();
              height: 40px;
            }

            .verify-change-area {
              font-size: 12px;
            }

            .verify-code-area {
              height: 100%;
            }

            .verify-input-area {
              padding-left: 6px;
              height: 100%;
            }

            .varify-input-code {
              height: 90%;
              border: 1px solid #ddd;
              padding: 0 6px;
            }
          }
        }
      }

      .toggle-btn {
        padding: 0 36px 16px;
        font-size: 12px;
        text-align: right;
        color: #1989FA;
      }
    }
  }
</style>