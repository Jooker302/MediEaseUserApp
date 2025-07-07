# MediEase Mobile App

## Overview
MediEase Mobile App is a cross-platform application built with React Native, designed for doctors and patients to interact within the MediEase healthcare system. Patients can upload health reports (e.g., blood pressure, sugar levels), and the app communicates with a Python backend to provide personalized recommendations for medicine, exercises, and food plans. Developed as a Final Year Project (FYP), this prototype has limited polish and model accuracy due to constrained datasets.

## Features
### Patient Features
- Upload health reports (e.g., blood pressure, sugar levels)
- View personalized recommendations (medicine, exercises, food plans)

### Doctor Features
- View patient reports
- Manage patient interactions

- Integration with a Python backend for health recommendations
- MongoDB for storing user and report data
> **Note**: The recommendation model has limited accuracy due to small and incomplete datasets.

## Tech Stack
- **Framework**: React Native
- **Database**: MongoDB (via API)
- **Backend**: Python (see MediEase Python Model repository)
- **Styling**: React Native styles
- **API**: REST API (Next.js backend)

## Related Repositories
- [MediEase Website](https://github.com/Jooker302/MediEaseWebsite): Next.js Website
- [MediEase Python Model](https://github.com/Jooker302/MediEaseAIModel): Python Backend

## Prerequisites
- Node.js (v16 or higher)
- React Native CLI or Expo CLI
- Android Studio or Xcode for emulators
- Python backend server running (see MediEase Python Model repository)
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Jooker302/MediEaseUserApp
   cd mediease-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add:
     ```env
     API_URL=<python-backend-api-url>
     ```

4. Run the app:
   - For Android:
     ```bash
     npx react-native run-android
     ```
   - For iOS:
     ```bash
     npx react-native run-ios
     ```
   > **Note**: Ensure an emulator or physical device is connected.

## Usage
- **Patients**: Log in, upload health reports, and view recommendations.
- **Doctors**: Log in to view patient reports and provide feedback.
- Ensure the Next.js backend and Python model server are running for full functionality.

## Limitations
- Prototype-level UI and functionality (FYP scope)
- Limited recommendation model accuracy due to small and incomplete datasets
- Basic error handling and user experience

## Contributing
This project was created for educational purposes. Feel free to fork and experiment, but it is not actively maintained.

## License
[MIT License](LICENSE)
