<!--  -->
<template>
    <div class="renewalPage">
        <van-popup v-model="show" position="bottom">
            <div class="renewalPage_chief">
                <h2>发现新版本</h2>
                <p>版本 {{versionNumbers}}</p>
                <ul class="sorf">
                    <li v-for="(item,index) in catalogue" :key="index" class="sorf_tow">{{index+1}}.{{item.introduce}}
                    </li>
                </ul>
                <p>*请确认设备电量多余20%</p>
                <div class="renewalPage_affirm">
                    <p @click="returnPage()">以后再说</p>
                    <p class="wire"></p>
                    <p @click="aa()">立即更新</p>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="lodg" position="bottom" class="toLodg">
            <p>正在加载...</p>
            <van-loading class="ding" />
        </van-popup>
        <van-popup v-model="progress" position="bottom" class="progress">
            sss
            <van-progress :percentage="50" />
        </van-popup>
    </div>
</template>
 
<script>
import { Popup, Loading, Progress } from "vant";
export default {
    name: "renewalPage",
    data () {
        return {
            catalogue: [{ introduce: "优化" }, { introduce: "修复" }],
            show: true,
            versionNumber: "",
            versionNumbers: "",
            lodg: false,
            progress: true
        };
    },

    components: {
        vanPopup: Popup,
        vanLoading: Loading,
        vanProgress: Progress
    },

    computed: {},

    mounted () {
        let versionNumber = "V2.2";
        let versionNumbers = "V2.2";
        if (versionNumber == versionNumbers) {
            this.show = true;
            this.$emit("aaa", "a");
        } else {
            this.show = false;
        }

        this.versionNumbers = versionNumbers;
    },

    methods: {
        returnPage () {
            this.$emit("aaa", "b");
        },
        aa () {
            this.lodg = true;
            setTimeout(() => {

                this.lodg = false;
                this.progress = true;
                console.log(this.lodg);

            }, 3000);
        }
    }
};
</script>
<style lang='scss' scoped>
//弹出更新层
.van-popup--bottom {
    bottom: 15px;
    width: 92%;
    border-radius: 15px;
    margin: 0 15px;
    .renewalPage_chief {
        border-radius: 20px;
        background: #fff;
        padding: 0 24px;
        h2 {
            font-size: 20px;
            font-weight: 600;
            line-height: 56px;
        }
        p {
            font-size: 16px;
            line-height: 32px;
        }
        .sorf {
            .sorf_tow {
                font-size: 16px;
            }
        }
        .renewalPage_affirm {
            display: flex;
            justify-content: space-around;
            .wire {
                display: inline-block;
                width: 1px;
                height: 24px;
                background: rgba(0, 0, 0, 0.2);
                margin: 16px 0;
            }
            p {
                line-height: 56px;
                color: #007dff;
            }
        }
    }
}
.toLodg {
    display: flex;
    justify-content: space-between;
    height: 96px;
    p {
        padding-left: 24px;
        line-height: 96px;
    }
    .ding {
        padding-right: 24px;
        line-height: 96px;
    }
    .Progress {
        height: 112px;
    }
}
</style>