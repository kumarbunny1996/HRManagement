var catalyst = require("zcatalyst-sdk-node");


const handleEmailRequest = async(req, res) => {
    let rowId = req.query.row_id;
    let configObj = req.fields;
    console.log(configObj, rowId);
    let catalystApp = catalyst.initialize(req);
    sendEmailRequest(catalystApp, configObj, rowId)
        .then(resObj => {
            console.log(resObj);
            res.status(200).send(resObj);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ msg: "Email request has been failed", isSend: false });
        });
}

const sendEmailRequest = async(catalystApp, configObj, rowId) => {
    //Create a config object with the email configuration
    let config = {
        from_email: 'just.hr12@gmail.com',
        to_email: configObj.to,
        subject: configObj.subject,
        content: configObj.content
    };
    let mail = await mailRequest(catalystApp, config);
    if (mail) {
        //Data to be updated along with the ROWID
        let updatedRowData = {
            Status: `approved`,
            ROWID: rowId
        }

        //Use Table Meta Object to update a multiple rows using ROWIDs which returns a promise
        let datastore = catalystApp.datastore();
        let table = datastore.table('CandidateDetails');
        let rowPromise = table.updateRow(updatedRowData);
        rowPromise.then((row) => {
            console.log(row);
        });

        return {
            isSend: true,
            msg: 'Your mail has been sent successfully'
        }
    }

}

const mailRequest = (catalystApp, config) => {
    return new Promise((resolve, reject) => {
        //Send the mail by passing the config object to the method which in turn returns a promise
        let email = catalystApp.email();
        let mailPromise = email.sendMail(config);
        mailPromise.then((mailObject) => {
                console.log(mailObject);
                resolve(mailObject);
            })
            .catch(err => {
                reject(err);
            })
    });
}




module.exports = {
    handleEmailRequest
}