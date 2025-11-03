"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import GreenLogo from "@/assets/green-logo";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-1 mb-8">
            <GreenLogo />
          </div>
          {/* <h3 className="font-jost text-[0.92rem] font-bold tracking-[-0.02763rem] uppercase text-[#105E53]">
            SHOPSOMA • DESIGNERS
          </h3> */}
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <h1 className="text-[2rem] font-coconat text-[#105E53] mb-4">
            Thank you for signing up!
          </h1>
          <p className="text-[#105E53] text-sm font-lexend mb-6">
            You're on the list. We'll contact you with our decision in the next
            couple of days
          </p>

          <Button
            onClick={() => window.open("https://shopsoma.com", "_blank")}
            className="bg-[#105E53] hover:bg-[#105E53]/90 text-white h-12 px-6 rounded-[0.75rem] text-sm font-medium"
          >
            Back to Shopsoma.com
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 text-[#105E53] text-xs font-lexend">
          <a href="#" className="hover:text-[#105E53] transition-colors">
            Terms and Conditions
          </a>
          <a href="#" className="hover:text-[#105E53] transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
