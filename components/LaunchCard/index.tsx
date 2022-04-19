import { PastLaunch } from '../../utils/types'
import { useRouter } from 'next/router'

type LaunchCardProps = {
  launch: PastLaunch
}

const LaunchCard = ({ launch }: LaunchCardProps) => {
  const router = useRouter()
  const backgroundImageURL = launch.links.flickr_images[0]

  const onClickLaunch = () => {
    router.push(`/launch/${launch.id}`)
  }

  return (
    <>
      <div className="container" role="button" onClick={onClickLaunch}>
        <div className="overlay" />
        <span className="title">{launch.mission_name}</span>
      </div>

      <style jsx>{`
        .container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 400px;
          height: 250px;
          background-color: gray;
          border-radius: 12px;
          background-image: url('${backgroundImageURL}');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          overflow: hidden;
        }

        .container:hover {
          opacity: 0.8;
        }

        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
        }

        .title {
          font-weight: bold;
          font-size: 1.5rem;
          color: white;
          z-index: 5;
        }
      `}</style>
    </>
  )
}

export default LaunchCard
