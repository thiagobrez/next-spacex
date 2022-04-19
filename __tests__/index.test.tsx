import { render } from '@testing-library/react'
import IndexPage from '../pages'

const launchesPast = [
  {
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
  },
  {
    id: '2',
    mission_name: 'To the moon',
    launch_date_utc: '2020-10-24T15:31:00.000Z',
    rocket: { rocket_name: 'Test Rocket 2' },
    links: {
      video_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      flickr_images: [
        'https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80',
      ],
    },
  },
  {
    id: '3',
    mission_name: 'Infinity and beyond',
    launch_date_utc: '2020-10-24T15:31:00.000Z',
    rocket: { rocket_name: 'Test Rocket 3' },
    links: {
      video_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      flickr_images: [
        'https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80',
      ],
    },
  },
]

describe('IndexPage', () => {
  it('renders a heading', () => {
    const { getByText } = render(<IndexPage launchesPast={launchesPast} />)

    const heading = getByText(/last 3 spacex launches/i)

    expect(heading).toBeInTheDocument()
  })

  it('renders 3 launches', () => {
    const { getByTestId } = render(<IndexPage launchesPast={launchesPast} />)

    const cardList = getByTestId('card-list')
    const [firstCard, secondCard, thirdCard] = cardList.children

    expect(cardList.children.length).toEqual(3)
    expect(firstCard).toHaveTextContent(`${launchesPast[0].mission_name}`)
    expect(secondCard).toHaveTextContent(`${launchesPast[1].mission_name}`)
    expect(thirdCard).toHaveTextContent(`${launchesPast[2].mission_name}`)
  })
})
