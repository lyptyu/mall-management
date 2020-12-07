import {request} from "@/network/request"

export function getMenuList() {
  return request({
    method: "get",
    url: "/menus"
  })
}

export function getUserList(queryInfo) {
  return request({
    method: "get",
    url: "/users",
    params: queryInfo
  })
}

export function userStateChanged(userinfo) {
  return request({
    method: "put",
    url: `users/${userinfo.id}/state/${userinfo.mg_state}`
  })
}

export function addUser(addForm) {
  return request({
    method: "post",
    url: "/users",
    data: addForm
  })
}