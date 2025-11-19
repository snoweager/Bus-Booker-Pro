README – Multi-Language Support (i18n)
BusBooker Pro – Multi-Language UI System
A fully internationalized web application where users can choose their preferred language and see the UI translated instantly.
This feature improves accessibility and enhances usability for a global audience.
________________________________________
Features
=> Multi-Language UI
• Switch languages instantly
• No page reload required
• Translation applied to all pages and components
• Fallback language support
=> i18n Integration
• Implemented using i18next + react-i18next
• Structured JSON translation files
• Modular & scalable configuration
=> User Experience
• Clean language selector (navbar dropdown)
• Language preference saved in localStorage
• Consistent global translation keys
________________________________________
Tech Stack
Layer	Technology
Frontend	React 18 + TypeScript + Vite
Styling	TailwindCSS
i18n Engine	i18next & react-i18next
Database	Supabase / Backend (if dynamic text required)
State Management	React Hooks
Deployment	Vercel / Netlify
________________________________________
Project Structure
BusBooker_Pro_Task 3/
│── public/
│── src/
│   ├── locales/          # JSON translation files
│   ├── components/       # Buttons, Navbar, Forms
│   ├── pages/            # UI screens with translations
│   ├── hooks/
│   ├── i18n/             # Initialization (optional)
│   ├── App.tsx
│   └── main.tsx
│── index.html
│── package.json
│── tailwind.config.ts
________________________________________
Setup Instructions
1. Clone the Repository
git clone <repo_url>
cd BusBooker_Pro_Task 3
2. Install Dependencies
npm install
3. Start the Development Server
npm run dev
4. Build for Production
npm run build
________________________________________
Core Modules Explained
1. i18n Setup (i18n.ts)
• Initializes i18next
• Sets default and fallback languages
• Loads translation files
2. Language Selector
• Dropdown component for selecting language
• Updates global i18next state
3. Translation JSON Files
Stored in:
src/locales/en/translation.json
src/locales/hi/translation.json
src/locales/te/translation.json
4. Component Translation
import { useTranslation } from "react-i18next";
const { t } = useTranslation();

<h1>{t("home.title")}</h1>
________________________________________
Contributing
Pull requests are welcome.
For major changes, open an issue to discuss updates.
________________________________________
License
MIT License
________________________________________
Author
Padma Sindhoora Ayyagari