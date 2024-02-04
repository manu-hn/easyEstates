import Jwt from "jsonwebtoken";
export const userAuthByToken = (request, res, next) => {
    try {

        const token = request.headers.authorization
        // const token = request.headers.authorization.split(" ")[1];

        console.log(token);
        if (!token) {
            return res.status(401).json({ error: true, message: 'User is Un-Authorized' });

        }
        console.log(token)

        Jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {

            if (error) return res.status(401).json({ error: true, message: "Forbidden" });

            //User - > userId -> uid
            request.user = user;
            next()
        })

    } catch (error) {
        next(error)

    }
}

