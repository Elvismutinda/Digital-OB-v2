import UserAuthForm from "@/components/UserAuthForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Image
          className="mx-auto mb-2"
          src="/digital_ob.svg"
          width={100}
          height={100}
          alt="logo"
        />
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm max-w-xs mx-auto">
          Kindly enter your email and password to sign in to your account
        </p>

        <UserAuthForm />
      </div>
    </div>
  );
}
