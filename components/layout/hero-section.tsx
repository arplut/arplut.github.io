"use client"

import { Container } from "./container"
import { Button } from "../ui/button"
import Link from "next/link"
import Image from "next/image"
import mainLogo from "@/public/logo.png"
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import googlePlay from "@/public/play.svg"
import { useClientTranslation } from "@/lib/use-client-translation"

export function HeroSection() {
  // State to track if the component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false)
  const { t } = useClientTranslation();
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Dynamically import the map component to avoid SSR issues with Leaflet
  const BangaloreMap = dynamic(() => import('@/components/layout/map-component').then(mod => mod.BangaloreMap), {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">{t("common.loading")}</p>
      </div>
    )
  })

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-500/20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-green-500/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-yellow-500/20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-30 h-30 rounded-full bg-red-500/20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <Container className="text-center relative z-10">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full font-medium mb-2">
            Beta Version
          </div>
          <Image src={mainLogo} className="mx-auto" alt="GEODHA Logo" width={600} height={100} />

          <p className="text-lg sm:text-xl text-gray-700 font-medium">
            {t("hero.subtitle")}
          </p>
            <div className="flex justify-center">
                <Link 
                href="https://play.google.com/store/apps/details?id=com.geodha.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                <Image src={googlePlay} alt="Google Play icon" width={24} height={24} />
                <span className="font-medium">Get on Google Play</span>
                </Link>
            </div>
        </div>
        <div className="mt-12 overflow-hidden rounded-xl border bg-background shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
          <div className="relative w-full h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-green-500/10 z-10 pointer-events-none"></div>
            {isMounted && <BangaloreMap />}
          </div>
        </div>
      </Container>
    </section>
  )
}