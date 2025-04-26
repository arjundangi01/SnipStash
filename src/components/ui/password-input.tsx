import { EyeOff, Eye } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./input";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Input
        color="white"
        className="w-full  bg-transparent text-sm "
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div
        onClick={() => setShowPassword(!showPassword)}
        className="cursor-pointer"
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </div>
    </div>
  );
};

export default PasswordInput;
