import React from "react";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import PlusIcon from "@/assets/plus-icon";

interface SettingsPayoutProps {
  storeSettings: any;
  formData: any;
  setFormData: any;
  onAddAccount: (accountData: {
    account_type: "savings" | "current" | "checking" | "business";
    bank_name: string;
    account_number: string;
    account_name: string;
    is_primary: boolean;
  }) => Promise<void>;
  accountDetails: any[];
  showPaymentForm: boolean;
  setShowPaymentForm: (show: boolean) => void;
  newPayment: {
    account_type: "savings" | "current" | "checking" | "business";
    bank_name: string;
    account_number: string;
    account_name: string;
    is_primary: boolean;
  };
  setNewPayment: (payment: {
    account_type: "savings" | "current" | "checking" | "business";
    bank_name: string;
    account_number: string;
    account_name: string;
    is_primary: boolean;
  }) => void;
  onAddPaymentSubmit: () => Promise<void>;
}

const SettingsPayout = ({
  storeSettings,
  formData,
  setFormData,
  onAddAccount,
  accountDetails,
  showPaymentForm,
  setShowPaymentForm,
  newPayment,
  setNewPayment,
  onAddPaymentSubmit,
}: SettingsPayoutProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-[#656565] font-lexend text-base tracking-[-0.01rem] ">
        Payout Information
      </h3>
      <div className="flex flex-col gap-2 w-full">
        <h5 className="text-[#656565] font-lexend text-xs tracking-[-0.0075rem]">
          Default Payment Method
        </h5>
        <Select
          value={formData.defaultPaymentMethod}
          onValueChange={(value) =>
            setFormData({ ...formData, defaultPaymentMethod: value })
          }
        >
          <SelectTrigger className="p-3 rounded-[0.75rem] border border-[#DCDCDC] bg-[#FAFAFA] text-xs text-[#292929]">
            <div className="flex items-center gap-1">
              <SelectValue placeholder="Select payment method" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="stripe">Stripe</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="check">Check</SelectItem>
              <SelectItem value="crypto">Cryptocurrency</SelectItem>
              <SelectItem value="mobile_money">Mobile Money</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h5 className="text-[#656565] font-lexend text-xs tracking-[-0.0075rem]">
          Taxpayer Identification Number (TIN)
        </h5>
        <Input
          placeholder="12-3456789"
          value={formData.tin}
          onChange={(e) => setFormData({ ...formData, tin: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-1">
          <h5 className="text-[#656565] font-lexend text-xs tracking-[-0.0075rem]">
            Auto Payment Timeline
          </h5>
          <p className="text-[#989898] font-lexend text-[0.625rem] tracking-[-0.00625rem]">
            Next Payment: 24th May, 2025
          </p>
        </div>
        <Select
          value={formData.paymentTimeline}
          onValueChange={(value) =>
            setFormData({ ...formData, paymentTimeline: value })
          }
        >
          <SelectTrigger className="p-3 rounded-[0.75rem] border border-[#DCDCDC] bg-[#FAFAFA] text-xs text-[#292929]">
            <div className="flex items-center gap-1">
              <SelectValue placeholder="Select timeline" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="7">Weekly</SelectItem>
              <SelectItem value="14">Bi-weekly</SelectItem>
              <SelectItem value="30">Monthly</SelectItem>
              <SelectItem value="60">Bi-monthly</SelectItem>
              <SelectItem value="90">Quarterly</SelectItem>
              <SelectItem value="180">Semi-annually</SelectItem>
              <SelectItem value="365">Annually</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={() => setShowPaymentForm(!showPaymentForm)}
        className="bg-[#FAFAFA] text-[#656565] font-lexend text-xs tracking-[-0.0075rem] border border-[#dcdcdc] rounded-[0.75rem] py-3 px-5 flex items-center justify-center gap-1"
      >
        <PlusIcon />
        Add New Payment Method
      </Button>

      {/* Dynamic Payment Form */}
      {showPaymentForm && (
        <div className="mt-4 p-4 border border-[#DCDCDC] rounded-[0.75rem] bg-[#fafafa]">
          <h6 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem] mb-3">
            Add New Payment Method
          </h6>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="flex-1">
                <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem] mb-1">
                  Account Type
                </h5>
                <Select
                  value={newPayment.account_type}
                  onValueChange={(
                    value: "savings" | "current" | "checking" | "business"
                  ) => setNewPayment({ ...newPayment, account_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem] mb-1">
                  Bank Name
                </h5>
                <Input
                  placeholder="Enter bank name"
                  value={newPayment.bank_name}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, bank_name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem] mb-1">
                  Account Number
                </h5>
                <Input
                  placeholder="Enter account number"
                  value={newPayment.account_number}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      account_number: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex-1">
                <h5 className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem] mb-1">
                  Account Name
                </h5>
                <Input
                  placeholder="Enter account name"
                  value={newPayment.account_name}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      account_name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_primary"
                checked={newPayment.is_primary}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, is_primary: e.target.checked })
                }
                className="rounded"
              />
              <label
                htmlFor="is_primary"
                className="text-[#656565] font-lexend text-xs font-normal tracking-[-0.0075rem]"
              >
                Set as primary account
              </label>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                onClick={onAddPaymentSubmit}
                className="bg-[#105E53] hover:bg-[#105E53]/90 text-white px-4 py-2 text-xs"
              >
                Add Payment Method
              </Button>
              <Button
                onClick={() => setShowPaymentForm(false)}
                variant="outline"
                className="px-4 py-2 text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#FAFAFA] border border-[#DCDCDC] p-4 rounded-3xl flex flex-col gap-5">
        <h3 className="text-[#656565] font-lexend text-xs tracking-[-0.0075rem]">
          Account Details
        </h3>

        <div className="flex gap-5">
          <div className="flex flex-col gap-2 w-full">
            <h5 className="text-[#656565] font-lexend text-xs tracking-[-0.0075rem]">
              Account Type
            </h5>
            <Select
              value={formData.accountType}
              onValueChange={(value) =>
                setFormData({ ...formData, accountType: value })
              }
            >
              <SelectTrigger className="p-3 rounded-[0.75rem] border border-[#DCDCDC] bg-[#FAFAFA] text-xs text-[#292929]">
                <div className="flex items-center gap-1">
                  <SelectValue placeholder="Select account type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="checking">Checking</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h5 className="text-[#656565] font-lexend text-xs tracking-[-0.0075rem]">
              Bank Name
            </h5>
            <Select
              value={formData.bankName}
              onValueChange={(value) =>
                setFormData({ ...formData, bankName: value })
              }
            >
              <SelectTrigger className="p-3 rounded-[0.75rem] border border-[#DCDCDC] bg-[#FAFAFA] text-xs text-[#292929]">
                <div className="flex items-center gap-1">
                  <SelectValue placeholder="Select bank" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Access Bank">Access Bank</SelectItem>
                  <SelectItem value="First Bank">First Bank</SelectItem>
                  <SelectItem value="GTBank">GTBank</SelectItem>
                  <SelectItem value="Zenith Bank">Zenith Bank</SelectItem>
                  <SelectItem value="UBA">UBA</SelectItem>
                  <SelectItem value="FCMB">FCMB</SelectItem>
                  <SelectItem value="Sterling Bank">Sterling Bank</SelectItem>
                  <SelectItem value="Union Bank">Union Bank</SelectItem>
                  <SelectItem value="Wema Bank">Wema Bank</SelectItem>
                  <SelectItem value="Polaris Bank">Polaris Bank</SelectItem>
                  <SelectItem value="Ecobank">Ecobank</SelectItem>
                  <SelectItem value="Fidelity Bank">Fidelity Bank</SelectItem>
                  <SelectItem value="Kuda Bank">Kuda Bank</SelectItem>
                  <SelectItem value="Opay">Opay</SelectItem>
                  <SelectItem value="Palmpay">Palmpay</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <h5 className="text-[#656565] font-lexend text-xs tracking-[-0.0075rem]">
            Account Number
          </h5>
          <Input
            placeholder="8372 9382 9849 4939"
            value={formData.accountNumber}
            onChange={(e) =>
              setFormData({ ...formData, accountNumber: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <h5 className="text-[#656565] font-lexend text-xs tracking-[-0.0075rem]">
            Account Name
          </h5>
          <Input
            placeholder="Oluwadami Florence"
            value={formData.accountName}
            onChange={(e) =>
              setFormData({ ...formData, accountName: e.target.value })
            }
          />
        </div>

        <button className="bg-[#105E53] rounded-[0.75rem] flex items-center justify-center py-3 px-5 text-[#fafafa] font-lexend tracking-[-0.0075rem] text-xs">
          Add Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPayout;
