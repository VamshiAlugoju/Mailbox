import React from "react";

type AuthInputProps = {
  value?: string | number | readonly string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  children?: React.ReactNode;
};
// function AuthInput({
//   value,
//   handleChange,
//   type,
//   name,
//   placeholder,
//   required,
//   children
// }:React.FunctionComponent< AuthInputProps>) {
//   return (
//     <div>
//       <input
//         type={type}
//         name={name}
//         placeholder={placeholder}
//         value={value}
//         onChange={handleChange}
//         className="w-full p-3 rounded bg-transparent border border-gray-700 text-white focus:border-white focus:outline-none"
//         required={required}
//       />
//       {children}
//     </div>
//   );
// }

const AuthInput: React.FC<AuthInputProps> = ({
  value,
  handleChange,
  type,
  name,
  placeholder,
  required,
  children,
}) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="w-full p-3 rounded bg-transparent border border-gray-700 text-white focus:border-white focus:outline-none"
      required={required}
    />
    {children}
  </div>
);

export default AuthInput;
