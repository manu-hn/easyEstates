
import axios from 'axios';
import jsCookie from 'js-cookie';

const useCreateListings = () => {

    const createListingsFromHook = async (formData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/listings/create', JSON.stringify(formData), {
                headers: {
                    Authorization: jsCookie.get('token'),
                    'Content-type': 'application/json'
                }
            })
 
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
    const updateListingsFromHook = async (formData, lid) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/listings/update/${lid}`, JSON.stringify(formData), {
                headers: {
                    Authorization: jsCookie.get('token'),
                    'Content-type': 'application/json'
                }
            })
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

    return { createListingsFromHook, updateListingsFromHook };
}

export default useCreateListings