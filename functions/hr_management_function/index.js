var express = require("express");
// var bodyParser = require("body-parser");
var formidable = require("express-formidable");
var { handleAdminLogin } = require("./server/interActors/adminActors");
var { handleCandidateDetails } = require("./server/interActors/candidateActors");
var { handleCandidateList } = require("./server/interActors/hrActors");
var { handleFileDownload } = require("./server/interActors/downloadActors");
var { handleDeleteRequest } = require("./server/interActors/deleteActors");
var { handleSingleCandidate } = require("./server/interActors/approveActors");
var { handleEmailRequest } = require("./server/interActors/emailActors");
var { handleApprovedList } = require("./server/interActors/approvedList");
const app = express();
//app.use(express.json());

app.use(formidable({}, [{
        event: 'fileBegin',
        action: function(req, res, next, name, file) {
            let path = file.path;
            name = file.name
            file.path = path.split('upload')[0] + name;

        }
    },
    {
        event: 'error',
        action: function(req) {
            req.resume();
        }
    }
]));

app.post('/admin', (req, res) => {
    handleAdminLogin(req, res);
});
app.post('/candidate', (req, res) => {
    handleCandidateDetails(req, res);
});

app.get('/candidateList', (req, res) => {
    handleCandidateList(req, res);
});

app.get('/file', (req, res) => {
    handleFileDownload(req, res);
});

app.delete('/deleteCandidate', (req, res) => {
    handleDeleteRequest(req, res);
});
app.get('/singleData', (req, res) => {
    handleSingleCandidate(req, res);
});

app.post('/emailRequest', (req, res) => {
    handleEmailRequest(req, res);
})

app.get('/approvedList', (req, res) => {
    handleApprovedList(req, res);
});

module.exports = app;