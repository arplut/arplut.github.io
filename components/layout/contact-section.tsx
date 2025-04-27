"use client"

import { useState } from "react"
import { Container } from "./container"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mail, User, MessageSquare, Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export function ContactSection() {
  const { t } = useTranslation()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null,
    message: string
  }>({ type: null, message: '' })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      setFormStatus({ type: null, message: '' })
      
      const formData = new FormData()
      formData.append('access_key', process.env.NEXT_PUBLIC_WEB_FORMS_KEY as string)
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('message', values.message)
      formData.append('from_name', 'Geodha Website')
      formData.append('subject', 'New message from Geodha website')
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.success) {
        setFormStatus({ 
          type: 'success', 
          message: t("contact.sendSuccess")
        })
        form.reset()
      } else {
        setFormStatus({ 
          type: 'error', 
          message: data.message || t("contact.sendError")
        })
      }
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: t("contact.sendError")
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 md:py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-emerald-50 opacity-80"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-green-500"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500"></div>
      
      <div className="absolute -left-24 top-1/3 w-48 h-48 rounded-full bg-blue-400 opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute -right-24 bottom-1/3 w-48 h-48 rounded-full bg-green-400 opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 font-medium mb-4">
            {t("contact.getInTouch")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-emerald-700 to-green-700">
            {t("contact.interest")}
          </h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            {t("contact.lookingFor")}
            <span className="font-semibold text-blue-700">
              {t("contact.appDevelopment")}
            </span>, 
            <span className="font-semibold text-emerald-700">
              {t("contact.contentCreation")}
            </span>, 
            <span className="font-semibold text-green-700">
              {t("contact.kannadaTranslation")}
            </span>, 
            {t("navigation.or")} <span className="font-semibold text-purple-700">{t("contact.coFounder")}</span>, 
            {t("contact.hearFromYou")}
          </p>
        </div>
        
        <div className="mx-auto max-w-lg">
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-8 border border-blue-100/50 hover:shadow-blue-100/30 transition-all duration-300">
            {formStatus.type === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("contact.messageSent")}</h3>
                <p className="text-gray-600">{formStatus.message}</p>
                <Button 
                  type="button" 
                  onClick={() => setFormStatus({ type: null, message: '' })}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition-all duration-300"
                >
                  {t("contact.sendAnotherMessage")}
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {formStatus.type === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {formStatus.message}
                    </div>
                  )}
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="font-medium text-gray-700">{t("contact.name")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <User size={16} />
                            </div>
                            <Input 
                              placeholder={t("contact.yourName")} 
                              {...field} 
                              className="pl-10 rounded-lg border-blue-100 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300" 
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="font-medium text-gray-700">{t("contact.email")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <Mail size={16} />
                            </div>
                            <Input 
                              placeholder={t("contact.yourEmail")} 
                              {...field} 
                              className="pl-10 rounded-lg border-blue-100 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="font-medium text-gray-700">{t("contact.message")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-3 text-gray-400">
                              <MessageSquare size={16} />
                            </div>
                            <textarea 
                              placeholder={t("contact.tellUsMessage")} 
                              {...field} 
                              className="w-full pl-10 pt-2 h-32 rounded-lg border border-blue-100 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-medium py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("contact.sending")}
                      </>
                    ) : (
                      t("contact.send")
                    )}
                  </Button>
                </form>
              </Form>
            )}
            
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-600">{t("contact.reachOut")}</p>
              <a href="mailto:contact@geodha.org" className="inline-block mt-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300">
                contact@geodha.org
              </a>
              
              <div className="flex justify-center space-x-4 mt-4">
                <a href="https://www.linkedin.com/company/geodha" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/geodha_org" className="text-gray-600 hover:text-pink-600 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.reddit.com/r/geodha" className="text-gray-600 hover:text-orange-600 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}