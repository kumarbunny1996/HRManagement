const indexPage = require("../Components/mainComp");
const loginForm = require("../Components/adminComp");
const candidateForm = require("../Components/formComp");
const { fileUpload, replaceLogicEvent, formLogicEvents } = require("../appLogic/formLogic");
const adminLogicEvents = require("../appLogic/adminLogic");
const { hrComponent, allListComponent } = require("../Components/hrComp");
const { hrLogicEvents, getCandidateList, listLogicEvents } = require("../appLogic/hrLogic");
const userStore = require("../utils/userStore");
const { toolTipBox, events, logOut } = require("../utils/utils");

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
        let token = localStorage.getItem('token');
        if (token) return location.hash = "#hr_management";
        indexPage();
        loginForm();
        adminLogicEvents();
        alert('username=admin and password=admin');
    }

    if (fragmentID === "jobs") {
        candidateForm();
        fileUpload();
        replaceLogicEvent();
        formLogicEvents();
    }

    if (fragmentID === "hr_management") {
        let token = localStorage.getItem('token');
        if (!token) return location.hash = "#admin";
        hrComponent();
        toolTipBox();
        events("#log-out", 'click', logOut);
        getCandidateList();
        hrLogicEvents();
    }

}
window.addEventListener("hashchange", navigate);