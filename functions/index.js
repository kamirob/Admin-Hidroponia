const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.saveLogDataApp = functions.firestore.document('Equipments/{equipment_id}/DataApp/{dataequipment_id}').onUpdate(async(event, context) => {

    const equipment_id = context.params.equipment_id;
    const dataequipment_id = context.params.dataequipment_id;

    let response = await admin.firestore().collection("Solicitudes").doc(request_id).collection('Answers').doc(answer_id).get().then(doc => {

        tokenTeacher = doc.data().tokenTeacher;
        extensionDoc = doc.data().extensionDocument;
        image = doc.data().document;
        answer = doc.data().answer;


        const payload = {
            notification:{
                title: 'Respondieron tu pregunta',
                body: answer,
                soundName: 'default',
                priority: 'hight',
                image:'https://firebasestorage.googleapis.com/v0/b/resolvemos-ya.appspot.com/o/FCMImages%2F%C2%A1Te%20respondieron!.png?alt=media&token=c6f80e98-3f3f-4d5e-bb88-b0d53cc7acb7'
            },
        };

        const payloadImage = {
            notification:{
                title: 'Respondieron tu pregunta',
                body: answer,
                soundName: 'default',
                priority: 'hight',
                image: image+"?height=600"
            },
        };

        if (extensionDoc == 'image/jpeg'){
            return admin.messaging().sendToDevice(tokenTeacher, payloadImage);
        } else {
            return admin.messaging().sendToDevice(tokenTeacher, payload);
        }
        
    });

})