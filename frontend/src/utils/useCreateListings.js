
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

            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

    return { createListingsFromHook };
}

export default useCreateListings