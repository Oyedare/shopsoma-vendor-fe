"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Upload,
  Edit3,
  Info,
  Plus,
  Trash2,
  AlertTriangle,
  Clock,
  MapPin,
  CreditCard,
  Building2,
} from "lucide-react";
import Image from "next/image";
import BannerImage from "@/assets/products.png";
import Logo from "@/assets/demo-logo.svg";
import BrandInfo from "./settings-brand-info";
import SettingsPayout from "./settings-payout";
import SettingsSecurity from "./settings-security";
import {
  getStoreSettings,
  updateStoreSettings,
  getContactInformation,
  addContactInformation,
  updateContactInformation,
  deleteContactInformation,
  getAccountDetails,
  addAccountDetails,
  updateAccountDetails,
  deleteAccountDetails,
  disableStore,
  enableStore,
  getDeletionStatus,
  deleteStore,
  StoreSettings,
  ContactInfo,
  AccountDetail,
} from "@/lib/api";

export function StorefrontSettingsSection() {
  const [activeSection, setActiveSection] = useState("brand-info");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // API State Management
  const [storeSettings, setStoreSettings] = useState<StoreSettings | null>(
    null
  );
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [accountDetails, setAccountDetails] = useState<AccountDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deletionStatus, setDeletionStatus] = useState<any>(null);

  // Image upload states
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [logoPreview, setLogoPreview] = useState<string>("");

  // Dynamic form states
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [newContact, setNewContact] = useState({
    email: "",
    phone: "",
    type: "secondary" as "primary" | "secondary",
  });
  const [newPayment, setNewPayment] = useState({
    account_type: "savings" as "savings" | "current" | "checking" | "business",
    bank_name: "",
    account_number: "",
    account_name: "",
    is_primary: false,
  });

  const [formData, setFormData] = useState({
    // Brand Info
    brandName: "",
    phoneNumber: "",
    emailAddress: "",
    brandDescription: "",

    // Address Info
    country: "",
    shippingAddress: "",
    returningAddress: "",
    sameAsShipping: true,

    // Open Hours
    openDays: [] as string[],
    openHours: "08:00",
    closingHours: "22:00",

    // Payout Info
    defaultPaymentMethod: "stripe",
    tin: "",
    paymentTimeline: "30",
    accountType: "checking",
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      openDays: prev.openDays.includes(day)
        ? prev.openDays.filter((d) => d !== day)
        : [...prev.openDays, day],
    }));
  };

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  // Debug: Log form data changes
  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);

  // Data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [
          settingsResponse,
          contactResponse,
          accountResponse,
          deletionResponse,
        ] = await Promise.all([
          getStoreSettings(),
          getContactInformation(),
          getAccountDetails(),
          getDeletionStatus(),
        ]);

        setStoreSettings(settingsResponse.store_settings);
        setContactInfo(contactResponse.contact_information);
        setAccountDetails(accountResponse.account_details);
        setDeletionStatus(deletionResponse);

        console.log(
          "API Response - Store Settings:",
          settingsResponse.store_settings
        );
        console.log(
          "API Response - Contact Info:",
          contactResponse.contact_information
        );
        console.log(
          "API Response - Account Details:",
          accountResponse.account_details
        );

        // Update form data with API response
        const newFormData = {
          brandName: settingsResponse.store_settings.brand_name || "",
          phoneNumber: settingsResponse.store_settings.phone || "",
          emailAddress: settingsResponse.store_settings.email || "",
          brandDescription:
            settingsResponse.store_settings.brand_description || "",
          country: settingsResponse.store_settings.shipping_country || "",
          shippingAddress:
            settingsResponse.store_settings.shipping_address || "",
          returningAddress:
            settingsResponse.store_settings.returning_address || "",
          sameAsShipping:
            settingsResponse.store_settings.shipping_address ===
            settingsResponse.store_settings.returning_address,
          openDays: settingsResponse.store_settings.open_days || [],
          openHours: settingsResponse.store_settings.opening_hours || "08:00",
          closingHours:
            settingsResponse.store_settings.closing_hours || "22:00",
          tin: settingsResponse.store_settings.tin_number || "",
          defaultPaymentMethod:
            settingsResponse.store_settings.default_payment_method || "stripe",
          paymentTimeline:
            settingsResponse.store_settings.auto_payment_timeline || "30",
          accountType:
            accountResponse.account_details[0]?.account_type || "savings",
          bankName: accountResponse.account_details[0]?.bank_name || "",
          accountNumber:
            accountResponse.account_details[0]?.account_number || "",
          accountName: accountResponse.account_details[0]?.account_name || "",
        };

        console.log("Setting form data from API:", newFormData);
        setFormData(newFormData);
      } catch (err: any) {
        setError(err.message || "Failed to load store settings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Scroll detection for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["brand-info", "payout-information", "security"];
      let currentSection = "brand-info";

      for (const section of sections) {
        const element = sectionRefs.current[section];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Refresh all data function
  const refreshAllData = async () => {
    try {
      setIsRefreshing(true);
      const [
        settingsResponse,
        contactResponse,
        accountResponse,
        deletionResponse,
      ] = await Promise.all([
        getStoreSettings(),
        getContactInformation(),
        getAccountDetails(),
        getDeletionStatus(),
      ]);

      setStoreSettings(settingsResponse.store_settings);
      setContactInfo(contactResponse.contact_information);
      setAccountDetails(accountResponse.account_details);
      setDeletionStatus(deletionResponse);

      // Update form data with fresh API response
      const refreshedFormData = {
        brandName: settingsResponse.store_settings.brand_name || "",
        phoneNumber: settingsResponse.store_settings.phone || "",
        emailAddress: settingsResponse.store_settings.email || "",
        brandDescription:
          settingsResponse.store_settings.brand_description || "",
        country: settingsResponse.store_settings.shipping_country || "",
        shippingAddress: settingsResponse.store_settings.shipping_address || "",
        returningAddress:
          settingsResponse.store_settings.returning_address || "",
        sameAsShipping:
          settingsResponse.store_settings.shipping_address ===
          settingsResponse.store_settings.returning_address,
        openDays: settingsResponse.store_settings.open_days || [],
        openHours: settingsResponse.store_settings.opening_hours || "08:00",
        closingHours: settingsResponse.store_settings.closing_hours || "22:00",
        tin: settingsResponse.store_settings.tin_number || "",
        defaultPaymentMethod:
          settingsResponse.store_settings.default_payment_method || "stripe",
        paymentTimeline:
          settingsResponse.store_settings.auto_payment_timeline || "30",
        accountType:
          accountResponse.account_details[0]?.account_type || "savings",
        bankName: accountResponse.account_details[0]?.bank_name || "",
        accountNumber: accountResponse.account_details[0]?.account_number || "",
        accountName: accountResponse.account_details[0]?.account_name || "",
      };

      console.log("Refreshing form data:", refreshedFormData);
      setFormData(refreshedFormData);
    } catch (err: any) {
      console.error("Error refreshing data:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Save store settings
  const handleSaveSettings = async () => {
    if (!storeSettings) return;

    try {
      setIsSaving(true);
      setError("");
      setSuccess("");

      const updateData = {
        brand_description: formData.brandDescription,
        shipping_country: formData.country,
        shipping_address: formData.shippingAddress,
        returning_country: formData.country,
        returning_address: formData.sameAsShipping
          ? formData.shippingAddress
          : formData.returningAddress,
        open_days: formData.openDays,
        opening_hours: formData.openHours,
        closing_hours: formData.closingHours,
        tin_number: formData.tin,
        default_payment_method: formData.defaultPaymentMethod,
        auto_payment_timeline: formData.paymentTimeline,
      };

      const response = await updateStoreSettings(updateData);
      setSuccess(response.message || "Store settings updated successfully");

      // Refresh all data to show updated values
      await refreshAllData();
    } catch (err: any) {
      setError(err.message || "Failed to update store settings");
    } finally {
      setIsSaving(false);
    }
  };

  // Add contact information
  const handleAddContact = async (
    email: string,
    phone: string,
    type: "primary" | "secondary"
  ) => {
    try {
      const response = await addContactInformation({ email, phone, type });
      setSuccess(response.message);

      // Refresh contact information
      const contactResponse = await getContactInformation();
      setContactInfo(contactResponse.contact_information);
    } catch (err: any) {
      setError(err.message || "Failed to add contact information");
    }
  };

  // Add account details
  const handleAddAccount = async (accountData: {
    account_type: "savings" | "current" | "checking" | "business";
    bank_name: string;
    account_number: string;
    account_name: string;
    is_primary: boolean;
  }) => {
    try {
      const response = await addAccountDetails(accountData);
      setSuccess(response.message);

      // Refresh account details and update form data
      const accountResponse = await getAccountDetails();
      setAccountDetails(accountResponse.account_details);

      // Update form data with the new account details if it's the first account
      if (accountResponse.account_details.length > 0) {
        const primaryAccount =
          accountResponse.account_details.find((acc) => acc.is_primary) ||
          accountResponse.account_details[0];
        setFormData((prev) => ({
          ...prev,
          accountType: primaryAccount.account_type,
          bankName: primaryAccount.bank_name,
          accountNumber: primaryAccount.account_number,
          accountName: primaryAccount.account_name,
        }));
      }
    } catch (err: any) {
      setError(err.message || "Failed to add account details");
    }
  };

  // Disable store
  const handleDisableStore = async () => {
    try {
      const response = await disableStore();
      setSuccess(response.message);

      // Refresh deletion status
      const deletionResponse = await getDeletionStatus();
      setDeletionStatus(deletionResponse);
    } catch (err: any) {
      setError(err.message || "Failed to disable store");
    }
  };

  // Delete store
  const handleDeleteStore = async (reason: string) => {
    try {
      const response = await deleteStore("yes", reason);
      setSuccess(response.message);

      // Redirect to login or home page after successful deletion
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to delete store");
    }
  };

  // Image upload handlers
  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBannerImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Contact form handlers
  const handleAddContactSubmit = async () => {
    if (!newContact.email || !newContact.phone) {
      setError("Please fill in all contact fields");
      return;
    }

    try {
      await handleAddContact(
        newContact.email,
        newContact.phone,
        newContact.type
      );
      setNewContact({ email: "", phone: "", type: "secondary" });
      setShowContactForm(false);
    } catch (err: any) {
      setError(err.message || "Failed to add contact");
    }
  };

  // Payment form handlers
  const handleAddPaymentSubmit = async () => {
    if (
      !newPayment.bank_name ||
      !newPayment.account_number ||
      !newPayment.account_name
    ) {
      setError("Please fill in all payment fields");
      return;
    }

    try {
      await handleAddAccount(newPayment);
      setNewPayment({
        account_type: "savings",
        bank_name: "",
        account_number: "",
        account_name: "",
        is_primary: false,
      });
      setShowPaymentForm(false);
    } catch (err: any) {
      setError(err.message || "Failed to add payment method");
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#105E53] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading store settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-sm">
          {success}
        </div>
      )}

      {/* Refresh Indicator */}
      {isRefreshing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-800"></div>
          Refreshing data...
        </div>
      )}
      <div className="w-full h-[17.625rem] rounded-[1.5rem] overflow-hidden relative">
        <Image
          src={bannerPreview || BannerImage}
          alt="Banner Image"
          className="w-full h-full object-cover"
          width={600}
          height={282}
        />

        <div className="absolute bottom-0 left-1/2 z-10 transform -translate-x-1/2 translate-y-1/2 bg-white border-[#DCDCDC] rounded-[0.75rem] w-[5.0625rem] h-[5.0625rem] flex items-center justify-center">
          <Image
            src={logoPreview || Logo}
            className="rounded-[0.75rem] z-10 w-full h-full object-cover"
            alt=""
            width={81}
            height={81}
          />
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-700 relative"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Banner Image
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </Button>
          <Button
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-700 relative"
          >
            <Upload className="w-4 h-4 mr-2" />
            Edit Logo
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </Button>
        </div>
      </div>

      <div className="flex gap-[16rem] w-full relative">
        {/* Sticky Sidebar */}
        <div className="sticky top-8 h-fit flex flex-col gap-[4rem]">
          <div className="flex items-center gap-2">
            <div className="w-[2.5rem] h-[2.5rem] bg-white rounded-[0.75rem] border border-[#DCDCDC] flex items-center justify-center">
              <Image src={Logo} alt="" className="rounded-[0.75rem]" />
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="text-[#3D3D3D] font-lexend text-xs font-normal tracking-[-0.0075rem]">
                {storeSettings?.brand_name || "Loading..."}
              </h5>
              <p className="text-[#989898] font-lexend text-xs font-normal tracking-[-0.0075rem]">
                {storeSettings?.location || "Loading..."}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p
              className={`font-lexend text-xs font-normal tracking-[-0.0075rem] cursor-pointer w-fit transition-colors ${
                activeSection === "brand-info"
                  ? "text-[#3D3D3D]"
                  : "text-[#989898]"
              }`}
              onClick={() => scrollToSection("brand-info")}
            >
              Brand Info
            </p>
            <p
              className={`font-lexend text-xs font-normal tracking-[-0.0075rem] cursor-pointer w-fit transition-colors ${
                activeSection === "payout-information"
                  ? "text-[#3D3D3D]"
                  : "text-[#989898]"
              }`}
              onClick={() => scrollToSection("payout-information")}
            >
              Payout Information
            </p>
            <p
              className={`font-lexend text-xs font-normal tracking-[-0.0075rem] cursor-pointer w-fit transition-colors ${
                activeSection === "security"
                  ? "text-[#3D3D3D]"
                  : "text-[#989898]"
              }`}
              onClick={() => scrollToSection("security")}
            >
              Security
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-24 max-w-[36.25rem] w-full">
          <div
            id="brand-info"
            ref={(el) => {
              sectionRefs.current["brand-info"] = el;
            }}
          >
            <BrandInfo
              storeSettings={storeSettings}
              formData={formData}
              setFormData={setFormData}
              onAddContact={handleAddContact}
              contactInfo={contactInfo}
              showContactForm={showContactForm}
              setShowContactForm={setShowContactForm}
              newContact={newContact}
              setNewContact={setNewContact}
              onAddContactSubmit={handleAddContactSubmit}
              logoPreview={logoPreview}
              onLogoUpload={handleLogoUpload}
            />
          </div>
          <div
            id="payout-information"
            ref={(el) => {
              sectionRefs.current["payout-information"] = el;
            }}
          >
            <SettingsPayout
              storeSettings={storeSettings}
              formData={formData}
              setFormData={setFormData}
              onAddAccount={handleAddAccount}
              accountDetails={accountDetails}
              showPaymentForm={showPaymentForm}
              setShowPaymentForm={setShowPaymentForm}
              newPayment={newPayment}
              setNewPayment={setNewPayment}
              onAddPaymentSubmit={handleAddPaymentSubmit}
            />
          </div>
          <div
            id="security"
            ref={(el) => {
              sectionRefs.current["security"] = el;
            }}
          >
            <SettingsSecurity
              deletionStatus={deletionStatus}
              onDisableStore={handleDisableStore}
              onDeleteStore={handleDeleteStore}
            />
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end gap-3 mt-8">
        <Button
          onClick={refreshAllData}
          disabled={isRefreshing}
          variant="outline"
          className="px-6 py-3 disabled:opacity-50"
        >
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
        <Button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="bg-[#105E53] hover:bg-[#105E53]/90 text-white px-8 py-3 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
