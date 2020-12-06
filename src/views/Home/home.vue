<template>
  <el-container class="home-container">
    <!--头部-->
    <el-header>
      <home-header/>
    </el-header>
    <!--主体区-->
    <el-container>
      <!--左侧边栏-->
      <el-aside width="200px">
        <home-aside/>
      </el-aside>
      <!--右侧主题-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeHeader from "@/views/Home/components/HomeHeader"
import HomeAside from "@/views/Home/components/HomeAside"
import HomeMain from "@/views/Home/components/HomeMain"

export default {
  name: "home",
  methods: {},
  components: {
    HomeHeader,
    HomeAside,
    HomeMain
  }
}
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
}

.el-main {
  background-color: #EAEDF1;
}

.el-header {
  background-color: #373D41;

}

.el-aside {
  background-color: #333744;
}
</style>