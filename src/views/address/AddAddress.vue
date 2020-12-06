<template>
  <div class="add-wrapper">
    <ItemHeader :title="`${type === 'add' ? '新增地址' : '编辑地址'}`" icon-right="more"/>
    <van-address-edit
      :area-list="areaList"
      :show-delete="type == 'edit'"
      :address-info="addressInfo"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {tdist} from '@/assets/ts/utils';
  import {addAddress} from '@/service/address';
  import {Toast} from 'vant';

  @Component({
    components: {ItemHeader}
  })
  export default class AddAddress extends Vue {
    areaList = {
      'province_list': {},
      'city_list': {},
      'county_list': {}
    };
    searchResult = [];
    type = 'add';
    addressInfo = {};
    from = '';

    async mounted() {
      // 省市区列表构造
      const _provinceList: any = {}, _cityList: any = {}, _countyList: any = {};
      tdist.getLev1().forEach((p: { id: string; text: string }) => {
        //p=>{id:'110000',text:'北京'}
        _provinceList[p.id] = p.text;
        tdist.getLev2(p.id).forEach((c: { id: string; text: string }) => {
          _cityList[c.id] = c.text;
          tdist.getLev3(c.id).forEach((q: { id: string; text: string }) => _countyList[q.id] = q.text);
        });
      });
      this.areaList['province_list'] = _provinceList;
      this.areaList['city_list'] = _cityList;
      this.areaList['county_list'] = _countyList;
    }

    async onSave(content: any) {
      console.log(content);
      const params = {//这是后台接口要求发送的数据格式
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0,
      };
      try {
        const {message} = await addAddress(params);
        Toast('保存成功')
        setTimeout(() => {
          this.$router.push({ path: 'addressmanage' })
        }, 1000)
      }catch (e) {
        return
      }
    }

    async onDelete() {
      //
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";

  .add-wrapper {
    margin-top: 40px;

    ::v-deep.van-address-edit {
      .van-address-edit__default {
        display: flex;
        justify-content: space-between;

        .van-cell__title {
          text-align: left;
        }

        .van-switch--on {
          background: @primary;
        }
      }

      .van-address-edit__buttons {
        .van-button--danger {
          background: @primary;
          border-color: @primary;
        }
      }
    }
  }
</style>