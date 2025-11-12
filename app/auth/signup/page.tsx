"use client";
import React, { useState } from "react";
import Full from "@/assets/full";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import GreenLogo from "@/assets/green-logo";
import Image from "next/image";
import { registerVendor, VendorRegistrationRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import ThankYouPage from "@/components/thank-you-page";

const SignupPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Basic User Information
    username: "",
    password: "",
    confirmPassword: "",

    // Personal Info
    firstName: "",
    lastName: "",
    phone: "",
    email: "",

    // Business Info
    businessName: "",
    businessLocation: "",
    businessRegistered: "",
    cacDetails: "",
    businessYears: "",
    brandSpecial: "",
    websiteLink: "",
    socialMedia: "",

    // Product/Services
    products: [] as string[],

    // Local Sourcing
    localSourcing: "",
  });

  const productOptions = [
    "Women's Fashion",
    "Men's Fashion",
    "Jewelry",
    "Bags/Accessories",
    "Skincare",
    "Beauty and Makeup",
    "Homewares",
  ];

  const localSourcingOptions = [
    "We source all our products locally - 100%",
    "We source most locally",
    "We source some locally",
    "We don't source locally - 0%",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.includes(option)
        ? prev.products.filter((p) => p !== option)
        : [...prev.products, option],
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      localSourcing: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Validation functions
  const validateStep1 = () => {
    const {
      firstName,
      lastName,
      phone,
      email,
      username,
      password,
      confirmPassword,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all required fields");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    const {
      businessName,
      businessLocation,
      businessRegistered,
      products,
      localSourcing,
      businessYears,
      brandSpecial,
    } = formData;

    if (
      !businessName ||
      !businessLocation ||
      !businessRegistered ||
      !localSourcing ||
      !businessYears ||
      !brandSpecial
    ) {
      setError("Please fill in all required fields");
      return false;
    }

    if (products.length === 0) {
      setError("Please select at least one product/service category");
      return false;
    }

    if (businessRegistered.toLowerCase() === "yes" && !formData.cacDetails) {
      setError("CAC details are required for registered businesses");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate all steps
    if (!validateStep1() || !validateStep2()) {
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsLoading(true);

    try {
      // Transform form data to API format
      const apiData: VendorRegistrationRequest = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: `+234${formData.phone.replace(/\s/g, "")}`,
        business_name: formData.businessName,
        business_location: formData.businessLocation,
        is_business_registered:
          formData.businessRegistered.toLowerCase() === "yes" ? "yes" : "no",
        cac_details:
          formData.businessRegistered.toLowerCase() === "yes"
            ? formData.cacDetails
            : undefined,
        products_services: formData.products as any[],
        local_sourcing_percentage: formData.localSourcing as any,
        years_in_business: formData.businessYears,
        brand_special: formData.brandSpecial,
        website_link: formData.websiteLink || undefined,
        social_media_handles: formData.socialMedia || undefined,
      };

      const response = await registerVendor(apiData);

      if (response.success) {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsLoading(false);
    }
  };

  // Show thank you page if registration was successful
  if (success) {
    return <ThankYouPage />;
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-1 mb-8">
          <GreenLogo />
          {/* <div className="bg-[#464646] rounded-full w-1 h-1"></div>
          <h3 className="font-jost text-[0.92rem] font-bold tracking-[-0.02763rem] uppercase text-[#3D3D3D]">
            Designers
          </h3> */}
        </div>

        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-[2.5rem] font-coconat text-[#105E53] mb-2">
            Wanna join the Shopsoma Family?
          </h1>
          <p className="text-[1.5rem] font-coconat text-[#105E53]">
            Sign up below!
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-[#DC2626] p-4 rounded-3xl shadow-sm mb-6 text-white text-sm font-lexend">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-[#105E53] p-4 rounded-3xl shadow-sm mb-6 text-white text-sm font-lexend">
            Registration successful! Redirecting to login page...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Personal Info Section */}
          {currentStep === 1 && (
            <div className="bg-[#fafafa] rounded-3xl shadow-sm p-8 mb-6 border border-[#DCDCDC]">
              <div className="mb-6">
                <h2 className="text-[#656565] text-sm font-lexend mb-2">
                  Personal Info
                </h2>
                <h3 className="text-[#3D3D3D] text-xl font-lexend mb-2">
                  Hello! We would love to know you
                </h3>
                <p className="text-[#656565] text-sm font-lexend">
                  Please fill the information below
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                  />
                </div>
                <div>
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex">
                  <select className="h-12 px-3 border border-r-0 border-[#DCDCDC] rounded-l-[0.75rem] bg-white text-[#989898] text-sm">
                    <option>+234</option>
                  </select>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="000 000 000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-12 border bg-white border-[#DCDCDC] rounded-r-[0.75rem] rounded-l-none placeholder:text-[#989898] placeholder:text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Input
                  name="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                />
              </div>

              <div className="mb-4">
                <Input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                  />
                </div>
                <div>
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={handleNext}
                className="bg-white border border-[#DCDCDC] text-[#3D3D3D] hover:bg-gray-50 h-10 px-4 rounded-[0.75rem] text-sm font-medium"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Business Information Section */}
          {currentStep === 2 && (
            <div className="bg-[#fafafa] rounded-3xl shadow-sm p-8 mb-6 border border-[#DCDCDC]">
              <div className="mb-6">
                <h2 className="text-[#656565] text-sm font-lexend mb-2">
                  Business Information
                </h2>
                <h3 className="text-[#3D3D3D] text-xl font-lexend mb-2">
                  Now that we're Acquainted, Tell us about your Brand
                </h3>
                <p className="text-[#656565] text-sm font-lexend">
                  Please fill the information below
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[#3D3D3D] text-sm font-lexend mb-2">
                    What's your business name?
                  </label>
                  <Input
                    name="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#3D3D3D] text-sm font-lexend mb-2">
                    Where is your business located?
                  </label>
                  <p className="text-[#656565] text-xs font-lexend mb-2">
                    (Kindly share a detailed address, we need this to assign you
                    a collection agent)
                  </p>
                  <Input
                    name="businessLocation"
                    type="text"
                    value={formData.businessLocation}
                    onChange={handleInputChange}
                    className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#3D3D3D] text-sm font-lexend mb-2">
                    Is your business registered?
                  </label>
                  <p className="text-[#656565] text-xs font-lexend mb-2">
                    If 'YES' please provide us the CAC details. If it isn't
                    registered just answer 'NO' below.
                  </p>
                  <Input
                    name="businessRegistered"
                    type="text"
                    placeholder="YES or NO"
                    value={formData.businessRegistered}
                    onChange={handleInputChange}
                    className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                  />
                </div>

                {formData.businessRegistered.toLowerCase() === "yes" && (
                  <div>
                    <label className="block text-[#3D3D3D] text-sm font-lexend mb-2">
                      CAC Details
                    </label>
                    <Input
                      name="cacDetails"
                      type="text"
                      placeholder="Enter your CAC registration number"
                      value={formData.cacDetails}
                      onChange={handleInputChange}
                      className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Product/Services Section */}
              <div className="mb-6">
                <h4 className="text-[#3D3D3D] text-sm font-lexend mb-2">
                  What products/services does your company offer?
                </h4>
                <p className="text-[#656565] text-xs font-lexend mb-4">
                  Select all that apply
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {productOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.products.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="w-4 h-4 border border-[#DCDCDC] rounded text-[#105E53] focus:ring-[#105E53]"
                      />
                      <span className="text-[#3D3D3D] text-sm font-lexend">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Local Sourcing Section */}
              <div className="mb-6">
                <h4 className="text-[#3D3D3D] text-sm font-lexend mb-2">
                  What percentage of your products are made locally?
                </h4>
                <p className="text-[#656565] text-xs font-lexend mb-4">
                  Select all that apply
                </p>
                <div className="space-y-2">
                  {localSourcingOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="localSourcing"
                        value={option}
                        checked={formData.localSourcing === option}
                        onChange={() => handleRadioChange(option)}
                        className="w-4 h-4 border border-[#DCDCDC] text-[#105E53] focus:ring-[#105E53]"
                      />
                      <span className="text-[#3D3D3D] text-sm font-lexend">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[#3D3D3D] text-sm font-lexend mb-2">
                    How many years have you been actively in business?
                  </label>
                  <Input
                    name="businessYears"
                    type="text"
                    value={formData.businessYears}
                    onChange={handleInputChange}
                    className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#3D3D3D] text-sm font-lexend mb-2">
                    What makes your brand extra special?
                  </label>
                  <p className="text-[#656565] text-xs font-lexend mb-2">
                    This will help us highlight the authenticity of your
                    products to our audience and help your products get sold
                    quicker.
                  </p>
                  <Input
                    name="brandSpecial"
                    type="text"
                    value={formData.brandSpecial}
                    onChange={handleInputChange}
                    className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#3D3D3D] text-sm font-lexend mb-2">
                    Your Website Link
                  </label>
                  <p className="text-[#656565] text-xs font-lexend mb-2">
                    If you don't have an existing website at the moment please
                    write "NO".
                  </p>
                  <Input
                    name="websiteLink"
                    type="url"
                    value={formData.websiteLink}
                    onChange={handleInputChange}
                    className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#3D3D3D] text-sm font-lexend mb-2">
                    Your brands social media handle(s).
                  </label>
                  <Input
                    name="socialMedia"
                    type="text"
                    value={formData.socialMedia}
                    onChange={handleInputChange}
                    className="h-12 border bg-white border-[#DCDCDC] rounded-[0.75rem] placeholder:text-[#989898] placeholder:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-white border border-[#DCDCDC] text-[#3D3D3D] hover:bg-gray-50 h-10 px-4 rounded-[0.75rem] text-sm font-medium"
                >
                  Previous
                </Button>
              </div>
            </div>
          )}

          {/* Submit Button - Only show on step 2 */}
          {currentStep === 2 && (
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading || success}
                className="bg-[#105E53] hover:bg-[#105E53]/90 text-white h-12 px-8 rounded-[0.75rem] text-sm font-medium disabled:opacity-50"
              >
                {isLoading
                  ? "Submitting..."
                  : success
                  ? "Registration Successful!"
                  : "Submit Form"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
