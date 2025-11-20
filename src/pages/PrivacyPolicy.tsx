import React from "react";
import { Shield, Lock, Eye, FileText, Trash2, Mail, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy: React.FC = () => {
  const now = new Date();
  const lastUpdated = now.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const currentYear = now.getFullYear();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 bg-gradient-subtle border-b border-border/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This document outlines how we collect, use, and protect your data.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground pt-4">
              <span>Effective Date: 17 October 2025</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur border-b border-border/50 py-4">
        <div className="container px-4">
          <nav className="flex justify-center gap-8 text-sm font-medium">
            <a href="#privacy-policy" className="hover:text-primary transition-colors flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Policy Details
            </a>
            <a href="#account-deletion" className="hover:text-destructive transition-colors flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Account Deletion
            </a>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80">

            <div id="privacy-policy" className="scroll-mt-32">
              <h2>1. Introduction</h2>
              <p>
                GEODHA (“we,” “our,” or “us”) is a civic engagement platform that enables users to report and visualize local
                infrastructure challenges such as littering, water shortages, power outages, and road damage. We value your trust
                and are committed to protecting your privacy. This Privacy Policy explains what data we collect, how we use it,
                and your rights regarding that data.
              </p>

              <h2>2. Information We Collect</h2>
              <div className="grid gap-6 not-prose my-8">
                <div className="bg-card p-6 rounded-xl border border-border/50 shadow-sm">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Account Information
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Email address (for login and account communication). Optional profile data (e.g., name or photo, if provided).
                  </p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border/50 shadow-sm">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Reports Submitted
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Text descriptions, uploaded photos, and approximate location (latitude/longitude) associated with each civic report.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border/50 shadow-sm">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location Data
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Approximate location (based on device GPS or network data) to tag civic reports and display issues nearby. We do not
                    continuously track your location — only when actively submitting a report.
                  </p>
                </div>
              </div>

              <h2>3. How We Use Your Information</h2>
              <p>
                We use collected data to: operate and improve the GEODHA app and services; display community reports and generate public
                heatmaps; communicate updates, bug fixes, or feedback requests; detect and prevent misuse or fraudulent activity. We do
                not sell, rent, or trade personal data to third parties.
              </p>

              <h2>4. Data Sharing and Storage</h2>
              <p>
                Your data is securely stored and managed through Firebase (Google) infrastructure. Crash and performance data are
                processed by Firebase Crashlytics and Analytics. We may share aggregated, anonymized insights (never personal details)
                for research or public awareness purposes.
              </p>

              <h2>5. Data Security</h2>
              <p>
                All data is transmitted over encrypted HTTPS (TLS) connections. We maintain security practices to prevent unauthorized
                access or alteration of data.
              </p>

              <h2>6. Data Retention and Deletion</h2>
              <p>
                You can delete your account at any time through the app or by emailing us. Upon deletion, all associated personal data will be removed from our servers within a reasonable period.
              </p>

              <h2>7. Children’s Privacy</h2>
              <p>
                GEODHA is intended for users aged 18 and above. We do not knowingly collect data from children under 13. If you believe a child has
                provided information, please contact us for prompt deletion.
              </p>

              <h2>8. Third-Party Services</h2>
              <p>
                GEODHA integrates with: Firebase Authentication, Firestore, Analytics, and Crashlytics (Google LLC); Expo services for app updates and diagnostics.
                Each third-party service operates under its own privacy terms.
              </p>

              <h2>9. Your Rights</h2>
              <p>
                You have the right to: access, correct, or delete your personal data; withdraw consent for data processing; request clarification on how your data is used.
              </p>
            </div>

            <div className="my-12 border-t border-border/50"></div>

            <div id="account-deletion" className="scroll-mt-32 bg-destructive/5 p-8 rounded-2xl border border-destructive/20">
              <h2 className="text-destructive flex items-center gap-2 mt-0">
                <Trash2 className="h-6 w-6" />
                Account Deletion
              </h2>
              <p>
                If you would like to delete your GEODHA account and all associated data, please email us with the subject line "Account Deletion Request".
              </p>
              <div className="bg-background p-4 rounded-lg border border-border/50 my-4">
                <p className="font-medium mb-2">Send request to:</p>
                <a href="mailto:contact@geodha.org" className="flex items-center gap-2 text-primary font-bold no-underline hover:underline">
                  <Mail className="h-4 w-4" />
                  contact@geodha.org
                </a>
              </div>
              <p className="text-sm text-muted-foreground mb-0">
                Your account and any submitted reports will be permanently deleted from our servers within 7 days of receiving your request.
              </p>
            </div>

            <div className="mt-16 pt-8 border-t border-border/50 text-center">
              <h3 className="text-lg font-semibold mb-4">Have more questions?</h3>
              <Button variant="outline" asChild>
                <a href="mailto:contact@geodha.org">Contact Support</a>
              </Button>
              <p className="text-sm text-muted-foreground mt-8">
                © GEODHA {currentYear}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
