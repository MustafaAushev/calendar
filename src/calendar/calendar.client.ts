import { format, parse } from "date-fns";
import needle = require("needle")
import config from "../config";

if (!config.calendar.url) {
    throw new Error('Calendar url is undefined');
}

export const getEvents = async () => {
    const {body} = await needle('get', config.calendar.url!);
    const events = (body as string).split('BEGIN:VEVENT\r\n').slice(1);
    // Валидацию опустил намеренно для упрощения - так как в текущем условии кажется что есть гарантия на предоставляемый формат данных, плюс источник всего один
    return events.map((eventStr: string) => {
        // Кажется что такая обработка могла бы быть в бизнес логике а не в модуле с интеграцией стороннего сервиса. В целом я не вижу в этом проблемы учитывая, что данный парсинг актуален исключительно для данного куска сервиса.
        // Можно вынести в сервис EventsService, можно создать отдельный метод который будет отвечать за единственную задачу - парсинг сырых данных в entity с которой работает EventsService
        const event = eventStr.split('\r\n');
        const id = event[1].replace('UID:', ''); 
        console.log(id)
        return {
            id,
            timestamp: parse(event[0].replace('DTSTAMP:', '').replace('T', '').replace('Z', ''), 'yyyyMMddHHmmss', new Date()),
            startedAt: parse(event[2].replace('DTSTART:', '').replace('T', ''), 'yyyyMMddHHmmss', new Date()),
            endedAt: parse(event[3].replace('DTEND:', '').replace('T', ''), 'yyyyMMddHHmmss', new Date()),
            createdAt: parse(event[4].replace('CREATED:', '').replace('T', '').replace('Z', ''), 'yyyyMMddHHmmss', new Date()),
            lastModifiedAt: parse(event[5].replace('LAST-MODIFIED:', '').replace('T', '').replace('Z', ''), 'yyyyMMddHHmmss', new Date()),
        }
    })
}