import { Contact } from "../models/contact.js";

//get all contact...............................................
export const getAllContact = async (req, res) => {
  const userContact = await Contact.find();
  if (!userContact)
    return res.json({
      message: "contact not found/exits",
      success: false,
    });
  res.json({
    message: "contact found successfully",
    userContact,
    success: true,
  });
};

//get contact by id..................................................
export const getContactId = async (req, res) => {
  const id = req.params.id;
  const userContact = await Contact.findById(id);
  if (!userContact)
    return res.json({
      message: "contact not found",
      success: false,
    });

  res.json({
    message: "contact found",
    userContact,
    success: true,
  });
};

// get user specific contact  fetch by user id..................................
export const getSpecificContactByUserId = async (req, res) => {
  const id = req.params.id;
  const userContact = await Contact.find({ user: id });
  if (!userContact)
    return res.json({
      message: "no contact found",
      success: false,
    });
  res.json({
    message: "user specific contact fetch",
    userContact,
    success: true,
  });
};

//update contactby id....................................
export const updateContactById = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;
  let updateContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      type,
    },
    { new: true },
  );
  if (!updateContact)
    return res.json({
      message: "contact not exits",
      success: false,
    });
  res.json({
    message: "contact updated",
    updateContact,
    success: true,
  });
};

//delete contact by id.........................................

export const deleteContactById = async (req, res) => {
  const id = req.params.id;
  let deleteUser = await Contact.findByIdAndDelete(id);
  if (!deleteUser)
    return res.json({
      message: "contact not exits",
      success: false,
    });
  res.json({
    message: "contact delete successfully",
    success: false,
  });
};

//create new contact......................................
export const newContact = async (req, res) => {
  const { name, email, phone, type } = req.body;
  if (name == "" || email == "" || phone == "" || type == "")
    return res.json({
      message: "all filed are required",
      success: false,
    });

  let saveContact = await Contact.create({
    name,
    email,
    phone,
    type,
    user: req.user,
  });
  res.json({
    message: "contact save sucessfully ",
    saveContact,
    success: true,
  });
};
