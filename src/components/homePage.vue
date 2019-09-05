<template>
    <div class="homePage">
        <!-- <van-nav-bar class="nav_list" left-text="ROAMAN智能声波牙刷" left-arrow>
            <van-icon name="wap-nav" slot="right" />
    </van-nav-bar>-->
        <div class="centerBox">
            <van-notice-bar v-if="!connectType" class="notice_bar" :scrollable="false" left-icon="info-o"
                background="rgba(255,229,229,.5)" color="#FF3320">设备未连接，请点击重试</van-notice-bar>
            <div class="index_img">
                <!-- 主图 -->
                <img src="./../assets/img/index_img.png" alt />
            </div>
            <div class="connect padding_box">
                <!-- 连接状态 -->
                <div class="connect_box">
                    <div class="left">{{connectType?'已连接':'未连接'}}</div>
                    <div class="centre">
                        <p>{{dayNum}}天</p>
                        <span @click="brush()">涮头可用 ></span>
                    </div>
                    <div class="right">
                        <p>{{percentage}}%</p>
                    </div>
                </div>
            </div>
            <div class="settingUp commonality">
                <!-- 设置模块 -->
                <div class="settingUp_top">
                    <p class="theset">刷牙设置</p>
                    <p @click="settingUpRoute" class="even">
                        更多
                        <van-icon name="arrow" />
                    </p>
                </div>
                <ul>
                    <li class="right_border">
                        清洁
                        <p>模式</p>
                    </li>
                    <li class="right_border">
                        {{time()}}
                        <p>时长</p>
                    </li>
                    <li>
                        {{strength[0]}}
                        <p>强度</p>
                    </li>
                    <li>
                        <span>
                            <van-icon name="exchange" />
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="record_padding">
            <div class="record_top">
                <p class="log">记录</p>
                <p @click="DetailsPage()" class="moret">更多</p>
                <van-icon name="arrow" />
            </div>
        </div>
        <computationSheet />

        <renewalPage v-show="tier" @aaa="tier = false" />
    </div>
</template>

<script>
import renewalPage from "../components/adjustment/renewalPage.vue";
import { NavBar, Icon, NoticeBar } from "vant";
import "@/assets/css/index.scss";
import https from "../https.js";
import computationSheet from "./statisticalTables/computationSheet";
import { Dialog } from 'vant';
export default {
    components: {
        vanNavBar: NavBar,
        "van-icon": Icon,
        "van-notice-bar": NoticeBar,
        renewalPage,
        computationSheet,
        [Dialog.Component.name]: Dialog.Component
    },
    name: "homePage",
    data () {
        return {
            connectType: false,
            dayNum: 90,
            percentage: 85,
            strength: ["低", "中", "高"],
            tier: false,
            versionNumber: "",
            getCurrentRegisteredDevice:{},
        };
    },
    computed: {
        changebleNum () {
            return this.$store.state.changebleNum;
        }
    },
     mounted () {
         //获取当前页面被选中的未注册的设备。
        // this.getdevice();
        //获取蓝牙状态
        this.getBluetoothAdapterState();
        //获取已注册的设备
        this.getRegistered();
        //监听蓝牙状态
        this.watchBleState();
        //监听寻找新设备
        this.getWatchBle();
        this.sechaBle();
        // this.$axios
        //     .get("/api/playlist/catlist")
        //     .then(response => {
        //         console.log("this.base.tokenthis.base.token", response);
        //     })
        //     .catch(response => {
        //         console.log(response);
        //     });

        this.$store.dispatch("getNewNum", 1);
        let nums = this.$store.state.changebleNum;
        // if (nums === 1) {
        //   this.tier = true;
        // }
    },
    
    methods: {
        time () {
            return "2分19秒";
        },
        settingUpRoute () {
            this.$router.push("/settingUp");
        },
        vuexState () {
            this.$store.dispatch("getNewNum", 6); //6要变化的实参
        },
        DetailsPage () {
            this.$router.push("/timeControls");
        },
        brush(){
            this.$router.push("/brushHead");
            console.log('1')
        },
        //获取当前页面被选中的未注册的设备。
        getdevice(){
            window.hilink.getCurrentUnregisteredDevice('getCurrentUnregisteredDeviceReluts');
            window.getCurrentUnregisteredDeviceReluts = (res) =>{
                // console.log(JSON.parse(res))
                let obj = JSON.parse(res)
                this.$set(this,'getCurrentRegisteredDevice',JSON.parse(res))
                // this.$store.commit('getDevice',obj)
                console.log(obj.localName,'111')
                let fwv = '1.0';
                let hwv = "1.0";
                //将蓝牙信息下发到底层，通知底层在IOT云端注册蓝牙设备。
                window.hilink.registerBleDevice(obj.localName, fwv, hwv, 'registerBleDeviceRe');
                window.registerBleDeviceRe = (res) =>{
                    // console.log(res,'注册回调');
                    let _bleStatus = JSON.parse(res);
                }
                
            }

        },
        
        //获取蓝牙状态
        getBluetoothAdapterState(){
            window.hilink.getBluetoothAdapterState('getBleStateRe');
            window.getBleStateRe = (res) =>{
                console.log(res,'蓝牙状态');
                let _status = JSON.parse(res)
                if(_status.errCode == 0){
                    if(this.isiOS){
                        Dialog.confirm({
                            title: '蓝牙',
                            message: 'ios用户请手动打开蓝牙'
                            }).then(() => {
                            // on confirm
                                window.hilink.openBluetoothAdapter();
                            }).catch(() => {
                            // on cancel
                        });
                    }else{
                        console.log('安卓')
                    }
                    

                }
            }
        },
        //监听蓝牙
        watchBleState(){
            window.hilink.onBluetoothAdapterStateChange('onBluetoothAdapterStateChangeReq');
            window.onBluetoothAdapterStateChangeReq = (res) =>{
                // console.log(res,'监听蓝牙状态')
                let _bleS = JSON.parse(res);
                if(_bleS.available == true){
                    console.log('蓝牙已打开')
                }else{
                    console.log('蓝牙已关闭')
                }
            }
        },
        //获取宫格页面中选择的已注册的设备
        getRegistered(){
            window.hilink.getCurrentRegisteredDevice('getCurrentRegisteredDeviceReq');
            window.getCurrentRegisteredDeviceReq = (res) =>{
                let _registered = JSON.parse(res);
                console.log(_registered,'已注册的设备回调');
                let _deviceId = _registered.deviceId;
            }
        },
        //监听寻找到新设备的事件
        getWatchBle(){
            window.hilink.onBluetoothDeviceFound('onBluetoothDeviceFoundReq');
            window.onBluetoothDeviceFoundReq = (res) =>{
                console.log('寻找到新设备');
            }
        },
        //搜索蓝牙
        sechaBle(){
            let service = [];
            let allowDuplicatesKey = 'true';
            let interval = '0';
            window.hilink.startBluetoothDevicesDiscovery(service,allowDuplicatesKey,interval);
            
        }
    },
   
};
</script>
<style scoped lang="scss">
.homePage {
    font-size: 12px;
    height: 100%;
    background: #f7f7f7;
    .padding_box {
        padding: 0 20px;
    }
    .notice_bar {
        font-size: 16px;
    }
    .index_img {
        height: 275px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .connect_box {
        height: 88px;
        margin: 10px 0;
        background: #ffffff;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.03);
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        .left,
        .right {
            width: 110px;
            font-size: 18px;
            font-weight: 550;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .centre {
            width: 100px;
            text-align: center;
            p {
                font-size: 24px;
                font-weight: bold;
                margin-top: 16px;
                line-height: 40px;
            }
            span {
                font-size: 12px;
                display: inherit;
            }
        }
    }
    .commonality {
        padding: 10px 20px 0;
        border-radius: 6px;
        .settingUp_top {
            background: #fff;
            padding: 0 25px;
            font-size: 14px;
            height: 48px;
            color: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: space-between;
            position: relative;
            .theset {
                font-size: 14px;
                font-weight: 600;
                color: #666666;
                line-height: 19px;
                padding-top: 20px;
            }
            .even {
                font-size: 14px;
                color: #666666;
                line-height: 19px;
                padding-top: 20px;
                padding-right: 20px;
            }
            .van-icon-arrow {
                position: absolute;
                right: 26px;
                top: 22px;
                font-size: 16px;
                color: #9d9d9d;
            }
        }
    }

    .settingUp {
        height: 122px;
        margin-bottom: 10px;
        ul {
            background: #fff;
            height: 84px;
            display: flex;
            align-items: center;
            li {
                font-size: 16px;
                font-weight: 550;
                width: 25%;
                text-align: center;
                p {
                    font-size: 12px;
                    opacity: 0.6;
                }
                span {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    line-height: 36px;
                    background: rgba(0, 0, 0, 0.05);
                    margin-right: 10px;
                    .van-icon.van-icon-exchange {
                        line-height: 43px;
                        font-size: 25px;
                    }
                }
            }
            .right_border {
                border-right: 1px solid rgb(207, 200, 200);
            }
        }
    }
    .record_padding {
        padding: 10px 20px 0;
        .record_top {
            background: #fff;
            padding: 0 25px;
            font-size: 14px;
            line-height: 38px;
            height: 48px;
            color: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: space-between;
            position: relative;
            .log {
                font-size: 14px;
                font-weight: 600;
                color: #666666;
                line-height: 19px;
                padding-top: 20px;
            }
            .moret {
                font-size: 14px;
                color: #666666;
                line-height: 19px;
                padding-top: 20px;
                padding-right: 20px;
            }
            .van-icon-arrow {
                position: absolute;
                right: 26px;
                top: 22px;
                font-size: 16px;
                color: #9d9d9d;
            }
        }
    }
}
</style>
