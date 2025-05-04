"use client";
import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { useInfiniteScroll } from "@/lib/hooks/use-infinite-scroll";
import LoadingSpinner from "./loading-spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { IOption } from "@/lib/interfaces/utils";

type Props = {
  items: IOption[];
  type?: "checkbox" | "radio";
  placeholder?: string | React.ReactNode;
  onChange: (value: string | string[]) => void;
  value: string | string[];
  loading?: boolean;
  onScrollToEnd?: VoidFunction;
  hasMore?: boolean;
  onSearch?: (value: string) => void;
  triggerClassName?: string;
};

export function Combobox({
  items = [],
  placeholder = "Select item...",
  onChange = () => {},
  value,
  type = "radio",
  loading = false,
  onScrollToEnd = () => {},
  hasMore = false,
  onSearch,
  triggerClassName,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const { loaderRef } = useInfiniteScroll({
    onPageChange: onScrollToEnd,
    dependencyKeys: [open],
    hasMore: hasMore,
    isFetchingData: loading,
  });

  const onSelectItem = (chosenValue: string) => {
    if (type === "checkbox") {
      onCheckboxItemSelect(chosenValue);
    } else {
      onRadioItemSelect(chosenValue);
      setOpen(false);
    }
  };

  const onCheckboxItemSelect = (chosenValue: string) => {
    const checkboxValues: string[] = value as string[];
    if (checkboxValues.includes(chosenValue)) {
      onChange(
        checkboxValues.filter((selectedValue) => selectedValue !== chosenValue)
      );
      return;
    }
    onChange([...checkboxValues, chosenValue]);
  };

  const onRadioItemSelect = (chosenValue: string) => {
    onChange(chosenValue);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex h-9 w-[200px] items-center justify-between gap-2",
            triggerClassName
          )}
        >
          {placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onAnimationEnd={() => setOpen(true)}
        className={cn("w-[200px] p-0", onSearch && "pt-3")}
      >
        <Command>
          <CommandList>
            {onSearch && (
              <Input
                placeholder="Search an option.."
                className="m-3"
                onChange={(e) => onSearch(e.target.value)}
              />
            )}
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup className="max-h-[250px] overflow-auto">
              {items.map((item) => (
                <CommandItem
                  className="flex w-full justify-between gap-2"
                  key={item.value}
                  value={item.value}
                  onSelect={onSelectItem}
                >
                  {item.label}
                  <div>
                    <Input
                      type={type}
                      checked={
                        type === "checkbox"
                          ? value.includes(item.value)
                          : value === item.value
                      }
                      readOnly
                      className={cn("ml-auto size-4")}
                    />
                  </div>
                </CommandItem>
              ))}
              <div ref={loaderRef}>{loading && <LoadingSpinner />}</div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
