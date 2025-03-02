import Logo from "@/assets/svg/skatl-logo.svg";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center gap-6 p-6">
      <div className="flex w-full items-center max-w-sm flex-col gap-2">
        <Logo width={200} height={200} />
        <LoginForm />
      </div>
    </div>
  );
}
