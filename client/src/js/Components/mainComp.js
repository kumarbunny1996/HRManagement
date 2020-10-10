require("../../css/common.css");
require("../../css/index.css");

const indexPage = () => {
    document.title = "@JustWorks";
    const indexContent = document.getElementById("main-content");
    indexContent.innerHTML = `
       <header class="app-header">
            <h1 id="head1"><span id="logo">@</span>Justworks</h1>
            <h1 id="head2"><a href="#jobs">Apply jobs</a></h1>
       </header>
       <div class="content" id="content"></div>
       <footer class="app-footer">
       </footer>
    `;
}

module.exports = indexPage;