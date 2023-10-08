export default {
    calendar: {
        url: process.env.CALENDAR_URL,
        updatingCronStr: process.env.UPDATING_CRON_STR || '*/5 * * * *'
    }
}