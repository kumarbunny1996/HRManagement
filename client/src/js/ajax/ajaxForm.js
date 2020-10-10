module.exports = function requestToServerWithFormData(requestObject = {}) {

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.status === 200) {
                return resolve(getValidResponseFormat(this.responseText));
            }
            if (this.status === 400 || this.status === 401) {
                return reject(getValidResponseFormat(this.responseText));
            }
        }
        xhr.open(requestObject.method, requestObject.url, true);
        // if (requestObject.method === 'POST' || requestObject.method === 'PUT') {
        //     xhr.setRequestHeader(requestObject.name, requestObject.value);
        // }
        //xhr.setRequestHeader(requestObject.name, requestObject.value);
        xhr.send(requestObject.data);
    });
};

const getValidResponseFormat = (response) => {
    try {
        let value = JSON.parse(response);
        return value;
    } catch (err) {
        return response;
    }
}