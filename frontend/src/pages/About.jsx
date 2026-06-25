// import {requestAccess}  from "../api/requestAccess";

import { useState } from "react";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";


// const BASE_URL = "http://localhost:3214/api";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;



export default function TechTorsoAboutPage() {

    const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    text: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast((current) => ({ ...current, open: false }));
  };

  const handleGrantAccess = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/api/public/access-request`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      showToast(
        response.data.message || "Access request submitted successfully",
        "success"
      );
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        organization: "",
        text: "",
      });
    } catch (error) {
      // console.error("Full error:", error);
      // console.error("Error response:", error.response?.data);
      // console.error("Status:", error.response?.status);
      
      showToast(
        error.response?.data?.message ||
        error.response?.data ||
        `Error: ${error.response?.status || error.message}`,
        "error"
      );
    }
  };



  const features = [
    {
      title: "AI-Powered Document Intelligence",
      description:
        "Ask natural language questions across your enterprise documents and receive context-aware AI generated answers in seconds.",
      icon: "🧠",
    },
    {
      title: "Multi-Document RAG Search",
      description:
        "Search across all uploaded documents simultaneously using advanced Retrieval-Augmented Generation (RAG) architecture.",
      icon: "🔎",
    },
    {
      title: "Document-Specific AI Conversations",
      description:
        "Select a specific document and ask precise questions with highly relevant contextual answers.",
      icon: "📄",
    },
    {
      title: "Secure Role-Based Access Control",
      description:
        "Admin and User level permissions ensure sensitive information remains protected and accessible only to authorized users.",
      icon: "🔐",
    },
    {
      title: "User Management Console",
      description:
        "Admins can create, manage, and remove users with centralized access control capabilities.",
      icon: "👥",
    },
    {
      title: "Smart Document Indexing",
      description:
        "Uploaded documents are automatically chunked, embedded, and indexed for lightning-fast semantic retrieval.",
      icon: "⚡",
    },
    {
      title: "Support for Multiple File Formats",
      description:
        "Upload and process PDFs, DOCX files, and text documents with seamless extraction and indexing.",
      icon: "📚",
    },
    {
      title: "Enterprise-Grade Security",
      description:
        "JWT-based authentication, secured APIs, protected routes, and backend authorization ensure secure operations.",
      icon: "🛡️",
    },
    {
      title: "Modern Responsive UI",
      description:
        "Clean, responsive, and intuitive interface optimized for productivity across desktop and tablet devices.",
      icon: "💻",
    },
    {
      title: "Real-Time AI Responses",
      description:
        "Experience fast and intelligent answers powered by advanced Large Language Models integrated with enterprise search.",
      icon: "🚀",
    },
    {
      title: "Document Ownership & Isolation",
      description:
        "Users can securely access only the documents they are authorized to view and interact with.",
      icon: "🏢",
    },
    {
      title: "Production-Ready Architecture",
      description:
        "Built using scalable backend services, PostgreSQL, Elasticsearch/OpenSearch, Spring Boot, and React.",
      icon: "🌐",
    },
  ];

  const sellingPoints = [
    "Eliminates manual document searching",
    "Improves organizational productivity",
    "Accelerates knowledge discovery",
    "Reduces employee dependency on SMEs",
    "Provides instant AI-powered answers",
    "Supports enterprise-scale document retrieval",
    "Enhances security with RBAC and JWT",
    "Scalable architecture for future growth",
    "Easy onboarding and user management",
    "Optimized semantic search using embeddings",
  ];

  const techStack = [
    "React",
    "Spring Boot",
    "PostgreSQL",
    "Elasticsearch / OpenSearch",
    "JWT Authentication",
    "REST APIs",
    "RAG Architecture",
    "LLM Integration",
    "Vector Search",
    "Responsive UI",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-slate-800/70 border border-slate-700 rounded-full px-5 py-2 text-sm shadow-lg">
            <span className="text-cyan-400">●</span>
            Intelligent Enterprise RAG Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            About <span className="text-cyan-400">TechTorso AI</span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            TechTorso AI is an enterprise-grade Retrieval-Augmented Generation
            (RAG) platform designed to transform how organizations interact
            with their internal knowledge base. The platform enables users to
            upload documents, securely manage access, and ask AI-powered
            questions to instantly retrieve accurate, contextual answers.
            Built using modern open-source technologies and scalable AI
            architecture, TechTorso AI combines flexibility, transparency,
            performance, and enterprise-ready capabilities into a unified
            intelligent knowledge platform.
          </p>
        </section>

        {/* Vision Section */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 text-cyan-400">
              Our Vision
            </h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              We aim to simplify enterprise knowledge access using advanced AI
              and semantic search technologies. TechTorso AI empowers teams to
              retrieve information instantly without manually navigating through
              lengthy documents.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 text-cyan-400">
              Why TechTorso?
            </h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              Traditional search systems rely heavily on keywords. TechTorso AI
              uses semantic understanding and contextual retrieval to provide
              highly accurate AI-generated answers from enterprise documents.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold">Core Features</h2>
            <p className="text-slate-400 text-lg">
              Powerful capabilities built for modern enterprise knowledge
              management.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 hover:border-cyan-500 transition-all duration-300 hover:shadow-cyan-500/10 hover:shadow-2xl"
              >
                <div className="text-5xl mb-5">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Selling Points */}
        <section className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-cyan-400">
              Key Business Benefits
            </h2>

            <div className="space-y-4">
              {sellingPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-slate-800/50 rounded-2xl p-4"
                >
                  <div className="text-cyan-400 text-xl mt-1">✓</div>
                  <p className="text-slate-300 text-lg">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-cyan-400">
              Technology Stack
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 text-center text-lg font-medium hover:border-cyan-500 transition-all"
                >
                  {tech}
                </div>
              ))}
            </div>

            <div className="mt-8 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold mb-3 text-cyan-300">
                Open-Source Powered Innovation
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                TechTorso AI leverages a powerful ecosystem of trusted
                open-source technologies including React, Spring Boot,
                PostgreSQL, Elasticsearch/OpenSearch, and modern AI-driven RAG
                frameworks to deliver enterprise-grade intelligence with
                scalability and flexibility.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-cyan-300">
                Scalable Architecture
              </h3>
              <p className="text-slate-300 leading-relaxed">
                TechTorso AI is designed with enterprise scalability in mind,
                supporting secure document ingestion, vector search, semantic
                retrieval, and future expansion for advanced AI workflows.
              </p>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <h2 className="text-4xl font-bold text-cyan-400">
                Enterprise Security & Governance
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed">
                Security is at the core of TechTorso AI. The platform includes
                JWT authentication, role-based access control, secure APIs,
                protected document ownership, and backend authorization layers
                to safeguard enterprise data.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-700">
                  <h4 className="font-semibold text-cyan-300 mb-2">
                    Authentication
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Secure JWT-based sessions
                  </p>
                </div>

                <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-700">
                  <h4 className="font-semibold text-cyan-300 mb-2">
                    RBAC
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Fine-grained access control
                  </p>
                </div>

                <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-700">
                  <h4 className="font-semibold text-cyan-300 mb-2">
                    API Protection
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Secured backend endpoints
                  </p>
                </div>

                <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-700">
                  <h4 className="font-semibold text-cyan-300 mb-2">
                    Data Isolation
                  </h4>
                  <p className="text-slate-400 text-sm">
                    User-specific document access
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6">
              <h3 className="text-3xl font-bold text-center text-cyan-300">
                Platform Highlights
              </h3>

              <div className="space-y-5">
                <div className="flex items-center justify-between bg-slate-800/60 rounded-2xl p-4">
                  <span className="text-lg">AI-Powered Search</span>
                  <span className="text-cyan-400 font-bold">✓</span>
                </div>

                <div className="flex items-center justify-between bg-slate-800/60 rounded-2xl p-4">
                  <span className="text-lg">Enterprise Security</span>
                  <span className="text-cyan-400 font-bold">✓</span>
                </div>

                <div className="flex items-center justify-between bg-slate-800/60 rounded-2xl p-4">
                  <span className="text-lg">Semantic Retrieval</span>
                  <span className="text-cyan-400 font-bold">✓</span>
                </div>

                <div className="flex items-center justify-between bg-slate-800/60 rounded-2xl p-4">
                  <span className="text-lg">Scalable Architecture</span>
                  <span className="text-cyan-400 font-bold">✓</span>
                </div>

                <div className="flex items-center justify-between bg-slate-800/60 rounded-2xl p-4">
                  <span className="text-lg">Production Ready</span>
                  <span className="text-cyan-400 font-bold">✓</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-10 shadow-2xl text-center space-y-6">
          <h2 className="text-4xl font-bold text-cyan-400">
            Future Roadmap
          </h2>

          <p className="text-slate-300 text-lg max-w-5xl mx-auto leading-relaxed">
            TechTorso AI is continuously evolving with upcoming capabilities
            such as streaming AI responses, OCR support, citation highlighting,
            audit logs, advanced analytics, multi-tenant architecture, SSO
            integration, and intelligent enterprise workflows.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {[
              "Streaming AI",
              "OCR Support",
              "SSO Integration",
              "Audit Logs",
              "Analytics",
              "Chat History",
              "Citation Highlighting",
              "Multi-Tenant Support",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-cyan-500/10 border border-cyan-500/30 rounded-full px-5 py-2 text-cyan-200"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Access Request Section */}
        <section className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-cyan-500/20 rounded-3xl p-10 shadow-2xl">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 text-cyan-300 text-sm">
                Early Access Registration
              </div>

              <h2 className="text-4xl font-bold leading-tight">
                Request Access to
                <span className="text-cyan-400"> TechTorso AI</span>
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed">
                Interested in using TechTorso AI for your organization? Submit
                your details and our team will reach out to provide platform
                access, onboarding assistance, and enterprise deployment
                guidance.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
                  <div className="text-cyan-400 text-2xl">✓</div>
                  <div>
                    <h4 className="font-semibold">Enterprise Onboarding</h4>
                    <p className="text-slate-400 text-sm">
                      Personalized setup and platform walkthrough
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
                  <div className="text-cyan-400 text-2xl">✓</div>
                  <div>
                    <h4 className="font-semibold">Secure Access Provisioning</h4>
                    <p className="text-slate-400 text-sm">
                      Controlled and role-based platform access
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
                  <div className="text-cyan-400 text-2xl">✓</div>
                  <div>
                    <h4 className="font-semibold">Dedicated Support</h4>
                    <p className="text-slate-400 text-sm">
                      Guidance for deployment and integration
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold mb-6 text-cyan-400 text-center">
                Contact Our Team
              </h3>

              <form className="space-y-5" onSubmit={handleGrantAccess}>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Company or Organization"
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Message
                  </label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your use case or requirements"
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-4 rounded-2xl transition-all duration-300 hover:shadow-cyan-500/30 hover:shadow-2xl"
                >
                  Request Platform Access
                </button>
              </form>

              <div className="mt-6 text-center text-slate-400 text-sm">
                Or contact us directly at
                <span className="text-cyan-400"> krishna.kishore86@gmail.com</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-6 border-t border-slate-800 space-y-3">
          <h3 className="text-2xl font-bold text-cyan-400">
            TechTorso AI Platform
          </h3>

          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Delivering intelligent enterprise search, AI-powered document
            understanding, and scalable Retrieval-Augmented Generation
            solutions for modern organizations.
          </p>

          <div className="text-slate-500 text-sm pt-4">
            © 2026 TechTorso.io • Enterprise AI Knowledge Platform
          </div>
        </footer>

        {/* Toast Notification */}
        <Snackbar
          open={toast.open}
          autoHideDuration={6000}
          onClose={handleCloseToast}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseToast}
            severity={toast.severity}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
