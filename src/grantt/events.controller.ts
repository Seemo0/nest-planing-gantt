import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  Body,
  NotFoundException,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GranttService } from './grantt.service';
import { Event } from './model/event.model';
import { AuthService } from '../auth/auth.service';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(
    private readonly granttService: GranttService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getAllEvents() {
    return this.granttService.getAllEvents();
  }

  @Get(':id')
  geteventById(@Param('id') id: string) {
    return this.granttService.getEventById(id);
  }

  @Post('create')
  createEvent(@Body() event: Event) {
    console.log('Received Event:', event); 
    if (!event.title || !event.start || !event.end) {
      throw new BadRequestException('Missing required fields (title, start, end)');
    }
    return this.granttService.createEvent(event);
  }

  @Put(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() event: Event,
    @Request() req: any,
  ) {
    const updatedBy = req['userId'];
    const updatedEvent = this.granttService.updateEvent(id, event, updatedBy);

    if (!updatedEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return updatedEvent;
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.granttService.deleteEvent(id);
  }
}
