# DeepNet Solutions Website

A modern, responsive website for DeepNet Solutions, a cybersecurity company specializing in protecting Melbourne's small and medium-sized businesses from digital threats.

## Features

- **Responsive Design**: Looks great on all devices
- **Modern UI**: Built with Tailwind CSS for a clean, professional look
- **Fast Performance**: Optimized with Vite for quick loading times
- **Interactive Elements**: Engaging user experience with React
- **Contact Page**: Dedicated contact form with validation

## Tech Stack

- React 18
- Tailwind CSS
- Vite
- Day.js for date handling
- Fully responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/richfish85/deepnet-website.git
   cd deepnet-solutions
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
deepnet-solutions/
├── public/               # Static files
│   └── assets/           # Images and other media
├── src/                  # Source files
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── styles/           # Global styles and Tailwind config
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Application entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For inquiries, please contact [staff@deepnet.com.au](mailto:staff@deepnet.com.au)

## To-Do

### High Priority
- [x] Create Privacy Policy page (`/privacy`)
- [x] Create Terms of Service page (`/terms`)
- [x] Update "Free Consultation" button styling to match other buttons

### Medium Priority
- [x] Add form validation to contact forms
- [ ] Implement proper form submission handling
- [ ] Add loading states for async operations

### Low Priority
- [ ] Add unit tests for components
- [ ] Add end-to-end tests
- [ ] Implement CI/CD pipeline
- [ ] Add more interactive elements/animations
- [ ] Optimize images and assets for better performance

## Contributing
