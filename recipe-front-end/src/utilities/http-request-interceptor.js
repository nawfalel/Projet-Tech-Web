import axios from 'axios';

export const add_auth_headers_to_request = ()=>  {

    axios.interceptors.request.use(request => {

        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.authenticationToken) {
            request.headers.common.Authorization = `Bearer ${user.authenticationToken}`;
        }

        return request;
    });

}