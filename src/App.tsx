import { useForm, FieldErrors } from "react-hook-form";
import Error from "./Error";
import { useState } from "react";
import clsx from "clsx";
import Sent from "./Sent";

export default function App() {
  const { register, handleSubmit, reset, formState } = useForm<{
    firstName: string;
    secondName: string;
    email: string;
    enquery: string;
    message: string;
    consent: boolean;
  }>();
  const { errors } = formState;
  const [selectedOption, setSelectedOption] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = function (data: {
    firstName: string;
    secondName: string;
    email: string;
    enquery: string;
    message: string;
    consent: boolean;
  }) {
    console.log(data);
    reset();
    setSelectedOption("");
    setSent(true);
  };

  const onError = function (
    errors: FieldErrors<{
      firstName: string;
      secondName: string;
      email: string;
      enquery: string;
      message: string;
      consent: boolean;
    }>
  ) {
    console.log(errors);
  };
  return (
    <>
      {sent && <Sent />}
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="bg-white max-w-[550px] mx-auto mt-8 py-7 rounded-lg px-8"
      >
        <p className="text-2xl font-semibold mb-5">Contact us</p>
        <div className="flex gap-x-3 mb-3">
          <div className="flex flex-col flex-grow">
            <label htmlFor="first-name" className="text-dark-grey text-md mb-2">
              First name
            </label>
            <input
              type="first-name"
              id="firstName"
              {...register("firstName", {
                required: "This field is required",
              })}
              name="firstName"
              className="border-2 border-grey w-full py-1 rounded-lg"
            />
            {errors?.firstName?.message && (
              <Error>{String(errors.firstName.message)}</Error>
            )}
          </div>
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="second-name"
              className="text-dark-grey text-md mb-2"
            >
              Second name
            </label>
            <input
              type="second-name"
              id="secondName"
              className="border-2 w-full border-grey  py-1  rounded-lg"
              {...register("secondName", {
                required: "This field is required",
              })}
              name="secondName"
            />
            {errors?.secondName?.message && (
              <Error>{String(errors.secondName.message)}</Error>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="email" className="text-dark-grey text-md mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            name="email"
            className="border-2 w-full border-grey  py-1  rounded-lg"
          />
          {errors?.email?.message && (
            <Error>{String(errors.email.message)}</Error>
          )}
        </div>

        <fieldset className="flex gap-x-3 mb-3">
          <legend className="mb-3 text-dark-grey text-md">Query Type</legend>
          <div className="flex flex-col gap-y-2 sm:flex-row items-center flex-grow gap-x-3">
            <label
              className={clsx(
                " text-sm flex cursor-pointer items-center gap-x-2 w-full  py-2 px-4 rounded-lg",
                {
                  "border-[1.5px] border-dark-green bg-light-green":
                    selectedOption === "enquery",
                  "border-[1.5px] border-grey": selectedOption !== "enquery",
                }
              )}
            >
              <input
                type="radio"
                {...register("enquery", {
                  required: "This field is required",
                })}
                name="enquery"
                id="enquery"
                className="peer"
                checked={selectedOption === "enquery"}
                onChange={() => setSelectedOption("enquery")}
              />
              General Enquery
            </label>

            <label
              className={clsx(
                " text-sm flex cursor-pointer items-center gap-x-2 w-full  py-2 px-4 rounded-lg",
                {
                  "border-[1.5px] border-dark-green bg-light-green":
                    selectedOption === "request",
                  "border-[1.5px] border-grey": selectedOption !== "request",
                }
              )}
            >
              <input
                type="radio"
                {...register("enquery", {
                  required: "This field is required",
                })}
                name="request"
                checked={selectedOption === "request"}
                id="request"
                onChange={() => setSelectedOption("request")}
              />
              Support Request
            </label>
          </div>
        </fieldset>
        {errors?.enquery?.message && (
          <p className="text-sm text-red">Please select a query type</p>
        )}

        <div className="flex flex-col">
          <label htmlFor="message" className="text-dark-grey text-md mb-2">
            Message
          </label>
          <textarea
            rows={3}
            id="message"
            {...register("message", {
              required: "This field is required",
            })}
            name="message"
            className="border-2  w-full border-grey resize-none  py-1  rounded-lg"
          />
          {errors?.message?.message && (
            <Error>{String(errors.message.message)}</Error>
          )}
        </div>

        <div className=" mt-5">
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="checkbox"
              className="w-4 h-4"
              {...register("consent", {
                required:
                  "To submit this form, please consent to being contacted",
              })}
              name="consent"
            />
            <label htmlFor="checkbox" className="text-dark-grey text-md">
              I consent to being contacted by the team
            </label>
          </div>
          {errors?.consent?.message && (
            <Error>{String(errors.consent.message)}</Error>
          )}
        </div>

        <button className="bg-dark-green w-full mt-5 rounded-lg text-white py-2 px-3">
          Submit
        </button>
      </form>
    </>
  );
}
