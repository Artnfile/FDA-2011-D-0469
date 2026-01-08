# FDA Human Factors Usability Report Application

A web-based application for creating FDA-compliant Human Factors and Usability Engineering reports according to FDA-2011-D-0469 guidance.

## Overview

This application provides a structured interface for documenting human factors validation testing for medical devices seeking FDA clearance or approval. It implements the requirements outlined in the FDA guidance document "Applying Human Factors and Usability Engineering to Medical Devices."

## Features

### Report Sections
- **Section 1: Conclusion** - Safety and effectiveness statement, HFE/UE process summary, residual risk discussion
- **Section 2: Users, Uses & Environments** - User population characteristics, use environments, training requirements
- **Section 3: Device UI Description** - User interface documentation (planned)
- **Section 4: Known Use Problems** - Historical use error analysis (planned)
- **Section 5: Risk Analysis** - Use-related hazards, severity ratings, risk control measures
- **Section 6: Preliminary Analyses** - Formative evaluation documentation (planned)
- **Section 7: Critical Tasks** - Task identification and categorization
- **Section 8: Validation Testing** - Test participant demographics, results, and analysis
- **Section 9: Documentation** - Supporting materials (planned)
- **Section 10: Export & Review** - Data export functionality

### Core Functionality
- Automatic save every 30 seconds to browser localStorage
- Manual save button for immediate data persistence
- Progress tracking with completion status for each section
- Export to JSON format for backup and sharing
- Data persists across browser sessions
- Mobile-responsive design with touch optimization

## Technology Stack

- React 18
- Tailwind CSS
- Browser localStorage API
- Single HTML file deployment

## Installation

### Simple Deployment
1. Clone this repository
2. Serve the `index.html` file from any web server
3. No build process required

Example with Python:
```bash
python3 -m http.server 8080
```

Example with Node.js:
```bash
npx serve .
```

### Server Deployment
Deploy to any static web hosting. The application requires only the `index.html` file to run.

## Usage

### Getting Started
1. Open the application in a web browser
2. Enter project name and device name
3. Navigate through sections using the sidebar menu
4. Fill in required fields for each section
5. Mark sections as complete when finished
6. Export data as JSON when complete

### Section 2: User Populations
- Add user groups with detailed characteristics
- Document physical, sensory, and cognitive capabilities
- Specify age ranges and experience levels
- Support for multiple distinct user populations

### Section 5: Risk Analysis
- Create comprehensive hazard tables
- Document use errors and hazardous situations
- Assign severity levels (minor, moderate, serious, catastrophic)
- Track risk control measures

### Section 7: Critical Tasks
- Identify and categorize critical device tasks
- Link tasks to user groups
- Document potential use errors and harm
- Assign severity categories

### Section 8: Validation Testing
- Document minimum 15 participants per user group
- Record participant demographics
- Capture test results and analysis
- Track use errors and close calls

## FDA Compliance

This application supports compliance with:
- FDA Guidance: Applying Human Factors and Usability Engineering to Medical Devices (FDA-2011-D-0469)
- IEC 62366-1: Medical devices - Application of usability engineering to medical devices
- ISO 14971: Medical devices - Application of risk management to medical devices

### Validation Testing Requirements
- Minimum 15 participants per distinct user group
- Representative sample of intended users
- Testing in simulated use environments
- All critical tasks included in test protocol
- Documentation of all use errors and close calls

## Browser Compatibility

Supported browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 8+)

Requires JavaScript enabled and localStorage support.

## Data Privacy

All data is stored locally in the browser using localStorage. No data is transmitted to external servers. Users are responsible for:
- Backing up data using the export function
- Ensuring compliance with applicable data protection regulations
- Managing access control through server-level security
- Implementing SSL/TLS for production deployments

## Roadmap

### Planned Features
- Complete form fields for all 10 sections
- Import from JSON
- Export to Microsoft Word with FDA formatting
- Export to PDF
- Multiple project management
- User authentication and access control
- Team collaboration features
- Version history and change tracking

## License

Copyright 2026. All rights reserved.

## Disclaimer

This application is a tool to assist in creating FDA human factors reports. It does not guarantee FDA approval or compliance. Users are responsible for ensuring all content meets FDA requirements and their specific regulatory obligations. Consult with regulatory affairs professionals and quality assurance teams before submission.
