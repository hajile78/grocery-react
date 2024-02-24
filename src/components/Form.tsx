import React, { FormEventHandler, useState } from "react";

type event = {};

export default function Form() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    let myForm: HTMLFormElement = document.getElementById(
      "contact"
    ) as HTMLFormElement;
    let formData: URLSearchParams = new FormData(myForm) as URLSearchParams;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setSuccess(true);
        myForm.reset();
      })
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
