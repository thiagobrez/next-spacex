import { gql } from 'graphql-request'

export const PAST_LAUNCHES_QUERY = gql`
  query pastLaunches($limit: Int!) {
    launchesPast(limit: $limit) {
      id
      mission_name
      links {
        flickr_images
      }
    }
  }
`

export const LAUNCH_BY_ID = gql`
  query launchById($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_date_utc
      rocket {
        rocket_name
      }
      links {
        video_link
        flickr_images
      }
    }
  }
`
