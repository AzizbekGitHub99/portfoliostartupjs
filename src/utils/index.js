import { BASE } from "../consts"

const getImgUrl = (photo) =>{
    return `${BASE}upload/${photo?._id}.${photo?.name?.split(".")[1]}`
}



export default getImgUrl;