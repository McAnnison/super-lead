# Contributing to NoteSong AI

Thank you for your interest in contributing to NoteSong AI! This document provides guidelines and instructions for contributing.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Process](#development-process)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Areas for Contribution](#areas-for-contribution)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/super-lead.git
   cd super-lead
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/McAnnison/super-lead.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### 1. Keep Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Make Your Changes

- Work on your feature branch
- Test your changes thoroughly
- Follow the coding standards
- Add comments for complex logic

### 3. Test Locally

```bash
npm start
```

Test on:
- iOS simulator/device
- Android emulator/device
- Different screen sizes

## Coding Standards

### JavaScript/React Native

- Use ES6+ syntax
- Use functional components with hooks
- Follow existing code style
- Use meaningful variable names
- Add PropTypes or TypeScript types
- Keep components focused and reusable

### File Organization

```
src/
├── screens/       # One screen per file
├── components/    # Reusable components
├── services/      # API calls and business logic
├── utils/         # Helper functions
└── constants/     # App constants
```

### Naming Conventions

- **Files**: PascalCase for components (e.g., `WelcomeScreen.js`)
- **Variables**: camelCase (e.g., `userName`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Components**: PascalCase (e.g., `GenreCard`)

### Code Style

```javascript
// Good
const handlePress = () => {
  console.log('Button pressed');
  navigation.navigate('NextScreen');
};

// Avoid
const handlePress=()=>{console.log('Button pressed');navigation.navigate('NextScreen');}
```

### Comments

```javascript
// Good: Explain why, not what
// Using timeout to allow animation to complete before navigation
setTimeout(() => navigation.navigate('Next'), 300);

// Avoid: Stating the obvious
// Navigate to next screen
navigation.navigate('Next');
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat(upload): add support for zip file uploads

Added functionality to extract and process files from zip archives.
Includes validation for supported file types within the archive.

Closes #123
```

```
fix(playback): resolve audio playback on iOS

Fixed issue where audio wouldn't play on iOS devices due to
incorrect audio session configuration.

Fixes #456
```

## Pull Request Process

### Before Submitting

1. **Update your branch**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests** (when available):
   ```bash
   npm test
   ```

3. **Check for linting errors**:
   ```bash
   npm run lint
   ```

### Submitting the PR

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request** on GitHub

3. **Fill out the PR template**:
   - Description of changes
   - Related issues
   - Screenshots (for UI changes)
   - Testing performed

### PR Template

```markdown
## Description
Brief description of what this PR does

## Related Issues
Fixes #123

## Changes Made
- Added feature X
- Fixed bug Y
- Updated documentation for Z

## Screenshots (if applicable)
[Add screenshots here]

## Testing
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Tested on different screen sizes
- [ ] No breaking changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Added comments for complex logic
- [ ] Updated documentation
- [ ] No new warnings
```

## Areas for Contribution

### High Priority

1. **AI Integration**
   - Implement real document processing
   - Connect to vision AI APIs
   - Integrate GPT-4 for lyrics generation
   - Add music generation APIs

2. **Backend Services**
   - User authentication
   - Cloud storage for songs
   - Processing queue management
   - Caching layer

3. **Features**
   - Playlist creation
   - Social sharing
   - Collaborative learning
   - Study analytics

### Medium Priority

1. **UI/UX Improvements**
   - Animations and transitions
   - Dark mode support
   - Accessibility features
   - Localization

2. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests
   - Performance testing

3. **Documentation**
   - API documentation
   - Tutorial videos
   - Example use cases
   - Troubleshooting guide

### Good First Issues

- Fix typos in documentation
- Improve error messages
- Add loading states
- Improve color accessibility
- Add new music genres
- Optimize image assets

## Questions?

- Open an issue with the "question" label
- Join our community discussions
- Check existing issues and PRs

## Recognition

Contributors will be:
- Listed in the README
- Credited in release notes
- Appreciated in our hearts! ❤️

---

Thank you for contributing to NoteSong AI! 🎵📚
