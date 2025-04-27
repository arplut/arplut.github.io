"use client"

import { Container } from "./container"
import { Separator } from "../ui/separator"
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { useClientTranslation } from "@/lib/use-client-translation"
import GeodhaLogo from "@/public/logo.png"
import Image from "next/image"

export function Footer() {
  const { t } = useClientTranslation();
  
  return (
    <footer className="bg-muted py-12">
      <Container>
        {/* <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image src={GeodhaLogo} alt="Geodha Logo" className="h-16 w-auto" />
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div> */}
        
        {/* <Separator className="my-8" /> */}
        
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <Image src={GeodhaLogo} alt="Geodha Logo" className="h-14 w-auto" />
          <span>&copy; {new Date().getFullYear()} {t("common.title")}. {t("footer.rights")}</span>
        </div>
      </Container>
    </footer>
  )
}