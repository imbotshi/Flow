# Vania Flow - Frontend Application

A modern Vue.js application for the Vania Flow platform, designed for property management and tenant communication in Francophone Africa.

## 🚀 Features

- **Multi-step onboarding flow** with phone verification
- **Responsive design** optimized for mobile-first experience
- **Atomic design system** with reusable components
- **Vue 3 + Composition API** for modern development
- **Pinia state management** for reactive data handling
- **Vue Router** for seamless navigation
- **TypeScript support** for type safety (optional)

## 📱 Application Flow

1. **Login/Connection** - Secure authentication with phone and security code
2. **Phone Entry** - Phone number validation with country selection
3. **OTP Verification** - SMS code verification with countdown timer
4. **User Information** - Profile setup with photo upload
5. **Business Experience** - Experience level selection
6. **Business Process** - Management process preferences
7. **Contact Method** - How users discovered the platform
8. **Success** - Confirmation and completion

## 🏗️ Architecture

### Component Structure (Atomic Design)

```
src/components/
├── atoms/           # Basic building blocks
│   ├── VButton.vue
│   ├── VInput.vue
│   ├── VaniaLogo.vue
│   ├── VOption.vue
│   ├── VCodeInput.vue
│   └── icons/
├── molecules/       # Simple combinations
│   ├── VPhotoUpload.vue
│   ├── VCountdownTimer.vue
│   └── VDivider.vue
└── organisms/       # Complex combinations
    └── VAppLayout.vue
```

### Pages

```
src/pages/
├── LoginPage.vue
├── PhoneEntryPage.vue
├── OTPVerificationPage.vue
├── UserInfoPage.vue
├── BusinessExperiencePage.vue
├── BusinessProcessPage.vue
├── ContactMethodPage.vue
└── SuccessPage.vue
```

## 🎨 Design System

### Colors

- **Primary Green**: `#153D1C` - Main brand color
- **Secondary Green**: `#31920B` - Accent color
- **Light Green**: `#E1F524` - Highlight color
- **Background**: `#F5F5F5` - Light gray background
- **Success Gradient**: `linear-gradient(170deg, #E1F524 0%, #B9F524 97.69%)`

### Typography

- **Primary Font**: Figtree - Clean, modern sans-serif
- **Accent Font**: Pacifico - Playful script for "Flow"
- **Monospace**: IBM Plex Sans - For structured content

### Spacing Scale

- `4px, 8px, 16px, 24px, 32px, 48px, 64px`

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm 8+

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📂 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # CSS, images, fonts
│   ├── components/      # Vue components (atomic design)
│   ├── pages/           # Page components
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia stores
│   ├── App.vue          # Root component
│   └── main.js          # Application entry point
├── package.json
├── vite.config.js       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=Vania Flow
```

### Vite Configuration

The project uses Vite for fast development and building. Configuration is in `vite.config.js`.

## 📱 Responsive Design

The application follows a mobile-first approach:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

All components are designed to work seamlessly across these breakpoints.

## 🎯 Component Usage Examples

### Button Component

```vue
<VButton variant="primary" size="large" full-width @click="handleAction">
  Continue
</VButton>
```

### Input Component

```vue
<VInput v-model="phoneNumber" placeholder="Phone number" :icon="PhoneIcon" />
```

### Option Component

```vue
<VOption
  :selected="selectedValue === 'option1'"
  @select="selectedValue = 'option1'"
>
  Option Label
</VOption>
```

## 🔄 State Management

User data flows through the application using Pinia stores:

```js
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
userStore.setPhoneNumber("+237123456789");
```

## 🚦 Routing

Navigation is handled by Vue Router with programmatic navigation:

```js
import { useRouter } from "vue-router";

const router = useRouter();
router.push("/next-step");
```

## 🎨 Styling Guidelines

### CSS Custom Properties

The design system uses CSS custom properties for consistency:

```css
.component {
  color: var(--primary-green);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
}
```

### Component Styling

- Use scoped styles in Vue components
- Follow BEM naming convention for CSS classes
- Leverage design system tokens
- Ensure responsive behavior

## 🧪 Testing (Future)

Recommended testing setup:

- **Vitest** for unit testing
- **Vue Testing Library** for component testing
- **Cypress** or **Playwright** for E2E testing

## 📈 Performance

- **Lazy loading** for route components
- **Component optimization** with Vue 3 features
- **Asset optimization** with Vite
- **Progressive enhancement** approach

## 🌍 Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Screen reader compatibility

## 🤝 Contributing

1. Follow the atomic design principles
2. Use TypeScript for new components
3. Ensure mobile-first responsive design
4. Test across different devices
5. Follow Vue 3 best practices

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Support

For questions or support, please contact the Vania Flow development team.

---

Built with ❤️ for property management in Francophone Africa
