<template>
  <div class="page">
    <div class="sui-pagination">
      <ul>
        <li class="prev" @click="change($event, pageNo - 1)">
          <a href="#" :class="pageNo == 1 ? 'disable' : ''">«上一页</a>
        </li>
        <li v-show="pageNo > 3" @click="change($event, 1)">
          <a href="#">1</a>
        </li>
        <li class="dotted" v-show="pageNo > 4"><span>...</span></li>
        <li
          v-for="(item, index) in end"
          :key="index"
          v-show="start <= item"
          :class="pageNo === item ? 'active' : ''"
          @click="change($event, item)"
        >
          <a href="#">{{ item }}</a>
        </li>
        <li class="dotted" v-show="pageNo < total - 3"><span>...</span></li>
        <li @click="change($event, total)">
          <a href="#" v-show="pageNo < total - 2">{{ total }}</a>
        </li>
        <li class="next" @click="change($event, pageNo + 1)">
          <a href="#" :class="pageNo == total ? 'disable' : ''">下一页»</a>
        </li>
      </ul>
      <div>
        <span>共{{ total }}页&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GlobalPager",
  props: ["pageNo", "pageSize", "pageContinue", "pageTotal"],
  data() {
    return {
      start: "",
      end: "",
    };
  },
  computed: {
    total() {
      return Math.ceil(this.pageTotal / this.pageSize);
    },
  },
  methods: {
    change(e, page) {
      if (
        this.pageNo == page ||
        this.pageNo == page ||
        page > this.total ||
        page <= 0
      ) {
        return;
      }
      this.$emit("change", {
        page,
        scroll: window.pageYOffset,
      });
    },
    page() {
      // 判断够不够连续的分页
      if (this.total < this.pageContinue) {
        this.start = 1;
        this.end = this.total;
        return;
      }
      // 判断如果够连续得分页的话，是否当前页数小于3 导致展示页数不够5也
      if (this.pageNo < 3 && this.total > this.pageContinue) {
        this.start = this.pageNo;
        this.end = this.start + this.pageContinue - 1;
        return;
      }
      // 判断最后几页导致的分页数不够五页
      if (this.pageNo > this.total - 2) {
        this.end = this.total;
        this.start = this.end - this.pageContinue + 1;
        return;
      }
      // 正常的话执行
      this.start = this.pageNo - (this.pageContinue - 1) / 2;
      this.end = this.pageNo + (this.pageContinue - 1) / 2;
    },
  },
  beforeUpdate() {
    this.page();
  },
  mounted() {
    this.page();
  },
};
</script>

<style lang='less' scoped>
.disable {
  pointer-events: none;
  color: #999 !important;
}
.page {
  height: 66px;
  margin: 0 auto;

  .sui-pagination {
    display: flex;
    width: 700px;
    align-items: center;
    justify-content: space-evenly;
    margin: 18px auto;

    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      float: left;

      li {
        line-height: 18px;
        display: inline-block;

        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }

        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            border-color: #fff;
            cursor: default;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }

        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }

    div {
      color: #333;
      font-size: 14px;
    }
  }
}
</style>