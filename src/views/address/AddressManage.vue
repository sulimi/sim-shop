<template>
  <div class="address-manage-wrapper">
    <ItemHeader icon-right="more" title="地址管理"/>
    <div class="address-item">
      <van-address-list
        :switchable='switchable'
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @click-item="select"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {getAddressList} from '@/service/address';

  @Component({
    components: {ItemHeader}
  })
  export default class AddressManage extends Vue {
    list = [];
    chosenAddressId = '1';
    switchable = false;

    async mounted() {
      const {data} = await getAddressList();
      this.list = data.map((item: any) => {
        return {
          id: item.addressId,
          name: item.userName,
          tel: item.userPhone,
          address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
          isDefault: !!item.defaultFlag,
        };
      });
    }

    onAdd() {
      this.$router.push('/addaddress?type=add');
    }

    onEdit(item: any) {
      this.$router.push(`/addaddress?type=edit&addressId=${item.id}`);
    }

    select(item: any) {
      const {submit, user} = this.$route.query;
      if (submit) {
        this.$router.push({path: `submitpage?addressId=${item.id}`});
      } else {
        return;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";

  .address-item {
    margin-top: 40px;
  }
</style>