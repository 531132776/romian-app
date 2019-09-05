<!--  -->
<template>
    <div>
        <div class="record commonality">
            <!-- 设置模块 -->

            <div class="title">今日&nbsp {{week}}</div>
            <ul>
                <li v-for="(item,index) in recordList" :key="index">
                    <div class="record_left"
                        :class="{record_low:(item.grade<60),record_excellence:(item.grade>80),record_medium:(item.grade<80 && item.grade>60)}">
                        {{item.grade}}</div>
                    <div class="record_right">
                        <p>刷牙时长&nbsp{{item.time}}</p>
                        <p>{{item.timeDate}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            recordList: [
                { grade: 88, time: "2分12秒", timeDate: "20:00:55" },
                { grade: 76, time: "1分12秒", timeDate: "16:00:55" },
                { grade: 58, time: "0分12秒", timeDate: "19:00:55" }
            ],
            week: "星期二",
        };
    },

    components: {},

    computed: {},

    mounted () { },

    methods: {

    }
};
</script>
<style lang='scss' scoped>
.commonality {
    padding: 0 20px;
    border-radius: 6px;
}
.record {
    .title {
        background: #fff;
        padding: 0 25px;
        font-size: 16px;
        line-height: 36px;
        padding-top: 12px;
        font-weight: 600;
        color: #666666;
    }
    ul {
        background: #fff;
        li {
            height: 64px;
            display: flex;
            align-items: center;
            .record_left {
                width: 40px;
                height: 40px;
                background: #3ccba0;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 15px;
                color: #fff;
                margin: 0 20px 0 25px;
            }
            .record_low {
                background: #ffaa2e;
            }
            .record_excellence {
                background: #2eb9f1;
            }
            .record_medium {
                background: #3ccba0;
            }
            .record_right {
                p {
                    line-height: 20px;
                }
                p:nth-child(1) {
                    font-size: 16px;
                }
                p:nth-child(2) {
                    font-size: 14px;
                    opacity: 0.6;
                }
            }
        }
    }
}
</style>