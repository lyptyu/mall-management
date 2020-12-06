import {request} from "@/network/request"

export function postLogin(loginForm){
  return request({
    method:'post',
    url:'/login',
    data:loginForm
  })
}