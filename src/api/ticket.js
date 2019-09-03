import request from '../request/request'

export async function fetchTicketApi(){
    return await request('/v1/api/ticket')
}