'use client'

import FloatingNavbar from '@/components/ui/FloatingNavbar'
import Footer from '@/components/ui/Footer'
import Image from 'next/image'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Volunteer() {
  const [showPopup, setShowPopup] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    skills: '',
    availability: '',
    message: ''
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.skills.trim()) newErrors.skills = 'Skills are required'
    if (!formData.availability.trim()) newErrors.availability = 'Availability is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return


    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          city: formData.city,
          skills: formData.skills,
          availability: formData.availability,
          message: formData.message
        },
        'YOUR_PUBLIC_KEY'
      )

      alert('Application submitted successfully!')
      setShowPopup(false)

      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        skills: '',
        availability: '',
        message: ''
      })
    } catch (error) {
      alert('Failed to send application')
      console.error(error)
    }
  }
  return (
    <div className="w-full">
      <FloatingNavbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-100 pt-15">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Become a <span className="text-blue-600">Volunteer</span>
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full mb-8" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our community of changemakers and make a real difference in rural India. Your skills and passion can transform lives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Volunteer with HAND?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Direct impact on rural communities and real people&apos;s lives</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Flexible opportunities - online, on-ground, and hybrid roles</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Skill development and professional growth opportunities</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Join a passionate community of social impact professionals</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-pink-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="mb-6 opacity-90">
                  Fill out our volunteer application form and we&apos;ll match you with opportunities that align with your skills and interests.
                </p>
                <button
                  onClick={() => setShowPopup(true)}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=600&fit=crop"
                  alt="Volunteers working together"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Volunteer Application
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 border transition-all ${errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
                    }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 border transition-all ${errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
                    }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 border transition-all ${errors.phone
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
                    }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 border transition-all ${errors.city
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
                    }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Skills / Expertise"
                  value={formData.skills}
                  onChange={(e) => handleChange('skills', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 border transition-all ${errors.skills
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
                    }`}
                />
                {errors.skills && (
                  <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
                )}
              </div>

              <div>
                <select
                  value={formData.availability}
                  onChange={(e) => handleChange('availability', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 border bg-white transition-all ${errors.availability
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
                    }`}
                >
                  <option value="">Select Availability</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
                {errors.availability && (
                  <p className="text-red-500 text-sm mt-1">{errors.availability}</p>
                )}
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder="Why do you want to volunteer?"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 border transition-all ${errors.message
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
                    }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}



      {/* Application Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How to <span className="text-blue-600">Apply</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full mb-4" />
            <p className="text-lg text-gray-600">
              Joining HAND as a volunteer is a simple 3-step process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fill Application</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete our online volunteer application form with your background, skills, and areas of interest.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Initial Screening</h3>
              <p className="text-gray-600 leading-relaxed">
                We&apos;ll review your application and schedule a brief call to understand your motivation and fit.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Started</h3>
              <p className="text-gray-600 leading-relaxed">
                Once matched, you&apos;ll receive orientation training and be assigned to your first volunteer project.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button onClick={() => setShowPopup(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              Start Your Application
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
