import * as yup from "yup"

const registerSchema = yup.object({
    firstName: yup.string().min(3).required(),
    lastName: yup.string().min(3).required(),
    username: yup.string().min(3).required(),
    password: yup.string().min(3).required()
})

export default registerSchema