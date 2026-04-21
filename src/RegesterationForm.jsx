import { useState } from "react";

function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: ""
  });

  function validate(field, value, updatedForm) {
    let error = "";

    if (field === "name") {
      if (value === "") error = "Name is required";
      else if (value.length < 3) error = "Min 3 characters";
    }

    if (field === "email") {
      if (value === "") error = "Email is required";
      else if (!value.includes("@")) error = "Enter valid email";
    }

    if (field === "password") {
      if (value === "") error = "Password required";
      else if (value.length < 6) error = "Min 6 characters";
    }

    if (field === "confirmPassword") {
      if (value === "") error = "Confirm password";
      else if (value !== updatedForm.password) error = "Passwords do not match";
    }

    if (field === "terms") {
      if (!value) error = "Accept terms";
    }

    return error;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    const updatedForm = {
      ...form,
      [name]: newValue
    };

    setForm(updatedForm);

    setErrors({
      ...errors,
      [name]: validate(name, newValue, updatedForm)
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};

    Object.keys(form).forEach((key) => {
      newErrors[key] = validate(key, form[key], form);
    });

    setErrors(newErrors);

    let hasError = Object.values(newErrors).some((item) => item);

    if (hasError) return;

    alert("Registration Successful");
  }

  let isDisabled =
    Object.values(errors).some((e) => e) ||
    form.name === "" ||
    form.email === "" ||
    form.password === "" ||
    form.confirmPassword === "" ||
    !form.terms;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-96 space-y-3"
      >
        <h2 className="text-lg font-semibold text-center">Register</h2>

        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={`w-full border p-2 rounded ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full border p-2 rounded ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full border p-2 rounded ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className={`w-full border p-2 rounded ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
          />
          <span>Accept Terms</span>
        </div>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

        <button
          disabled={isDisabled}
          className={`w-full p-2 rounded text-white ${
            isDisabled ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;