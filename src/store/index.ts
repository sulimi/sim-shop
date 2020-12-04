import Vue from 'vue';
import Vuex from 'vuex';
import {Toast} from 'vant/types/toast';
import {search} from '@/service/category';

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
    keyword:'手机'  //关键词搜索
  },
  mutations: {
    async init(state) {
      if (!state.keyword) {
        // Toast.fail('请输入关键词');
        state.searchFinished = true;
        state.searchLoading = false;
        return;
      }
      const {data, data: {list}} = await search({
        pageNumber: state.searchPage,
        keyword: state.keyword,
        orderBy: state.orderBy
      });
      state.searchResult = state.searchResult.concat(list);
      state.searchTotalPage = data.totalPage;
      state.searchLoading = false;
      if (state.searchPage >= data.totalPage) state.searchFinished = true;
    },
    changeKeyword(state,val){
      state.keyword=val;
    },
    onLoad(state) {
      if (!state.searchRefreshing && state.searchPage < state.searchTotalPage) {
        state.searchPage = state.searchPage + 1;
      }
      if (state.searchRefreshing) {
        state.searchResult = [];
        state.searchRefreshing = false;
      }
     store.commit('init')
    },
    onRefresh(state) {
      //重新请求刷新数据
      state.searchRefreshing = true;
      state.searchFinished = false;
      state.searchLoading = true;
      state.searchPage = 1;
      store.commit('onLoad');
    }
  },
  actions: {},
  modules: {}
});
export {store}
