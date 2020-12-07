<template>
  <div>
    <!--面包屑导航-->
    <bread/>
    <!--卡片视图区域-->
    <card-view
        :user-list="userList"
        :query-info="queryInfo"
        :total="total"
        @getUserList="getUserList"/>
    <!--添加用户对话框-->
    <add-user/>
  </div>
</template>

<script>
import Bread from "@/views/Detail/users/Bread"
import CardView from "@/views/Detail/users/CardView"
import AddUser from "@/views/Detail/users/AddUser"
import {getUserList} from "@/network/home"

export default {
  name: "Users",
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0
    }
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      getUserList(this.queryInfo).then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error((res.data.data.meta.msg))
        }
        this.userList = res.data.data.users
        this.total = res.data.data.total
        // console.log(this.total)
      })
    }
  },
  components: {
    Bread,
    CardView,
    AddUser
  }
}
</script>

<style scoped lang="less">

</style>