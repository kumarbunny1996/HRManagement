const { allListComponent, approvedListComp } = require("../Components/hrComp");
const { events, removeOverlayLoader, loaderDiv, blurLoader, showMsg, showModel, removeBlurLoader } = require("../utils/utils");
const requestToServerWithFormData = require("../ajax/ajaxForm");
const userStore = require("../utils/userStore");
const { emailDom, emailLogicEvent } = require("../Components/emailComp");

const allListLogic = () => {
    const head1 = document.getElementById('table-head');
    const head2 = document.getElementById('table-head2');
    head1.style.color = "#acdfdf";
    head2.style.color = "whitesmoke";
    if (userStore.itemStorage.getItem("list") === null || userStore.itemStorage.getItem('list') === undefined) {
        getCandidateList();
    } else {
        let listArr = userStore.itemStorage.getItem('list');
        let list = listArr['list'];
        let filterArr = list.filter(item => {
            return item.Status === 'unapproved';
        });
        allListComponent(filterArr);
    }
}

const approvedLogic = () => {
    const head2 = document.getElementById('table-head2');
    const head1 = document.getElementById('table-head');
    head2.style.color = "#acdfdf";
    head1.style.color = "whitesmoke";
    if (userStore.itemStorage.getItem("list") === null || userStore.itemStorage.getItem('list') === undefined) {
        getApprovedList();
    } else {
        let listArr = userStore.itemStorage.getItem('list');
        let list = listArr['list'];
        let filterArr = list.filter(item => {
            return item.Status === 'approved';
        });
        approvedListComp(filterArr);
    }
}

const downloadResume = (e, id) => {
    let fileId = id;
    let filename = e.target.dataset.name;
    let link = document.createElement('a');
    link.href = `/server/hr_management_function/file?file_id=${fileId}`;
    link.download = filename;
    link.click();
    // console.log(link);
    return;
}

const deleteCandidate = (e, id) => {
    let fileId = e.target.dataset.file;
    let value = e.target.dataset.value;
    let reqObj = {
        method: 'DELETE',
        url: `/server/hr_management_function/deleteCandidate?row_id=${id}&file_id=${fileId}`,
        data: null
    }
    let parentElement;
    if (value === "close") {
        parentElement = e.target.parentElement.parentElement.parentElement;
    } else {
        parentElement = e.target.parentElement.parentElement;
    }

    let listCont = document.getElementById("list-cont");
    let rowId = parentElement.dataset.id;
    // console.log("delete " + parentElement, id, e, rowId);
    if (id != rowId) return;
    loaderDiv();
    requestToServerWithFormData(reqObj)
        .then(resObj => {
            // console.log(resObj);
            if (resObj.isDeleted) {
                let msgObj = {
                    message: resObj.msg,
                    code: '&#10004',
                    term: 'Success',
                    value1: 'info-style',
                    value2: 'success'
                }
                showMsg(msgObj);
                listCont.removeChild(parentElement);
                if (userStore.itemStorage.getItem('list')) {
                    let listArr2 = userStore.itemStorage.getItem('list');
                    let list2 = listArr2['list'];
                    let index = list2.findIndex(obj => obj.ROWID == id);
                    list2.splice(index, 1);
                    // console.log(list2);
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

const getCandidateList = () => {
    let reqObj = {
        method: 'GET',
        url: '/server/hr_management_function/candidateList',
        data: null
    }
    loaderDiv();
    requestToServerWithFormData(reqObj)
        .then((resObj) => {
            if (resObj.isThere) {
                let msgObj = {
                    message: resObj.message,
                    code: '&#10008',
                    term: 'Failure',
                    value1: 'info-style',
                    value2: 'failure'
                }
                showMsg(msgObj);
                return;
            }
            let list = resObj.list;
            let listArr = []
            for (let i = 0; i < list.length; i++) {
                let obj = list[i].CandidateDetails;
                listArr.push(obj);
            }
            // console.log(listArr);
            if (userStore.itemStorage.getItem('list')) {
                userStore.itemStorage.removeItem('list');
                userStore.itemStorage.setItem("list", listArr);
            } else {
                userStore.itemStorage.setItem("list", listArr);
            }
            let listArr2 = userStore.itemStorage.getItem('list');
            let list2 = listArr2['list'];
            let filterArr = list2.filter(item => {
                return item.Status === 'unapproved';
            });
            allListComponent(filterArr);
            listLogicEvents();

        })
        .catch(err => {
            // console.log(err);
        })
        .finally(removeOverlayLoader);
}

const getApprovedList = () => {
    let reqObj = {
        method: 'GET',
        url: '/server/hr_management_function/approvedList',
        data: null
    }
    loaderDiv();
    requestToServerWithFormData(reqObj)
        .then((resObj) => {
            if (resObj.isThere) {
                let msgObj = {
                    message: resObj.message,
                    code: '&#10008',
                    term: 'Failure',
                    value1: 'info-style',
                    value2: 'failure'
                }
                showMsg(msgObj);
                return;
            }
            let list = resObj.list;
            let listArr = []
            for (let i = 0; i < list.length; i++) {
                let obj = list[i].CandidateDetails;
                listArr.push(obj);
            }
            if (userStore.itemStorage.getItem('list')) {
                userStore.itemStorage.removeItem('list');
                userStore.itemStorage.setItem("list", listArr);
            } else {
                userStore.itemStorage.setItem("list", listArr);
            }
            let listArr2 = userStore.itemStorage.getItem('list');
            let list2 = listArr2['list'];
            let filterArr = list2.filter(item => {
                return item.Status === 'approved';
            });
            approvedListComp(filterArr);

            //approvedListLogicEvents();
        })
        .catch(err => {
            // console.log(err);
        })
        .finally(() => removeOverlayLoader());
}

//shows the email modal doc

const approveCandidate = (e, id) => {
    let parentElement = e.target.parentElement.parentElement;
    let rowId = parentElement.dataset.id;

    if (userStore.itemStorage.getItem('list')) {
        let listArr = userStore.itemStorage.getItem('list');
        let list = listArr['list'];
        let dataObj = list.find(item => item.ROWID == id);
        let value = emailDom(dataObj);
        showModel(value);
        if (rowId == id) {
            emailLogicEvent(parentElement);
        }

    } else {
        let reqObj = {
            method: 'GET',
            url: `/server/hr_management_function/singleData?row_id=${id}`,
            data: null
        }
        loaderDiv();
        requestToServerWithFormData(reqObj)
            .then(resObj => {
                // console.log(resObj);
                let dataObj = resObj.singleObj[0].CandidateDetails;
                let value = emailDom(dataObj);
                showModel(value);
                document.getElementById('content-email').focus();
                if (rowId == id) {
                    emailLogicEvent(parentElement);
                }
            })
            .catch(err => {
                // console.log(err);
            })
            .finally(removeOverlayLoader);
    }
}

const hrLogicEvents = () => {
    events("#table-head", 'click', allListLogic);
    events("#table-head2", 'click', approvedLogic);
}
const listLogicEvents = () => {
    events("#list-cont", 'click', e => {
        e.stopPropagation();
        let id = e.target.dataset.id;
        if (id === undefined) return;
        let value = e.target.dataset.value;
        // console.log(id, value);
        if (value === "download") return downloadResume(e, id);
        if (value === "close" || value === "delete") return deleteCandidate(e, id);
        if (value === "approve") return approveCandidate(e, id);
    });
}



module.exports = {
    hrLogicEvents,
    getCandidateList,
    listLogicEvents,
}