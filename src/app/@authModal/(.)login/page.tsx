import Image from "next/image";

import CloseModal from "@/components/CloseModal";
import UserAuthForm from "@/components/UserAuthForm";

const page = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>

          <div className="container mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
              <Image
                className="mx-auto mb-2"
                src="https://www.lifloelectronics.co.ke/wp-content/uploads/2021/10/kenya-police-logo-white.png"
                width={200}
                height={50}
                alt="logo"
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
    </div>
  );
};

export default page;
