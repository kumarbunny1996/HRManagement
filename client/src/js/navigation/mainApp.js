const indexPage = require("../Components/mainComp");
const loginForm = require("../Components/adminComp");
const candidateForm = require("../Components/formComp");
const { fileUpload, replaceLogicEvent, formLogicEvents } = require("../appLogic/formLogic");
const adminLogicEvents = require("../appLogic/adminLogic");
const { hrComponent, allListComponent } = require("../Components/hrComp");
const { hrLogicEvents, getCandidateList, listLogicEvents } = require("../appLogic/hrLogic");
const userStore = require("../utils/userStore");

//sets the home page as default
const setDefaultPage = () => {
    if (!location.hash) {
        location.hash = "#admin";
    }
}
setDefaultPage();

const navigate = () => {
    const fragmentID = location.hash.substr(1);

    if (fragmentID === "admin") {
        indexPage();
        loginForm();
        adminLogicEvents();
    }

    if (fragmentID === "jobs") {
        candidateForm();
        fileUpload();
        replaceLogicEvent();
        formLogicEvents();
    }

    if (fragmentID === "hr_management") {
        let token = localStorage.getItem('token');
        if (!token) return;
        hrComponent();
        /*if (userStore.itemStorage.getItem("list") === null || userStore.itemStorage.getItem('list') === undefined) {
            getCandidateList();
        } else {
            let listArr = userStore.itemStorage.getItem('list');
            let list = listArr['list'];
            let filterArr = list.filter(item => {
                return item.Status === 'unapproved';
            });
            allListComponent(filterArr);
            listLogicEvents();
        }*/
        getCandidateList();
        hrLogicEvents();
    }

}
window.addEventListener("hashchange", navigate);