const { events, removeOverlayLoader, loaderDiv, closeModel, showMsg } = require("../utils/utils");
const requestToServerWithFormData = require('../ajax/ajaxForm');
const userStore = require("../utils/userStore");

require("../../css/common.css");
require("../../css/email.css");

const emailDom = (dataObj = {}) => {
    return `
        <div class="email-container" id="email-container">
            <h1>Sending job offer to ${dataObj.Name}</h1>
            <div class="input-email-container">
                <label for="to">To:</label>
                <input type="text" id="to" class="input-email" name="to" value="${dataObj.Email}">
            </div>
            <div class="input-email-container">
                <label for="sub">Subject:</label>
                <input type="text" id="sub" name="sub" class="input-email" value="@JustWorks invites you for the interview selection">
            </div>
            <div class="input-email-container">
                <label for="content-email">Content:</label>

                <textarea id="content-email" name="content" rows="8" cols="50" autofocus>
Dear ${dataObj.Name},
    I hope you're doing well. Thank you for applying to @JustWorks Corporation for the Software Development position. We would like to invite you for an online test.
    Looking forward to your confirmation.
    Regards,
        Hr
                </textarea>
            </div>
            <button class="send" id="send" data-id="${dataObj.ROWID}">Send</button>
            <button class="cancel" id="cancel">Cancel</button>
        </div>
    `;
}

let collectData = () => {
    let email = document.getElementById("to").value;
    let subject = document.getElementById("sub").value;
    let content = document.getElementById("content-email").value;

    return {
        email,
        subject,
        content
    }
}

const toCheckCollectData = () => {
    let inputPattern = /^[a-zA-Z0-9_@\!\#\~\$\.\*\-\`\'\,\s]{1,562}$/;
    let emailPattern = /^([a-zA-Z0-9_\-\.\$]+)@([a-zA-Z0-9_\-\.\$]+)\.([a-zA-Z]{2,5})$/;
    let { email, subject, content } = collectData();
    let to = email.match(emailPattern);
    let sub = subject.match(inputPattern);
    let cont = content.match(inputPattern);

    if (email === "" || to === null && subject === "" || sub === null && content === "" || cont === null) return false;
}

const createFormData = (data) => {
    const formData = new FormData();
    formData.set("to", data.email);
    formData.set("subject", data.subject);
    formData.set("content", data.content);
    return formData;
}


const emailRequest = (e, element) => {
    console.log(element);
    let cont = document.getElementById('list-cont');
    let id = e.target.dataset.id;
    if (id === undefined) return;
    let isValid = toCheckCollectData();
    if (isValid === false) return;
    let emailConfig = collectData();
    let formData = createFormData(emailConfig);
    let reqObj = {
        method: 'POST',
        url: `/server/hr_management_function/emailRequest?row_id=${id}`,
        data: formData
    }
    loaderDiv();
    requestToServerWithFormData(reqObj)
        .then(resObj => {
            console.log(resObj);
            if (resObj.isSend) {
                let msgObj = {
                    message: resObj.msg,
                    code: '&#10004',
                    term: 'Success',
                    value1: 'info-style',
                    value2: 'success'
                }
                showMsg(msgObj);
                if (userStore.itemStorage.getItem('list')) {
                    let listArr = userStore.itemStorage.getItem('list');
                    let list = listArr['list'];
                    let item = list.find(item => item.ROWID == id);
                    let index = list.findIndex(item => item.ROWID == id);
                    item.Status = 'approved';
                    list.splice(index, 1, item);
                    cont.removeChild(element);
                    closeModel();
                }
            }
        })
        .catch(resObj => {
            let msgObj = {
                message: resObj.msg,
                code: '&#10008',
                term: 'Failure',
                value1: 'info-style',
                value2: 'failure'
            }
            showMsg(msgObj);
        })
        .finally(removeOverlayLoader);
}

const emailLogicEvent = (element) => {
    events("#send", 'click', (e) => {
        emailRequest(e, element);
    });
}

module.exports = { emailDom, emailLogicEvent };