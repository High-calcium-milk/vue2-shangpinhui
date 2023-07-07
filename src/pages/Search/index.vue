<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li v-show="searchParams.categoryName" class="with-x">
              {{ searchParams.categoryName }}<i @click="removeCategorName">×</i>
            </li>
            <li v-show="searchParams.keyword" class="with-x">
              {{ searchParams.keyword }}<i @click="removeKeyWord">×</i>
            </li>
            <li
              v-show="searchParams.props.length > 0"
              class="with-x"
              v-for="(item, index) of searchParams.props"
              :key="item.split(':')[0]"
            >
              {{ item.split(":")[1] }}<i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @arr="arr" :list="searchParams.props" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="
                    searchParams.order.split(':')[0] === '1' ? 'active' : ''
                  "
                >
                  <a @click="order(1)" href="#"
                    >综合<span
                      v-show="
                        searchParams.order.split(':')[1] === 'asc' &&
                        searchParams.order.split(':')[0] === '1'
                      "
                      class="iconfont icon-up"
                    ></span
                    ><span
                      v-show="
                        searchParams.order.split(':')[1] === 'desc' &&
                        searchParams.order.split(':')[0] === '1'
                      "
                      class="iconfont icon-down"
                    ></span
                  ></a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li
                  :class="
                    searchParams.order.split(':')[0] === '2' ? 'active' : ''
                  "
                >
                  <a @click="order(2)" href="#"
                    >价格<span
                      v-show="
                        searchParams.order.split(':')[1] === 'asc' &&
                        searchParams.order.split(':')[0] === '2'
                      "
                      class="iconfont icon-up"
                    ></span
                    ><span
                      v-show="
                        searchParams.order.split(':')[1] === 'desc' &&
                        searchParams.order.split(':')[0] === '2'
                      "
                      class="iconfont icon-down"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link
                      :to="{
                        name: 'detail',
                        params: { skuId: item.id },
                      }"
                      target="_blank"
                      ><img :src="item.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title">{{
                      item.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Pager
      :pageNo="searchParams.pageNo"
      :pageSize="searchParams.pageSize"
      :pageContinue="5"
      :pageTotal="total"
      @change="change"
      v-if="total"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
import Pager from "@/components/pager";
export default {
  name: "RouterSearch",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
      scorll: 0,
    };
  },
  components: {
    SearchSelector,
    Pager,
  },
  computed: {
    ...mapGetters({
      goodsList: "goodsList",
    }),
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    // 自定义事件，改变分页器的显示
    change(obj) {
      this.searchParams.pageNo = obj.page;
      this.scroll = obj.scroll;
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 移除一二三级导航
    removeCategorName() {
      this.searchParams.categoryName = "";
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      if (this.$route.params) {
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      } else {
        this.$router.push("/search");
      }
    },
    // 移除关键字
    removeKeyWord() {
      this.searchParams.keyword = undefined;
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      } else {
        this.$router.push("/search");
      }
      this.$bus.$emit("trimKeyWord");
    },
    arr(data) {
      let newData = `${data[0]}:${data[1]}`;
      let ifContinue = true;
      //判断id想不想等，替换掉重复的id属性
      if (!this.searchParams.props.includes(newData)) {
        this.searchParams.props.forEach((item, index) => {
          if (item.split(":")[0] == data[0]) {
            this.searchParams.props.splice(index, 1, newData);
            ifContinue = false;
          }
        });
      } else {
        //判断有没有相同的内容，有的话删除重复
        this.searchParams.props.forEach((item, index) => {
          if (item == newData) {
            this.searchParams.props.splice(index, 1);
            ifContinue = false;
            return;
          }
        });
      }
      // 以上不满足，添加
      if (ifContinue) this.searchParams.props.push(newData);
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    removeProps(index) {
      this.searchParams.props.splice(index, 1);
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 排序
    order(order) {
      if (this.searchParams.order === "") {
        this.searchParams.order = `${order}:asc`;
        this.$store.dispatch("getSearchList", this.searchParams);
      } else {
        if (order == this.searchParams.order.split(":")[0]) {
          this.searchParams.order = `${order}:${
            this.searchParams.order.split(":")[1] === "asc" ? "desc" : "asc"
          }`;
          this.$store.dispatch("getSearchList", this.searchParams);
        } else {
          this.searchParams.order = `${order}:asc`;
          this.$store.dispatch("getSearchList", this.searchParams);
        }
      }
    },
  },
  watch: {
    $route() {
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      this.$store.dispatch("getSearchList", this.searchParams);
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.params, this.$route.query);
  },
  mounted() {
    this.$store.dispatch("getSearchList", this.searchParams);
  },
  updated() {
    console.log(this.scorll);
    window.scrollTo({
      top: this.scroll || 0,
      left: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      this.scroll = 0;
    }, 3000);
  },
};
</script>

<style lang="less" scoped>
.price {
  em {
    margin-right: 5px;
  }
}
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    width: 100%;
                    height: 100%;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>