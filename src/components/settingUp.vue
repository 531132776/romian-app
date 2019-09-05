<template>
    <div class="settingUp">
        <div class="text">
            <p>模式设置</p>
        </div>
        <!-- 设置 -->
        <ul class="degree">
            <li>
                <p class="schema">清洁</p>
                <p class="timing">{{timing}}</p>
                <van-icon name="arrow" />
            </li>
            <li>
                <p class="schema">美白</p>
                <p class="timing">{{timing}}</p>
                <van-icon name="arrow" />
            </li>
            <li>
                <p class="schema">抛光</p>
                <p class="timing">{{timing}}</p>
                <van-icon name="arrow" />
            </li>
            <li>
                <p class="schema">护齿</p>
                <p class="timing">{{timing}}</p>
                <van-icon name="arrow" />
            </li>
            <li>
                <p class="schema">敏感</p>
                <p class="timing">{{timing}}</p>
                <van-icon name="arrow" />
            </li>
        </ul>
        <!-- 控件 -->
        <p class="empty"></p>
        <div class="else">
            <p>其他</p>
        </div>
        <div class="splash">
            <van-switch-cell v-model="checked" title="防飞溅" />
            <p class="splashB">开启后，启动牙刷5s后才震动</p>
        </div>
        <div class="border-top">
            <div class="knowledge">
                <p>口腔知识</p>
                <van-icon name="arrow" />
            </div>
        </div>
        <p class="emptt"></p>
        <!-- 版本 -->
        <div class="versions" @click="showPopup()">
            <div>
                <p class="schema">固件版本</p>
                <p class="timing">{{updating}}</p>
                <van-icon name="arrow" />
            </div>
        </div>
        <renewalPage v-if="isShow" @aaa="clickList" />
        <div class="box" v-if="isHint">
            <div class="hint">
                <p>当前版本已是最新版本</p>
            </div>
        </div>
    </div>
</template>

<script>
import renewalPage from "../components/adjustment/renewalPage.vue";
import { Icon, Divider, SwitchCell } from "vant";
import "@/assets/css/index.scss";
export default {
    name: "settingUp",
    components: {
        "van-icon": Icon,
        "van-divider": Divider,
        "van-switch-cell": SwitchCell,
        renewalPage,
    },
    data () {
        return {
            timing: "2 分钟",
            checked: true,
            updating: "V2.0",
            isShow: false,
            isHint: false,
        };
    },
    methods: {
        //跳转更新
        showPopup () {
            this.isShow = true
        },
        clickList (msg) {
            this.isShow = false;
            if (msg == 'a') {

                this.isHint = true;
            }
        }

    },
    computed: {},
    mounted () { }
};
</script>

<style scoped lang="scss">
.settingUp {
    font-family: HWtext-55ST;
    .text {
        height: 48px;
        background: #ffffff;
        padding: 0 16px;
        p {
            font-size: 14px;
            font-weight: 600;
            color: #666666;
            line-height: 19px;
            padding-top: 20px;
        }
    }
    .degree {
        background: #ffffff;
        padding: 0 16px;
        li {
            height: 48px;
            display: flex;
            border-bottom: 1px solid #f7f7f7;
            justify-content: space-between;
            position: relative;
            p {
                color: #000;
                line-height: 48px;
            }
            .timing {
                font-size: 14px;
                margin-right: 20px;
                color: #666666;
            }
            .van-icon-arrow {
                position: absolute;
                right: 0px;
                top: 17px;
                font-size: 16px;
                color: #9d9d9d;
            }
        }
    }
    .empty {
        height: 8px;
        background: #f7f7f7;
    }
    .else {
        width: 100%;
        height: 48px;
        background: #ffffff;
        p {
            font-size: 14px;
            font-weight: 600;
            color: #666666;
            padding-top: 20px;
            padding-left: 16px;
            background: #ffffff;
        }
    }
    .splash {
        background: #ffffff;
        height: 64px;
        position: relative;
        .van-cell {
            font-size: 16px;
        }
        .splashB {
            font-size: 14px;
            color: #757575;
            position: absolute;
            top: 30px;
            left: 16px;
        }
        .van-cell:not(:last-child)::after {
            border: none;
        }
    }
    .border-top {
        padding: 0 16px;
        background: #ffffff;
        .knowledge {
            height: 48px;
            display: flex;
            border-top: 1px solid #f7f7f7;
            justify-content: space-between;
            position: relative;
            p {
                line-height: 48px;
            }
            .van-icon-arrow {
                position: absolute;
                right: 0px;
                top: 17px;
                font-size: 16px;
                color: #9d9d9d;
            }
        }
    }
    .emptt {
        height: 8px;
        background: #f7f7f7;
    }
    .versions {
        padding: 0 16px;
        background: #fff;
        div {
            height: 48px;
            display: flex;
            justify-content: space-between;
            position: relative;
            p {
                color: #000;
                line-height: 48px;
            }
            .timing {
                font-size: 14px;
                margin-right: 20px;
                color: #666666;
            }
            .van-icon-arrow {
                position: absolute;
                right: 0px;
                top: 17px;
                font-size: 16px;
                color: #9d9d9d;
            }
        }
    }
    .box {
        height: 100%;
        background: #ffffff;
        text-align: center;
        justify-content: center;
        display: flex;
        margin-top: 50px;
        .hint {
            width: 174px;
            height: 34px;
            background: rgba(217, 217, 217, 0.95);
            border-radius: 18px;
            position: relative;
            p {
                font-size: 14px;
                line-height: 34px;
            }
        }
    }
}
</style>
