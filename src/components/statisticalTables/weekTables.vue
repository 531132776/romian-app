<!--  -->
<template>
    <div>
        <div id="week" style="width: 100% ;height:400px;">
        </div>
    </div>
</template>

<script>
import { rename } from "fs";
import { fail } from "assert";
export default {
    data () {
        return {};
    },

    components: {},

    computed: {},

    mounted () {
        var echarts = require("echarts");
        var myChart = echarts.init(document.getElementById("week"));

        var option = (option = {
            grid: {
                left: "2%",
                right: "2%",
                bottom: "0%",
                containLabel: true
            },
            xAxis: {
                data: [
                    "星期一",
                    "星期二",
                    "星期三",
                    "星期四",
                    "星期五",
                    "星期六",
                    "星期日"
                ],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#063374",
                        width: 1,
                        type: "solid"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#000",
                        fontSize: 8
                    }
                }
            },
            yAxis: {
                position: "right",
                name: "单位(分)",
                max: 100,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(0,0,0,.1)",
                        width: 1 //这里是为了突出显示加上的
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },
            series: [
                {
                    type: "bar",
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            barBorderRadius: [30, 30, 0, 0],
                            color: function (params) {
                                var colorList = [
                                    "#2eddc1",
                                    "#FCCE10",
                                    "#E87C25",
                                    "#27727B",
                                    "#9efdc6",
                                    "#f27C99",
                                    "#a27C99",
                                    "#27727B"
                                ];
                                return colorList[params.dataIndex];
                            },
                            label: {
                                show: false
                            }
                        }
                    },
                    data: [22, 12, 91, 34, 90, 30, 30]
                }
            ]
        });

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },

    methods: {}
};

</script>
<style lang='scss' scoped>
</style>