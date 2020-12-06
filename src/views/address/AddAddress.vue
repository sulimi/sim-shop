<template>
  <div class="add-wrapper">
    <ItemHeader :title="`${type === 'add' ? '新增地址' : '编辑地址'}`" icon-right="more"/>
    <van-address-edit
      class="edit"
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
  import {addAddress, DeleteAddress, EditAddress, getAddressDetail} from '@/service/address';
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
    addressId = '';

    async mounted() {
      this.chooseProvinceCityCounty();
      await this.editFun();
    }


    chooseProvinceCityCounty() {
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

    async editFun() {
      const {type, addressId} = this.$route.query;
      this.type = type as string;
      this.addressId = addressId as any;
      if (type === 'edit') {
        const {data: addressDetail} = await getAddressDetail(addressId as any);
        let _areaCode = ''; //地区编码必填
        const province = tdist.getLev1();
        Object.entries(this.areaList.county_list).forEach(([id, text]) => {
          // 先找出当前对应的区
          if (text == addressDetail.regionName) {
            // 找到区对应的几个省份
            const provinceIndex = province.findIndex((item: any) => item.id.substr(0, 2) == id.substr(0, 2));
            // 找到区对应的几个市区
            const cityItem = Object.entries(this.areaList.city_list).filter(([cityId, cityName]) => cityId.substr(0, 4) == id.substr(0, 4))[0];
            // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
            if (province[provinceIndex].text == addressDetail.provinceName && cityItem[1] == addressDetail.cityName) {
              _areaCode = id;
            }
          }
        });
        this.addressInfo = { //vant地址初识值
          id: addressDetail.addressId,
          name: addressDetail.userName,
          tel: addressDetail.userPhone,
          province: addressDetail.provinceName,
          city: addressDetail.cityName,
          county: addressDetail.regionName,
          addressDetail: addressDetail.detailAddress,
          areaCode: _areaCode,
          isDefault: !!addressDetail.defaultFlag
        };
      }
    }

    async onSave(content: any) {
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
        if (this.type === 'edit') {
          (params as any).addressId = this.addressId;
          EditAddress(params);
          Toast('编辑成功');
        } else {
          addAddress(params);
          Toast('新增成功');
        }

        setTimeout(() => {
          this.$router.go(-1);
        }, 1000);
      } catch (e) {
        return;
      }
    }

    async onDelete() {
      try {
        await DeleteAddress(this.addressId as any);
        Toast('删除成功');
        setTimeout(() => {
          this.$router.go(-1);
        }, 1000);
      } catch (e) {
        return;
      }

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