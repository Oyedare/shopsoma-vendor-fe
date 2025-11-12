"use client";
import Full from "@/assets/full";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Mail } from "lucide-react";
import Bg from "@/assets/auth-bg.png";
import Image from "next/image";
import LoginArrow from "@/assets/login-arrow";
import PasswordIcon from "@/assets/password-icon";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(formData.username, formData.password);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-screen p-4">
      {/* Left Side - Login Form */}
      <div className="flex-1 bg-white flex flex-col items-center justify-between p-8">
        {/* Header */}
        <div className="flex items-center gap-1">
          <Full />
          <div className="bg-[#464646] rounded-full w-1 h-1"></div>
          <h3 className="font-jost text-[0.92rem] font-bold tracking-[-0.02763rem] uppercase text-[#3D3D3D]">
            Designers
          </h3>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md relative">
          {error && (
            <div className="bg-[#DC2626] absolute -top-[8%] left-1/2 -translate-x-1/2 transform p-3 shadow-sm rounded-3xl z-0 pointer-events-none w-[28rem] h-[11.5rem] flex justify-center font-lexend text-xs tracking-[-0.0225rem] font-normal text-white">
              {error}
              {/* <span className="font-bold">4 Attemps left</span> */}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-[#fafafa] rounded-3xl shadow-sm p-5 w-[28rem] flex flex-col gap-10 border border-[#DCDCDC] relative z-10"
          >
            {/* Error Message */}
            <div className="flex flex-col items-center gap-[1.375rem]">
              <LoginArrow />

              <div className="flex flex-col gap-2 items-center justify-center">
                <h1 className="text-[1.3125rem] tracking-[-0.03938rem] font-coconat text-[#3D3D3D]">
                  Welcome back to Shopsoma!
                </h1>
                <p className="text-[#656565] text-center text-xs tracking-[-0.0075rem w-[16.5rem]">
                  You can only log in using the details provided by the support
                  team
                </p>
              </div>
            </div>

            {/* Input Fields */}
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="px-10 h-12 border bg-[#FAFAFA] border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-xs"
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <PasswordIcon />
                </div>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="px-10 h-12 border bg-[#FAFAFA] border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-xs"
                />
                <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-black text-xs tracking-[-0.0225rem]"
                >
                  Forgot Password?
                </a>
                <a
                  href="#"
                  className="text-[#105E53] text-xs tracking-[-0.0225rem]"
                >
                  Contact Support
                </a>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full p-3 bg-[#105E53] hover:bg-[#105E53]/90 text-[#fafafa] cursor-pointer h-10 text-xs tracking-[-0.0225rem] font-medium rounded-[0.75rem] disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-[#105E53] text-xs tracking-[-0.0225rem]">
          Wrong place? Back to Shopsoma.com
        </p>
      </div>

      {/* Right Side - Beauty Advertisement */}
      <div className="flex-1 relative overflow-hidden border border-[#DCDCDC] rounded-3xl">
        <Image
          src={Bg}
          alt="Background"
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
    </div>
  );
};

export default Login;
