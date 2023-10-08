import { Event } from "@prisma/client";

export class EventEntity implements Event {
    id: string

    createdAt: Date;

    startedAt: Date;

    endedAt: Date;

    lastModifiedAt: Date;

    timestamp: Date;
}