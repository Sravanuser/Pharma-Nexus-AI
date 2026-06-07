import { useState } from "react";
import { Eye, EyeOff, Pill, ShieldCheck, Package } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";

import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginFormData } from "./schema/login.schema";
import { LoginSchema } from "./schema/login.schema";

import { TextField } from "../../components/fields/text-field";
import { Checkbox } from "../../components/ui/checkbox";

import { useLoginMutation } from "./queries";
import { toast } from "sonner"

export default function LoginForm() {

  const navigate = useNavigate();
  const { mutate, isPending } = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormData) {
    mutate(data, {
      onSuccess: () => {
        toast.success("Logged in successfully");
        navigate({ to: "/home" })
      },

      onError: (error: any) => {
        toast.error(error?.message ?? "Login failed");
      },
    });
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-slate-950 text-white p-12">
        <div className="flex items-center gap-3">
          <Pill className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Pharma Nexus AI</h1>
            <p className="text-slate-400">Drug Inventory Management Platform</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold">
            Enterprise Pharmaceutical Operations
          </h2>

          <div className="space-y-4">
            <div className="flex gap-3">
              <Package />
              <span>Inventory Tracking</span>
            </div>

            <div className="flex gap-3">
              <ShieldCheck />
              <span>Compliance Monitoring</span>
            </div>

            <div className="flex gap-3">
              <Package />
              <span>Supplier Management</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-400">
          Secure • Auditable • Enterprise Ready
        </p>
      </div>

      <div className="flex items-center justify-center bg-slate-50 p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your inventory dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <TextField
                  name="email"
                  label="Business Email"
                  placeholder="admin@company.com"
                  type="email"
                />

                <div className="relative">
                  <TextField
                    name="password"
                    label="Password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember Me</Label>
                  </div>

                  <Button variant="link" className="p-0">
                    Forgot Password?
                  </Button>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full"
                >
                  {isPending ? "Signing In..." : "Sign In"}
                </Button>

                <Separator />

                <p className="text-center text-sm text-muted-foreground">
                  New Organization?{" "}
                  <Link
                    to="/auth/register"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}