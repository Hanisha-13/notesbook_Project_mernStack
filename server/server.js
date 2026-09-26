require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Contact = require("./contact");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const port = process.env.PORT || 5000;

// ADD CONTACT
app.post("/contacts", async (req, res) => {
  try {
    const { name, email, phonenumber } = req.body;

    const newContact = await Contact.create({
      name,
      email,
      phonenumber
    });

    res.status(201).send({
      contact: newContact,
      message: "Contact added successfully"
    });
  } catch (err) {
    res.status(500).send({
      message: "Error adding contact",
      error: err.message
    });
  }
});

// GET ALL CONTACTS
app.get("/contacts", async (req, res) => {
  try {
    const data = await Contact.find();

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error fetching contacts",
      error: err.message
    });
  }
});

// GET ONE CONTACT
app.get("/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).send({
        message: "Contact not found"
      });
    }

    res.status(200).send(contact);
  } catch (err) {
    res.status(500).send({
      message: "Error fetching contact",
      error: err.message
    });
  }
});

// UPDATE CONTACT
app.put("/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).send({
        message: "Contact not found"
      });
    }

    res.status(200).send({
      contact: updatedContact,
      message: "Contact updated successfully"
    });
  } catch (err) {
    res.status(500).send({
      message: "Error updating contact",
      error: err.message
    });
  }
});

// DELETE CONTACT
app.delete("/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).send({
        message: "Contact not found"
      });
    }

    res.status(200).send({
      message: "Contact deleted successfully"
    });
  } catch (err) {
    res.status(500).send({
      message: "Error deleting contact",
      error: err.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});