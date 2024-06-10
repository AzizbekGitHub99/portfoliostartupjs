import * as yup from "yup"

const loginSchema = yup.object({
    username: yup.string().required("Username is a required please field !"),
    password: yup.string().min(3, "Password must be at least 3 characters").required()
})

export default loginSchema 