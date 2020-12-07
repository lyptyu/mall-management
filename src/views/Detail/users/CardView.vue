<template>
  <el-card>
    <!--搜索与添加区域-->
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="$emit('getUserList')">
          <el-button slot="append" icon="el-icon-search"
                     @click="$emit('getUserList')"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="$store.state.addDialogVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <!--用户列表区域-->
    <el-table :data="userList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>
      <el-table-column label="状态">
        <template v-slot="scope">
          <!--{{scope.row}}-->
          <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template v-slot="scope">
          <!--修改-->
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <!--删除-->
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          <!--分配角色-->
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>
    <!--分页区域-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
import {userStateChanged} from "@/network/home"

export default {
  name: "CardView",
  props: {
    userList: {
      type: Array,
      default() {
        return []
      }
    },
    queryInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    total: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    // console.log(this.userList.length)
  },
  //监听pagesize改变的时间
  methods: {
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.$emit("getUserList")
    },
    //监听页码值改变的时间
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.$emit("getUserList")
    },
    //监听switch状态改变
    userStateChanged(userInfo) {
      userStateChanged(userInfo).then(res => {
        if (res.data.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error("更新用户状态失败")
        }
        this.$message.success("更新用户状态成功")
      })
    },

  },

}
</script>

<style scoped>

</style>