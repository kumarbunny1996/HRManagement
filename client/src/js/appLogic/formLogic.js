const { events, removeOverlayLoader, loaderDiv, showMsg } = require("../utils/utils");
const makeRequestToServer = require("../ajax/ajax");
const requestToServerWithFormData = require("../ajax/ajaxForm");
const userStore = require("../utils/userStore");

const afterFileUpload = (value) => {
    const resumeBtn = document.getElementById("resumeButton");
    const replace = document.getElementById("replace");
    const filename = document.getElementById("filename");
    resumeBtn.style.display = "none";
    replace.style.display = "block";
    filename.innerText = value;
}

const replaceLogicEvent = () => {
    const resumeBtn = document.getElementById("resumeButton");
    const replace = document.getElementById("replace");
    const file = document.getElementById("real-file");
    replace.addEventListener("click", e => {
        resumeBtn.style.display = "block";
        replace.style.display = "none";
        file.value = "";
    });
}

const checksTheFile = (fileInpElem, filePath) => {
    let file = fileInpElem.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        //console.log(file);
        let value = file.name;
        afterFileUpload(value);
    }
}

const fileUpload = () => {
    const resumeBtn = document.getElementById("resumeButton");
    const fileInput = document.getElementById("real-file");

    resumeBtn.addEventListener("click", e => {
        fileInput.click();
    });
    fileInput.addEventListener("change", e => {
        let filePath = e.target.value;
        // console.log(filePath);
        checksTheFile(fileInput, filePath);
    });
}

let isNameDisabled = false,
    isMobileDisabled = false,
    isEmailDisabled = false;
//checks the button status
const checkButtonStatus = () => {
    if (isNameDisabled === true || isMobileDisabled === true || isEmailDisabled === true) {
        document.getElementById('apply-btn').disabled = true;
    } else {
        document.getElementById('apply-btn').disabled = false;
    }
}

const checkName = () => {
    let namePattern = /^[a-zA-Z0-9_@\!\#\~\$\.\*\-\`\'\s]{3,256}$/;
    let nameInput = document.getElementById('username');
    let name = nameInput.value.match(namePattern);
    if (!name) {
        // nameInput.value = "";
        let msgCont = document.getElementById('nameMsg');
        msgCont.style.display = 'none';
        document.getElementById('error-content').style.display = 'block';
        isNameDisabled = true;
        //console.log(isNameDisabled);
        checkButtonStatus();

    } else {
        document.getElementById('error-content').style.display = 'none';
        isNameDisabled = false;
        //console.log(isNameDisabled);
        checkButtonStatus();

    }
    //console.log(name);
    return name;
}
const checkMobileNo = () => {
    let mobilePattern = /^[0-9]{10}$/;
    let mobileInput = document.getElementById('number');
    let mobile = mobileInput.value.match(mobilePattern);
    if (mobile) {
        document.getElementById('error-content1').style.display = 'none';
        isMobileDisabled = false;
        //console.log(isMobileDisabled);
        checkButtonStatus();


    } else {
        document.getElementById('error-content1').style.display = 'block';
        isMobileDisabled = true;
        //console.log(isMobileDisabled);
        checkButtonStatus();

    }
    //console.log(mobile);
    return mobile;
}

const checkEmail = () => {
    let emailPattern = /^([a-zA-Z0-9_\-\.\$]+)@([a-zA-Z0-9_\-\.\$]+)\.([a-zA-Z]{2,5})$/;
    let emailInput = document.getElementById('email');
    let email = emailInput.value.match(emailPattern);
    if (email) {
        document.getElementById('error-content2').style.display = 'none';
        isEmailDisabled = false;
        //console.log(isEmailDisabled);
        checkButtonStatus();

    } else {
        document.getElementById('error-content2').style.display = 'block';
        isEmailDisabled = true;
        //console.log(isEmailDisabled);
        checkButtonStatus();

    }
    return email;
}
const createFormData = (data) => {
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("mobile", data.mobile);
    formData.set("email", data.email);
    formData.set("status", data.status);
    formData.set("file", data.fileData);
    return formData;
}


const makeReqObj = () => {
    let name = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let mobile = document.getElementById('number').value;
    let file = document.getElementById("real-file").value;
    let nameVal = checkName();
    let emailVal = checkEmail();
    let mobileVal = checkMobileNo();

    if (name === "" || email === "" || mobile === "" || file === "" || nameVal === null || emailVal === null || mobileVal === null) {
        return {
            isEmpty: true
        }
    } else {
        let fileData = document.getElementById("real-file").files[0];
        //console.log(fileData);
        //fileData.name = `${name}_resume.${fileData.name.split('.').pop()}`;
        let data = {
            name,
            email,
            mobile,
            status: "unapproved",
            fileData
        }
        let formData = createFormData(data);
        return {
            method: 'POST',
            url: '/server/hr_management_function/candidate',
            data: formData
        }
    }

}

const saveCandidateData = () => {
    let reqObj = makeReqObj();
    if (reqObj.isEmpty) {
        return
    } else {
        loaderDiv();
        requestToServerWithFormData(reqObj)
            .then(resObj => {
                //console.log(resObj);
                let msg = resObj.message;
                let isAdded = resObj.isAdded;
                if (!isAdded) {
                    let msgObj = {
                        message: msg,
                        code: '&#9888',
                        term: 'Warning',
                        value1: 'info-style',
                        value2: 'warning'
                    }
                    showMsg(msgObj);
                    return;
                } else {
                    let msgObj = {
                        message: msg,
                        code: '&#10004',
                        term: 'Success',
                        value1: 'info-style',
                        value2: 'success'
                    }
                    showMsg(msgObj);
                    let singleObj = resObj.insertedData[0];
                    if (userStore.itemStorage.getItem('list') === null || userStore.itemStorage.getItem('list') === undefined) {
                        let datalist = [];
                        datalist.unshift(singleObj);
                        userStore.itemStorage.setItem('list', datalist);
                    } else {
                        let listArr = userStore.itemStorage.getItem('list');
                        let list = listArr['list'];
                        list.unshift(singleObj);
                    }
                }

                //success message
            })
            .catch(errObj => {
                let value = errObj.message.split('message :')[1];
                // console.log(value);
                let msgObj = {
                    message: value,
                    code: '&#9888',
                    term: 'Warning',
                    value1: 'info-style',
                    value2: 'warning'
                }
                showMsg(msgObj);
            })
            .finally(() => removeOverlayLoader());
    }
}

const formLogicEvents = () => {
    events("#username", 'keyup', checkName);
    events("#email", 'keyup', checkEmail);
    events("#number", 'keyup', checkMobileNo);
    events("#apply-btn", 'click', saveCandidateData);
}

module.exports = { fileUpload, replaceLogicEvent, formLogicEvents };