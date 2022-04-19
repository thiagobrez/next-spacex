import { GraphQLClient } from 'graphql-request'

class GraphQLService {
  public client: GraphQLClient

  constructor() {
    this.client = new GraphQLClient(process.env.SERVER_URL as string, { headers: {} })
  }
}

export default new GraphQLService()
