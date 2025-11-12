import ArchiveIcon from "@/assets/archive-icon";
import WhiteBin from "@/assets/white-bin";
import React from "react";

interface SettingsSecurityProps {
  deletionStatus: any;
  onDisableStore: () => Promise<void>;
  onDeleteStore: (reason: string) => Promise<void>;
}

const SettingsSecurity = ({
  deletionStatus,
  onDisableStore,
  onDeleteStore,
}: SettingsSecurityProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[#3d3d3d] font-lexend text-base tracking-[-0.01rem] ">
        Store Status
      </h3>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h5 className="font-lexend text-[0.75rem] text-[#3D3D3D] tracking-[-0.0075rem]">
            Temporarily Pause Store
          </h5>
          <p className="text-[#656565] font-lexend text-xs tracking-[-0.0075rem] w-[27.25rem]">
            Sriracha tacos fit loko juice tilde batch brunch pabst. Venmo
            succulents goth boys hexagon cliche.
          </p>
        </div>
        <button className="bg-[#FAC215] rounded-[0.75rem] cursor-pointer flex items-center justify-center gap-1 py-3 px-5 w-fit text-[#85680E] font-lexend text-xs tracking-[-0.0075rem]">
          <ArchiveIcon />
          Disable Store
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h5 className="font-lexend text-[0.75rem] text-[#3D3D3D] tracking-[-0.0075rem]">
            Delete Store
          </h5>
          <p className="text-[#656565] font-lexend text-xs tracking-[-0.0075rem] w-[27.25rem]">
            Sriracha tacos fit loko juice tilde batch brunch pabst. Venmo
            succulents goth boys hexagon cliche.
          </p>
        </div>
        <button className="bg-[#DC2626] cursor-pointer rounded-[0.75rem] flex items-center justify-center gap-1 py-3 px-5 w-fit text-[#fafafa] font-lexend text-xs tracking-[-0.0075rem]">
          <WhiteBin />
          Disable Store
        </button>
      </div>
    </div>
  );
};

export default SettingsSecurity;
