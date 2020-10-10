var catalyst = require("zcatalyst-sdk-node");

const tableName = "AdminDetail";
const columnAdmin = "Username";
const columnPass = "Password";
const handleAdminLogin = async(req, res) => {
    let adminData = req.fields;
    console.log(adminData);
    let password = adminData.password;
    let username = adminData.username;
    // console.log(adminData);
    // Initializing Catalyst SDK
    var catalystApp = catalyst.initialize(req);

    checkAdmin(catalystApp, password, username)
        .then(resObj => {
            //console.log(resObj);
            if (resObj.value === password && resObj.name === username) {
                res.status(200).send({
                    logged_in: true,
                    message: 'admin is valid',
                });
            }

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


/** get data from data store
 * @param {*} catalystApp 
 * @param {*} password 
 * @param {*} username 
 */
function getDataFromCatalystDataStore(catalystApp, password, username) {
    return new Promise((resolve, reject) => {
        // Queries the Catalyst Data Store table
        catalystApp.zcql().executeZCQLQuery(`Select * from ${tableName} where ${columnPass} = ${password} and ${columnAdmin} = ${username}`).then(queryResponse => {
            resolve(queryResponse);
        }).catch(err => {
            reject(err);
        })
    });

}

const checkAdmin = async(catalystApp, password, username) => {

    let adminDetails = await getDataFromCatalystDataStore(catalystApp, password, username);
    let value = adminDetails[0].AdminDetail.Password;
    let name = adminDetails[0].AdminDetail.Username;
    if (value === password && name === username) {
        return { value, name };
    } else {
        return new Promise.reject({
            message: 'No Admin Found'
        });
    }

}



module.exports = { handleAdminLogin };