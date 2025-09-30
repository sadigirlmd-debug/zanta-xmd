/*
   _____ _    _ _      _    __  __ ____  
  / ____| |  | | |    / \  |  \/  |  _ \ 
 | (___ | |  | | |   / _ \ | |\/| | | | |
  \___ \| |  | | |  / ___ \| |  | | |_| |
  ____) | |__| | |_/ /   \ \_|  |_|____/ 
 |_____/ \____/|_____/     \_\          
 
             S U L A - M D

*/
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const HEROKU_API_KEY = "HRKU-AAimXNg1PDa6r2cVTuLKI9mLefNh0QS4WdV3s3W3j28g_____wi2t9Sz-qVk";

app.post("/deploy", async (req, res) => {
  const { appName, sessionId } = req.body;

  try {
    const response = await axios.post(
      "https://api.heroku.com/app-setups",
      {
        app: { name: appName },
        source_blob: {
          url: "https://github.com/zanta-xmd-repo1/anepanco/tarball/main"
        },
        overrides: {
          env: {
            SESSION_ID: sessionId
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${HEROKU_API_KEY}`,
          Accept: "application/vnd.heroku+json; version=3"
        }
      }
    );

    res.json({ message: `Your Request Sent Successfully ✅\nPlease Wait 3-5 Minutes\nhttps://dashboard.heroku.com/apps/${appName}` });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: "Heroku deploy failed. Maybe app name already exists?" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// Create By Sulaksha Madara 
