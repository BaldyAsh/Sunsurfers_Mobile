export default class DataManager {

    static myInstance = null;

    _userEmail = '';
    _authToken = '';

    static getInstance() {
        if (DataManager.myInstance == null) {
            DataManager.myInstance = new DataManager();
        }

        return this.myInstance;
    }

    getUserEmail() {
        return this._userEmail;
    }

    setUserEmail(email) {
        this._userEmail = email;
    }

    getAuthToken() {
        return this._authToken;
    }

    setAuthToken(authToken) {
        this._authToken = authToken;
    }
}
