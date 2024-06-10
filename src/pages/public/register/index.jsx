import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TOKEN, USER } from "../../../consts";
import { controlLoading, setAuth } from "../../../redux/slice/auth";
import request from "../../../server/request";
import registerSchema from "../../../schemas/register";

import "./style.scss";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = async(data) => {
    try{
      dispatch(controlLoading());
      const {
        data: { token, user },
      } = await request.post("auth/register", data)
      navigate("/dashboard");
      Cookies.set(TOKEN, token);
      localStorage.setItem(USER, JSON.stringify(user));
      dispatch(setAuth(user));
      request.defaults.headers.Authorization = "Bearer " + token;
      reset()
    }finally{
      dispatch(controlLoading());
    }
  }

  return (
    <section className="register">
      <form className="register__form" onSubmit={handleSubmit(onSubmit)}> 
        <input className={`register__input ${errors.firstName ? "register__input__valid" : null}`} type="text" placeholder="Firstname" {...register("firstName")} />
        <p>{errors.firstName?.firstName}</p>
        <input className={`register__input ${errors.lastName ? "register__input__valid" : null}`} type="text" placeholder="Lastname" {...register("lastName")} />
        <p>{errors.firstName?.lastName}</p>
        <input className={`register__input ${errors.username ? "register__input__valid" : null}`} type="text" placeholder="Username" {...register("username")} />
        <p>{errors.firstName?.username}</p>
        <input className={`register__input ${errors.password ? "register__input__valid" : null}`} type="password" placeholder="Password" {...register("password")} />
        <p>{errors.firstName?.password}</p>
        <button disabled={loading} className="register__btn" type="submit">Register</button>
      </form>
      </section>
  )
}

export default RegisterPage