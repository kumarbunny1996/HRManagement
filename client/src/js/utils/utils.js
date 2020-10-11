const userStore = require("./userStore");

let events = (element, event, eventHandler) => document.querySelector(element).addEventListener(event, eventHandler);

let removeEvents = (element, event, eventHandler) => document.querySelector(element).removeEventListener(event, eventHandler);

//show hide password for login 
const showHide = () => {
    const password = document.getElementById("password");
    if (password.type === "password") {
        password.setAttribute('type', 'text');
    } else {
        password.setAttribute('type', 'password');
    }
}

const loaderDiv = () => {
    let loader = document.createElement('div');
    loader.className = 'loadOverlay';
    loader.id = 'loadOverlay';
    loader.innerHTML = `
          <div class="loader" id="loader"></div>    
    `;
    if (document.getElementById('loadOverlay')) {
        document.body.removeChild(document.getElementById('loadOverlay'));
    }
    document.body.appendChild(loader);
}

const removeOverlayLoader = () => {
    if (document.getElementById('loadOverlay')) {
        document.body.removeChild(document.getElementById('loadOverlay'));
    }
}

const blurLoader = (el) => {
    let blurLoader = document.createElement('div');
    blurLoader.className = 'blurLoader';
    blurLoader.id = 'blurLoader';
    if (document.getElementById('blurLoader')) {
        el.removeChild(document.getElementById('blurLoader'));
    }
    el.appendChild(blurLoader);
}

const removeBlurLoader = (el) => {
        if (document.getElementById('blurLoader')) {
            el.removeChild(document.getElementById('blurLoader'));
        }
    }
    //creating model for messages

const msgDoc = (message, code, term) => {
    const msgModel = document.getElementById('info');
    msgModel.innerHTML = `
        <div class="msgCont" id="contOfMsg">
            <h4><span class="term">${code};</span> ${term}</h4>
            <p class="client-message" id="client-message">${message}</p>
        </div>
    `;
}

const modelDoc = (value) => {
    const model = document.getElementById('modal');
    model.setAttribute('data-id', 'modal');
    model.innerHTML = `
        <div class="model-content" id="model-content">
            <div>
                ${value}
            </div>
        </div>
    `;
}

//close the model 

const closeModel = (e) => {
    document.body.style.overflowY = "scroll";
    const modal = document.getElementById('modal');
    const cont = document.getElementById('model-content');
    modal.removeChild(cont);
    modal.style.visibility = 'hidden';
}



const showModel = (domValue) => {
        modelDoc(domValue);
        document.body.style.overflowY = "hidden";
        //document.getElementById('modal').classList.add();
        document.getElementById('modal').style.visibility = 'visible'
        events('#cancel', 'click', (e) => {
            closeModel(e);

        });
        // events('#modal', 'click', (e) => {
        //     e.stopPropagation();
        //     let el = e.target.dataset.id;
        //     if (el === 'modal') {
        //         closeModel(e);
        //     }
        // });

    }
    //popup model

const closePopup = (e) => {
    document.body.style.overflowY = "scroll";
    const popup = document.getElementById('popup');
    const cont = document.getElementById('popup-content');
    popup.removeChild(cont);
    popup.style.visibility = 'hidden'
}
const showPopup = (domValue) => {
    popupDoc(domValue);
    document.body.style.overflowY = "hidden";
    //document.getElementById('modal').classList.add();
    document.getElementById('popup').style.visibility = 'visible'
    events('#close-pop', 'click', (e) => {
        closePopup(e);

    });
    events('#popup', 'click', (e) => {
        e.stopPropagation();
        let el = e.target.dataset.id;
        if (el === 'popup') {
            closePopup(e);
        }
    });

}

const showMsg = (object = {}, timer = 3000) => {
    window.scrollTo(0, 0);
    //console.log(message);
    msgDoc(object.message, object.code, object.term);
    const msgCont = document.getElementById('info');
    const contOfMsg = document.getElementById('contOfMsg')
    contOfMsg.classList.add(object.value1, object.value2, "fit");
    setTimeout(() => {
        contOfMsg.classList.remove(object.value1, object.value2, "fit");
        msgCont.removeChild(contOfMsg);
        //window.scrollTo(0, 392);
    }, timer);

}
const toolTipBox = () => {
    const account = document.getElementById('admin-head');
    const toolTip = document.createElement('div');
    toolTip.className = "tool-tip-content";
    toolTip.id = "tool-tip-content";
    toolTip.innerHTML = `
        <ul class="tool-tip-list">
            <li id="log-out">Log out</li>
        </ul>
        
    `;
    if (document.getElementById('tool-tip-content')) {
        account.removeChild(document.getElementById('tool-tip-content'));
    }
    account.appendChild(toolTip);
}

const logOut = () => {
    location.hash = "#admin";
    localStorage.clear();
    userStore.itemStorage.clear();
}



module.exports = {
    events,
    removeEvents,
    showHide,
    loaderDiv,
    removeOverlayLoader,
    blurLoader,
    removeBlurLoader,
    modelDoc,
    msgDoc,
    showModel,
    showMsg,
    closeModel,
    logOut,
    toolTipBox
}