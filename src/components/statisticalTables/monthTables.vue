<!--  -->
<template>
    <div id="main" style="width: 100% ;height:400px;"></div>
</template>

<script>
export default {
    data () {
        return {};
    },

    components: {},

    computed: {},

    mounted () {
        var echarts = require("echarts");
        var myChart = echarts.init(document.getElementById("main"));
        let obj = [
            { data: [88, 48, 73, 68, 53, 47, 50] },
            { data: [70, 88, 73, 68, 53, 47, 50] },
            { data: [70, 48, 73, 88, 53, 47, 50] },
            { data: [70, 48, 73, 88, 53, 47, 50] }
        ];
        let brr = ["#d0a00e", "#eb3600", "#34da62"];
        let seriesList = [];
        obj.forEach((item, index) => {
            seriesList.push({
                type: "bar",
                data: item.data,
                itemStyle: {
                    normal: {
                        color: brr[index]
                    }
                }
            });
        });
        var option = (option = {
            backgroundColor: "#fff",
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            legend: {
                show: false
            },
            grid: {
                left: "2%",
                right: "2%",
                bottom: "0%",
                containLabel: true
            },
            xAxis: [
                {
                    type: "category",
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
                }
            ],
            yAxis: [
                {
                    type: "value",
                    name: "单位(分)",
                    position: "right",
                    axisLabel: {
                        formatter: "{value}"
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#000",
                            width: 1,
                            type: "solid"
                        }
                    },
                    splitLine: {
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(0,0,0,.1)",
                                width: 1 //这里是为了突出显示加上的
                            }
                        },
                    }
                }
            ],
            series: seriesList
        });

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },

    methods: {}
};
</script>
<style lang='scss' scoped>
</style>  