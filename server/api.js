/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

const Project = require("./models/project");

require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/createproject", async (req, res) => {
  const { name, purpose, userId } = req.body; // Assume `userId` is passed in the request body

  const newProject = new Project({
    name: name,
    purpose: purpose,
    text: "",
  });

  try {
    // Save the new project to the database
    const savedProject = await newProject.save();

    // Find the user by userId and update their projects array
    const user = await User.findById(userId); // Use the correct identifier here
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new project's _id to the user's projects array
    user.projects.push(savedProject._id);

    // Save the updated user document
    await user.save();

    // Respond with the newly created project
    res.status(201).send({ newProject: savedProject });
  } catch (error) {
    // Handle any errors that occur during the operation
    res.status(500).json({ message: "Error creating new project", error: error });
  }
});

// query parameter projectId
router.get("/project", async (req, res) => {
  const projectId = req.query.projectId;

  if (!projectId) {
    return res.status(400).send({ message: "Project ID is required as a query parameter" });
  }

  try {
    const project = await Project.findById(projectId);

    if (project) {
      // If the project is found, send it back in the response
      res.send({ project: project });
    } else {
      // If no project is found with the given ID, send a 404 response
      res.status(404).send({ message: "Project not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    res.status(500).json({ message: "Error retrieving project", error: error });
  }
});

router.post("/text", async (req, res) => {
  const projectId = req.body.projectId;
  const newText = req.body.newText;

  if (!projectId || newText === undefined) {
    return res
      .status(400)
      .send({ message: "Project ID and new purpose are required in the request body." });
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: { text: newText } },
      { new: true, runValidators: true } // options to return the updated object and to run schema validators
    );

    if (updatedProject) {
      // Save the new project to the database
      const updatedProject = await updatedProject.save();
      // If the project is successfully updated, send it back in the response
      res.send({ updatedProject: updatedProject });
    } else {
      // If no project is found with the given ID, send a 404 response
      res.status(404).send({ message: "Project not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the database operation
    res.status(500).json({ message: "Error updating project text", error: error });
  }
});

router.get("/allprojects", async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send({ message: "User ID is required as a query parameter" });
  }

  try {
    const user = await User.findOne({ _id: userId }).populate("projects");

    if (user) {
      // If the project is found, send it back in the response
      res.send({ projects: user.projects });
    } else {
      // If no project is found with the given ID, send a 404 response
      res.status(404).send({ message: "User projects not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    res.status(500).json({ message: "Error retrieving user's projects", error: error });
  }
});

router.get("/twosentences", async (req, res) => {
  const text = req.query.text; // Extract the text from query parameters

  if (!text) {
    return res.status(400).send({ message: "Text is required as a query parameter." });
  }

  // Function to split text into sentences
  const splitIntoSentences = (text) => {
    // Split text by common sentence delimiters (., !, ?)
    // Include cases where the delimiter is followed by quotation marks or other punctuation
    return text.match(/[^.!?]+[.!?]?/g) || [];
  };

  // Get the sentences from the text
  const sentences = splitIntoSentences(text);

  // Select the last two sentences, or all if there are less than two
  const lastTwoSentences = sentences.slice(-2).join(" ").trim();

  // Send the result back
  res.send({ result: lastTwoSentences });
});

// "text-davinci-003"
// gpt-4-0125-preview"

router.post("/suggest-text", async (req, res) => {
  const { currentText, projectPurpose } = req.body;
  console.log(`currenttext ${currentText}`);
  console.log(`purpose ${projectPurpose}`);
  const prompt = `You are an autocompletion assistant. Given the purpose of the project: ${projectPurpose}, complete the following sentences using a maximum of 50 tokens: ${currentText}`;
  console.log(prompt);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125", // Or any other suitable model
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: currentText },
        // { role: "assistant", content: "It was great talking to you last week, Joe." },
        // { role: "user", content: "I can't wait to see you again next week!" },
      ],
    });

    console.log(completion);

    res.send({ suggestion: completion.choices[0]["message"]["content"] });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).send({ message: "Failed to get suggestion" });
  }
});

// router.post("/open-session", async (req, res) => {
//   const { projectId } = req.body;
//   // Logic to retrieve the project's purpose based on projectId
//   const purpose = "Your project purpose here"; // Placeholder

//   // Optionally, open a session with OpenAI here if needed
//   // For now, just send back the purpose
//   res.json({ purpose });
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
