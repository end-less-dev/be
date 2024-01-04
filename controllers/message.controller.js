const models = require("../models")
const {v4 : uuidV4} = require('uuid')


function createMessage(request,response) {
    const data = {
        messageId  : uuidV4(),
        messages : request.body.messages,
        userId : request.body.user_id
    }

    models.Message.create(data).then((result)=>{
        response.status(201).json({
            messages : "message posted !",
            data : result
        })
    }).catch(error =>{
        response.status(500).json({
            message : "Somethig went wrong!",
            return_code : -1,
            error : error
        })
    })
}

function getMessageByUserId(request,response) {
    const user_id = request.params.userId

    models.Message.findAll({where: {userId : user_id}}).then(result =>{
        if (result.length > 0) {
            response.status(201).json({
                message : "Successfully fetched !",
                data : result
            })
        }else{
            response.status(401).json({
                message  : "user not found !"
            })
        }
    }).catch(error =>{
        response.status(201).json({
            message : "Something went wrong",
            error : error
        })
    })
}

module.exports = {
    createMessage : createMessage,
    getMessageByUserId : getMessageByUserId
}