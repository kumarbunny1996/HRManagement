require("../../css/common.css");
require("../../css/hrComp.css");

const hrComponent = () => {
    const cont = document.getElementById("main-content");
    document.title = "HR_management";
    cont.innerHTML = `
        <section class="hr-comp" id="hr-comp">
            <div class="hr-header" id="hr-header">
                <h1 id="head2"><span id="logo2">@</span>Justworks</h1>
                <h1 id="admin-head"><i id="icon-head" class="fa fa-user" aria-hidden="true"></i>Admin</h1>
            </div>
            <div class="sub-head">
                <h2>Candidate List</h2>
            </div>
            <div class="sub-content" id="sub-content">
                <h3 id="table-head">All Candidate List</h3>
                <h3 id="table-head2">Approved List</h3>
            </div>
            <div class="list-cont" id="list-cont">
            </div>
        </section>
    `;

}

const allListComponent = (listArr = []) => {
    const list = document.getElementById("list-cont");
    let result = "";
    for (let i = 0; i < listArr.length; i++) {
        result += `
            <div class="list-parent" data-id="${listArr[i].ROWID}">
                <div class="user-icon"><i class="fa fa-user" aria-hidden="true"></i></div>
                <div class="user-details">
                    <h5>${listArr[i].Name}</h5>
                    <h6>${listArr[i].Email}</h6>
                </div>
                <div class="user-block">
                    <button class="download" id="download" data-id="${listArr[i].FileID}" data-name="${listArr[i].Filename}" data-value="download">Download</button>
                    <p class="downloaded" id="downloaded" style="display:none;">downloaded</p>
                    <button class="approve" id="approve" data-id="${listArr[i].ROWID}" data-value="approve">Approve</button>
                    <div class="close" id="close">
                    <i class="fa fa-times" aria-hidden="true" data-value="close" data-id="${listArr[i].ROWID}" data-file="${listArr[i].FileID}"></i>
                    </div>
                </div>
            </div>
        `;
    }
    list.innerHTML = result;
}

const approvedListComp = (listArr = []) => {
    const listCont = document.getElementById("list-cont");
    let result = '';
    for (let i = 0; i < listArr.length; i++) {
        result += `
        <div class="list-parent" data-id="${listArr[i].ROWID}">
            <div class="user-icon"><i class="fa fa-user" aria-hidden="true"></i></div>
            <div class="user-details">
                <h5>${listArr[i].Name}</h5>
                <h6>${listArr[i].Email}</h6>
            </div>
            <div class="user-block">
                <button class="download" id="download2" data-value="download" data-id="${listArr[i].FileID}" data-name="${listArr[i].Filename}">Download</button>
                <p class="downloaded" id="downloaded" style="display:none;">downloaded</p>
                <div class="close" id="close2">
                    <i class="fa fa-times" data-value="close" aria-hidden="true" data-id="${listArr[i].ROWID}" data-file="${listArr[i].FileID}"></i>
                </div>
            </div>
        </div>
    `;
    }
    listCont.innerHTML = result;
}

module.exports = {
    hrComponent,
    allListComponent,
    approvedListComp
}