import React, { useState } from "react";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default function Form() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let myForm = document.getElementById("contact");
    let formData = new FormData(myForm);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setSuccess(true))
      .catch((error) => console.log(error));
  };

  return (
    <>
      {success && (
        <p style={{ color: "green" }}>Successfully submitted form!</p>
      )}
      <form
        name="contact"
        id="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label htmlFor="name">Name</label> <br />
          <input type="text" id="name" name="name" required />
        </p>
        <p>
          <label htmlFor="email">Email</label> <br />
          <input type="email" id="email" name="email" required />
        </p>
        <p>
          <label htmlFor="message">Message</label> <br />
          <textarea id="message" name="message" required></textarea>
        </p>
        <p>
          <input type="submit" value="Submit message" />
        </p>
      </form>
    </>
  );
}
