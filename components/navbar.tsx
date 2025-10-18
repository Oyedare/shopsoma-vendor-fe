"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowUpDown, Filter, Search } from "lucide-react";
import SearchIcon from "@/assets/search-icon";

export function Navbar({ activeSection }: { activeSection: string }) {
  return (
    <nav className="flex items-center justify-between">
      <h3 className="text-[1.3125rem] tracking-[-0.03938rem] text-[#292929] font-normal capitalize font-coconat">
        {activeSection}
      </h3>

      <div className="flex items-center gap-4">
        {/* Currency Select */}
        <Select defaultValue="usd">
          <SelectTrigger className="p-3 rounded-[0.75rem] border border-[#DCDCDC] bg-[#FAFAFA] text-xs text-[#292929]">
            <div className="flex items-center gap-1">
              <span className="text-[#292929]">$</span>
              <SelectValue placeholder="USD" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="ngn">NGN</SelectItem>
              <SelectItem value="eur">EUR</SelectItem>
              <SelectItem value="gbp">GBP</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="relative flex-1 min-w-[22rem]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
          <Input
            placeholder="Search"
            className="h-[2.5rem] pl-9 rounded-[0.75rem] border border-[#DCDCDC] bg-[#FAFAFA] text-xs text-[#292929] placeholder:text-[0.6875rem] placeholder:text-[#989898]"
          />
        </div>

        {/* Sort */}
        <Button
          variant="ghost"
          className="w-[2.5rem] h-[2.5rem] rounded-[0.75rem] bg-[#FAFAFA] border border-[#DCDCDC] p-0 text-[#292929]"
        >
          <ArrowUpDown className="w-4 h-4" />
        </Button>

        {/* Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-[2.5rem] h-[2.5rem] rounded-[0.75rem] bg-[#FAFAFA] border border-[#DCDCDC] p-0 text-[#292929]"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Status: All</DropdownMenuItem>
            <DropdownMenuItem>Date: Any time</DropdownMenuItem>
            <DropdownMenuItem>Price: Any</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
