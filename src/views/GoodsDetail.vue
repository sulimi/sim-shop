<template>
  <div class="good-detail">
    <ItemHeader title="商品详情"/>
    <div class="detail-content">

    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {getDetail} from '@/service/category';

  @Component({
    components: {ItemHeader}
  })
  export default class GoodsDetail extends Vue {
    goodsItemData = [];

    async mounted() {
      const {id} = this.$route.params;
      const {data} = await getDetail(id);
      this.goodsItemData = data;
      console.log(data);
    }
  }
</script>

<style lang="scss" scoped>

</style>