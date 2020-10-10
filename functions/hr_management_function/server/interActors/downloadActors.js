var catalyst = require("zcatalyst-sdk-node");

let folderID = 1835000000007828;

const handleFileDownload = async(req, res) => {
    let file = req.query.file_id;
    let fileId = Number(file);
    let catalystApp = catalyst.initialize(req);
    downloadFileLogic(catalystApp, fileId)
        .then((resObj) => {
            console.log(resObj);
            res.status(200).send(resObj.fileObj);
        })
        .catch(err => {
            console.log(err);
        })
}
const downloadFileLogic = async(catalystApp, fileId) => {
        let fileObj = await downloadFile(catalystApp, fileId);

        return {
            fileObj
        }
    }
    //Download the file by passing the file ID to the method which in turn returns a promise
const downloadFile = (catalystApp, fileId) => {
    return new Promise((resolve, reject) => {
        let filestore = catalystApp.filestore();
        let folder = filestore.folder(folderID);
        let downloadPromise = folder.downloadFile(fileId);
        downloadPromise
            .then((fileObject) => {
                resolve(fileObject);
            })
            .catch(err => {
                reject(err);
            });
    });
}


module.exports = {
    handleFileDownload
}