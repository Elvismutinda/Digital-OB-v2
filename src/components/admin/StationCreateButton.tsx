"use client";

import * as React from "react";
import { ButtonProps, buttonVariants } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LuLoader2 } from "react-icons/lu";
import { HiOutlinePlusSm } from "react-icons/hi";

interface StationCreateButtonProps extends ButtonProps {}

const StationCreateButton = ({
  className,
  variant,
  ...props
}: StationCreateButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <button
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <HiOutlinePlusSm className="mr-2 h-4 w-4" />
      )}
      Register Station
    </button>
  );
};

export default StationCreateButton;
