# vue-choose-custom-tags
customize to choose tags, set tags to selected

## 使用方法：
npm install --save xz-mtag
##
Vue.use(Mtag)
##
<Mtag :tags="tags" :checked="checked" @selected="getTags"/>

## 属性:
tags:
  传入初始化的预选标签数组
  
checked:
  传入表示已经选择的标签数组
  
## 方法:
selected:
  返回已经选择的标签数组
