require("../../css/common.css");
require('../../css/login.css');

const loginForm = () => {
    document.title = "Admin_Login";
    const loginArea = document.getElementById('content');
    loginArea.innerHTML = `
        <section class="loginArea" id="loginArea">
            <div class="form" id"form">
                <div class="admin-login">
                    <h1>Admin Account</h1> 
                </div>
                <div class="form-content">
                    <input type="text" class="user-input" id="user-input" name="username" autocomplete="off" required autofocus>
                    <label for="user-input" class="label-content"><span class="content2">Username *</span></label>
                </div>
                <div class="errorMsg" id="errorMsg"style="display:none">
                    <p>Invalid username</p>
                </div>
                <form class="form-content">
                    <input type="password" class="user-input" id="password" name="password" autocomplete="off" required>
                    <label for="password" class="label-content"><span class="content2">Password *</span></label>
                </form>
                <div class="errorMsg" id="errorMsg2" style="display:none">
                <p>Invalid  admin password</p>
                </div>
                <div class="check">
                    <input type="checkbox" id="toggle">
                    <label>Show password</label>
                </div>
                <div class="button">
                    <button class="btn" id="login-btn" data-id="">Sign in</button>
                </div>
                <div class="login-footer">
                <span class="footer-rights2"><i class="fa fa-copyright" aria-hidden="true"></i>2020, @JustWorks.com, Inc.</span>
            </div>
            </div>
        </section>        
    `;

}


module.exports = loginForm;