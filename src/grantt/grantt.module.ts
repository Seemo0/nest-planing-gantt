import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GranttService } from './grantt.service';
import { EventsController } from './events.controller';
import { AuthService } from 'src/auth/auth.service';
import { SaveAuthorMiddleware } from './middleware/save-author.middleware';
import { EventSchema } from './model/event.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  providers: [GranttService, AuthService],
  controllers: [EventsController],
})
export class GranttModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SaveAuthorMiddleware).forRoutes('*');
  }
}
