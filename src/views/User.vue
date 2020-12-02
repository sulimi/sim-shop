<template>
  <div class="user-wrapper">
    <ItemHeader title="我的"/>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  @Component({
    components: {ItemHeader}
  })
  export default class User extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>