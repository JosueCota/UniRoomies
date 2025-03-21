import axios from "axios"

// Axios Instance
const api = axios.create({
    baseURL: '',
    withCredentials: true
});
  
// Response Interceptor
api.interceptors.response.use(
response => {
    // If the request is successful, just return the response
    return response;
},
error => {
    //Deals with unauthorized error response
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('user');        
        window.location.href = '/login'; 
    }
    // Propagate other errors
    return Promise.reject(error);
}
);
  
  export default api;