import { ofetch } from "ofetch"

const {menu} = await ofetch('/api/users', {
  headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})