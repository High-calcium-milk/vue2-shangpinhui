<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2
        class="all"
        @mouseenter="enterLeave(true)"
        @mouseleave="enterLeave(false)"
      >
        全部商品分类
      </h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" :class="show ? 'normal' : 'offset'">
        <transition name="sort">
          <div
            v-show="show"
            @mouseenter="enterLeave(true)"
            @mouseleave="enterLeave(false)"
            class="all-sort-list2"
            @click="goSearch($event)"
          >
            <div class="item" v-for="c1 in typeNavList" :key="c1.categoryId">
              <h3>
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  href=""
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        href=""
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          href=""
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RouterTypeNav",
  data() {
    return {
      show: true,
    };
  },
  methods: {
    // search路由显示隐藏typenav
    enterLeave(show) {
      if (this.$route.name !== "search" && this.$route.name !== "detail")
        return;
      this.show = show;
    },
    // 整理search参数
    searchProps(obj) {
      return {
        name: "search",
        query: obj,
        params: this.$route.params,
      };
    },
    // 跳转search路由传递query参数
    goSearch(e) {
      e.preventDefault();
      let categoryName = e.target.dataset.categoryname;
      if (categoryName) {
        let { category1id, category2id, category3id } = e.target.dataset;
        let category1Id = category1id;
        let category2Id = category2id;
        let category3Id = category3id;
        if (category1Id) {
          this.$router.push(this.searchProps({ categoryName, category1Id }));
        } else if (category2Id) {
          this.$router.push(this.searchProps({ categoryName, category2Id }));
        } else if (category3Id) {
          this.$router.push(this.searchProps({ categoryName, category3Id }));
        }
      }
    },
  },
  computed: {
    // 遍历vuex状态
    ...mapState({
      typeNavList: (state) => state.home.typeNavList,
    }),
  },
  beforeMount() {
    // 判断是否为search组件 navlist的显示和隐藏
    this.show =
      this.$route.name === "search" || this.$route.name === "detail"
        ? false
        : true;
  },
};
</script>

<style scoped lang='less'>
.normal {
  left: 0;
  top: 45px;
}
.offset {
  left: -9999px;
  top: 45px;
}
.sort-enter,
.sort-leave-to {
  opacity: 0;
  height: 0;
}
.sort-enter-to,
.sort-leave {
  opacity: 1;
  height: 461px;
}
.sort-enter-active,
.sort-leave-active {
  transition: all 0.3s linear;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      width: 210px;
      height: 461px;
      z-index: 999;

      .all-sort-list2 {
        background: #fafafa;
        height: 100%;
        overflow: hidden;
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            &:hover {
              background-color: skyblue;
            }

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>