import request from '@/utils/request'
import { addGetQuery } from '@/utils/utils'

export async function query() {
  return request('/api/users')
}

/*
name: 'Serati Ma',
avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
userid: '00000001',
email: 'antdesign@alipay.com',
signature: '海纳百川，有容乃大',
title: '交互专家',
group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
 */
export async function queryCurrent() {
  return request('/api/currentUser')
}

export async function queryNotices() {
  return request('/api/notices')
}






// backend
export async function register(params) {
  return request('/api/user/auth/register', {
    method: 'POST',
    data: params,
  })
}

export async function login(params) {
  // 转换login参数
  return request('/api/user/auth/login', {
    method: 'POST',
    data: {
      username: params["userName"],
      ...params
    },
  })
}

export async function guest_login() {
  // 转换login参数
  return request('/api/user/auth/guest_login', {
    method: 'POST',
  })
}


export async function logout() {
  return request('/api/user/auth/logout', {
    method: 'GET',
  })
}

// 重置密码
export async function resetPassword(params) {
  return request('/api/user/auth/reset_password', {
    method: 'POST',
    data: params,
  })
}



export async function add_user(params) {
  return request('/api/user/users', {
    method: 'POST',
    data: params,
  })
}

export async function get_users(params) {
  let query = '/api/user/users'
  if(params){
    query += '?'
    if(params.is_active!==undefined){
      query += `&is_active=${params.is_active}`
    }
    if(params.username!==undefined){
      query += `&username=${params.username}`
    }
    if(params.nickname!==undefined){
      query += `&nickname=${params.nickname}`
    }
  }
  query = addGetQuery(params, query)
  return request(query, {
    method: 'GET',
  })
}

export async function get_user(params) {
  const user_id = params.user_id
  return request(`/api/user/users/${user_id}`, {
    method: 'GET',
  })
}

export async function update_user(params) {
  const id = params.id
  return request(`/api/user/users/${id}`, {
    method: 'PUT',
    data: params,
  })
}

export async function delete_user(params) {
  const id = params.id
  return request(`/api/user/users/${id}`, {
    method: 'DELETE',
  })
}

export async function get_current_user() {
  return request(`/api/user/users/current_user`, {
    method: 'GET',
  })
}

export async function get_user_setting() {
  return request(`/api/user/users/user_setting`, {
    method: 'GET',
  })
}


export async function is_username_exist(params) {
  return request(`/api/user/users/is_username_exist?username=${params.username}`, {
    method: 'GET',
  })
}

export async function is_phone_exist(params) {
  return request(`/api/user/users/is_phone_exist?phone=${params.phone}`, {
    method: 'GET',
  })
}

// 发送验证码
export async function send_captcha(params) {
  return request(`/api/user/send_captcha`, {
    method: 'POST',
    data: {
      phone: params.phone
    }
  })
}



// 角色
export async function get_whole_roles(params) {
  return request(`/api/user/roles`, {
    method: 'GET',
  })
}

export async function add_role(params) {
  return request(`/api/user/roles`, {
    method: 'POST',
    data: params,
  })
}

export async function update_role(params) {
  const id = params.id
  return request(`/api/user/roles/${id}`, {
    method: 'PUT',
    data: params,
  })
}

export async function delete_role(params) {
  const id = params.id
  return request(`/api/user/roles/${id}`, {
    method: 'DELETE',
  })
}

export async function is_role_name_exist(params) {
  return request(`/api/user/roles/is_role_name_exist?name=${params.name}`, {
    method: 'GET',
  })
}


// 权限
export async function get_whole_permissions(params) {
  return request(`/api/user/permissions`, {
    method: 'GET',
  })
}


// 设置



