const { events, loaderDiv, removeOverlayLoader, showHide } = require("../utils/utils");
const makeRequestToServer = require("../ajax/ajax");
const requestToServerWithFormData = require("../ajax/ajaxForm");

let isNameDisabled, isPassDisabled;
const checkButtonStatus = () => {
    if (isNameDisabled === true || isPassDisabled === true) {
        document.getElementById('login-btn').disabled = true;
    } else {
        document.getElementById('login-btn').disabled = false;
    }
}

const checkName = () => {
    let namePattern = /^[a-zA-Z0-9_@\!\#\~\$\.\*\-\`\'\s]{5,256}$/;
    let nameInput = document.getElementById('user-input');
    let name = nameInput.value.match(namePattern);
    if (!name) {
        document.getElementById('errorMsg').style.display = 'block';
        isNameDisabled = true;
        checkButtonStatus();

    } else {
        document.getElementById('errorMsg').style.display = 'none';
        isNameDisabled = false;
        checkButtonStatus();

    }
    return name;
}

const checkPassword = () => {
    let passwordPattern = /^[A-Za-z0-9]{5,8}$/;
    let myInput = document.getElementById("password");
    let password = myInput.value.match(passwordPattern);
    if (!password) {
        document.getElementById("errorMsg2").style.display = "block";
        isPassDisabled = true;
        checkButtonStatus();
    } else {
        document.getElementById("errorMsg2").style.display = "none";
        isPassDisabled = false;
        checkButtonStatus();
    }
    return password;
}

const createFormData = (data) => {
    const formData = new FormData();
    formData.set("username", data.username);
    formData.set("password", data.password);
    return formData;
}

const makeObject = () => {
    let username = document.getElementById('user-input').value;
    let password = document.getElementById("password").value;
    let name = checkName();
    let pass = checkPassword();

    if (username === "" || password === "" || name === null || pass === null) {
        return {
            isEmpty: true,
        }
    } else {
        let data = {
            username,
            password
        }
        let formData = createFormData(data);
        let reqObj = {
            method: 'POST',
            url: '/server/hr_management_function/admin',
            // name: 'Content-Type',
            // value: 'application/json',
            data: formData
        }
        return reqObj;
    }
}

const adminLogic = () => {
    let reqObj = makeObject();
    if (reqObj.isEmpty) {
        return;
    } else {
        loaderDiv();
        requestToServerWithFormData(reqObj)
            .then(resObj => {
                let isAdmin = resObj.logged_in;
                if (isAdmin) {
                    location.hash = "#hr_management";
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(removeOverlayLoader);
    }
}
const adminLogicEvents = () => {
    events("#user-input", "keyup", checkName);
    events("#password", "keyup", checkPassword);
    events("#login-btn", "click", adminLogic);
    events("#toggle", "click", showHide);
}

module.exports = adminLogicEvents;