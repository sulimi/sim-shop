<template>
  <div class="good-detail">
    <ItemHeader title="商品详情"/>
    <div class="detail-content">
      <SwipeHome :swipe-imgs="goodsItemData.goodsCarouselList"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {getDetail} from '@/service/category';
  import SwipeHome from '@/views/home/SwipeHome.vue';

  @Component({
    components: {SwipeHome, ItemHeader}
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