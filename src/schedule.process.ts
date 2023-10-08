import { getEvents } from "./calendar/calendar.client";
import * as schedule from 'node-schedule';
import { EventsService } from "./persistence/Prisma.service";
import config from "./config";

export const initScheduleProcess = (eventsService: EventsService) => {
    schedule.scheduleJob('sync events', config.calendar.updatingCronStr, async () => {
        try {
            console.log('Process running...')

            const events = await getEvents();
            await eventsService.upsertEvents(events);
            
            console.log('Process completed')
        } catch (err) {
            console.error(err);
        }
    });
}