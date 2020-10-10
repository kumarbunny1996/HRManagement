var catalyst = require("zcatalyst-sdk-node");

const handleDeleteRequest = async(req, res) => {
    let rowId = req.query.row_id;
    let fileId = req.query.file_id;
    console.log(fileId);
    const catalystApp = catalyst.initialize(req);
    deleteLogicActor(catalystApp, rowId, fileId)
        .then(resObj => {
            console.log(resObj);
            res.status(200).send(resObj);
        })
        .catch(err => {
            //console.log(err);

            res.status(400).send({ msg: ' Your delete request has been failed' });
        });
}

const deleteLogicActor = async(catalystApp, rowId, fileId) => {
    let row_id = Number(rowId);
    let tableName = "CandidateDetails";
    let folderID = 1835000000007828;
    let datastore = catalystApp.datastore();
    let table = datastore.table(tableName);
    let rowPromise = table.deleteRow(row_id);
    rowPromise.then((row) => {
        console.log(row);
    });

    // Delete the file by passing the file ID to the method which in turn returns a promise
    let filestore = catalystApp.filestore();
    let folder = filestore.folder(folderID);
    let deletePromise = folder.deleteFile(Number(fileId));
    deletePromise.then((fileObject) => {
        console.log(fileObject);
    });
    return {
        isDeleted: true,
        msg: "candidate was deleted"
    }
}

module.exports = {
    handleDeleteRequest,
}