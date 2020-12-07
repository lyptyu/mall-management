<template>
  <el-dialog
      title="添加用户"
      :visible.sync="$store.state.addDialogVisible"
      width="50%"
      @close="addDialogClosed">
    <!--内容主题区域-->
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <!--底部区域-->
    <span slot="footer" class="dialog-footer">
    <el-button @click="$store.state.addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {addUser} from "@/network/home"

export default {
  name: "AddUser",
  data() {
    //验证邮箱规则
    var checkEmail = (rule, value, cb) => {
      //验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        //合法
        return cb()
      }
      cb(new Error("请输入合法邮箱"))
    }
    //验证手机号规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        //合法
        return cb()
      }
      cb(new Error("请输入合法手机号"))
    }
    return {
      //添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //添加表单的验证规则对象
      addFormRules: {
        username: [{
          required: true, message: "请输入用户名", trigger: "blur"
        }, {
          min: 3, max: 10, message: "用户名长度在3-10个之间", trigger: "blur"
        }],
        password: [{
          required: true, message: "请输入密码", trigger: "blur"
        }, {
          min: 6, max: 15, message: "密码长度在6-15个之间", trigger: "blur"
        }],
        email: [{
          required: true, message: "请输入邮箱", trigger: "blur"
        }, {
          validator: checkEmail, trigger: "blur"
        }],
        mobile: [{
          required: true, message: "请输入手机", trigger: "blur"
        }, {
          validator: checkMobile, trigger: "blur"
        }],
      }
    }
  },
  created() {

  },
  methods: {
    //监听用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    //点击按钮,添加新用户
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return;
        //可以发起添加用户的网络请求
        addUser(this.addForm).then(res => {
          if (res.data.meta.status !== 201) {
            return this.$message.error("添加用户失败!")
          }
          this.$message.success("添加用户成功!")
          // console.log(res)
          this.$store.state.addDialogVisible = false
          this.$emit('getUserList')
        })
      })
    }
  }
}
</script>

<style scoped>

</style>