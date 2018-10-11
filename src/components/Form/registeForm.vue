<template>
  <div>
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form">
      <el-form-item prop="phone">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="phone" />
        </span>
        <el-input v-model="registerForm.phone" type="text" placeholder="请输入手机号" />
      </el-form-item>
      <div class="svg-code">
        <el-form-item prop="code" class="svg-code-input">
          <span class="svg-container">
            <svg-icon icon-class="code" />
          </span>
          <el-input v-model="registerForm.code" type="text" placeholder="请输入验证码" />
        </el-form-item>
        <div class="svg-code-image svg-code-b">
          <ImgVerify ref="imgVerify" @imgCode="imgCode"/>
        </div>
      </div>
      <div class="svg-code">
        <el-form-item prop="identify" class="svg-code-input">
          <span class="svg-container">
            <svg-icon icon-class="message" />
          </span>
          <el-input v-model="registerForm.identify" type="text" placeholder="请输入短信验证码" />
        </el-form-item>
        <div v-if="is_dx_yz" class="svg-code-image svg-code-border" @click="dx_yzm_bt">获取验证码</div>
        <div v-if="!is_dx_yz" class="svg-code-image svg-code-border">{{ time }}秒后失效</div>
      </div>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="registerForm.password" type="password" placeholder="请设置密码" />
      </el-form-item>
      <el-form-item prop="savepass">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="registerForm.savepass" type="password" placeholder="再次输入密码" />
      </el-form-item>
      <slot name="tips" />
      <el-form-item>
        <el-button :loading="loading" type="primary" class="form-item-btn" @click="saveCode"> {{ namebtn }} </el-button>
      </el-form-item>
      <slot name="footer" />
    </el-form>
  </div>
</template>

<script>
// 引用图形验证码插件
import ImgVerify from '@/components/identify/identify'
import { validatePhone, validatePass } from '@/utils/validate'
export default {
  components: { ImgVerify },
  props: {
    namebtn: {
      type: String,
      default: ''
    }
  },
  data() {
    const isPhone = (rule, value, callback) => {
      if (!validatePhone(value)) {
        callback(new Error('手机号输入错误'))
      } else {
        callback()
      }
    }
    const isCode = (rule, value, callback) => {
      const imgCode = value.toLowerCase()
      const strCode = this.imageCode.toLowerCase()
      if (imgCode !== strCode) {
        callback(new Error('图片验证码输入有误'))
      } else {
        callback()
      }
    }
    const isPass = (rule, value, callback) => {
      if (!validatePass(value)) {
        callback(new Error('密码为8-16个数字和字母组合'))
      } else {
        callback()
      }
    }
    const isSavepass = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        phone: '',
        code: '',
        identify: '',
        password: '',
        savepass: ''
      },
      registerRules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: isPhone, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入图形验证码', trigger: 'blur' },
          { validator: isCode, trigger: 'blur' }
        ],
        identify: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
        password: [{ validator: isPass, trigger: 'blur' }],
        savepass: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: isSavepass, trigger: 'blur' }
        ]
      },
      imageCode: '',
      checked: true,
      is_dx_yz: true,
      time: 60
    }
  },
  computed: {
    loading() {
      return this.loading_form
    }
  },
  methods: {
    // 验证码变更，数据保存
    imgCode(code) {
      this.imageCode = code.toLowerCase() // 将图片验证码转换成小写
      console.log(this.imageCode)
    },
    // 点击验证码 刷新
    handleClick() {
      this.$refs.imgVerify.draw()
    },
    saveCode() {
      const _self = this
      _self.$emit('loadingfunc', true)
      _self.$refs.registerForm.validate((valid) => {
        if (valid) {
          const objData = {
            phone: _self.registerForm.phone,
            password: _self.$md5(_self.registerForm.password)
          }
          _self.$emit('save', objData)
        } else {
          _self.$message({
            message: '请填写完成信息',
            type: 'error'
          })
          _self.$emit('loadingfunc', false)
          // 更新图片验证码
          _self.handleClick()
        }
      })
    },
    dx_yzm_bt() {
      const code = this.registerForm.code
      const imgCode = this.imageCode.toLowerCase()
      if (code) {
        if (code !== imgCode) {
          this.$message({
            message: '验证码输入有误',
            type: 'error'
          })
          return
        }
      } else {
        this.$message({
          message: '请输入验证码',
          type: 'error'
        })
        return
      }
      this.is_dx_yz = false
      const dx_djs = setInterval(() => {
        if ((this.time--) <= 0) {
          this.time = 60
          this.is_dx_yz = true
          clearInterval(dx_djs)
        }
      }, 1000)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$blue_gray: #409EFF;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .el-form-item {
      border: 1px solid rgba(221, 221, 221, 0.8);
      background: #fff;
      border-radius: 5px;
      color: #454545;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      top: 18%;
      width: 520px;
      padding: 35px 35px 15px 35px;
      margin: 0px auto;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .svg-code {
      display: flex;
      justify-content: space-between;
      .el-form-item {
        flex: 1;
      }
    }
    .login-container {
      .el-input {
        width: 65%;
      }
    }
    .svg-code-input {
      width: 260px;
    }
    .svg-code-image {
      width: 90px;
      height: 54px;
      line-height: 54px;
      text-align: center;
      color: $blue_gray;
      border-radius: 5px;
      overflow: hidden;
      margin-left: 25px;
    }
    .svg-code-border {
      border: 1px solid $blue_gray;
      cursor: pointer;
    }
    .svg-code-b {
      border: 1px solid #ddd;
      .el-input {
        width: 100% !important;
        input {
          padding: 0 15px;
        }
      }
    }
    .svg-container_login {
      font-size: 17px;
    }
    .form-item-btn {
      width:100%;
      height: 42px;
    }
  }
  .el-input {
    display: inline-block;
    width: 80%;
    height: 47px;
    background-color: #fff;
  }
</style>
