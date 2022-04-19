import { fireEvent, render } from '@testing-library/react'
import LaunchDetailPage from '../pages/launch/[id]'

const launch = {
  id: '1',
  mission_name: 'Test mission',
  launch_date_utc: '2020-10-24T15:31:00.000Z',
  rocket: { rocket_name: 'Test Rocket 1' },
  links: {
    video_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    flickr_images: [
      'https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80',
    ],
  },
}

describe('LaunchDetailPage', () => {
  it('renders launch info', () => {
    const { getByText } = render(<LaunchDetailPage launch={launch} />)

    const formattedDate = new Date(launch.launch_date_utc).toLocaleDateString('en-US')
    const rocketName = launch.rocket.rocket_name

    const heading = getByText(launch.mission_name)
    const subtitle = getByText(`Mission launched on ${formattedDate} with rocket ${rocketName}`)

    expect(heading).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
  })

  it('renders launch initially disabled video', () => {
    const { getByTestId, queryByTestId } = render(<LaunchDetailPage launch={launch} />)

    const videoIframe = queryByTestId('video-iframe')
    const videoDisabledWrapper = getByTestId('video-disabled-wrapper')

    expect(videoIframe).not.toBeInTheDocument()
    expect(videoDisabledWrapper).toBeInTheDocument()
  })

  it('renders video after clicking', () => {
    const { getByTestId } = render(<LaunchDetailPage launch={launch} />)

    const videoDisabledWrapper = getByTestId('video-disabled-wrapper')

    fireEvent.click(videoDisabledWrapper)
    expect(videoDisabledWrapper).not.toBeInTheDocument()

    const videoIframe = getByTestId('video-iframe')
    expect(videoIframe).toBeInTheDocument()
  })
})
