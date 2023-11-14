import axios from "axios";
import { Post } from "./interface"

export async function getPostList(page = 1, limit = 10) : Promise<Post[]>{ 
  const res = await axios.get('http://127.0.0.1:3000/post/list', {
    params: {
      page,
      limit
    }
  })

  console.log(res);

  return res.data;
}