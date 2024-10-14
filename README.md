# Conformity HRQueryManagement

HRQueryManagement is a web application built using **Node.js**, **React**, and **TypeScript**. It leverages **MongoDB** for data storage and features a logging system to manage access logs effectively. The project is designed to provide a robust and scalable solution for managing resources.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **React**: Frontend library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for improved development experience.
- **MongoDB**: NoSQL database for storing application data.
- **Logging**: Access logs are maintained in a dedicated log file to track application activity.
- **Testing**: Unit tests are implemented to ensure code quality and reliability.

## Getting Started
### Prerequisites
Ensure that you have the following installed on your machine:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (either locally or through a cloud provider such as MongoDB Atlas)

### Installation Steps
1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/aditmehta9/HRQueryManagement.git
   ```
2. **Navigate to the Project Directory**: 
   ```bash
   cd HRQueryManagement
   ```
3. **Install Dependencies**: 
   For the client (React):
   ```bash
   cd client
   npm install
   ```
   For the server (Node.js):
   ```bash
   npm install
   ```

### Configuration
1. **Set Up Environment Variables**: Create a `.env` file in the server directory and include your MongoDB connection string and log file path:
   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   LOG_FILE_PATH=path_to_log_file
   ```
2. **Run MongoDB**: If using a local MongoDB instance, ensure it is running. If using a cloud service, verify your connection string is accurate.

### Running the Application
1. **Start the Server**: 
   ```bash
   npm start
   ```
2. **Start the Client**: 
   In another terminal, navigate to the client directory and run:
   ```bash
   cd client
   npm start
   ```
3. **Access the Application**: Open your browser and navigate to `http://localhost:3000`.

### Running Tests
To execute tests for the project, navigate to the server directory and run: 
```bash
npm test
```

## Logging
Access logs are stored in the main folder. This log file helps monitor application activities and diagnose issues more effectively.

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue to suggest improvements.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Screenshots
- Get
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/66a385a4-1e8e-4a3e-b7e4-4cde22a690b7">

- Update
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/6dc8ed08-2dfd-4d39-99ae-95fc6d5cb417">

- Delete
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/c5ce22f9-0081-4364-9cb9-9395269f28c0">

- Post
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/7f40547e-75a4-41ab-97a2-14a375309537">

- Compliance Charts:
<img width="1439" alt="image" src="https://github.com/user-attachments/assets/8a8d2cbb-2182-428d-a5fe-6a77bf3898b4">






