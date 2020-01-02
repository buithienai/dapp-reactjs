import axios from 'axios';
import { removeCookie } from '../../utils/cookie';

const makeRequest = async (options) => {
    try {
        const response = await axios(options);
        return response;
    } catch (error) {
        if (error.response.status === 401) {
            removeCookie('accessToken');
            localStorage.setItem("persist:root", "invalid_token");
            localStorage.removeItem("persist:root");
            window.location.reload();
        }
        throw error.response;
    }
};

export default makeRequest;