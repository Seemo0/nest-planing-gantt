import { Injectable } from '@nestjs/common';
import { Event } from './model/event.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GranttService {
  constructor(@InjectModel(Event.name) private readonly event: Model<Event>) {}

  async getAllEvents() {
    return this.event.find().exec();
  }

  async getEventById(eventId: string) {
    return this.event.findById(eventId).exec();
  }

  async createEvent(event: Event, createdBy: number) {
    const newEvent = new this.event({ ...event, createdBy });
    return newEvent.save();
  }

  async updateEvent(eventId: string, updatedEvent: Event, updatedBy: number) {
    return this.event.findByIdAndUpdate(
      eventId,
      { ...updatedEvent, createdBy: updatedBy },
      { new: true },
    );
  }

  async deleteEvent(eventId: string) {
    return this.event.findByIdAndDelete(eventId).exec();
  }
}
