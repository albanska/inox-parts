import { useState } from "react";

function FooterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    betref: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Construct the mailto link
    const { name, email, betref, message } = formData;
    const mailtoLink = `mailto:info@inoxparts.ch?subject=${encodeURIComponent(
      betref
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    )}`;

    // Open the user's email client with the prefilled email
    window.location.href = mailtoLink;
  };

  return (
    <>
      <form className="flex flex-col gap-4 md:gap-2" onSubmit={handleSubmit}>
        <h2 className="text-[32px] font-bold mt-4 md:mt-0 uppercase textColor">
          Haben Sie Fragen?
        </h2>
        <div className="flex flex-col gap-4 md:gap-2 md:flex-row lg:gap-8 lg:mb-4">
          <div className="md:flex-1">
            <label htmlFor="name" className="hidden" />
            <input
              type="text"
              id="name"
              name="name"
              className="border w-full h-10 rounded-sm ps-2 bg-white font-semibold opacity-50"
              placeholder="Firma"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="md:flex-1">
            <label htmlFor="email" className="hidden" />
            <input
              type="text"
              id="email"
              name="email"
              className="border w-full h-10 rounded-sm ps-2 bg-white font-semibold opacity-50"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="md:flex-1">
            <label htmlFor="betref" className="hidden" />
            <input
              type="text"
              id="betref"
              name="betref"
              className="border w-full h-10 rounded-sm ps-2 bg-white font-semibold opacity-50"
              placeholder="Betreff"
              value={formData.betref}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="hidden" />
          <textarea
            name="message"
            id="message"
            className="border w-full min-h-[100px] rounded-sm ps-2 bg-white md:min-h-[50px] lg:min-h-[200px] font-semibold opacity-50"
            placeholder="Ihre Nachricht"
            style={{ paddingBlockStart: "8px" }}
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="md:flex md:justify-between md:items-center">
          <button
            type="submit"
            className={`text-[15px] tracking-tighter font-semibold border-2 border-[#2aa7df] px-6 py-3 block w-fit md:rounded-md md:py-2 md:px-7 mt-2 lg:mt-6 textColor`}
          >
            NACHRICHT SENDEN
          </button>
        </div>
      </form>
    </>
  );
}

export default FooterForm;
