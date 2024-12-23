import { cacheProducts } from "../database/storeDb";

export const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async (callBack) => {
    try{
        const response = await fetch(API_URL);
        const data = await response.json();
        cacheProducts(data);
        callBack(data);
    } catch(err) {
        console.log(err);
    } 
}