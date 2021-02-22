import jwtDecode from 'jwt-decode'
import axios from 'axios'

export const getLocalStorageToken = () => {
    return localStorage.getItem('jwtToken')
}

export const getDecodedToken = () => {
    let jwtToken = getLocalStorageToken()
    return jwtDecode(jwtToken)
}

// export const getAllUserTodos = async () => {
//     let decodedId = getDecodedToken()
//     try {
//         let results = await axios({
//             method: "get",
//             url: `http://localhost:3003/api/todo/get-user-all-todo/${decodedId._id}`,
//             headers: {
//                 authorization: `Bearer ${getLocalStorageToken()}`
//             },
//         })
//         return results
//     }
//     catch (e) {
//         return e
//     }
// }

// export const handleSubmitTodoAPI = async (todoValue) => {
//     let decoded = getDecodedToken()
//     try {
//         let results = await axios.post(`http://localhost:3003/api/todo/create-todo`,
//             {
//                 todo: todoValue,
//                 _id: decoded._id
//             },
//             {
//                 headers: { authorization: `Bearer ${getLocalStorageToken()}` }
//             }
//         )
//         console.log(results)
//         return results
//     }
//     catch (e) {
//         return e
//     }
// }

// export const handleSubmitDeleteAPI = async (targetId) => {
//     let decoded = getDecodedToken()
//     try {
//         let results = await axios.delete(`http://localhost:3003/api/todo/delete-todo`,
//             {
//                 data: {
//                     userId: decoded._id,
//                     todoId: targetId,
//                 },
//                 headers: {
//                     authorization: `Bearer ${getLocalStorageToken()}`,
//                 }
//             },
//         )
//         console.log(results)
//         return results
//     }
//     catch (e) {
//         return e
//     }
// }

// export const handleSubmitUpdateAPI = async (targetId, editValue) => {
//     try {
//         let results = await axios.put(`http://localhost:3003/api/todo/update-todo`,
//             {
//                 todoId: targetId,
//                 newTodoValue: editValue
//             },
//             {
//                 headers: {
//                     authorization: `Bearer ${getLocalStorageToken()}`
//                 }
//             })
//         return results
//     }
//     catch (e) {
//         return e
//     }
// }


export const apiRequest = async (requestType, dataOjb = {}) => {
    let decodedId = getDecodedToken();
    // if use in server
    let baseURL = `/api`
    // if use locally
    // let baseURL = `http://localhost:3003/api`
    let apiURL

    switch (requestType) {
        case 'get':
            apiURL = `${baseURL}/todo/get-user-all-todo/${decodedId._id}`
            break;

        case 'post':
            apiURL = `${baseURL}/todo/create-todo`
            dataOjb['_id'] = decodedId._id
            break;

        case 'delete':
            apiURL = `${baseURL}/todo/delete-todo`
            dataOjb['userId'] = decodedId._id
            break;

        case 'put':
            apiURL = `${baseURL}/todo/update-todo`
            // dataOjb
            break;

        default:
            break;

    }
    let data = { ...dataOjb}
    const requestOptions = {
        method: requestType,
        ...{data},
        ...{
            headers: {
                authorization: `Bearer ${getLocalStorageToken()}`
            }
        }
    }

    try {
        let results = await axios(apiURL, requestOptions)
        return results
    } catch (e) {
        return e
    }
}