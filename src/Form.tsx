import React, { useState, FormEvent, ChangeEvent } from "react";

type FormProps = {
  title?: string;
};

const Form: React.FC<FormProps> = ({ title }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessage(`
        Form enviado!
            Name: ${name}
            Email: ${email}
    `);
    console.log("Form Submitted:", { name, email });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-4">
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {title}
        </h2>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nome
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Enviar
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-green-600 font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default Form;
