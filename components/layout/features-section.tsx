"use client"

import { Container } from "./container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { FileText, Globe, BarChart, Users, Map, Database } from "lucide-react"
import Image from "next/image"
import { useClientTranslation } from "@/lib/use-client-translation"

export function FeaturesSection() {
  const { t } = useClientTranslation();
  
  return (
    <section id="features" className="py-12 md:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-green-50 opacity-70"></div>
      
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-emerald-600 to-green-600">
            {t("features.title")}
          </h2>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            {t("features.subtitle")}
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="group overflow-hidden border-blue-100 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="space-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle className="text-blue-800">{t("features.feature1Title")}</CardTitle>
              <CardDescription className="text-gray-600">
                {t("features.feature1Desc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md overflow-hidden border border-blue-100 shadow-inner bg-gradient-to-br from-white to-blue-50">
                <Image 
                  src="/file.svg" 
                  alt={t("features.feature1Title")} 
                  width={300} 
                  height={180} 
                  className="transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="group overflow-hidden border-emerald-100 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="space-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                <Map className="h-6 w-6" />
              </div>
              <CardTitle className="text-emerald-800">{t("features.feature2Title")}</CardTitle>
              <CardDescription className="text-gray-600">
                {t("features.feature2Desc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md overflow-hidden border border-emerald-100 shadow-inner bg-gradient-to-br from-white to-emerald-50">
                <Image 
                  src="/globe.svg" 
                  alt={t("features.feature2Title")} 
                  width={300} 
                  height={180} 
                  className="transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="group overflow-hidden border-green-100 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="space-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                <Database className="h-6 w-6" />
              </div>
              <CardTitle className="text-green-800">{t("features.feature3Title")}</CardTitle>
              <CardDescription className="text-gray-600">
                {t("features.feature3Desc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md overflow-hidden border border-green-100 shadow-inner bg-gradient-to-br from-white to-green-50">
                <Image 
                  src="/window.svg" 
                  alt={t("features.feature3Title")} 
                  width={300} 
                  height={180} 
                  className="transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}