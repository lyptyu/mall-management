<template>
  <div>
    <!--折叠展开-->
    <toggle-button @click.native="toggleCollapse"/>
    <!--侧边栏菜单区域-->
    <el-menu
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409efe"
        :unique-opened="true"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        :default-active="activePath">
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
        <el-menu-item
            :index="'/'+subItem.path"
            v-for="subItem in item.children"
            :key="subItem.id"
            @click="saveNavState('/'+subItem.path)">
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
import ToggleButton from "@/views/Home/components/ToggleButton"
import {getMenuList} from "@/network/home"

export default {
  name: "HomeAside",
  data() {
    return {
      //左侧菜单
      menulist: [],
      iconsObj: {
        "125": "iconfont icon-user",
        "103": "iconfont icon-tijikongjian",
        "101": "iconfont icon-shangpin",
        "102": "iconfont icon-danju",
        "145": "iconfont icon-baobiao",
      },
      isCollapse: false,
      activePath:''
    };
  },
  components: {
    ToggleButton
  },
  created() {
    getMenuList().then(res => {
      if (res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
      this.menulist = res.data.data
      // console.log(this.menulist)
    })
    this.activePath=window.sessionStorage.getItem("activePath")
  },
  methods: {
    //点击按钮切换菜单折叠展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      this.$emit("changeAsideWidth", this.isCollapse)
    },
    //保存链接激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath)
      // this.activePath=activePath
    }
  }
}
</script>

<style scoped lang="less">
.iconfont {
  margin-right: 10px;
}

.el-menu {
  border-right: none;
}
</style>