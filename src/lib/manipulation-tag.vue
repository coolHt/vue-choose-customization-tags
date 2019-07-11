<template>
  <div class="xz-custom-tag">
    <div class="xz-already-choose" v-if="choosed.length > 0">
      <span class="xz-choosed-tag" v-for="(tag,index) in choosed" :key="tag.num">
        {{tag.value}}
        <i class="xz-close" @click="delSelected($event,index)" :data-sortnum="tag.num">x</i>
      </span>
    </div>
    <!--选择项-->
    <div v-if="tags.length > 0">
      <button class="xz-tag-prepare" v-for="(tag) in tagList" :key="tag.num" @click="chooseTag($event)"
        :data-sortnum="tag.num">{{tag.value}}</button>
    </div>
    <div class="xz-add-tag">
      <input type="text" class="xz-tag-input" v-model="customTag">
      <button class="xz-tag-button" @click="addTag">新增标签</button>
    </div>
    <transition name="fade">
      <p class="xz-repeat-error" v-show="hasRepeat">标签已存在</p>
    </transition>
  </div>
</template>
<script>
  export default {
    props: {
      tags: {
        type: Array,
        default: function () {
          return new Array();
        }
      },
      checked: {
        type: Array,
        default: function () {
          return new Array();
        }
      }
    },
    data() {
      return {
        tagList: [], //初始化列表
        choosed: [], //已选择列表
        returnTags: [], //返回出已经选择的标签
        customTag: '', //自定义添加
        hasRepeat: false,
        preBtn: null, //按钮列表
      }
    },

    mounted() {
      let _this = this;
      this.tags.forEach(function (v, index) {
        _this.tagList.push({
          num: index,
          value: v
        })
      })
      this.$nextTick(() => {
        let _this = this;
        this.checked.forEach((v, index) => {
          let isExist = false;
          _this.returnTags.push(v);
          _this.preBtn = document.getElementsByClassName('xz-tag-prepare');
          for (let i = 0; i < _this.tagList.length; i++) {
            if (v == _this.tagList[i].value) {
              _this.choosed.push({
                num: _this.tagList[i].num,
                value: v
              })
              _this.preBtn[_this.tagList[i].num].classList.add('xz-choosed');
              isExist = true;
              break;
            }
          }
          //处理pre列表中不存在的
          if (isExist == false) {
            _this.choosed.push({
              num: _this.choosed.length + new Date().valueOf(),
              value: v
            })
          }
        })
      })
    },
    methods: {
      chooseTag(e) {
        e.target.classList.add('xz-choosed');
        let num = e.target.dataset.sortnum;
        let name = e.target.innerText;
        /**判重**/
        for (let i = 0; i < this.choosed.length; i++) {
          if (this.choosed[i].num == num) {
            //已存在
            return;
          }
        }
        this.choosed.push({
          num: e.target.dataset.sortnum,
          value: e.target.innerText
        })
        this.returnTags.push(name);
        this.$emit('selected', this.returnTags); //返回选中项
      },
      //自定义添加
      addTag() {
        let tag = {
          num: -1,
          value: ''
        }
        let isExist = false;

        let nValue = this.customTag; //保存新标签
        /**需要判断自定义列表中是否有自定义添加的标签**/
        for (let i = 0; i < this.tagList.length; i++) { //如果列表中有
          if (this.tagList[i].value == nValue) {
            let tagBtn = document.getElementsByClassName("xz-tag-prepare");

            tagBtn[this.tagList[i].num].classList.add('xz-choosed');
            tag.num = this.tagList[i].num;
            tag.value = nValue;
            isExist = true;
            break;
          }
        }
        /**还是要去重**/
        for (let i = 0; i < this.choosed.length; i++) {
          if (this.choosed[i].num == tag.num) {
            //已存在
            this.hasRepeat = true;
            isExist = false;
            return;
          }
        }
        if (isExist == false) {
          tag.num = this.choosed.length + new Date().valueOf();
          tag.value = nValue;
        }
        this.choosed.push(tag);
        this.returnTags.push(nValue);
        this.customTag = '';


        this.$emit('selected', this.returnTags); //返回选中项
      },
      //删除已选项
      delSelected(e, index) {
        let num = e.target.dataset.sortnum;
        let chooseBtn = document.getElementsByClassName('xz-tag-prepare');
        if (chooseBtn[num]) {
          chooseBtn[num].classList.remove('xz-choosed');
        }
        this.choosed.splice(index, 1);
        this.returnTags.splice(index, 1);
        this.$emit('selected', this.returnTags); //返回选中项
      }
    },
    watch: {
      'customTag': function () {
        if (this.customTag == '') {
          this.hasRepeat = false;
        }
      }
    }
  }

</script>

<style scoped>
  .xz-tag-prepare {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px 12px;
    color: #333333;
    font-size: 13px;
    margin: 0 10px 10px 0;
    cursor: pointer;
    outline: none;
  }

  .xz-choosed-tag {
    display: inline-block;
    padding: 6px 12px;
    margin: 0 10px 10px 0;
    color: #ffffff;
    background: #0E90D2;
    border-radius: 4px;
    font-size: 12px;
    line-height: 20px;
  }

  .xz-close {
    color: #ffffff;
    cursor: pointer;
    font-style: normal;
    font-size: 16px;
    margin-left: 5px;
    line-height: 20px;
  }

  .xz-choosed {
    background: #ebeef5 !important;
  }

  .xz-tag-input {
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 170px;
    height: 38px;
    box-sizing: border-box;
    color: #333333;
    padding: 0 10px;
    outline: none;
  }

  .xz-tag-button {
    border: 1px solid #ddd;
    color: #333333;
    height: 38px;
    box-sizing: border-box;
    padding: 0 12px;
    font-size: 13px;
    outline: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .xz-repeat-error {
    font-size: 14px;
    margin-top: 5px;
    color: #c82a2e;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s linear;
  }

  .fade-enter-to {
    opacity: 1;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

</style>
