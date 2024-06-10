import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import request from "../../../server/request";
import { useState } from "react";
import loginSchema from "../../../schemas/login";
import { TOKEN, USER } from "../../../consts";
import { controlLoading, setAuth } from "../../../redux/slice/auth";

import hide from "../../../assets/images/hide.png";
import show from "../../../assets/images/show.png";

import "./style.scss";

const LoginPage = () => {
  const [typePassword, setTypePassqword] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    try {
      dispatch(controlLoading());
      const {
        data: { token, user },
      } = await request.post("auth/login", values);
      navigate("/dashboard");
      Cookies.set(TOKEN, token);
      localStorage.setItem(USER, JSON.stringify(user));
      dispatch(setAuth(user));
      request.defaults.headers.Authorization = "Bearer " + token;
    } finally {
      dispatch(controlLoading());
    }
  };

  const handlePassword = () =>{
    setTypePassqword(!typePassword);
  }

  return (
    <section className="login">
      <div className="login__container">
        <h1 className="login__title">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="login__form">
          <input
            className={`login__form__input ${
              errors.username ? "login__form__input__valid" : null
            } `}
            type="text"
            placeholder="Username"
            {...register("username")}
          />
          <p>{errors.username?.message}</p>
          <div style={{width: "100%"}}>
            <input
              className={`login__form__input ${
                errors.password ? "login__form__input__valid" : null
              } `}
              type={typePassword ? "password" : "text"}
              placeholder="Password"
              {...register("password")}
            />
            <button className="login__password-hide" type="button" onClick={handlePassword}>
              <img width={25} src={typePassword ? hide : show} alt="hide icon" />
            </button>
          </div>
          <p>{errors.password?.message}</p>
          <button disabled={loading} className="login__form__btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
