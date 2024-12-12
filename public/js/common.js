const API_URL = '/api';
const ADMIN_API_URL = '/admin/api';

async function fetchApi(url, options) {
    const response = await fetch(`${API_URL}${url}`, options);
    return response.json();
}

async function fetchAdminApi(url, options = {}) {
    const response = await fetch(`${ADMIN_API_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            authorization: localStorage.getItem('token')
        }
    });
    return response.json();
}

async function checkAuth(redirectTo = "", invert = false) {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    
    const response = await fetchAdminApi('/auth');

    const isAuthenticated = response.status == 'ok';
    const shouldRedirect = invert ? isAuthenticated : !isAuthenticated;
    
    if (shouldRedirect && redirectTo) {
        window.location.href = redirectTo;
    }

    return response.success;
}

async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
