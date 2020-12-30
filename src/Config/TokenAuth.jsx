import clienteAxios from './Axios'

//si hay un token enviarlo por headers, lo va a estar recibiendo el middlegare de la api
const TokenAuth = token =>{
    if( token ){
        clienteAxios.defaults.headers.common['x-data-token'] = token;
    }else{
        //caso contrario llimpiamos headers
        delete clienteAxios.defaults.headers.common['x-data-token']

    };
};

export default TokenAuth;