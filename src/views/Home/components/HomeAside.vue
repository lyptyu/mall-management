<template>
  <div>
    <!--侧边栏菜单区域-->
    <el-menu
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409efe">
      <!--一级菜单-->
      <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
        <!--一级菜单的模板区域-->
        <template slot="title">
          <!--图标-->
          <i :class="iconsObj[item.id]"></i>
          <!--文本-->
          <span>{{ item.authName }}</span>
        </template>
        <!--二级菜单模板区域-->
        <el-menu-item :index="subItem.id+''" v-for="subItem in item.children" :key="subItem.id">
          <template slot="title">
            <!--图标-->
            <i class="el-icon-menu"></i>
            <!--文本-->
            <span>{{ subItem.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {getMenuList} from "@/network/home"

export default {
  name: "HomeAside",
  data() {
    return {
      //左侧菜单
      menulist:[],
      iconsObj:{
        '125':"iconfont icon-user",
        '103':"iconfont icon-tijikongjian",
        '101':"iconfont icon-shangpin",
        '102':"iconfont icon-danju",
        '145':"iconfont icon-baobiao",
      }
    };
  },
  created() {
    getMenuList().then(res => {
      if(res.data.meta.status!==200) return this.$message.error(res.data.meta.msg)
      this.menulist=res.data.data
      console.log(this.menulist)
    })
  }
}
</script>

<style scoped>
.iconfont{
  margin-right: 10px;
}
</style>