import {fetchTicketApi} from '../../api/ticket'


const Ticket ={
    namespaced:true,
    state:{
        ticket:"",
    },
    mutations:{
        updateTicket(state,payload){
            return {
                ...state,
                ...payload
            }
        }
    },
    actions:{
        fetchTicket(context){
            const response = fetchTicketApi()
            context.commit("updateTicket",response)
        }
    }
}

export default Ticket