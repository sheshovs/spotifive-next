// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: `John Doe` })
}

export const API = {
  getUser: async (data: { access_token: string; token_type: string }) => {
    try {
      const res = await axios.get(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: `${data.token_type} ${data.access_token}`,
        },
      })

      if (res.status === 200) {
        return res.data
      }
    } catch (error) {
      console.log(error)
      return {}
    }
  },
  getTopArtists: async (data: { access_token: string; token_type: string }) => {
    try {
      const res = await axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
        headers: {
          Authorization: `${data.token_type} ${data.access_token}`,
        },
        params: {
          limit: 5,
          time_range: `medium_term`,
        },
      })

      if (res.status === 200) {
        return res.data.items
      }
    } catch (error) {
      console.log(error)
      return []
    }
  },
}
