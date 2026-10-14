import express from "express";

import {
  deleteContactById,
  getAllContact,
  getContactId,
  getSpecificContactByUserId,
  newContact,
  updateContactById,
} from "../controllers/contact.js";

import { isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

//@api desc:- new contact
//@api method:- post
//@api endPoint:- /api/contact/new
//user create contact
router.post("/new", isAuthenticated, newContact);

//@api desc:- get all contact
//@api method:- get
//@api endPoint:- /api/contact/
//user get all contact
router.get("/", getAllContact);

//@api desc:- get contact by id
//@api method:- get
//@api endPoint:- /api/contact/:id
//user get all contact by id
router.get("/:id", getContactId);

//@api desc:- update contact by id
//@api method:- get
//@api endPoint:- /api/contact/:id
// update contact by id
router.put("/:id", isAuthenticated, updateContactById);

//@api desc:- delete contact by id
//@api method:- delete
//@api endPoint:- /api/contact/:id
// delete contact by id
router.delete("/:id", isAuthenticated, deleteContactById);

// get specific contact fetch by id ...................
router.get("/userid/:id", getSpecificContactByUserId);

export default router;
