// import request from '@/utils/request'
// import { addGetQuery } from '../../utils/utils'
//
// export async function get_accounts(params) {
//   let query = '/api/account/accounts'
//   if (params) {
//     query += '?'
//     if (params.is_active) {
//       query += `&is_active=${params.is_active}`
//     }
//   }
//   query = addGetQuery(params, query)
//   return request(query, {
//     method: 'GET',
//   })
// }
//
// export async function add_account(params) {
//   return request('/api/account/accounts', {
//     method: 'POST',
//     data: params,
//   })
// }
//
// export async function update_account(params) {
//   const { id } = params
//   return request(`/api/account/accounts/${id}`, {
//     method: 'PUT',
//     data: params,
//   })
// }
//
// export async function delete_account(params) {
//   const { id } = params
//   return request(`/api/account/accounts/${id}`, {
//     method: 'DELETE',
//   })
// }
//
// export async function is_name_exist(params) {
//   return request(`/api/account/accounts/is_name_exist?name=${params.name}`, {
//     method: 'GET',
//   })
// }
//
// export async function get_accounts_info(params) {
//   return request(`/api/account/accounts/info`, {
//     method: 'GET',
//   })
// }
//
//
//
//
