"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Globe,
  Smartphone,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import Image from "next/image"
import { AnimatedBackground } from "./components/animated-background"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [activeFilter, setActiveFilter] = useState("All")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  const projects = [
    {
      title: "Thrifty (E-Commerce Platform)",
      description:
        "Full-stack e-commerce solution with React, Node.js, and PostgreSQL featuring user authentication, payment processing, and admin dashboard.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redux", "Express"],
      github: "https://github.com/daniel/ecommerce",
      live: "https://ecommerce-demo.com",
      category: "Full Stack",
      features: [
        "User authentication & authorization",
        "Shopping cart & checkout process",
        "Payment integration with Stripe",
        "Admin dashboard for inventory management",
        "Order tracking & history",
        "Responsive design for all devices",
      ],
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management tool with real-time updates, team collaboration features, and intuitive drag-and-drop interface.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Next.js", "Socket.io", "MongoDB", "Tailwind", "TypeScript", "Prisma"],
      github: "https://github.com/daniel/taskapp",
      live: "https://taskapp-demo.com",
      category: "Frontend",
      features: [
        "Real-time collaboration",
        "Drag & drop task management",
        "Team workspace organization",
        "Progress tracking & analytics",
        "File attachments & comments",
        "Mobile-responsive interface",
      ],
    },
    {
      title: "Weather Dashboard",
      description:
        "Interactive weather dashboard with data visualization, location-based forecasts, and historical weather data analysis.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Vue.js", "D3.js", "Express", "Weather API", "Chart.js", "Axios"],
      github: "https://github.com/daniel/weather",
      live: "https://weather-dashboard-demo.com",
      category: "Frontend",
      features: [
        "Real-time weather data",
        "Interactive charts & graphs",
        "Location-based forecasts",
        "Historical data analysis",
        "Weather alerts & notifications",
        "Customizable dashboard widgets",
      ],
    },
    {
      title: "API Gateway Service",
      description:
        "Microservices API gateway with authentication, rate limiting, load balancing, and comprehensive monitoring capabilities.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Go", "Redis", "Docker", "Kubernetes", "Prometheus", "Grafana"],
      github: "https://github.com/daniel/api-gateway",
      live: null,
      category: "Backend",
      features: [
        "Request routing & load balancing",
        "Authentication & authorization",
        "Rate limiting & throttling",
        "API monitoring & analytics",
        "Docker containerization",
        "Kubernetes orchestration",
      ],
    },
  ]

  const filteredProjects = projects.filter((project) => activeFilter === "All" || project.category === activeFilter)

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
  }

  const skills = [
    { name: "JavaScript", level: 95, icon: Code },
    { name: "React/Next.js", level: 90, icon: Globe },
    { name: "Node.js", level: 85, icon: Database },
    { name: "Python", level: 80, icon: Code },
    { name: "PostgreSQL", level: 85, icon: Database },
    { name: "Mobile Development", level: 75, icon: Smartphone },
  ]

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Form submitted:", formData)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSocialClick = (platform: string, url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleProjectLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleProjectClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl"></div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection("projects")} className="hover:text-primary transition-colors">
                Projects
              </button>
              <button onClick={() => scrollToSection("skills")} className="hover:text-primary transition-colors">
                Skills
              </button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors">
                Contact
              </button>
            </div>

            {/* Mobile Navigation Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left py-2 hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="block w-full text-left py-2 hover:text-primary transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="block w-full text-left py-2 hover:text-primary transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left py-2 hover:text-primary transition-colors"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
        <AnimatedBackground />

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-float-slow"></div>
          <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-float-medium"></div>
          <div className="floating-element absolute bottom-40 left-20 w-16 h-16 bg-purple-400/10 rounded-full blur-xl animate-float-fast"></div>
          <div className="floating-element absolute bottom-20 right-40 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl animate-float-slow"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Profile Image with Enhanced Effects */}
          <div className="mb-8 relative">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-full blur-lg opacity-75 animate-pulse-slow"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 rounded-full blur-xl opacity-50 animate-spin-slow"></div>
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Daniel's Profile"
                width={150}
                height={150}
                className="relative rounded-full mx-auto mb-6 border-4 border-white/30 shadow-2xl backdrop-blur-sm hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Enhanced Typography */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
              <span className="inline-block animate-fade-in-up">Hi, I'm </span>
              <span className="inline-block text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text animate-gradient-x animate-fade-in-up-delay">
                Daniel
              </span>
            </h1>

            <div className="relative">
              <p className="text-xl sm:text-2xl text-slate-200/90 mb-8 max-w-3xl mx-auto drop-shadow-lg font-light animate-fade-in-up-delay-2">
                Full-Stack Developer passionate about creating
                <span className="text-blue-300 font-medium"> innovative web applications </span>
                and solving complex problems through code.
              </p>

              {/* Typing Animation Effect */}
              <div className="text-lg text-slate-300/80 mb-8 animate-fade-in-up-delay-3">
                <span className="inline-block">Building the future, one line of code at a time</span>
                <span className="animate-blink">|</span>
              </div>
            </div>
          </div>

          {/* Enhanced Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up-delay-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="mr-2">View My Work</span>
              <ChevronDown className="h-4 w-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="group border-2 border-white/30 text-slate-200 hover:bg-white/10 backdrop-blur-md transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <Mail className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
              Get In Touch
            </Button>
          </div>

          {/* Enhanced Social Links */}
          <div className="flex justify-center space-x-8 animate-fade-in-up-delay-5">
            {[
              { icon: Github, url: "https://github.com/daniel", label: "GitHub" },
              { icon: Linkedin, url: "https://linkedin.com/in/daniel", label: "LinkedIn" },
              { icon: Mail, url: "mailto:daniel@example.com", label: "Email" },
            ].map(({ icon: Icon, url, label }, index) => (
              <button
                key={label}
                onClick={() => handleSocialClick(label, url)}
                className="group relative p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-slate-300/80 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-6"
                style={{ animationDelay: '${index * 0.1}s' }}
              >
                <Icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Scroll Indicator
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center text-white/60">
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="h-5 w-5 animate-pulse" />
            </div>
          </div> */}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6">
                I'm a passionate full-stack developer with over 5 years of experience building web applications. I love
                turning complex problems into simple, beautiful, and intuitive solutions.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing my knowledge through technical writing and mentoring.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Problem Solver</Badge>
                <Badge variant="secondary">Team Player</Badge>
                <Badge variant="secondary">Continuous Learner</Badge>
                <Badge variant="secondary">Open Source Contributor</Badge>
              </div>
            </div>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">🎓 Education</h3>
                  <p className="text-muted-foreground">Computer Science, University of Technology</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">💼 Experience</h3>
                  <p className="text-muted-foreground">5+ years in full-stack development</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">🌍 Location</h3>
                  <p className="text-muted-foreground">Available for remote work worldwide</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>

          {/* Project Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-2">
              {["All", "Frontend", "Backend", "Full Stack"].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange(filter)}
                  className="transition-all duration-200"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setActiveProject(index)}
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge>{project.category}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="secondary" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {project.title}
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleProjectLink(project.github)
                        }}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </button>
                      {project.live && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleProjectLink(project.live)
                          }}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '${skill.level}%' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Let's work together!</h3>
              <p className="text-muted-foreground mb-8">
                I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                want to say hi, feel free to reach out!
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>daniel@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="h-5 w-5 text-primary" />
                  <span>github.com/daniel</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <span>linkedin.com/in/daniel</span>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>

                  {submitStatus === "success" && (
                    <div className="text-green-600 text-center mt-4">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="text-red-600 text-center mt-4">Failed to send message. Please try again.</div>
                  )}

                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">© 2024 Daniel. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>

      {/* Scroll to top button */}
      <Button
        className="fixed bottom-8 right-8 rounded-full p-3"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronDown className="h-4 w-4 rotate-180" />
      </Button>
      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-lg">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="mb-2">{selectedProject.category}</Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedProject.title}</h2>
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg text-muted-foreground mb-6">{selectedProject.description}</p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Project Details</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Responsive design with modern UI/UX</p>
                      <p>• Full-stack implementation</p>
                      <p>• Optimized for performance</p>
                      <p>• Mobile-first approach</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Key Features</h3>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {selectedProject.features?.map((feature, index) => (
                      <p key={index}>• {feature}</p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => handleProjectLink(selectedProject.github)} className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    View Source Code
                  </Button>
                  {selectedProject.live && (
                    <Button
                      variant="outline"
                      onClick={() => handleProjectLink(selectedProject.live)}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
