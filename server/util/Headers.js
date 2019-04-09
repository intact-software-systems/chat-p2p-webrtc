module.exports = {
    Headers: class {
        static jsonBearer(token) {
            return {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        static jsonHeaders() {
            return {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        }

        static formBasicAuth(basicAuth) {
            return {
                'Accept': '*/*',
                'Content-Type': 'application/x-www.js-form-urlencoded',
                'Authorization': basicAuth
            }
        }

        static clientPrivileged(kurtId, token, privilegedId) {
            return {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'X-KurtId': kurtId,
                'X-Mona-Client-Privileges-Id': privilegedId,
                'Authorization': 'Bearer ' + token
            }
        }
    }
}
