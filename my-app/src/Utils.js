export default class BackendInterface {    
    static getApiBaseUrl() {
        return `http://${window.location.host}/voting-system/api.php`;
    }

    static getHeaders() {
        const token = BackendInterface.getToken();
        if (token) {
          return new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          });
        }
        return new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        });
    }

    static getToken() {
        return localStorage.getItem('VOTE-TOKEN');
    }
    
    static removeToken() {
        localStorage.removeItem('VOTE-TOKEN');
    }

    static login(username, password) {
        const url = `${this.getApiBaseUrl()}?p=login&s=autenticar&username=${username}&password=${password}`;
        return fetch(url, {
            method: 'GET',
            headers: this.getHeaders(),
        }).then((response) => {
            if (response.status >= 500) {
                return false;
            }
            if (response.status === 401 || response.status === 403) {
                BackendInterface.removeToken();
                return false;
            }
            
            return response.json().then((resp) => {
                return resp;
            });
        });
    }
};