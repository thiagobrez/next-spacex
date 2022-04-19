import { PastLaunch } from '../../utils/types'
import { useState } from 'react'

type VideoPlayerProps = {
  launch: PastLaunch
}

const VideoPlayer = ({ launch }: VideoPlayerProps) => {
  const [playingVideo, setPlayingVideo] = useState(false)
  const backgroundImageURL = launch.links.flickr_images[0]

  const sanitizeURL = (url: string) => {
    // The API exposes 2 types of youtube URLs:
    // - Full URL with querystring: https://www.youtube.com/watch?v=vsDknmK30C0
    //   - Sometimes includes `&feature`
    // - Shortened URL: https://youtu.be/J442-ti-Dhg

    const isFullURL = url.startsWith('https://www')
    let newURL = 'https://www.youtube.com/embed'
    let videoId = ''

    if (isFullURL) {
      const fullURLWithoutFeatureQuery = url.substring(0, url.indexOf('&feature'))
      videoId = fullURLWithoutFeatureQuery.substring(
        fullURLWithoutFeatureQuery.indexOf('?v=') + 3,
        fullURLWithoutFeatureQuery.length
      )
    } else {
      videoId = url.substring(url.lastIndexOf('/') + 1, url.length)
    }

    newURL = `${newURL}/${videoId}?autoplay=1&mute=1`
    return newURL
  }

  const onClickLaunch = () => {
    setPlayingVideo(true)
  }

  return (
    <>
      <div className="container" role="button" onClick={onClickLaunch}>
        {playingVideo ? (
          <iframe src={sanitizeURL(launch.links.video_link)} width="700" height="400" />
        ) : (
          <div className="videoWrapper">
            <div className="overlay" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="playButton"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          width: 700px;
          height: 400px;
          background-color: gray;
          border-radius: 12px;
          background-image: url('${backgroundImageURL}');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          overflow: hidden;
        }

        .videoWrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .videoWrapper:hover {
          opacity: 0.8;
        }

        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
        }

        .playButton {
          width: 128px;
          height: 128px;
          color: white;
          z-index: 2;
        }
      `}</style>
    </>
  )
}

export default VideoPlayer
