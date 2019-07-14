# vue-choose-customization-tags
customize to choose tags, set tags were selected

#### 使用方法：
```
npm install --save xz-mtag

Vue.use(Mtag)

<Mtag :tags="tags" :checked="checked" @selected="getTags"/>
```

### 属性:
tags:
  传入初始化的预选标签数组
  
checked:
  传入表示已经选择的标签数组
  
### 方法:
selected:
  接受一个参数,返回已经选择的标签数组
  
### 例子：设置初始化选择标签  

<img src="https://github.com/coolHt/vue-choose-custom-tags/blob/master/exampleImg/example1.jpg" width="400"/>


```
<Mtag :tags="taglist" />
export default {
  data(){
    return {
      taglist:['免费工作餐','弹性工作制','周末双休','五险一金']
    }
  }
}
```
### 例子：设置初始化选择标签和已选择标签

<img src="https://github.com/coolHt/vue-choose-custom-tags/blob/master/exampleImg/example2.jpg" width="400"/>


```
<Mtag :tags="taglist" :checked="checkedlist" @selected="getTags"/>
export default {
  data(){
    return {
      taglist:['免费工作餐','弹性工作制','周末双休','五险一金'],
      checkedlist:['周末双休','免费工作餐','专业培训','每年调薪机制']
    }
  }
}
```

## 版本
### 3.0.0
修复异步数据不同步bug
