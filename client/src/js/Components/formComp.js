require("../../css/common.css");
require('../../css/form.css');
const candidateForm = () => {
    document.title = "Apply_Jobs";
    const registerArea = document.getElementById('main-content');
    registerArea.innerHTML = `
        <section id="candidateArea">
            <div class="role">
                <h2 id="role-head">Job Role</h2>
                <div class="line"></div>
                <p id="role-para">
                   We are looking
                   for a qualified <em>Application Developer</em> to design and code functional programs and applications.You will work as part of a team and individually with little supervision.<br>

                   A great Application Developer has excellent knowledge of at least one programming language.They must be familiar with a variety of operating systems and platforms.The ideal candidate will also have an analytical mindset and a keen eye
                   for detail.<br>

                   The goal is to write“ clean” and flawless code to produce fully functional software applications according to requirements<br>
                </p>
            </div>
            <div class="form-wrapper" id"form-wrapper">
                <div class="register-title">
                <h2><span class="register-logo"><i></i></span>Apply Jobs</h2> 
                </div>
                <div class="input-container">
                    <input type="text" class="input" id="username" name="username" autocomplete="off" required>
                    <label for="username" class="label-content2"><span class="content-name">Name *</span></label>
                </div>
                <div class="error-content" id="error-content">
                <p>Minimum 3 characters</p>
                </div>
                <div class="error-content" id="nameMsg"></div>
                <div class="input-container">
                    <input type="text" class="input" id="number" name="number" autocomplete="off" required>
                    <label for="number" class="label-content2"><span class="content-name"> Mobile Number *</span></label>
                </div>
                <div class="error-content" id="error-content1">
                <p>Please enter valid  mobile number</p>
                </div>
                <div class="input-container">
                    <input type="text" class="input" id="email" name="email" autocomplete="off" required>
                    <label for="email" class="label-content2"><span class="content-name">Email *</span></label>
                </div>
                <div class="error-content" id="error-content2">
                    <p>Please enter valid email address</p>
                </div>
                <div class="resumeButton" id="resumeButton">
                    <input type="file" id="real-file" accept=".pdf,.doc,.docx" hidden="hidden">
                    <button class="resume-btn" id="resume-btn" data-id="">Select CV</button>
                </div>
                <div class="replace" id="replace" style="display:none">
                    <p id="filename"></p>
                    <h5>Replace</h5>
                </div>
                 <div class="applyButton" id="applyButton" style="text-align:start;">
                    <button class="apply-btn" id="apply-btn" data-id="">Apply</button>
                </div>
                <div class="login-footer2">
                    <span class="copyrights"><i class="fa fa-copyright" aria-hidden="true"></i>2020, @justworks.com, Inc.</span>
                </div>
            </div>
            
        </section>
    `;
}

module.exports = candidateForm;