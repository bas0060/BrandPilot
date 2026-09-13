"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BrandBrainModal } from "@/components/brand-brain-modal";
import { WelcomeStep } from "@/components/onboarding/welcome-step";
import { ChoosePathStep } from "@/components/onboarding/choose-path-step";
import { WebsiteInputStep } from "@/components/onboarding/website-input-step";
import { PreferencesInputStep } from "@/components/onboarding/preferences-input-step";
import { CompletionStep } from "@/components/onboarding/completion-step";
import { useAuth } from "@/lib/auth";

type Step = "welcome" | "choose-path" | "website-input" | "preferences-input" | "complete";
export type Path = "website" | "no-website" | null;

const FAILURE_TRIGGER = "fail";

export function OnboardingWizard() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  const [step, setStep] = useState<Step>("welcome");
  const [path, setPath] = useState<Path>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [brandName, setBrandName] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/register");
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading || !isLoggedIn) return null;

  async function runWebsiteFlow() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (websiteUrl.toLowerCase().includes(FAILURE_TRIGGER)) {
      return { success: false, error: "We couldn't reach that website. Check the URL and try again." };
    }
    return { success: true };
  }

  async function runPreferencesFlow() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (brandName.toLowerCase().includes(FAILURE_TRIGGER)) {
      return { success: false, error: "Something went wrong building your profile. Please try again." };
    }
    return { success: true };
  }

  function handleModalDone(result: { success: boolean; error?: string }) {
    setShowModal(false);
    if (!result.success) {
      setError(result.error ?? "Something went wrong");
      return;
    }
    setStep("complete");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <motion.div
        aria-hidden
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-125 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--foreground)_8%,transparent),transparent_60%)]"
      />

      <div className="relative w-full max-w-lg">
        <AnimatePresence mode="wait">
          {step === "welcome" && (
            <WelcomeStep key="welcome" onNext={() => setStep("choose-path")} />
          )}

          {step === "choose-path" && (
            <ChoosePathStep
              key="choose-path"
              onSelect={(selected) => {
                setPath(selected);
                setError(null);
                setStep(selected === "website" ? "website-input" : "preferences-input");
              }}
            />
          )}

          {step === "website-input" && (
            <WebsiteInputStep
              key="website-input"
              value={websiteUrl}
              onChange={(value) => {
                setWebsiteUrl(value);
                if (error) setError(null);
              }}
              error={error}
              onBack={() => setStep("choose-path")}
              onSubmit={() => {
                setError(null);
                setShowModal(true);
              }}
            />
          )}

          {step === "preferences-input" && (
            <PreferencesInputStep
              key="preferences-input"
              brandName={brandName}
              onBrandNameChange={(value) => {
                setBrandName(value);
                if (error) setError(null);
              }}
              instagramHandle={instagramHandle}
              onInstagramHandleChange={setInstagramHandle}
              error={error}
              onBack={() => setStep("choose-path")}
              onSubmit={() => {
                setError(null);
                setShowModal(true);
              }}
            />
          )}

          {step === "complete" && (
            <CompletionStep
              key="complete"
              summaryLabel={path === "website" ? "your website," : "your brand,"}
              summaryValue={path === "website" ? websiteUrl : brandName}
            />
          )}
        </AnimatePresence>
      </div>

      <BrandBrainModal
        isOpen={showModal}
        run={path === "website" ? runWebsiteFlow : runPreferencesFlow}
        onDone={handleModalDone}
      />
    </div>
  );
}