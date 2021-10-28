import request from '@/utils/request';
import { addGetQuery } from '../utils/utils'

export async function add_comment(params) {
  return request('/api/comment/comments', {
    method: 'POST',
    data: params,
  });
}

export async function get_comments(params) {
  let query = '/api/comment/comments'
  if (params) {
    query += '?'
    //object_id
      if (params.object_id) {
        query += `&object_id=${params.object_id}`
      }
  }
  query = addGetQuery(params, query)
  return request(query, {
    method: 'GET',
  })
}

export async function get_comment(params) {
  return request(`/api/comment/comments/${params.id}`, {
    method: 'GET',
  })
}


export async function update_comment(params) {
  return request(`/api/object/comments/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}


