import { rest } from 'msw';


export const messages = [
  rest.get('api/telegram/messages', async (req, res, ctx) => {
    return res.json(

    )
  }
  )
]