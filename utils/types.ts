export type Launch = {
  id: string
  mission_name: string
  launch_date_utc: string
  rocket: { rocket_name: string }
  links: {
    video_link: string
    flickr_images: string[]
  }
}

export type PastLaunch = Pick<Launch, 'id' | 'mission_name' | 'links'>
