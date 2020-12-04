import Vue from 'vue';
import Vuex from 'vuex';
import {Toast} from 'vant/types/toast';
import {search} from '@/service/category';
import {getCart} from '@/service/cart';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    searchRefreshing: false, //是否下拉刷新
    searchLoading: false,
    searchFinished: false,  //是否没有更多
    searchPage: 1,  //页码
    searchTotalPage: 0,//页码总数
    searchResult: [],
    orderBy: '',
    keyword: '',  //关键词搜索
    cartCount: 0,
  },
  mutations: {
    //滚动加载
    changeKeyword(state, val) {
      state.keyword = val;
    },
    onLoad(state) {
      if (!state.searchRefreshing && state.searchPage < state.searchTotalPage) {
        state.searchPage = state.searchPage + 1;
      }
      if (state.searchRefreshing) {
        state.searchResult = [];
        state.searchRefreshing = false;
      }
      store.dispatch('init').then()
    },
    onRefresh(state) {
      //重新请求刷新数据
      state.searchRefreshing = true;
      state.searchFinished = false;
      state.searchLoading = true;
      state.searchPage = 1;
      store.commit('onLoad');
    },


    //购物车、详情页
    addCart (state, payload) {
      state.cartCount = payload.count
    }
  },
  actions: {
    //滚动加载
    async init(context) {
      if (!context.state.keyword) {
        // Toast.fail('请输入关键词');
        context.state.searchFinished = true;
        context.state.searchLoading = false;
        return;
      }
      const {data, data: {list}} = await search({
        pageNumber: context.state.searchPage,
        keyword: context.state.keyword,
        orderBy: context.state.orderBy
      });
      context.state.searchResult = context.state.searchResult.concat(list);
      context.state.searchTotalPage = data.totalPage;
      context.state.searchLoading = false;
      if (context.state.searchPage >= data.totalPage){
        context.state.searchFinished = true;
      }
    },

    //购物车、详情页
    async updateCart(ctx) {
      const { data } = await getCart()
      ctx.commit('addCart', {
        count: data.length || 0
      })
    }
  },
  modules: {}
});
export {store};
