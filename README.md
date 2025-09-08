# GEODHA

## About GEODHA

GEODHA is a civic engagement platform that empowers communities to report local issues and create data-driven solutions for urban challenges. 

### Mission
- Engage communities to submit reports of problems they are facing
- Create maps of reports to raise awareness on big problems
- Facilitate data analytics towards solving these challenges
- Initially launching as a pilot program in Bengaluru, India

## Project info

**URL**: https://lovable.dev/projects/5656a31d-a816-4b09-88fe-07d8c55d0502

## 📱 GEODHA App – Comprehensive Feature List

### 1️⃣ User Profile & Access

#### User Registration & Login
- Email, phone number, or social login
- Option for pseudonymous/anonymous reporting (to encourage participation)

#### User Dashboard
- History of submitted reports
- Endorsements given & received
- Badges/recognition for contributions (kept simple, not gamified bloat)

#### Profile Settings
- Language preference (English, Kannada, others in future)
- Notification preferences (alerts for nearby hotspots, report updates)
- Privacy settings (share name publicly or keep anonymous)

### 2️⃣ Reporting & Data Capture

#### Report Creation
- Capture photo via in-app camera OR upload existing photo
- Auto-fetch metadata (date, time, GPS) from uploaded image
- Verify metadata vs. user's current/selected location
- Allow user to manually set location if reporting remotely
- Add short description (free text + optional tags for category selection)

#### Data Segregation (in-app backend AI or manual prompts)
- Automatically detect/report type (e.g., garbage pile, burning, sewage) — kept basic but expandable
- User option to reclassify if auto-tagging is wrong

### 3️⃣ Maps & Visualization

#### Interactive Heatmap
- View all reports as pins/heatmap
- Clustering within 5m radius → shows as one collated report
- Option to "endorse" an existing report OR "create new" if different

#### Filtering & Layers
- Filter reports by status (Red/Yellow/Green)
- Time filter (last 24h, last week, all-time)
- Category filter (garbage, burning, waterlogging, etc.)

### 4️⃣ Report Validation & Endorsements

#### Validation Flow
Reports categorized by:
- 🟢 **Green** → Report endorsed + cleanup verified
- 🟡 **Yellow** → Newly reported, pending verification
- 🔴 **Red** → Verified problem, not resolved

#### Endorsements
- Other users can validate that a report is real (by photo or visit)
- Users can validate cleanup (by submitting a new photo tagged to the report)
- Threshold system (e.g., ≥3 endorsements = verified)

### 5️⃣ Data Analytics (User-facing)

#### Personal Contribution Analytics
Reports submitted, # endorsed, % verified successful cleanups

#### Community Dashboard
- Total reports in area
- Breakdown by category (garbage vs. burning vs. sewage, etc.)
- Hotspot view (top 3 neighborhoods with most issues)

### 6️⃣ Communication & Sharing

#### Shareable Reports
- Auto-generate simple template for WhatsApp, Telegram, email (with image, location link, short description, and report ID)
- Quick share button → "Send to BBMP / Ward Officer / WhatsApp Group"

#### Community Updates
Notifications for:
- When a nearby report is created
- When a user's report gets endorsed/closed
- When a hotspot near them escalates

### 7️⃣ UI/UX Principles Integrated
- **Simple Reporting Flow (3 Steps Max)**: Take/Upload Photo → Auto/Confirm Location → Submit
- **Visual Feedback**: Clear map pins, intuitive color-coded categories (Green/Yellow/Red)
- **Minimal Text Required**: Auto-fill + guided categories to avoid overwhelming the user
- **Trust & Transparency**: Endorsements shown publicly; each report has a "Report History" log (who endorsed/closed)
- **Accessibility**: Multilingual, icon-driven navigation for non-English literate users

### 8️⃣ Knowledge & Blog Page

#### In-App Blog/Knowledge Hub
- Regular posts explaining causes of common civic issues (e.g., why garbage burning happens, waste segregation tips, waterlogging causes)
- Practical "What You Can Do" guides for individuals, RWAs, schools, and local businesses
- Stories of successful community/NGO/government clean-up initiatives
- Links to partner organizations, campaigns, and volunteering opportunities

#### Personalized Suggestions
- Blog posts suggested based on the type of report a user made (e.g., after reporting garbage burning → suggest "Alternatives to Burning" article)

#### Multilingual Content
- Available in local languages (Kannada, Hindi, etc.) for wider accessibility

#### Engagement Features
- Save/share blog posts easily to WhatsApp or social media
- Simple feedback option ("Was this useful?") to refine content

## 🤖 AI & Advanced Features

### 1️⃣ AI Image Recognition for Auto-Classification
- **Core Idea**: Use computer vision to analyze uploaded photos and automatically classify issues (e.g., open garbage dump, burning, sewage overflow, construction debris)
- **Benefits**:
  - Reduces manual input burden for users
  - Improves accuracy in categorization for analytics
  - Helps filter out spam/fake reports
  - Enables pattern detection over time (e.g., recurring burning vs. stagnant sewage)
- **Scalability**: As the dataset grows, the AI model can be retrained for higher accuracy and customized for local problem types (e.g., Bengaluru garbage burning, Delhi dust)

### 2️⃣ Web Dashboard for Ward Officers, NGOs & Public Transparency
- **Core Idea**: A companion web platform where verified stakeholders (ward officers, NGOs, RWAs) can access real-time reports and analytics
- **Features**:
  - **Hotspot Maps**: View heatmaps of reports, filter by category (garbage, sewage, air-quality, etc.)
  - **Status Tracking**: See which reports are green/yellow/red and endorsement activity
  - **Data Export**: Download reports for planning, presentations, or RTI (Right to Information) requests
  - **Public Transparency Layer**: A simplified dashboard open to the public for trust-building and media usage
- **Benefits**:
  - Helps government officials prioritize interventions based on validated citizen data
  - Enables NGOs & RWAs to plan clean-ups or awareness drives
  - Increases trust and accountability by making report data visible to everyone

## 🚀 Future-Proof (Expandable but Not Immediate)
- AI image recognition to auto-classify issues with higher accuracy
- Integration with external low-cost pollution sensors (PM, VOCs)
- Web dashboard for ward officers & NGOs (public-facing transparency layer)

## Styling Guidelines

### Design System
The website uses a comprehensive design system built on Tailwind CSS with semantic tokens defined in `index.css` and `tailwind.config.ts`.

#### Color Palette
- **Primary Colors**: Use HSL format with semantic tokens (--primary, --primary-foreground)
- **Background**: Gradient-based backgrounds using --gradient-subtle and --gradient-primary
- **Text**: Semantic text colors (--foreground, --muted-foreground)
- **Accents**: Consistent accent colors for highlights and interactive elements

#### Typography
- **Headings**: Bold, large typography with gradient text effects for emphasis
- **Body Text**: Readable font sizes with proper line spacing
- **Interactive Text**: Proper contrast ratios for accessibility

#### Component Styling
- **Cards**: Soft shadows (--shadow-soft) with gradient backgrounds
- **Buttons**: Multiple variants (hero, outline, ghost) with consistent hover states
- **Animations**: Smooth transitions using CSS custom properties and Tailwind animations

### Animation Guidelines
- **Slide Animations**: Use `animate-slide-in-right` for progressive content reveal
- **Hover Effects**: Scale and shadow animations for interactive elements
- **Transitions**: Smooth 300-500ms transitions for state changes
- **Loading States**: Skeleton loaders and fade-in animations

### Responsive Design
- **Mobile-first**: Start with mobile design, enhance for larger screens
- **Grid Systems**: Use CSS Grid for complex layouts, Flexbox for simple arrangements
- **Breakpoints**: Follow Tailwind's standard breakpoints (sm, md, lg, xl)
- **Touch Targets**: Ensure buttons and interactive elements are adequately sized

### Component Architecture
- **Modular Design**: Break large components into smaller, focused components
- **Reusability**: Create variants and props for flexible component usage
- **Performance**: Lazy load images and optimize asset delivery
- **Accessibility**: Proper ARIA labels, semantic HTML, and keyboard navigation

### Best Practices

#### CSS/Styling
1. **Always use semantic tokens** instead of direct colors (e.g., `text-primary` not `text-blue-500`)
2. **Maintain consistency** in spacing, shadows, and border radius across components
3. **Use gradient backgrounds** for visual interest while maintaining readability
4. **Implement smooth animations** for better user experience

#### Component Structure
1. **Keep components focused** - each component should have a single responsibility
2. **Use TypeScript** for better development experience and error prevention
3. **Implement proper error boundaries** for robust user experience
4. **Follow React best practices** for hooks and state management

#### Performance
1. **Optimize images** with proper alt text and lazy loading
2. **Use efficient animations** that don't cause layout thrashing
3. **Implement proper loading states** for better perceived performance
4. **Bundle optimization** for faster initial page loads

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/5656a31d-a816-4b09-88fe-07d8c55d0502) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/5656a31d-a816-4b09-88fe-07d8c55d0502) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
