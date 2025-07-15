# Cervical Cancer Detection - Medical AI Assistant

A clean, responsive web application for testing cervical cancer detection models using medical imaging. This frontend application allows users to upload MRI scan images and receive AI-powered analysis results.

## Features

- 🏥 **Medical-themed Design**: Professional healthcare-focused UI with intuitive navigation
- 📱 **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- 🖼️ **Image Upload**: Support for JPG, JPEG, and PNG medical images
- 🔄 **Real-time Analysis**: Instant feedback with loading states and progress indicators
- 📊 **Results Display**: Clear presentation of prediction results and confidence scores
- ⚠️ **Error Handling**: Comprehensive error management and user feedback
- 🎯 **Drag & Drop**: Intuitive file selection with drag-and-drop functionality

## Technology Stack

- **Frontend**: Plain HTML5, CSS3, and JavaScript (ES6+)
- **Styling**: Custom CSS with medical color palette
- **API Integration**: Fetch API for seamless backend communication
- **No Dependencies**: Pure vanilla JavaScript implementation

## File Structure

```
├── index.html          # Main HTML structure
├── style.css           # Complete styling and responsive design
├── script.js           # JavaScript functionality and API integration
└── README.md          # Documentation
```

## API Integration

The application communicates with a medical AI API endpoint:

**Endpoint**: `https://placeholder.url/api/predict`

**Request Format**:
- Method: POST
- Content-Type: multipart/form-data
- Body: FormData with image file

**Response Format**:
```json
{
  "result": "Positive" | "Negative",
  "confidence": 0.93
}
```

## Local Development

1. **Clone or download** the project files
2. **Open in a local server** (required for file uploads):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
3. **Access the application** at `http://localhost:8000`

## Deployment Options

### GitHub Pages

1. **Create a GitHub repository** and upload all files
2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Select source: "Deploy from a branch"
   - Choose branch: "main"
   - Click Save
3. **Access your site** at `https://yourusername.github.io/repository-name`

### Netlify

1. **Drag and drop deployment**:
   - Visit [netlify.com](https://netlify.com)
   - Drag the project folder to the deployment area
   - Get instant live URL

2. **GitHub integration**:
   - Connect your GitHub repository
   - Enable automatic deployments
   - Configure custom domain (optional)

### Render

1. **Create a new Static Site**:
   - Connect your GitHub repository
   - Build command: (leave empty)
   - Publish directory: `/`
   - Deploy automatically

### Vercel

1. **Connect repository**:
   - Import project from GitHub
   - Framework preset: Other
   - Deploy with zero configuration

## Configuration

### API Endpoint

To use with a real API endpoint, update the `API_ENDPOINT` constant in `script.js`:

```javascript
const API_ENDPOINT = 'https://your-api-endpoint.com/predict';
```

### Styling Customization

The medical color palette can be customized in `style.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #10b981;
  --error-color: #dc2626;
  --background-color: #f8fafc;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Security Considerations

- ⚠️ **For demonstration purposes only**
- 🔒 Implement proper authentication for production use
- 🛡️ Add CSRF protection for real deployments
- 📝 Include proper medical disclaimers
- 🔐 Use HTTPS for all medical data transmission

## Medical Disclaimer

This application is intended for research and demonstration purposes only. It should not be used for actual medical diagnosis or clinical decision-making. Always consult with qualified healthcare professionals for medical advice and diagnosis.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues and questions, please open an issue in the repository or contact the development team.

---

**Note**: This is a frontend-only application. For production use, ensure proper backend API integration, security measures, and medical compliance standards.