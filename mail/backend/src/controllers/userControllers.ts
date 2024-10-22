import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";

import { sendError } from "../middlewares/errorHanlder";
import { userErrors, authErrors } from "../utils/Errors/commonErrors";
import { generateJwtToken } from "../libraries/userlib";



export async function signUp(req: Request, res: Response) {

  try {
    let { name, email, password, country_code, mobile_no, state, role } =
      req.body;
    email = email.toLowerCase();
    console.log(email);
    const user = await userModel.findOne({
      $or: [{ mobile_no: mobile_no }, { email: email }],
    });
    console.log(user);
    if (user) {
      if (user.email === email) {
        sendError(res, { error: "User Already Exists with this email" });
        return;
      } else if (user.mobile_no == mobile_no) {
        sendError(res, { error: "Mobile number Already Exists" });
        return;
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      mobile_no,
      password: hashedPassword,
      country_code,
      state,
      role,
    });
    const updatedUser = await userModel.findOne({ where: { id: newUser.id } });
    const jwtToken = generateJwtToken({ id: newUser.id });
    res.status(201).json({
      user: {
        name: updatedUser?.name,
        email: updatedUser?.email,
        mobile_no: updatedUser?.mobile_no,
        country_code: user?.country_code,
        id: updatedUser?.id,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function login(req: Request, res: Response) {

  try {
    const { country_code, mobile_no, password, role } = req.body;

    const user = await userModel
      .findOne({ $and: [{ country_code }, { mobile_no }] })
      .select("+password");

    if (!user) {
      sendError(res, { error: "User not registered" });
      return;
    }
    if (user.role !== role) {
      sendError(res, { error: "you don't have permission" });
      return;
    }

    if (user.removed || !user.isActive) {
      sendError(res, { error: "User not active" });
      return;
    }

    if (!user.verified) {
      sendError(res, { error: "User not verified" });
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
          mobile_no: updatedUser?.mobile_no,
          full_name: updatedUser?.name,
          role: updatedUser?.role,
        },
      },
    });
  } catch (error: any) {

    res.status(500).json({ error: error.message });
  }
}


export async function updateUser(req: Request, res: Response) {


  try {
    const {
      name,
      mobile_no,
      email,
      country_code,
      oldPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    const user = await userModel.findOne({ _id: req.user._id });
    if (!user) {

      sendError(res, userErrors.USER_NOT_FOUND);
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {

      sendError(res, userErrors.PASSWORD_MISSMATCH);
      return;
    }
    let image: string[] = [];
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      // image = await uploadFiles(req.files);
    }

    user.profile_url = ""
    user.name = name || user.name;
    user.email = email || user.email;
    user.mobile_no = mobile_no || user.mobile_no;
    user.country_code = country_code || user.country_code;

    if (oldPassword && newPassword && confirmPassword) {
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {

        sendError(res, userErrors.INCORRECT_OLD_PASSWORD);
        return;
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save();

    const updatedUser = await userModel
      .findOne({ _id: user._id })
      .select("+password");


    res.status(200).json({ data: updatedUser });
  } catch (error: any) {

    res.status(500).json({ error: "Internal Server Error" });
  }
}
