"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { LoginFields, loginSchema } from "@/lib/schemas/login-schema";
import { toast } from "react-toastify";
import FormInputContainer from "@/components/reusable/form-input-container";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTE_PATH } from "@/lib/enum/route-path";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction, signUpAction } from "@/actions/auth";
import { SignupSchema } from "@/lib/schemas/signup-schema";
import { ISignupFields } from "@/lib/interfaces/auth";
export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useRouter();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ISignupFields>({
    mode: "onChange",
    resolver: zodResolver(SignupSchema),
  });
  const handleOnLoginSubmit = async (data: ISignupFields) => {
    const res = await signUpAction(data);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success(
      "Sign up succeeded, you can now sign in using your credentials"
    );
    navigate.replace(ROUTE_PATH.LOGIN);
  };

  return (
    <div className={cn("flex flex-col gap-2 md:gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your credentials to sign up</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(handleOnLoginSubmit)}
            className="grid gap-3 md:gap-6"
          >
            <div className="grid gap-3 md:gap-4">
              <FormInputContainer
                control={control}
                errors={errors}
                name="username"
                vertialAlign
                required
                label="Username"
                render={({ field }) => (
                  <Input
                    id="username"
                    name="username"
                    placeholder="username"
                    required
                    onChange={field.onChange}
                  />
                )}
              />
              <FormInputContainer
                control={control}
                errors={errors}
                name="email"
                vertialAlign
                required
                label="Email"
                render={({ field }) => (
                  <Input
                    id="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                    onChange={field.onChange}
                  />
                )}
              />
              <FormInputContainer
                control={control}
                errors={errors}
                name="password"
                vertialAlign
                required
                label="Password"
                render={({ field }) => (
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    required
                    onChange={field.onChange}
                  />
                )}
              />

              <FormInputContainer
                control={control}
                errors={errors}
                name="confirm_password"
                vertialAlign
                required
                label="Confirm password"
                render={({ field }) => (
                  <Input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    placeholder="********"
                    required
                    onChange={field.onChange}
                  />
                )}
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                loading={isSubmitting}
                className="w-full"
              >
                Sign up
              </Button>
            </div>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href={ROUTE_PATH.LOGIN}
                className="underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
