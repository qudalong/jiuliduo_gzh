import Vuex from 'vuex'
import Vue from 'vue'
import Ticket from './modules/ticket'
Vue.use(Vuex)


const BaseStore = new Vuex.Store({
    strict:true,
    state:{
        a:"B"
    },
    modules:{
        ticket:Ticket
    },
    mutations:{

    },
    actions:{

    }
}) 


export default BaseStore