# 📚 CramJam

Your ultimate exam preparation companion! CramJam is an interactive web application designed to help students master multiple-choice questions, track their progress, and boost their confidence through intelligent practice sessions.

## [LIVE DEMO 🚀](https://cramjam.vercel.app/)

## 🌟 Features

### 🎯 Core Learning Features
- **Interactive MCQ Practice** - Engage with multiple-choice questions with instant feedback
- **AI-Powered Quiz Generation** - Create custom quizzes on any topic using Google Gemini AI
- **Custom Quiz Upload** - Upload your own JSON-formatted question sets
- **Sample Quizzes** - Pre-made quizzes to get you started immediately

### 📊 Progress Tracking
- **Detailed Analytics** - Track your performance, timing, and improvement over time
- **Achievement System** - Earn badges and achievements for reaching milestones
- **Study Streaks** - Maintain learning momentum with streak tracking
- **Performance Insights** - Identify strengths and areas for improvement

### 🎨 User Experience
- **Modern Design** - Clean, intuitive interface with smooth animations
- **Dark/Light Mode** - Seamlessly switch between themes
- **Responsive Design** - Perfect experience on desktop, tablet, and mobile
- **Real-time Feedback** - Instant explanations and progress updates

### 🔐 User Management
- **Secure Authentication** - Powered by Supabase Auth
- **User Profiles** - Personalized dashboards and settings
- **Data Persistence** - All your progress is safely stored
- **Privacy Focused** - Your data belongs to you

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/-Zustand-FF4154?style=for-the-badge&logo=react&logoColor=white)

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Beautiful, accessible components
- **Zustand** - Lightweight state management
- **Lucide React** - Beautiful icons

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Robust relational database
- **Row Level Security** - Secure data access
- **Real-time subscriptions** - Live data updates

### AI Integration
- **Google Gemini AI** - Intelligent quiz generation
- **Custom prompts** - Tailored question creation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cramjam.git
   cd cramjam
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the migration files in the `supabase/migrations/` folder
   - Or use the Supabase CLI: `supabase db push`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
cramjam/
├── app/                    # Next.js App Router
│   ├── (root)/            # Public pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   ├── quiz/              # Quiz components
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and configurations
│   ├── supabase/          # Supabase client and types
│   ├── database/          # Database operations
│   └── auth/              # Authentication helpers
├── hooks/                 # Custom React hooks
├── supabase/             # Database migrations
└── public/               # Static assets
```

## 🎯 Key Features Explained

### Quiz Generation
- **AI-Powered**: Generate quizzes on any topic using Google Gemini AI
- **Custom Upload**: Upload JSON files with your own questions
- **Sample Quizzes**: Pre-made quizzes for immediate practice

### Progress Tracking
- **Real-time Analytics**: Track performance, timing, and accuracy
- **Achievement System**: Earn badges for milestones and accomplishments
- **Study Streaks**: Maintain learning momentum with daily practice

### User Experience
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Choose your preferred theme
- **Smooth Animations**: Engaging micro-interactions and transitions

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the provided migration files
3. Configure authentication providers
4. Set up Row Level Security policies

### AI Integration
1. Get a Google Gemini API key
2. Add it to your environment variables
3. Configure rate limiting and usage quotas

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Amazing backend platform
- [Shadcn/ui](https://ui.shadcn.com) - Beautiful component library
- [Lucide](https://lucide.dev) - Gorgeous icon set
- [Vercel](https://vercel.com) - Seamless deployment platform

## 📞 Support

If you have any questions or need help:

- 📧 Email: support@cramjam.app
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/cramjam/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/cramjam/discussions)

---

<div align="center">
  <p>Made with ❤️ for students everywhere</p>
  <p>
    <a href="https://cramjam.vercel.app">🌐 Live Demo</a> •
    <a href="#getting-started">🚀 Get Started</a> •
    <a href="#contributing">🤝 Contribute</a>
  </p>
</div>