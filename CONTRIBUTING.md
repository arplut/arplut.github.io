# Contributing to GEODHA

Thank you for your interest in contributing to GEODHA! This document provides guidelines for developers working on this project.

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- Git
- A code editor (VS Code recommended)

### Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/arplut/arplut.github.io.git your-folder-name
   cd your-folder-name
   ```

2. Install dependencies:
   ```bash
   npm install
   # or if using bun
   bun install
   ```

3. Start development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. Open http://localhost:5173 in your browser

## Development Workflow

### Branch Strategy
- `main` - Production branch (auto-deploys to live site)
- `development` - Integration branch for testing
- `feature/*` - Individual feature branches

### Making Changes
1. **Create a feature branch:**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and test locally:**
   ```bash
   npm run dev  # Test in development
   npm run build && npm run preview  # Test production build
   ```

3. **Commit with clear messages:**
   ```bash
   git add .
   git commit -m "feat: add new component for XYZ"
   ```

4. **Push and create Pull Request:**
   ```bash
   git push origin feature/your-feature-name
   ```

### Pull Request Guidelines
- Create PR against `development` branch, not `main`
- Include clear description of changes
- Test your changes thoroughly
- Update documentation if needed
- Request review from team members

## Code Standards

### File Structure
- Components go in `src/components/`
- Pages go in `src/pages/`
- Utilities go in `src/lib/`
- Assets go in `src/assets/`

### Naming Conventions
- Components: PascalCase (e.g., `ReportCard.tsx`)
- Files/folders: kebab-case (e.g., `user-profile/`)
- Variables: camelCase

### Code Quality
- Use TypeScript
- Follow ESLint rules: `npm run lint`
- Format with Prettier (if configured)
- Write meaningful commit messages

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Getting Help

- Check existing issues on GitHub
- Ask questions in team discussions
- Review the main README.md for project context

## Deployment

⚠️ **Important**: Only maintainers should merge to `main` branch as it auto-deploys to the live website.

The deployment process:
1. Changes are reviewed in PR
2. Merged to `development` for integration testing
3. When ready, `development` is merged to `main`
4. GitHub Pages automatically deploys `main` branch
