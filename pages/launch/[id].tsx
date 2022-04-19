import { GetServerSideProps, NextPage } from 'next'
import GraphQLService from '../../lib/GraphQLService'
import { LAUNCH_BY_ID } from '../../graphql/queries'
import { Launch } from '../../utils/types'
import VideoPlayer from '../../components/VideoPlayer'

interface Props {
  launch: Launch
}

const LaunchDetailPage: NextPage<Props> = ({ launch }: Props) => (
  <>
    <main className="container">
      <h1 className="title">{launch.mission_name}</h1>

      <span className="subtitle">
        Mission launched on {new Date(launch.launch_date_utc).toLocaleDateString('en-US')} with
        rocket {launch.rocket.rocket_name}
      </span>

      <div className="videoWrapper">
        <VideoPlayer launch={launch} />
      </div>
    </main>

    <style jsx>{`
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .title {
      }

      .subtitle {
        font-size: 24px;
      }

      .videoWrapper {
        margin-top: 48px;
      }
    `}</style>
  </>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params) {
    const id = context.params.id

    const { launch } = await GraphQLService.client.request<{ launch: Launch }>(LAUNCH_BY_ID, {
      id,
    })

    if (!launch) {
      return {
        redirect: {
          destination: '/',
        },
      }
    }

    return {
      props: {
        launch,
      },
    }
  } else {
    return {
      redirect: {
        destination: '/',
      },
    }
  }
}

export default LaunchDetailPage
