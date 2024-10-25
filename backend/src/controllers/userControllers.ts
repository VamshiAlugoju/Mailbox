import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";

import { sendError } from "../middlewares/errorHanlder";
import { userErrors, authErrors } from "../utils/Errors/commonErrors";
import { generateJwtToken } from "../libraries/userlib";



export async function signUp(req: Request, res: Response) {

  try {
    let { name, email, password } =
      req.body;
    email = email.toLowerCase();
    console.log(email);
    const user = await userModel.findOne({
      email
    });
    console.log(user);
    if (user) {
      if (user.email === email) {
        sendError(res, { error: "User Already Exists with this email" });
        return;
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,

      password: hashedPassword,

    });
    const updatedUser = await userModel.findOne({ _id: newUser.id });

    res.status(201).json({
      user: {
        name: updatedUser?.name,
        email: updatedUser?.email,
        id: updatedUser?.id,
      },

    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function login(req: Request, res: Response) {

  try {
    const { email, password } = req.body;

    const user = await userModel
      .findOne({ email })
      .select("+password");

    if (!user) {
      sendError(res, { error: "User not registered", status: 404 });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      sendError(res, authErrors.INCORRECT_PASSWORD);
      return;
    }

    const jwtToken = generateJwtToken({ id: user._id });

    const updatedUser = await userModel.findById(user._id);

    res.status(200).json({
      data: {
        status: 200,
        jwtToken,
        user: {
          id: updatedUser?.id,
          email: updatedUser?.email,
          full_name: updatedUser?.name,

        },
      },
    });
  } catch (error: any) {

    res.status(500).json({ error: error.message });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const { pattern = "" } = req.query
    const users = await userModel.find({
      $or: [
        { name: { $regex: pattern, $options: 'i' } },
        { email: { $regex: pattern, $options: 'i' } }
      ],
      _id: { $ne: req.user._id }
    });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
export async function getCurrentUser(req: Request, res: Response) {
  try {
    const user = await userModel.findOne({ _id: req.user._id })
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export async function updateUser(req: Request, res: Response) {


  // try {
  //   const {
  //     name,
  //     mobile_no,
  //     email,
  //     country_code,
  //     oldPassword,
  //     newPassword,
  //     confirmPassword,
  //   } = req.body;

  //   const user = await userModel.findOne({ _id: req.user._id });
  //   if (!user) {

  //     sendError(res, userErrors.USER_NOT_FOUND);
  //     return;
  //   }

  //   if (newPassword && newPassword !== confirmPassword) {

  //     sendError(res, userErrors.PASSWORD_MISSMATCH);
  //     return;
  //   }
  //   let image: string[] = [];
  //   if (req.files && Array.isArray(req.files) && req.files.length > 0) {
  //     // image = await uploadFiles(req.files);
  //   }

  //   user.profile_url = ""
  //   user.name = name || user.name;
  //   user.email = email || user.email;
  //   user.mobile_no = mobile_no || user.mobile_no;
  //   user.country_code = country_code || user.country_code;

  //   if (oldPassword && newPassword && confirmPassword) {
  //     const isValidPassword = await bcrypt.compare(oldPassword, user.password);
  //     if (!isValidPassword) {

  //       sendError(res, userErrors.INCORRECT_OLD_PASSWORD);
  //       return;
  //     }

  //     const hashedPassword = await bcrypt.hash(newPassword, 10);
  //     user.password = hashedPassword;
  //   }

  //   await user.save();

  //   const updatedUser = await userModel
  //     .findOne({ _id: user._id })
  //     .select("+password");


  //   res.status(200).json({ data: updatedUser });
  // } catch (error: any) {

  //   res.status(500).json({ error: "Internal Server Error" });
  // }
}

