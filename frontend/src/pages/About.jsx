import React from "react";
import {
  ShieldCheck,
  Database,
  Brain,
  FileText,
  BookOpen,
  Server,
  Layers3,
  Workflow,
  Lock,
  Globe,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: <Brain size={28} />,
      title: "AI-Powered RAG Architecture",
      description:
        "Built using Retrieval Augmented Generation (RAG) principles with OpenAI embeddings and semantic document retrieval.",
    },
    {
      icon: <Database size={28} />,
      title: "Vector Database Integration",
      description:
        "Uses PostgreSQL with pgvector for efficient vector similarity search and contextual retrieval.",
    },
    {
      icon: <FileText size={28} />,
      title: "Document Intelligence",
      description:
        "Upload enterprise documents and interact with them through intelligent contextual question-answering.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Secure Authentication",
      description:
        "JWT-based authentication with secured APIs and enterprise-ready backend architecture.",
    },
    // {
    //   icon: <Workflow size={28} />,
    //   title: "Streaming AI Responses",
    //   description:
    //     "Supports real-time streamed responses for a modern conversational AI experience.",
    // },
    {
      icon: <Server size={28} />,
      title: "Production-Ready Backend",
      description:
        "Built with Java, Spring Boot, Spring AI, and scalable REST API architecture.",
    },
  ];

  const techStack = [
    "Java 21",
    "Spring Boot",
    "Spring AI",
    "PostgreSQL",
    "pgvector",
    "React",
    "JWT Authentication",
    "OpenAI APIs",
    "REST APIs",
    "Maven",
    "github",
    "Docker Ready",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full text-sm text-slate-300 mb-6">
            <Sparkles size={16} />
            Production Grade AI Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Enterprise RAG Platform
          </h1>

          <p className="text-slate-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            A production-grade Retrieval Augmented Generation (RAG) platform
            built using Java, Spring Boot, Spring AI, PostgreSQL, and OpenAI.
            Designed for secure enterprise document intelligence, semantic
            search, and scalable AI-powered knowledge systems.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a
              href="https://github.com/techtorso"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              View Open Source
            </a>

            <a
              href="/"
              className="border border-slate-700 px-6 py-3 rounded-xl hover:bg-slate-900 transition"
            >
              Launch Application
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Core Features</h2>
          <p className="text-slate-400 text-lg">
            Built with enterprise-grade architecture and modern AI engineering
            principles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition"
            >
              <div className="mb-4 text-cyan-400">{feature.icon}</div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
          <div className="flex items-center gap-3 mb-6">
            <Layers3 className="text-cyan-400" size={32} />
            <h2 className="text-4xl font-bold">
              Enterprise Architecture
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 text-slate-300 leading-relaxed">
            <div>
              <p className="mb-5">
                The platform follows a modern Retrieval Augmented Generation
                (RAG) pipeline architecture capable of supporting enterprise
                document intelligence systems.
              </p>

              <p className="mb-5">
                Uploaded documents are transformed into embeddings and stored
                inside PostgreSQL vector storage using pgvector for semantic
                similarity search.
              </p>

              <p>
                During user queries, the system retrieves contextually relevant
                information before generating AI responses using OpenAI models.
              </p>
            </div>

            <div>
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800">
                <pre className="text-sm text-cyan-300 overflow-auto">
{`User Question
      ↓
Embedding Search
      ↓
Vector Retrieval
      ↓
Context Injection
      ↓
OpenAI Generation
      ↓
Streaming Response`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Technology Stack</h2>
          <p className="text-slate-400 text-lg">
            Modern backend and AI infrastructure technologies.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-xl text-slate-300 hover:border-cyan-500 transition"
            >
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* OPEN SOURCE */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-cyan-900/20 to-slate-900 rounded-3xl border border-cyan-800 p-10">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-cyan-400" size={32} />
            <h2 className="text-4xl font-bold">
              Open Source & Customizable
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="text-slate-300 leading-relaxed">
              <p className="mb-5">
                This project is open source and designed to serve as a
                customizable enterprise-grade RAG foundation for organizations,
                developers, and AI engineers.
              </p>

              <p className="mb-5">
                Organizations are expected to configure and manage their own:
              </p>

              <ul className="space-y-3 text-slate-400">
                <li>• Database infrastructure</li>
                <li>• Authentication systems</li>
                <li>• OpenAI API keys</li>
                <li>• Security policies</li>
                <li>• Cloud deployments</li>
                <li>• User management workflows</li>
              </ul>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-4 text-cyan-400">
                <Lock size={20} />
                <h3 className="font-semibold text-lg">
                  Security & Ownership
                </h3>
              </div>

              <p className="text-slate-400 leading-relaxed mb-5">
                The platform does not manage customer enterprise credentials or
                company-sensitive infrastructure. Each organization retains full
                ownership and control over its data, databases, security
                configurations, and deployment environment.
              </p>

              <p className="text-slate-400 leading-relaxed">
                The goal is to provide a scalable AI foundation while enabling
                complete customization and infrastructure independence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE ROADMAP */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Future Roadmap</h2>
          <p className="text-slate-400 text-lg">
            Planned improvements and upcoming enterprise AI capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Conversation Memory",
            "Follow-Up Questions",
            "Role-Based Access Control",
            "Multi-Tenant Architecture",
            "Hybrid Search",
            "Redis Caching",
            "Azure Deployments",
            "Advanced Analytics",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center text-slate-300"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 md:p-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-3">Contact & Interest</h2>
              <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                If you'd like to create an account or learn more about the platform,
                reach out via email. We'll respond with next steps and share availability.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-400 mb-3">
                Contact email
              </p>
              <a
                href="mailto:contact@techtorso.ai"
                className="text-xl font-semibold text-white hover:text-cyan-300 transition"
              >
                {/* contact@techtorso.ai */}
                krishna.kishore86@gmail.com
              </a>
              <p className="text-slate-400 mt-3">
                Send your email and let us know you are interested.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-semibold">TechTorso AI Platform</h3>
            <p className="text-slate-500 mt-1">
              Enterprise AI • RAG • Spring AI • Open Source
            </p>
          </div>

          <div className="flex items-center gap-5 text-slate-400">
            <a
              href="https://github.com/techtorso"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              github
            </a>

            <a
              href="/"
              className="hover:text-white transition"
            >
              Application
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}