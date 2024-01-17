import { StatusCodes } from "http-status-codes";
import UserModel from "../models/User.model.js";
import { userSchemaValidate } from "../utils/error.js";
import { passwordHasher, isPasswordValid } from "../utils/PswdHasher.js";
import { generateToken } from "../utils/tokenGenerator.js";
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
            return response.status(CREATED).json({ error: false, statusCode: CREATED, message: 'user created successfully', data: newUser })
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
            const accessToken = generateToken(isUserAvailable._id, isUserAvailable.username);
            response.cookie('accessToken',accessToken, { httpOnly: true,sameSite : "None" })
            .status(OK)
            .json({
                error: false, statusCode: OK, message: `Login Successful`, accessToken, data: {
                    uid: isUserAvailable._id, username: isUserAvailable.username, email: isUserAvailable.email,
                }
            })
        } else {


            response.status(FORBIDDEN).json({ error: true, statusCode: FORBIDDEN, message: `Invalid Password` })
        }

    } catch (error) {
        next(error)
    }
}

