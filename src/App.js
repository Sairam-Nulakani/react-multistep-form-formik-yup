import { useState } from "react";
import "./App.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function App() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const makeRequest = (formData) => {
    console.log("Form Submitted", formData);
  };
  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];
  console.log("data", data);
  return (
    <div className="App">
      <h1>React Multi Step Form with Formik & Yup</h1>
      {steps[currentStep]}
    </div>
  );
}

export default App;
const stepOneValidationSchema = Yup.object({
  first_name: Yup.string().required().label("First Name"),
  last_name: Yup.string().required().label("Last Name"),
});

const StepOne = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };
  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <p>First Name</p>
          <Field name="first_name" />
          <ErrorMessage name="first_name" />
          <p>Last Name</p>
          <Field name="last_name" />
          <ErrorMessage name="last_name" />
          <button type="submit">Next</button>
        </Form>
      )}
    </Formik>
  );
};

const stepTwoValidationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  last_name: Yup.string().required().label("Password"),
});

const StepTwo = (props) => {
  const handleSubmit = (values) => {
    props.next(values, true);
  };
  return (
    <Formik
      validationSchema={stepTwoValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <p>Email</p>
          <Field name="email" />
          <ErrorMessage name="email" />
          <p>Password</p>
          <Field name="password" />
          <ErrorMessage name="password" />
          <button type="button" onClick={() => props.prev(values)}>
            Back
          </button>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
