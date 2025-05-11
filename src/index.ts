import { FastifyInstance } from 'fastify';
import { ApolloServer, BaseContext } from '@apollo/server';
import { apollo } from '@server/Apollo/ApolloServer';
import { fastify } from '@server/Fastify/FastifyInstance';
import { startStandaloneServer } from '@apollo/server/standalone';
import { redis } from '@api/Redis';

class Application {
  constructor(
    private readonly iApolloServer: ApolloServer<BaseContext>,
    private readonly iFastifyServer: FastifyInstance
  ) {}

  async run() {
    try {
      await startStandaloneServer(this.iApolloServer, {
        listen: {
          port: Number(process.env.GRAPHQL_PORT),
          host: process.env.GRAPHQL_HOST
        }
      })
      await this.iFastifyServer.listen({
        port: Number(process.env.REST_PORT),
        host: process.env.REST_HOST,
      });

      console.log(`Server is running on http://localhost:${process.env.REST_PORT}`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

const application: Application = new Application(apollo, fastify);
(async () => {
  await application.run();
  const members = await redis.sMembers('branded-cars:a6cd65c2-7fe0-43f4-8050-badef3afa8ce');
  console.log(members);
})();
