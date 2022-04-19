import { NextPage } from 'next'
import GraphQLService from '../lib/GraphQLService'
import { PAST_LAUNCHES_QUERY } from '../graphql/queries'
import { PastLaunch } from '../utils/types'
import LaunchCard from '../components/LaunchCard'
import CardList from '../components/CardList'

interface Props {
  launchesPast: PastLaunch[]
}

const IndexPage: NextPage<Props> = ({ launchesPast }) => (
  <>
    <main className="container">
      <h1 className="title">
        <span role="img" aria-label="rocket emoji">
          🚀
        </span>
        LAST 3 SPACEX LAUNCHES
        <span role="img" aria-label="rocket emoji">
          🚀
        </span>
      </h1>

      <CardList>
        {launchesPast.map((launch) => (
          <LaunchCard launch={launch} key={launch.id} />
        ))}
      </CardList>
    </main>

    <style jsx>{`
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .title {
        margin-bottom: 100px;
      }

      span[role='img'] {
        margin: 0 8px;
      }
    `}</style>
  </>
)

export async function getServerSideProps() {
  const { launchesPast } = await GraphQLService.client.request<{ launchesPast: PastLaunch[] }>(
    PAST_LAUNCHES_QUERY,
    {
      limit: 3,
    }
  )

  return {
    props: { launchesPast },
  }
}

export default IndexPage
