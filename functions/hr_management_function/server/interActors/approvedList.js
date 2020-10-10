var catalyst = require("zcatalyst-sdk-node");

const tableName = "CandidateDetails";
const columnName = "Name";
const columnEmail = "Email";
const columnMobileNo = "MobileNo";
const columnStatus = "Status";
const columnFileID = "FileID";
const columnRowId = "ROWID";
const columnFilename = "Filename";

const handleApprovedList = async(req, res) => {
    let catalystApp = catalyst.initialize(req);
    getDataList(catalystApp)
        .then(resObj => {
            console.log(resObj);
            res.status(200).send(resObj);
        })
        .catch(err => {
            //console.log(err);
            let errObj = err.message ? err : {
                code: 0,
                message: 'Unable to find admin'
            }
            res.status(400).send(errObj);
        });
}

const getDataList = async(catalystApp) => {
    let status = "approved";
    let list = await getDataFromCatalystDataStore(catalystApp, status);
    if (list.length === 0) {
        return new Promise.reject({
            message: "No approved list"
        });
    } else {
        return {
            list
        }
    }
}

function getDataFromCatalystDataStore(catalystApp, status) {
    return new Promise((resolve, reject) => {
        // Queries the Catalyst Data Store table
        catalystApp.zcql().executeZCQLQuery(`Select ${columnName}, ${columnEmail}, ${columnMobileNo}, ${columnStatus}, ${columnFileID}, ${columnRowId}, ${columnFilename} from ${tableName} where ${columnStatus} = ${status}`).then(queryResponse => {
            resolve(queryResponse);
        }).catch(err => {
            reject(err);
        })
    });

}

module.exports = {
    handleApprovedList
}