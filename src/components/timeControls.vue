<template>
    <datePicker :options="calendarArr" class="calendar" @handleClickDay="handleClickDay"
        @handlePrevMonth="handlePrevMonth" @handleNextMonth="handleNextMonth" />

</template>

<script>
import computationSheet from './statisticalTables/computationSheet'
import datePicker from "./statisticalTables/date-picker"
export default {
    name: "TimeControls",
    data () {
        return {
            calendarArr: {
                type: "combination",
                headStyle: {
                    todayBtn: "right",
                    combination: "center",
                    checkBtn: "right"
                },
                viewStyle: {
                    day: "center"
                },
                calendarData: []
            },
            computationSheet
        };
    },
    components: {
        datePicker
    },
    methods: {
        handleClickDay () { },
        handlePrevMonth () { },
        handleNextMonth () { }
    }
};
</script>

<style>
</style>
