import 'dotenv/config';
import { EventsService } from './persistence/Prisma.service';
import { prisma } from './persistence/Prisma.connection';
import { initApi } from './api/graphql';
import { initScheduleProcess } from './schedule.process';

(async () => {
    // Для запуска программы зависим от подключения к бд, поэтому ждем успешного подключения
    // Инициируем главный сервис в котором будет вся бизнес логика 
    // Если бы у нас было больше сущностей и бизнес логики, на этом месте скорее всего была "фабрика" которая занималась инициализацией всех сервисов
    const eventsService = new EventsService(await prisma()); 

    initApi(eventsService);
    initScheduleProcess(eventsService);
})()