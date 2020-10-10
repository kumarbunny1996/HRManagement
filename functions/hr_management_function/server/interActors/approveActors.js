var catalyst = require("zcatalyst-sdk-node");

const tableName = "CandidateDetails";
const columnName = "Name";
const columnEmail = "Email";
const columnMobileNo = "MobileNo";
const columnRowId = "ROWID";

const handleSingleCandidate = async(req, res) => {
    let rowId = req.query.row_id;
    let catalystApp = catalyst.initialize(req, res);
    getSingleDataObj(catalystApp, rowId)
        .then(resObj => {
            console.log(resObj);
            res.status(200).send(resObj);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ msg: "No data available" });
        });
}

const getSingleDataObj = async(catalystApp, rowId) => {

    let singleObj = await getDataFromCatalystDataStore(catalystApp, rowId);
    if (singleObj.length === 0) {
        return new Promise.reject({ msg: 'no data is there' });
    }
    return {
        singleObj
    }
}

function getDataFromCatalystDataStore(catalystApp, rowId) {
    return new Promise((resolve, reject) => {
        // Queries the Catalyst Data Store table
        catalystApp.zcql().executeZCQLQuery(`Select ${columnName}, ${columnEmail}, ${columnMobileNo}, ${columnRowId} from ${tableName} where ${columnRowId} = ${rowId}`).then(queryResponse => {
            resolve(queryResponse);
        }).catch(err => {
            reject(err);
        })
    });

}

module.exports = {
    handleSingleCandidate
}