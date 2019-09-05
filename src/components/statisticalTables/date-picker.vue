<template>
    <div class="tab">
        <van-tabs v-model="activeName">
            <van-tab title="日" name="a">
                <div class="cc-calendar">
                    <div class="calendarRecord">
                        <calendarHeader :headOptions="headOptions" @handlePrevMonth="handlePrevMonth"
                            @handleNextMonth="handleNextMonth" @handleToday="handleToday" />
                        <ul class="calendar-week clear">
                            <li v-for="(item, index) in calendarTitleArr" :key="index" class="week-item">{{item}}</li>
                        </ul>
                        <ul class="calendar-view clear">
                            <li v-for="(item, index) in visibleCalendar" :key="index" class="date-view" :class="[
                                {'month-class': !isCurrentMonth(item.date)},
                                {todayBg: isCurrentDay(item.date)},
                                {handleDay: item.clickDay}
                                ]" @click="handleClickDay(item)">
                                <span class="date-day" :style="dayStyle"
                                    :class="[{'opacity-class': !isCurrentMonth(item.date)}]">{{item.day}}</span>
                                <p v-if="item.msg" class="day_List"></p>
                            </li>
                        </ul>
                        <van-icon name="ellipsis" @click="OpenDirectory()" />
                    </div>
                </div>
                <computationSheet v-if="activeName=='a'" />
            </van-tab>
            <van-tab title="周" name="b">
                <WeekTables v-if="activeName=='b'" />
            </van-tab>
            <van-tab title="月" name="c">
                <monthTables v-if="activeName=='c'" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
//import "@/assets/css/reset.min.css";
import calendarHeader from "./canlendar-head.vue";
import * as utils from "../../assets/js/utils";
import { Icon, Tab, Tabs } from "vant";
import MonthTables from "./monthTables";
import WeekTables from "./weekTables";
import ComputationSheet from "./computationSheet";

export default {
    name: "cc-calendar",
    componentName: "cc-calendar",
    props: {
        options: Object
    },
    components: {
        calendarHeader,
        "van-icon": Icon,
        vanTab: Tab,
        vanTabs: Tabs,
        MonthTables,
        ComputationSheet,
        WeekTables
    },
    data () {
        let { year, month, day } = utils.getNewDate(new Date());
        return {
            headOptions: {
                type: this.options.type,
                style: this.options.headStyle,
                date: ""
            },
            activeName: "a",
            calendarTitleArr: [
                "周一",
                "周二",
                "周三",
                "周四",
                "周五",
                "周六",
                "周日 "
            ],
            time: { year, month, day },
            calendarList: []
        };
    },
    computed: {
        dayStyle: function () {
            return {
                textAlign: this.options.viewStyle.day
            };
        },
        visibleCalendar () {
            //空数组
            let calendatArr = [];
            let { year, month, day } = utils.getNewDate(
                utils.getDate(this.time.year, this.time.month, 1)
            );

            let currentFirstDay = utils.getDate(year, month, 1);

            // 获取当前月第一天星期几
            let weekDay = currentFirstDay.getDay();
            let startTime = currentFirstDay - (weekDay - 1) * 24 * 60 * 60 * 1000;

            let monthDayNum;
            if (weekDay == 5 || weekDay == 6) {
                monthDayNum = 42;
            } else {
                monthDayNum = 35;
            }

            for (let i = 0; i < monthDayNum; i++) {
                calendatArr.push({
                    date: new Date(startTime + i * 24 * 60 * 60 * 1000),
                    year: year,
                    month: month + 1,
                    day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
                    clickDay: false
                });
            }
            let arr = [2, 6, 9];
            this.headOptions.date = `${utils.englishMonth(month)} ${year}`;
            calendatArr.forEach((item, index) => {
                arr.forEach(items => {
                    if (item.day == items) {
                        calendatArr[index].msg = "daYlist";
                    }
                });
            });
            // console.log(calendatArr);
            return calendatArr;
        }
    },
    methods: {
        // 是否是当前月
        isCurrentMonth (date) {
            let { year: currentYear, month: currentMonth } = utils.getNewDate(
                utils.getDate(this.time.year, this.time.month, 1)
            );
            let { year, month } = utils.getNewDate(date);
            return currentYear == year && currentMonth == month;
        },
        // 是否是今天
        isCurrentDay (date) {
            let {
                year: currentYear,
                month: currentMonth,
                day: currentDay
            } = utils.getNewDate(new Date());
            let { year, month, day } = utils.getNewDate(date);
            return currentYear == year && currentMonth == month && currentDay == day;
        },
        // 上一个月
        handlePrevMonth () {
            let prevMonth = utils.getDate(this.time.year, this.time.month, 1);
            prevMonth.setMonth(prevMonth.getMonth() - 1);
            this.time = utils.getNewDate(prevMonth);
            this.headOptions.date = `${utils.englishMonth(this.time.month)} ${
                this.time.year
                }`;
            this.$emit("handlePrevMonth");
        },
        // 下一个月
        handleNextMonth () {
            let nextMonth = utils.getDate(this.time.year, this.time.month, 1);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            this.time = utils.getNewDate(nextMonth);
            this.headOptions.date = `${utils.englishMonth(this.time.month)} ${
                this.time.year
                }`;
            this.$emit("handleNextMonth");
        },
        // 点击回到今天
        handleToday () {
            this.time = utils.getNewDate(new Date());
            this.returnDate();
            this.$emit("handleToday");
        },
        // 点击某一天
        handleClickDay (item) {
            this.$forceUpdate();
            this.$emit("handleClickDay", item);
            this.calendarList.map(x => {
                x.clickDay = false;
            });
            this.$set(item, "clickDay", true);
        },
        OpenDirectory () {
            console.log("1");
        }
    },
    created () {
        this.calendarList = this.visibleCalendar;
        this.calendarType = this.options.calendarType;
    }
};
</script>

<style lang="scss">
.tab {
    .van-hairline--top-bottom::after,
    .van-hairline-unset--top-bottom::after {
        border: none;
    }
    .van-tabs__wrap.van-hairline--top-bottom {
        justify-content: center;
        display: flex;
        //
        .van-tab--active {
            color: #007dff;
        }
        .van-ellipsis {
            padding: 0 20px;
            font-size: 16px;
            font-weight: 600;
        }
        .van-tabs__line {
            background-color: #007dff;
            padding: 0 10px;
        }
    }

    .cc-calendar {
        padding: 5px;
        .calendarRecord {
            // padding: 23px 30px 30px;
            width: 100%;
            height: 100%;
            background: #fff;
            box-sizing: border-box;
            border: 1px solid #b2b2b2;
            border-radius: 10px;
            margin-top: 10px;
            .calendar-week {
                width: 100%;
                height: 46px;
                line-height: 46px;
                .week-item {
                    float: left;
                    width: 14.285%;
                    text-align: center;
                    font-size: 14px;
                    color: #424953;
                    // border-right: 1px solid #e4e7ea;
                    font-weight: 600;
                }
            }
            .calendar-view {
                width: 100%;
                // border-left: 1px solid #e4e7ea;
                .date-view {
                    float: left;
                    position: relative;
                    width: 14.285%;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .day_List {
                        position: absolute;
                        bottom: 5px;
                        width: 5px;
                        height: 5px;
                        background: #007dff;
                        border-radius: 50%;
                    }
                    cursor: pointer;
                    .date-day {
                        font-size: 14px;
                        color: #717e92;
                    }
                    .calendar-num {
                        margin-top: 6px;
                        display: block;
                        width: 100%;
                        text-align: center;
                        font-size: 30px;
                        color: #424953;
                    }
                }
                .opacity-class {
                    opacity: 0.5;
                }
                .month-class {
                    color: rgb(187, 183, 183);
                }
                .todayBg {
                    background: #fff;
                    .date-day {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        border: 1px solid #2061ff;
                        text-align: center;
                        line-height: 40px;
                        color: #829fe7;
                    }
                }
                .handleDay {
                    // background: #2061ff !important;
                    .date-day {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 40px;
                        background: #007dff;
                    }
                    .date-day {
                        color: #bccfff !important;
                    }
                    .calendar-num {
                        color: #fff !important;
                    }
                }
            }
            .van-icon-ellipsis {
                font-size: 16px;
                margin-left: 48%;
                margin-top: 5px;
            }
        }
    }
}
</style>