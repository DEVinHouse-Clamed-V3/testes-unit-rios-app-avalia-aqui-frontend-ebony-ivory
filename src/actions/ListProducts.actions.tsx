import axios from 'axios'
import { Alert } from 'react-native'

export const getProducts = () => {
    return axios.get('http://10.0.0.113:3000/products')
        .then((response) => { 
            return response.data
        })
        .catch(() =>{
            Alert.alert("Não foi possível obter os dados.")
    })
}