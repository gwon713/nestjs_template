import { CommonModule } from '@libs/common';
import { CustomConfigService } from '@libs/common/config/config.service';
import { CustomExceptionsFilter } from '@libs/common/filter';
import { StrategyModule } from '@libs/common/strategy';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';

import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [
    CommonModule,
    ProxyModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (config: CustomConfigService) => ({
        debug: true,
        path: '/v1/graphql',
        autoSchemaFile: 'schema.gql',
        playground: config.gqlPlayGround,
        subscriptions: {
          'graphql-ws': true,
        },
      }),
      inject: [CustomConfigService],
    }),
    StrategyModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionsFilter,
    },
  ],
})
export class GatewayModule {}
