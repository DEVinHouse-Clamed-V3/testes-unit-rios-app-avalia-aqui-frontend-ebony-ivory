import axios from 'axios';

interface Product {
    id: number;
    productId: number;
    name: string;
    email: string;
    feedback: string;
    experience: string;
    recommend: boolean;
}

export const Evaluation = (id: number, 
    selectedProductId: number, 
    yourName: string, 
    email: string, 
    feedback: string, 
    experience: string,
    recommend: boolean) => {
        return axios.post<Product>('http://10.0.0.113:3000/evaluations', {
        id: id,
        productId: selectedProductId,
        name: yourName,
        email: email,
        feedback: feedback,
        experience: experience,
        recommend: recommend ? 'true' : 'false',
    })
};