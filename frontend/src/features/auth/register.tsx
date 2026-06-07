import { useState } from "react";

import {
    Eye,
    EyeOff,
    Pill,
    ShieldCheck,
    Package,
    Building2,
} from "lucide-react";

import { Link } from "@tanstack/react-router";

import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterFormData } from "./schema/register.schema";
import { registerSchema } from "./schema/register.schema";
import { TextField } from "../../components/fields/text-field";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { useRegisterMutation } from "./queries";


export default function RegisterForm() {

    const [showPassword, setShowPassword] = useState(false);
    const { mutate } = useRegisterMutation();
    const navigate = useNavigate();

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
        },
    });

    function onSubmit(data: RegisterFormData) {
        mutate(data, {
            onSuccess: () => {
                toast.success("Registered successfully");
                navigate({ to: "/auth/login" })
            },

            onError: (error: any) => {
                toast.error(error?.message ?? "Register failed");
            },
        });
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Branding Section */}
            <div className="hidden lg:flex flex-col justify-between bg-slate-950 text-white p-12">
                <div className="flex items-center gap-3">
                    <Pill className="h-8 w-8" />

                    <div>
                        <h1 className="text-2xl font-bold">Pharma Nexus AI</h1>
                        <p className="text-slate-400">
                            Drug Inventory Management Platform
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-4xl font-bold leading-tight">
                        Enterprise Pharmaceutical Operations
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Package className="h-5 w-5" />
                            <span>Inventory Tracking</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5" />
                            <span>Compliance Monitoring</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Package className="h-5 w-5" />
                            <span>Supplier Management</span>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-slate-400">
                    Secure • Auditable • Enterprise Ready
                </p>
            </div>

            {/* Register Form */}
            <div className="flex items-center justify-center bg-slate-50 p-6">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <div className="mb-3 flex justify-center">
                            <div className="rounded-full bg-primary/10 p-3">
                                <Building2 className="h-6 w-6 text-primary" />
                            </div>
                        </div>

                        <CardTitle className="text-center">
                            Create Organization Account
                        </CardTitle>

                        <CardDescription className="text-center">
                            Start managing pharmaceutical inventory today
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <FormProvider {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <TextField
                                        name="firstName"
                                        label="First Name"
                                        placeholder="John"
                                    />

                                    <TextField
                                        name="lastName"
                                        label="Last Name"
                                        placeholder="Doe"
                                    />
                                </div>

                                <TextField
                                    name="email"
                                    label="Business Email"
                                    placeholder="admin@company.com"
                                    type="email"
                                />

                                <TextField
                                    name="phone"
                                    label="Phone Number"
                                    placeholder="+91 9876543210"
                                    type="tel"
                                />

                                <div className="relative">
                                    <TextField
                                        name="password"
                                        label="Password"
                                        placeholder="Create a password"
                                        type={showPassword ? "text" : "password"}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-8 text-muted-foreground"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>
                                </div>

                                <div className="flex items-start gap-2">
                                    <Checkbox id="terms" />

                                    <Label
                                        htmlFor="terms"
                                        className="text-sm font-normal leading-relaxed"
                                    >
                                        I agree to the Terms of Service and Privacy Policy
                                    </Label>
                                </div>

                                <Button type="submit" className="w-full">
                                    Create Account
                                </Button>

                                <Separator />

                                <p className="text-center text-sm text-muted-foreground">
                                    Already have an account?{" "}
                                    <Link
                                        to="/auth/login"
                                        className="font-medium text-primary hover:underline"
                                    >
                                        Log in
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