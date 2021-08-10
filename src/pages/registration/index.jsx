import React from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import { userSchema } from "../../validations/userValidations";
import { yupResolver } from "@hookform/resolvers/yup";

export const Registration = React.memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = (data) => {
    const { firstName, lastName, password, email, passwordConfirmation } = data;

    const result = {
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    };
    api
      .post("/users", result)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  return (
    <div className="text-center">
      <h1 className="h3 mb-1 font-weight-normal">Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-signin">
        <input
          {...register("firstName")}
          variant="outlined"
          name="firstName"
          placeholder="Enter first name"
          className="form-control"
        />
        <p>{errors.firstName?.message} </p>
        <input
          {...register("lastName")}
          variant="outlined"
          name="lastName"
          placeholder="Enter last name"
          className="form-control"
        />
        <p>{errors.lastName?.message} </p>
        <input
          {...register("email")}
          variant="outlined"
          name="email"
          placeholder="Email"
          className="form-control"
          type="email"
        />
        <p>{errors.email?.message} </p>
        <input
          {...register("password")}
          type="password"
          name="password"
          placeholder="Password"
          className="form-control"
        />
        <p>{errors.password?.message} </p>
        <input
          {...register("passwordConfirmation")}
          type="password"
          name="passwordConfirmation"
          placeholder="Password confirmation"
          className="form-control"
        />
        <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
});
