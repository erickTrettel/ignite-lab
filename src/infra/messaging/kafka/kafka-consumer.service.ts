import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['fast-sunbeam-10936-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'ZmFzdC1zdW5iZWFtLTEwOTM2JI_yJ9gJv0n60ROhWeXqmiYk59ngwLwKfDFzm68',
          password: String(process.env.KAFKA_BROKER_PASSWORD),
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
