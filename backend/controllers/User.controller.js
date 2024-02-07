import { StatusCodes } from "http-status-codes";
import UserModel from "../models/User.model.js";
import { userSchemaValidate } from "../utils/error.js";
import { passwordHasher, isPasswordValid } from "../utils/PswdHasher.js";
import { generateToken } from "../utils/tokenGenerator.js";
import { randomPasswordGenerator } from "../utils/PasswordGenerator.js";
import { randomUniqueUsernameGenerator } from "../utils/UserNameGenarator.js";


const { CREATED, BAD_REQUEST, NOT_ACCEPTABLE, FORBIDDEN, OK } = StatusCodes;

export const userSignup = async (request, response, next) => {
    try {

        const { fullName, username, email, mobile, password } = request.body;

        const { value, error } = userSchemaValidate.validate({ fullName, username, email, password, mobile })

        const hashedPassword = await passwordHasher(value.password);

        if (error) {
            return response.status(BAD_REQUEST).json({ error: true, message: error.message })
        }
        else {
            const { fullName, username, email, mobile } = value

            const newUser = await UserModel.create({
                fullName,
                username, email, password: hashedPassword, mobile
            });


            return response.status(CREATED).json({
                error: false, statusCode: CREATED, message: 'user created successfully', data: {
                    uid: newUser._id, fullName: newUser.fullName, email: newUser.email, username: newUser.username, avatar: newUser.avatar
                }
            })
        }

    } catch (error) {
        next(error);
    }
}


export const userLogin = async (request, response, next) => {
    const { email, password } = request.body;

    try {

        const isUserAvailable = await UserModel.findOne({ email });

        if (!isUserAvailable) {
            return response.status(NOT_ACCEPTABLE).json({ error: true, statusCode: NOT_ACCEPTABLE, message: `User Not Found !` })
        }

        const isPasswordCorrect = await isPasswordValid(password, isUserAvailable.password);

        if (isPasswordCorrect) {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 1);
            const token = await generateToken(isUserAvailable._id);
            // console.log("access controller", token)
            const hashedToken = await passwordHasher(token)
            // console.log("hashed", hashedToken)
            // response.cookie('access_token', hashedToken, {
            //     httpOnly: true,
            //     domain: "localhost",
            //     origin: "http://localhost:5000",
            //     path: "/",
            //     sameSite: "None",
            //     expires: expiryDate,
            //     secure: true,
            // });
            response.status(OK)
                .json({
                    error: false, statusCode: OK, message: `Login Successful`, access_token: token, data: {
                        uid: isUserAvailable._id, fullName: isUserAvailable.fullName, username: isUserAvailable.username, email: isUserAvailable.email,
                        avatar: isUserAvailable.avatar, mobile: isUserAvailable.mobile,
                    }
                })
        } else {


            response.status(FORBIDDEN).json({ error: true, statusCode: FORBIDDEN, message: `Invalid Password` })
        }

    } catch (error) {
        next(error)
    }
}

export const userGoogleAuthentication = async (request, response, next) => {
    try {
        const { email, name, image } = request.body;

        const isUserAvailable = await UserModel.findOne({ email });

        //if user not found
        if (!isUserAvailable) {
            const generatedPassword = randomPasswordGenerator();
            const hashedPassword = await passwordHasher(generatedPassword);
            const username = await randomUniqueUsernameGenerator(email);

            const newUser = await UserModel.create({
                fullName: name,
                username, email, password: hashedPassword, avatar: image
            });

            const token = generateToken(username, email);

            response.cookie('accessToken', token, { httpOnly: true, sameSite: "None", path: "/" });
            return response.status(CREATED).json({
                error: false, message: 'User Created Successfully !', data: {
                    uid: newUser._id, fullName: newUser.fullName, email: newUser.email, username: newUser.username, avatar: newUser.avatar
                }
            })

        } else {
            const token = generateToken(isUserAvailable._id, isUserAvailable.email);

            response.cookie('accessToken', token, { httpOnly: true, sameSite: "None", path: "/" });

            response.status(OK).json({
                error: false, statusCode: OK, message: "Login Successful", data: {
                    uid: isUserAvailable._id,
                    username: isUserAvailable.username,
                    email: isUserAvailable.email,
                    avatar: isUserAvailable.avatar
                }
            })


        }


    } catch (error) {
        next(error)
    }
}


export const updateUserDetails = async (request, response, next) => {

    try {
        const { id } = request.params;


        const { password, fullName, username, email, avatar } = request.body;

        if (request?.user?.uid !== id) {
            return response.status(401).json({ error: true, message: `Not Authorized` })
        }

        const isUserAvailable = await UserModel.findById({ _id: id });

        if (!isUserAvailable) {
            return response.status(401).json({ error: true, message: `User not Authorized` })
        }

        let hashedPassword;
        if (password) { hashedPassword = await passwordHasher(password); }


        const updatedUser = await UserModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                fullName, username, email, password: hashedPassword, avatar
            }
        }, {
            new: true,
            runValidators: true
        })

        const sendData = {
            uid: updatedUser._id,
            fullName: updatedUser.fullName, username: updatedUser.username, email: updatedUser.email
            , avatar: updatedUser.avatar
        }

        return response.status(200).json({ error: false, message: `User Details Updated Successfully`, data: sendData })

    } catch (error) {
        next(error);
    }
}


export const deleteUserAccount = async (request, response, next) => {
    try {
        const { id } = request.params;
        if (request?.user?.uid !== id) {
            return response.status(401).json({ error: true, message: `Not Authorized` })
        }

        await UserModel.findByIdAndDelete({ _id: id });

        return response.status(200).json({ error: false, message: 'User Deleted Successfully!' });

    } catch (error) {
        next(error)
    }
}

export const userSignOut = async (request, response, next) => {
    try {

        response.clearCookie('token');
        response.status(OK).json({ error: false, message: 'Signed Out Successfully' });
    } catch (error) {
        next(error);
    }
}

export const getUserDetails = async (request, response, next) => {
    try {
        const { id } = request.params;

        const isUserAvailable = await UserModel.findById({ _id: id });

        if (!isUserAvailable) {
            return response.status(400).json({ error: true, message: 'User Not Available' });
        }

       
        const { password, ...rest } = isUserAvailable._doc;
        return response.status(200).json({ error: false, message: 'Data Retrieved Successfully', data: rest });
    } catch (error) {
        next(error);
    }
}