import { GraphQLClient } from 'graphql-request'

class GraphQLService {
  public client: GraphQLClient

  public SERVER_URL = (process.env.SERVER_URL as string) ?? 'https://api.spacex.land/graphql/'

  constructor() {
    this.client = new GraphQLClient(this.SERVER_URL, { headers: {} })
  }
}

export default new GraphQLService()
