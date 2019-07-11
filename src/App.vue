<template>
  <div id="app">
    <Mtag></Mtag>
  </div>
</template>

<script>
import Mtag from './lib/manipulation-tag';
export default {
  name: 'app',
  components:{
    Mtag
  },
  data(){
    return {
      tags:['人力资源管理证书','企业培训师证书','注册会计师证书','会计从业资格证书'],
      checkedList:['注册会计师证书','人力资源管理证书','初级会计证','厨师上岗证']
    }
  },
  methods:{
    getTags(tags){
      console.log(tags);
    }
  }
}
</script>
