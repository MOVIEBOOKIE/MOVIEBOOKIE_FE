const fs = require("fs");
const path = require("path");

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const content = `self.FIREBASE_CONFIG = ${JSON.stringify(config, null, 2)};`;

const outputPath = path.join(__dirname, "../public/firebase-config.js");

fs.writeFileSync(outputPath, content);
