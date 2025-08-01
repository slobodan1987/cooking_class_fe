# Traditional Plitvice Lakes Cooking Class 🍽️

A multilingual Angular website for a traditional Croatian cooking class experience in the heart of Lika, near Plitvice Lakes National Park.

## 🌟 About

Welcome to the digital home of our Traditional Plitvice Lakes Cooking Class - where the aromas of home cooking awaken memories and flavors tell the stories of our grandmothers. This isn't just a cooking course, it's a soulful experience that connects you with Croatian culture, local people, and the stunning nature of Plitvice Lakes.

## 🚀 Features

### 🌍 Multilingual Support
- **7 Languages**: Croatian (hr), English (en-US), German (de), Italian (it), French (fr), Spanish (es), Czech (cs)
- **Dynamic Language Switching**: Change language instantly without page reload
- **Persistent Language Selection**: Language preference saved in localStorage

### 📱 Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Modern UI**: Clean, professional design with SCSS styling
- **Touch-Friendly**: Perfect user experience on tablets and smartphones

### 🖼️ Interactive Image Gallery
- **Carousel Component**: Smooth horizontal scrolling gallery
- **Full-Resolution Modal**: Click any image to view in full size
- **Multiple Navigation**: Mouse wheel, touch swipe, and navigation buttons
- **Keyboard Support**: ESC key to close modals

### 📝 Booking System (Coming Soon)
- **Reservation Form**: Complete booking form with validation
- **Contact Integration**: Phone and email contact options
- **Group Management**: Support for 2-12 people per class

## 🛠️ Tech Stack

- **Framework**: Angular 18+
- **Language**: TypeScript
- **Styling**: SCSS with modular architecture
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── app/
│   ├── shared/
│   │   ├── admin-page/          # Admin interface
│   │   ├── booking-form/        # Reservation form
│   │   ├── carousel/            # Image gallery component
│   │   ├── home/                # Main homepage
│   │   ├── info-section/        # Information sections
│   │   ├── language-switcher/   # Language selection
│   │   ├── models/              # TypeScript interfaces
│   │   ├── pipes/               # Custom pipes (translate, flag)
│   │   ├── review-list/         # Customer reviews
│   │   └── services/            # Angular services
│   ├── app.component.*          # Root component
│   ├── app.config.ts           # App configuration
│   └── app.routes.ts           # Routing configuration
├── assets/
│   ├── img/                    # Images and gallery photos
│   └── flags/                  # Country flag icons
├── locale/                     # i18n translation files
├── styles/                     # Global SCSS architecture
└── translations/               # Translation constants
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/slobodan1987/cooking_class_fe.git
   cd cooking_class_fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
# Build for production
ng build

# Build with specific language configuration
ng build --configuration=production
```

## 🌐 Language Configuration

The application supports multiple build configurations for different languages:

```bash
# Serve in Croatian (default)
ng serve --configuration=hr

# Serve in English
ng serve --configuration=en-US

# Serve in German
ng serve --configuration=de

# And so on for other languages...
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `ng serve` | Start development server |
| `ng build` | Build for production |
| `ng test` | Run unit tests |
| `ng lint` | Run linting |
| `ng extract-i18n` | Extract translation strings |

## 🎨 Styling Architecture

The project uses a modular SCSS architecture:

```
styles/
├── abstracts/
│   ├── _colors.scss      # Color variables
│   ├── _typography.scss  # Font definitions
│   └── _variables.scss   # Global variables
├── base/
│   └── _base.scss       # Base styles
├── components/
│   └── _buttons.scss    # Button styles
└── styles.scss          # Main stylesheet
```

## 🔧 Key Components

### Language Switcher
- Dropdown selection for all supported languages
- Persistent language preference
- Flag icons for visual recognition

### Carousel Component
- Responsive image gallery
- Modal view for full-resolution images
- Touch and mouse wheel navigation
- Smooth scrolling animations

### Translation System
- Centralized translation management
- Type-safe translation keys
- Runtime language switching

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Features

- Input validation on all forms
- Sanitized content rendering
- Secure build configuration

## 🌟 Experience Highlights

### What Makes Our Cooking Class Special

- **Authentic Recipes**: Traditional Plitvice and Lika dishes passed down through generations
- **Local Ingredients**: Fresh ingredients from gardens, markets, and nature
- **Family Atmosphere**: Cook with our family in a warm Lika home
- **Cultural Connection**: Learn about Croatian culture and traditions
- **Rustic Setting**: Unforgettable experience in authentic environment
- **Homemade Spirits**: Enjoy cooking with traditional rakija and wine

### Practical Information

- **Group Size**: 2-12 people per class
- **Duration**: Full cooking and dining experience
- **Price**: 80 EUR per person
- **Payment**: After the event - cash, card, or bank transfer
- **Booking**: 24 hours advance notice required

## 📞 Contact Information

For reservations and inquiries:
- **Phone**: [Contact number]
- **Email**: [Contact email]
- **Address**: Lika region, near Plitvice Lakes National Park

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Traditional Croatian cooking heritage
- Plitvice Lakes National Park region
- Local Lika community and culture
- Angular community and contributors

---

**Reserve your place at the table – your family is waiting!** 👨‍👩‍👧‍👦

*Rezervirajte svoje mjesto za stolom – obitelj vas čeka!*
