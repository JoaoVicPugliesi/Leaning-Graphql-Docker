import { ApolloServer, BaseContext } from '@apollo/server';
import { typeDefs } from './TypeDefs';
import { resolvers } from './Resolvers';

export class Apollo {
  constructor(
    private readonly server: ApolloServer<BaseContext>
  ) {}

  accessApollo(): ApolloServer {
    return this.server;
  }
}


const apolloServer = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers
})

const apolloInstance = new Apollo(apolloServer);
const apollo: ApolloServer<BaseContext> = apolloInstance.accessApollo();

export { apollo };