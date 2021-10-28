import request from '@/utils/request';
import { addGetQuery } from '../utils/utils'

export async function add_object(params) {
  return request('/api/object/objects', {
    method: 'POST',
    data: params,
  });
}

export async function get_objects(params) {
  let query = '/api/object/objects'
  if (params) {
    query += '?'
    if (params.category_name) {
      if (params.category_name !== '全部'){
        query += `&category_name=${params.category_name}`
      }
    }
    if (params.search_str) {
      query += `&search_str=${params.search_str}`
    }
  }
  query = addGetQuery(params, query)
  return request(query, {
    method: 'GET',
  })
}

export async function get_object(params) {
  return request(`/api/object/objects/${params.id}`, {
    method: 'GET',
  })
}


export async function update_object(params) {
  return request(`/api/object/objects/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}


