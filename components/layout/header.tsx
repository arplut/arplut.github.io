"use client"

import Link from "next/link"
import { Container } from "./container"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Menu } from "lucide-react"
import { LanguageSwitcher } from "../ui/language-switcher"
import { useClientTranslation } from "@/lib/use-client-translation"

export function Header() {
  const { t } = useClientTranslation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl">
              {t("common.title")}
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
                {t("navigation.features")}
              </Link>
              <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
                {t("navigation.about")}
              </Link>
              <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
                {t("download.title")}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="#contact">{t("navigation.contact")}</Link>
            </Button>
            <Button asChild className="hidden md:flex">
              <Link href="#">{t("download.title")}</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
                    {t("navigation.features")}
                  </Link>
                  <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
                    {t("navigation.about")}
                  </Link>
                  <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
                    {t("download.title")}
                  </Link>
                  <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
                    {t("navigation.contact")}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  )
}