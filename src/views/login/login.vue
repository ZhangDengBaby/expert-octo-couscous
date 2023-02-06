<template>
    <!-- login页面 -->
    <div class="login">
        <div class="box">
            <div class="boxTop">
                <div :class="{ handover: true, handoverPasswrod: basic.handoverPasswrod }" @click="handoverClick">
                </div>
            </div>
            <div class="boxContent">
                <div v-if="basic.handoverPasswrod">二维码登录</div>
                <a-tabs v-else v-model="basic.activeKey">
                    <a-tab-pane key="1" tab="验证码登录" style="height: 200px">
                        <captchaLogin />
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="密码登录" force-render>
                        <passwordLogin />
                    </a-tab-pane>
                </a-tabs>
            </div>
            <div class="boxBottn"></div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import type { primitiveTypes } from '@/views/interface/public' // 常用TS接口引入
import { Tabs, TabPane } from 'ant-design-vue'
import captchaLogin from "./components/captchaLogin.vue";
import passwordLogin from "./components/passwordLogin.vue";
export default defineComponent({
    name: 'Login',
    components: {
        aTabs: Tabs,
        aTabPane: TabPane,
        captchaLogin,
        passwordLogin
    },
    setup() {
        let basic = reactive<primitiveTypes>({
            activeKey: '1',
            handoverPasswrod: false
        })
        const handoverClick = () => {
            basic.handoverPasswrod = !basic.handoverPasswrod
            console.log(111, basic.handoverPasswrod);
        }
        return {
            basic,
            handoverClick
        }
    }
})
</script>

<style lang='less' scoped>
.login {
    min-width: 1100px;
    min-height: 750px;
    height: 100vh;
    position: relative;
    background: rgb(90, 88, 88);

    .box {
        position: absolute;
        right: 350px;
        top: 200px;
        width: 450px;
        height: 450px;
        background: #fff;
        border-radius: 4px;
        padding: 16px 24px;

        .boxTop {
            .handover {
                cursor: pointer;
                position: absolute;
                top: -16px;
                right: -24px;
                height: 62px;
                width: 62px;
                background: url(./img/handoverCode.png) no-repeat;
                background-size: 100%;
            }

            :deep(.handoverPasswrod) {
                background: url(./img/handoverPasswrod.png) no-repeat;
                background-size: 100%;
            }
        }
    }
}
</style>