"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signupMutation = api.user.signup.useMutation({
    onSuccess: () => {
      toast.success("Account created! Please sign in.");
      router.push("/auth/signin");
    },
    onError: (err) => {
      setError(err.message);
      toast.error(err.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    signupMutation.mutate({ username, password });
  };

  const passwordRequirements = [
    { met: password.length >= 6, text: "At least 6 characters" },
    { met: password === confirmPassword && password.length > 0, text: "Passwords match" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="absolute top-8 left-8"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>

        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
            <p className="text-muted-foreground">
              Join Wordly and start sharing your stories
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={signupMutation.isPending}
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">
                  At least 3 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={signupMutation.isPending}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={signupMutation.isPending}
                  className="h-11"
                />
              </div>

              {/* Password Requirements */}
              {password && (
                <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground">
                    Password requirements:
                  </p>
                  <div className="space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <div
                          className={`flex items-center justify-center w-4 h-4 rounded-full ${
                            req.met
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted-foreground/20"
                          }`}
                        >
                          {req.met && <Check className="w-3 h-3" />}
                        </div>
                        <span
                          className={req.met ? "text-foreground" : "text-muted-foreground"}
                        >
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link
              href="/auth/signin"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-background items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="relative max-w-lg space-y-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold tracking-tight">
            Start Your Writing Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            Create engaging content, build your audience, and share your expertise with readers worldwide.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Active Writers</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Posts Published</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">5+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
