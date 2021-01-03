<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" class="login-box">
            <h3 class="login-title">欢迎登录</h3>
            <el-form-item label="账号" prop="user">
                <el-input placeholder="请输入账号名称" v-model="form.user">
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input placeholder="请输入账号密码" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            form: {
                user: '',
                password: ''
            },
            rules: {
                user: [
                    { required: true, message: '请输入登录用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$router.push("/main");
                } else {
                    this.$message({
                        message: '请输入正确的用户名和密码!',
                        type: 'warning'
                    });
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .login-box {
        width: 350px;
        margin: 230px auto;
        border: 1px solid #DCDFE6;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 30px #DCDFE6;
    }
    .login-title {
        text-align: center;
    }
</style>