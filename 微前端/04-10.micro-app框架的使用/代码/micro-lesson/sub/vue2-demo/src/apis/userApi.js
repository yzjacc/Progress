import axios from 'axios'
import { MICRO_HOST } from './config'
export async function getUsers(page = 1, limit = 10) { 
  let resp = await axios(MICRO_HOST + "/api/users/list", {
    params: {
      page,
      limit
    }
  })
  return resp.data
}