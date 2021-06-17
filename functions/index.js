const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.saveLogDataApp = functions.firestore.document('Equipments/{equipment_id}/Logs/{log_id}').onCreate(async(event, context) => {

    const equipment_id = context.params.equipment_id;
    const log_id = context.params.log_id;

    let response = await admin.firestore().collection("Equipments").doc(equipment_id).collection('Logs').doc(log_id).get().then(doc => {

        date = doc.data().date;
        description = doc.data().description;

        if (description != ''){
            admin.firestore()
            .collection('Equipments')
            .doc(equipment_id)
            .set({
                dateLastLog: date,
                descriptionLastLog: description
            },{merge:true})
        }
        
    });

})