<template>
  <el-form
      label-width="0px"
      class="login_form"
      :model="loginForm"
      :rules="loginFormRules"
      ref="loginFormRef">
    <!--用户名-->
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
    </el-form-item>
    <!--密码-->
    <el-form-item prop="password">
      <el-input
          v-model="loginForm.password"
          prefix-icon="iconfont icon-3702mima"
          type="password"
      ></el-input>
    </el-form-item>
    <!--  按钮区域-->
    <el-form-item class="btns">
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="info" @click="resetLoginForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {postLogin} from "@/network/login"

export default {
  name: "LoginForm",
  data() {
    return {
      //表单数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456"
      },
      //表单验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {min: 3, max: 10, message: "用户名长度在 3 到 10 个字符", trigger: "blur"}
        ],
        //验证密码是否合法
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 6, max: 15, message: "用户名长度在 6 到 15 个字符", trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    //重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        postLogin(this.loginForm).then(res=>{
          const meta = res.data.meta
          if(meta.status!==200){
            this.$message.error(meta.msg)
          }
          else{
            this.$message({
              message: meta.msg,
              type: 'success'
            });
            window.sessionStorage.setItem("token",res.data.data.token)
            this.$router.push('/home')
          }
        })

      });
    }
  }
}
</script>

<style scoped>
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

</style>