<template>
    <!-- passwordLogin页面 -->
    <div class="passwordLogin">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名！' }]" autocomplete="off">
                <a-input v-model:value="formState.username" />
            </a-form-item>

            <a-form-item label="密&emsp;码" name="password" :rules="[{ required: true, message: '请输入密码！' }]">
                <a-input-password v-model:value="formState.password" />
            </a-form-item>

            <a-form-item name="remember" :wrapper-col="{ offset: 6, span: 16 }">
                <a-checkbox v-model:checked="formState.remember">我同意</a-checkbox><span class="declaration">《相关声明》</span>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-popconfirm
                :title="basic.popconfirmTip"
                :visible="visible"
                ok-text="确定"
                @confirm="confirm"
                @visibleChange="handleVisibleChange"
                :showCancel="false"
                >
                </a-popconfirm>
                <a-button type="primary" html-type="submit">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import type { primitiveTypes } from '@/views/interface/public' // 常用TS接口引入
import { get } from '@/api/index'
import { setCookie } from '@/utils/utils'
import { Form, FormItem, Input, InputPassword, Checkbox, Button, Popconfirm, message } from 'ant-design-vue'
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'passwordLogin',
    components: {
        aForm: Form,
        aFormItem: FormItem,
        aInput: Input,
        aInputPassword: InputPassword,
        aCheckbox: Checkbox,
        aButton: Button,
        aPopconfirm:Popconfirm
    },
    setup() {
        const router = useRouter()
        interface FormState { // 用户名、密码、相关事项ts验证
            username: string | number,
            password: string | number,
            remember: boolean
        }
        let basic = reactive<primitiveTypes>({ // 常用基本变量
            popconfirmTip: '验证失败'
        })
        const visible = ref<boolean>(false) // 登录提示框显隐
        const formState = reactive<FormState>({ // 用户名、密码、相关事项
            username: '',
            password: '',
            remember: false,
        });
        const onFinish = async (values: any) => { // 登录验证通过
            if (values.remember) {
                let url = `/user/sigin/${values.username}/${values.password}`
                let login = await get(url)
                console.log(1111, login);
                
                if ( login && login.status == 200) {
                    setCookie( 'login', login.data , 1)
                    router.push('/home')
                }
            } else {
                basic.popconfirmTip = '未同意相关声明'
                visible.value = true
            }
        };
        const onFinishFailed = (errorInfo: any) => { // 登录验证不通过
            console.log('Failed:', errorInfo);
        };
        const confirm = () => { // 登录提示框确定
            visible.value = false;
            message.success('Next step.');
        };
        const handleVisibleChange = (bool: boolean) => { // 登录提示框点击其他位置关闭弹窗
            if (!bool) {
                visible.value = false;
                return;
            }
        };
        return {
            formState,
            basic,
            onFinish,
            onFinishFailed,
            visible,
            confirm,
            handleVisibleChange
        };
    }
})
</script>

<style lang='less' scoped>
.passwordLogin {
    .declaration:hover{
        color: rgb(18, 128, 231);
        cursor: pointer;
    }
}
</style>