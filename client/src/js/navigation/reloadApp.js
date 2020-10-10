const indexPage = require("../Components/mainComp");
const loginForm = require("../Components/adminComp");
const candidateForm = require("../Components/formComp");
const { fileUpload, replaceLogicEvent, formLogicEvents } = require("../appLogic/formLogic");
const adminLogicEvents = require("../appLogic/adminLogic");
const { hrComponent, allListComponent } = require("../Components/hrComp");
const { hrLogicEvents, getCandidateList } = require("../appLogic/hrLogic");

if (location.hash === "#admin") {
    indexPage();
    loginForm();
    adminLogicEvents();
}

if (location.hash === "#jobs") {
    candidateForm();
    fileUpload();
    replaceLogicEvent();
    formLogicEvents();
}

if (location.hash === "#hr_management") {
    hrComponent();
    getCandidateList();
    hrLogicEvents();
}