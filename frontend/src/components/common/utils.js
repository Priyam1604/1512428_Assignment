import apiClient from "../../request"

const logout = async(user,redirect) => {
    const {ok} = await apiClient.delete('auth/',{user})
    if(ok){
        redirect('/')
    }
} 


export {logout};