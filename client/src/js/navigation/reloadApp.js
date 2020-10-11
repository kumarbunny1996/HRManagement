const indexPage = require("../Components/mainComp");
const loginForm = require("../Components/adminComp");
const candidateForm = require("../Components/formComp");
const { fileUpload, replaceLogicEvent, formLogicEvents } = require("../appLogic/formLogic");
const adminLogicEvents = require("../appLogic/adminLogic");
const { hrComponent, allListComponent } = require("../Components/hrComp");
const { hrLogicEvents, getCandidateList } = require("../appLogic/hrLogic");
const { toolTipBox, events, logOut } = require("../utils/utils");

if (location.hash === "#admin") {
    let token = localStorage.getItem('token');
    if (token) {
        location.hash = "#hr_management";
    } else {
        indexPage();
        loginForm();
        adminLogicEvents();
        alert('username=admin and password=admin');
    }
}

if (location.hash === "#jobs") {
    candidateForm();
    fileUpload();
    replaceLogicEvent();
    formLogicEvents();
}

if (location.hash === "#hr_management") {
    let token = localStorage.getItem('token');
    if (token) {
        hrComponent();
        toolTipBox();
        events("#log-out", 'click', logOut);
        getCandidateList();
        hrLogicEvents();
    } else {
        location.hash = "#login";
    }
}