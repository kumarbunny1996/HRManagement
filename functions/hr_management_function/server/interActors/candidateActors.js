var catalyst = require("zcatalyst-sdk-node");
//var formidable = require("formidable");
var fs = require("fs");
const tableName = "CandidateDetails";
const columnName = "Name";
const columnEmail = "Email";
const columnMobileNo = "MobileNo";
const columnStatus = "Status";
const columnFileID = "FileID";
const columnFilename = "Filename";


const handleCandidateDetails = async(req, res) => {
    // console.log(req.fields);
    // console.log(req.files);
    let candidateData = req.fields;
    let fileData = req.files;
    //Initializing Catalyst SDK
    var catalystApp = catalyst.initialize(req);

    savesCandidateData(catalystApp, candidateData, fileData)
        .then((resObj) => {
            console.log(resObj);
            res.status(200).send(resObj);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send(err);
        });
}


const savesCandidateData = async(catalystApp, candidateData, fileData) => {
    let file = fileData.file
    let config = {
        code: fs.createReadStream(file.path),
        name: file.name
    }
    let folderID = 1835000000007828;
    let candidateDetail = await getDataFromCatalystDataStore(catalystApp, candidateData);
    if (candidateDetail.length == 0) {
        let fileObject = await uploadFiles(catalystApp, folderID, config);
        let fileId = fileObject.id;
        let filename = `${candidateData.name}_resume.${fileObject.file_name.split('.').pop()}`;
        //let filename = fileObject.file_name; //no row is present
        var rowData = {}
        rowData[columnName] = candidateData.name;
        rowData[columnEmail] = candidateData.email;
        rowData[columnMobileNo] = candidateData.mobile;
        rowData[columnStatus] = candidateData.status;
        rowData[columnFileID] = fileId;
        rowData[columnFilename] = filename;
        var rowArr = [];
        rowArr.push(rowData);
        let insertedData = await getInsertedData(catalystApp, rowArr);
        return {
            insertedData,
            message: "Your job has been applied successfully!",
            isAdded: true
        };
    } else { //already applied
        return {
            message: "You have been already applied for this job",
            isAdded: false
        };
    }
}

const getInsertedData = (catalystApp, rowArr) => {
    return new Promise((resolve, reject) => {
        catalystApp.datastore().table(tableName).insertRows(rowArr)
            .then(userInsertResp => {
                console.log(userInsertResp);
                resolve(userInsertResp);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}


const uploadFiles = (catalystApp, folderID, config) => {
    return new Promise((resolve, reject) => {
        let filestore = catalystApp.filestore();
        let folder = filestore.folder(folderID);
        let uploadPromise = folder.uploadFile(config);
        uploadPromise
            .then((fileObject) => {
                resolve(fileObject);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getDataFromCatalystDataStore(catalystApp, candidateData) {
    return new Promise((resolve, reject) => {
        // Queries the Catalyst Data Store table
        catalystApp.zcql().executeZCQLQuery(`Select * from ${tableName} where ${columnEmail} = ${candidateData.email} or ${columnMobileNo} = ${candidateData.mobile} `).then(queryResponse => {
            resolve(queryResponse);
        }).catch(err => {
            reject(err);
        })
    });

}


const getFolderDetails = (catalystApp) => {
    //Get all the folders in the project by calling getAllFolders which returns a promise
    return new Promise((resolve, reject) => {
        let filestore = catalystApp.filestore();
        let allFolderPromise = filestore.getAllFolders();
        allFolderPromise
            .then((folders) => {
                resolve(folders);
            })
            .catch(err => {
                reject(err);
            });
    });
}

module.exports = { handleCandidateDetails };