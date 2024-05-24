<template>
    <!-- captchaLogin页面 -->
    <div class="captchaLogin">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="手机号" name="phone" :rules="[{ required: true, message: '请输入手机号！' }]" autocomplete="off">
                <a-input v-model:value="formState.phone" />
            </a-form-item>

            <a-form-item label="验证码" class="code" name="code" :rules="[{ required: true, message: '请输入验证码！' }]">
                <a-input v-model:value="formState.code" /> <a-button type="primary">发送验证码</a-button>
            </a-form-item>

            <a-form-item name="remember" :wrapper-col="{ offset: 6, span: 16 }">
                <a-checkbox v-model:checked="formState.remember">我同意</a-checkbox><span class="declaration">《相关声明》</span>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-popconfirm :title="basic.popconfirmTip" :visible="visible" ok-text="确定" @confirm="confirm"
                    @visibleChange="handleVisibleChange" :showCancel="false">
                </a-popconfirm>
                <a-button type="primary" html-type="submit">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import type { primitiveTypes } from '@/views/interface/public' // 常用TS接口引入
import { Form, FormItem, Input, Checkbox, Button, Popconfirm, message } from 'ant-design-vue'

export default defineComponent({
    name: 'captchaLogin',
    components: {
        aForm: Form,
        aFormItem: FormItem,
        aInput: Input,
        aCheckbox: Checkbox,
        aButton: Button,
        aPopconfirm: Popconfirm
    },
    setup() {
        interface FormState { // 手机号、验证码、相关事项ts验证
            phone: string | number,
            code: string | number,
            remember: boolean
        }
        let basic = reactive<primitiveTypes>({ // 常用基本变量
            popconfirmTip: '验证失败'
        })
        const visible = ref<boolean>(false) // 登录提示框显隐
        const formState = reactive<FormState>({ // 手机号、验证码、相关事项
            phone: '',
            code: '',
            remember: false,
        });
        const onFinish = (values: any) => { // 登录验证通过
            if (values.remember) {
                console.log('Success:', values);
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
.captchaLogin {
    :deep(.code .ant-form-item-control-input-content) {
        display: flex;

        .ant-btn {
            width: 150px;
            margin-left: 5px;
        }
    }

    .declaration:hover {
        color: rgb(18, 128, 231);
        cursor: pointer;
    }
}
</style>