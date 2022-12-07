import { EntitySubscriberInterface, InsertEvent, QueryFailedError, UpdateEvent } from "typeorm";
import { User } from "../entities/User";

export class ValidationError extends QueryFailedError implements EntitySubscriberInterface<User>{
    constructor(query: string, parameters: any[] | undefined, driverError: any) {
        super(query, parameters, driverError);
    }

    beforeInsert(event: InsertEvent<any>) {
        console.log(`BEFORE POST INSERTED: `, event.entity)
    }

    beforeUpdate(event: UpdateEvent<any>) {
        console.log(`BEFORE ENTITY UPDATED: `, event.entity)
    }
}