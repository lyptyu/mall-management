<template>
  <div class="home-header">
    <div>
      <img src="~@/assets/heima.png" alt="">
      <span>电商后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "HomeHeader",
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped lang="less">

.home-header {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  >div{
    display: flex;
    align-items: center;
  }
  span{
    margin-left: 15px;
  }
}
</style>