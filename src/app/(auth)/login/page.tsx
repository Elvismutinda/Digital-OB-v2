import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import Image from "next/image";
import UserAuthForm from "@/components/UserAuthForm";

const page = () => {
  return (
    <div className="absolute inset-0 bg-slate-50">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-24 md:left-8 md:top-24"
          )}
        >
          <FiChevronLeft className="mr-2 h-4 w-4" />
          Return Home
        </Link>

        <div className="container mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <Image
              className="mx-auto mb-2"
              src="https://www.lifloelectronics.co.ke/wp-content/uploads/2021/10/kenya-police-logo-white.png"
              width={200}
              height={50}
              alt="Kenya Police Logo"
            />
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm max-w-xs mx-auto">
              Please enter your email and password to <strong>Access</strong>{" "}
              your account.
            </p>

            <UserAuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
