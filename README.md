📡 Customer Labs – Webhook Forwarding System
A Node.js + Express application to manage accounts and destinations, and forward JSON data to multiple webhook URLs based on account-specific configuration.

🔧 Features
Create and manage accounts with secure app tokens

Add multiple destinations (webhooks) per account

Support for custom headers and HTTP methods (GET, POST, PUT)

Incoming JSON data routed to appropriate destinations

Built-in data validation and authentication via headers

Lightweight and RESTful API design

Postman Collection available for testing

🚀 Steps to Run the Project
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/namanjha2002/customer-labs.git

2. Install Dependencies
bash
Copy
Edit
npm install
3. Configure .env File
Create a .env file in the root directory and add your MongoDB URI:

env
Copy
Edit
MONGO_URI=mongodb://localhost:27017/customerLabsDB
PORT=3000
Replace the Mongo URI with your actual connection string (e.g., from MongoDB Atlas).

4. Start the Server
bash
Copy
Edit
npm start
The server will run on http://localhost:3000 by default.

5. Use Postman for API Requests
✅ Click here to join the Postman Collection

Explore:

Account creation (POST /api/create-accounts)

Destination setup (POST /api/create-destinations)

Incoming data (POST /server/incoming_data)

📥 API Flow Overview
1. Create an Account
Fields:

email (unique)

name

website (optional)

👉 App generates:

accountId

appSecretToken

2. Add Destination for Account
Fields:

accountId

url

method (GET, POST, PUT)

headers (custom object, mandatory)

3. Send Data to Destinations
Send data to:

bash
Copy
Edit
POST /server/incoming_data
Headers:

CL-X-TOKEN: your app secret token

Body: JSON only

The data is forwarded to all destinations associated with that account. Headers and HTTP method from each destination are respected.

⚠️ Error Handling
Missing or invalid token → 401 Un Authenticate

Non-JSON data → 400 Invalid Data

No destination available → 200 but no forwarding done

📁 Folder Structure
bash
Copy
Edit
.
├── controllers/
├── models/
├── routes/
├── .env
├── server.js
└── README.md
📦 Tech Stack
Node.js

Express.js

MongoDB (Mongoose)

Axios (for forwarding requests)

Postman (for testing)

✍️ Author
Naman Jha
GitHub Profile

