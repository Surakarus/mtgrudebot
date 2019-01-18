import {Event} from "../entity/Event";

export class EventService {

    async findEvent(id: string) {
        return await Event.findOne({where: {id: id}});
    }

    async addEvent(event: Event) {
        return await Event.save(event);
    }

}