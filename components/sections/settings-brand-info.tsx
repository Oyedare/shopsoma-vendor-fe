import InfoIcon from "@/assets/info-icon";
import { Input } from "../ui/input";
import PlusIcon from "@/assets/plus-icon";
import { Textarea } from "../ui/textarea";
import UploadImageIcon from "@/assets/upload-image-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import ChevronDown from "@/assets/chevron-down";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import { useCallback, useRef, useState } from "react";
import { Radio } from "../Radio";

interface BrandInfoProps {
  storeSettings: any;
  formData: any;
  setFormData: any;
  onAddContact: (
    email: string,
    phone: string,
    type: "primary" | "secondary"
  ) => Promise<void>;
  contactInfo: any[];
  showContactForm: boolean;
  setShowContactForm: (show: boolean) => void;
  newContact: { email: string; phone: string; type: "primary" | "secondary" };
  setNewContact: (contact: {
    email: string;
    phone: string;
    type: "primary" | "secondary";
  }) => void;
  onAddContactSubmit: () => Promise<void>;
  logoPreview: string;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BrandInfo = ({
  storeSettings,
  formData,
  setFormData,
  onAddContact,
  contactInfo,
  showContactForm,
  setShowContactForm,
  newContact,
  setNewContact,
  onAddContactSubmit,
  logoPreview,
  onLogoUpload,
}: BrandInfoProps) => {
  const [selectedDays, setSelectedDays] = useState<string[]>(["MON", "FRI"]);

  const OPEN_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;

  const toggleDay = useCallback((size: string) => {
    setSelectedDays((prev) => {
      const newSizes = prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size];

      return newSizes;
    });
  }, []);

  return (
    <div className="flex flex-col gap-[3rem] w-full">
      <div className="flex flex-col gap-4">
        <h3 className="text-[#656565] font-lexend text-base tracking-[-0.01rem] ">
          Brand Info
        </h3>
        <div className="flex flex-col gap-2">
          <div className="rounded-[0.5rem] w-fit border-[0.5px] border-[#DCDCDC] bg-[#fafafa] py-1 px-2 flex items-center gap-1">
            <InfoIcon />
            <p className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]">
              Cumulative Points:
            </p>
            <p className="text-[#16A34A] font-lexend text-xs font-normal tracking-[-0.0075rem]">
              1293 points
            </p>
          </div>
          <p className="text-[#989898] font-lexend text-[0.625rem] font-normal tracking-[-0.00625rem]">
            Next Reset Date: 01 June 2027
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="brandName" className="flex flex-col gap-1">
            <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]">
              Brand Name
            </h5>
            <p className="text-[#989898] font-lexend text-[0.625rem] font-normal tracking-[-0.00625rem]">
              The brand name cannot be changed without contacting the Support
              team.
            </p>
          </label>

          <Input
            id="brandName"
            placeholder="Kettle & Ko."
            type="text"
            value={formData.brandName}
            onChange={(e) =>
              setFormData({ ...formData, brandName: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-5 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]">
                Phone Number
              </h5>
              <Input
                placeholder="+234 202 938 9390"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
              <p className="text-[#989898] font-lexend text-[0.625rem] font-normal tracking-[-0.00625rem]">
                Changes will be approved by Admin
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]">
                Email Address
              </h5>
              <Input
                placeholder="example@mail.com"
                type="email"
                value={formData.emailAddress}
                onChange={(e) =>
                  setFormData({ ...formData, emailAddress: e.target.value })
                }
              />
            </div>
          </div>
          <button
            onClick={() => setShowContactForm(!showContactForm)}
            className="flex gap-1 py-3 px-5 w-fit cursor-pointer items-center justify-center bg-[#fafafa] border border-[#DCDCDC] rounded-[0.75rem] text-[#656565] text-xs font-normal tracking-[-0.0075rem]"
          >
            <PlusIcon />
            Add Second Contact
          </button>

          {/* Dynamic Contact Form */}
          {showContactForm && (
            <div className="mt-4 p-4 border border-[#DCDCDC] rounded-[0.75rem] bg-[#fafafa]">
              <h6 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem] mb-3">
                Add New Contact
              </h6>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem] mb-1">
                      Email Address
                    </h5>
                    <Input
                      placeholder="example@mail.com"
                      type="email"
                      value={newContact.email}
                      onChange={(e) =>
                        setNewContact({ ...newContact, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem] mb-1">
                      Phone Number
                    </h5>
                    <Input
                      placeholder="+234 123 456 7890"
                      type="tel"
                      value={newContact.phone}
                      onChange={(e) =>
                        setNewContact({ ...newContact, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem] mb-1">
                      Contact Type
                    </h5>
                    <Select
                      value={newContact.type}
                      onValueChange={(value: "primary" | "secondary") =>
                        setNewContact({ ...newContact, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primary</SelectItem>
                        <SelectItem value="secondary">Secondary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={onAddContactSubmit}
                    className="bg-[#105E53] hover:bg-[#105E53]/90 text-white px-4 py-2 text-xs"
                  >
                    Add Contact
                  </Button>
                  <Button
                    onClick={() => setShowContactForm(false)}
                    variant="outline"
                    className="px-4 py-2 text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]">
            Brand Description
          </h5>
          <Textarea
            placeholder="Enter your brand description"
            value={formData.brandDescription}
            onChange={(e) =>
              setFormData({ ...formData, brandDescription: e.target.value })
            }
          />
        </div>

        {/* <div className="flex flex-col gap-2">
          <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]">
            Logo
          </h5>

          <button className="py-3 px-5 border cursor-pointer border-[#DCDCDC] rounded-[0.75rem] bg-[#fafafa] h-[12rem] w-full flex flex-col items-center justify-center gap-3 relative">
            <UploadImageIcon />
            <p className="font-lexend text-xs tracking-[-0.0075rem] text-[#656565] font-normal w-[8.6875rem] text-center">
              Upload New Logo or Drag Image/SVG here
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={onLogoUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </button>
        </div> */}

        <div className="flex flex-col gap-8">
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]">
                Country
              </h5>
              <Select
                value={formData.country}
                onValueChange={(value) =>
                  setFormData({ ...formData, country: value })
                }
              >
                <SelectTrigger className="p-3 rounded-[0.75rem] border border-[#DCDCDC] bg-[#FAFAFA] text-xs text-[#292929]">
                  <div className="flex items-center gap-1">
                    <SelectValue placeholder="Select country" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Nigeria">Nigeria</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Ghana">Ghana</SelectItem>
                    <SelectItem value="South Africa">South Africa</SelectItem>
                    <SelectItem value="Kenya">Kenya</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Italy">Italy</SelectItem>
                    <SelectItem value="Spain">Spain</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Brazil">Brazil</SelectItem>
                    <SelectItem value="Mexico">Mexico</SelectItem>
                    <SelectItem value="Argentina">Argentina</SelectItem>
                    <SelectItem value="Egypt">Egypt</SelectItem>
                    <SelectItem value="Morocco">Morocco</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex flex-1 flex-col gap-2">
                <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]">
                  Shipping Address
                </h5>

                <Input
                  placeholder="9810 Kuvalis Island, Evansboro 97387"
                  value={formData.shippingAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shippingAddress: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]">
              Open Days
            </h5>
            <div className="flex gap-2 flex-wrap">
              {OPEN_DAYS.map((day) => {
                const active = selectedDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`h-9 min-w-9 px-3 rounded-[0.5rem] text-[0.75rem] tracking-[-0.0075rem] border ${
                      active
                        ? "bg-[#3D3D3D] text-white border-[#3D3D3D]"
                        : "bg-[#EFEFEF] text-[#3D3D3D] border-[#DCDCDC]"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex gap-2 flex-1 flex-col">
              <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]">
                Open Hours
              </h5>

              <Select
                value={formData.openHours}
                onValueChange={(value) =>
                  setFormData({ ...formData, openHours: value })
                }
              >
                <SelectTrigger className="p-3 rounded-[0.75rem] flex-1 border border-[#DCDCDC] bg-[#FAFAFA] text-xs text-[#292929]">
                  <div className="flex items-center gap-1 flex-1">
                    <SelectValue placeholder="Select opening time" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="00:00">12:00 AM</SelectItem>
                    <SelectItem value="01:00">1:00 AM</SelectItem>
                    <SelectItem value="02:00">2:00 AM</SelectItem>
                    <SelectItem value="03:00">3:00 AM</SelectItem>
                    <SelectItem value="04:00">4:00 AM</SelectItem>
                    <SelectItem value="05:00">5:00 AM</SelectItem>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                    <SelectItem value="22:00">10:00 PM</SelectItem>
                    <SelectItem value="23:00">11:00 PM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 flex-1 flex-col ">
              <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]">
                Closing Hours
              </h5>

              <Select
                value={formData.closingHours}
                onValueChange={(value) =>
                  setFormData({ ...formData, closingHours: value })
                }
              >
                <SelectTrigger className="p-3 rounded-[0.75rem] flex-1 border border-[#DCDCDC] bg-[#FAFAFA] text-xs text-[#292929]">
                  <div className="flex items-center gap-1 flex-1">
                    <SelectValue placeholder="Select closing time" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="00:00">12:00 AM</SelectItem>
                    <SelectItem value="01:00">1:00 AM</SelectItem>
                    <SelectItem value="02:00">2:00 AM</SelectItem>
                    <SelectItem value="03:00">3:00 AM</SelectItem>
                    <SelectItem value="04:00">4:00 AM</SelectItem>
                    <SelectItem value="05:00">5:00 AM</SelectItem>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                    <SelectItem value="22:00">10:00 PM</SelectItem>
                    <SelectItem value="23:00">11:00 PM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]">
                  Country
                </h5>
                <Select defaultValue="Nigeria">
                  <SelectTrigger className="p-3 rounded-[0.75rem] border border-[#DCDCDC] bg-[#FAFAFA] text-xs text-[#292929]">
                    <div className="flex items-center gap-1">
                      <SelectValue placeholder="Nigeria" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ngn">Nigeria</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="eur">United Kingdom</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex flex-1 flex-col gap-2">
                  <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]">
                    Returning Address
                  </h5>

                  <Input
                    placeholder="9810 Kuvalis Island, Evansboro 97387"
                    value={formData.returningAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        returningAddress: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-1">
              <p className="text-[#656565] text-xs font-lexend tracking-[-0.0075rem] flex items-center">
                <Radio label="Same as Shipping Address" />
              </p>
            </div>
          </div>

          <button className="bg-[#105E53] rounded-[0.75rem] flex items-center justify-center py-3 px-5 text-[#fafafa] font-lexend tracking-[-0.0075rem] text-xs">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandInfo;
