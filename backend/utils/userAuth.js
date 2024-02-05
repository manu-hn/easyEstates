import Jwt from "jsonwebtoken";
export const userAuthByToken = (request, res, next) => {
    try {

        let token;
        if (request.headers.authorization.includes('Bearer')) {
            token = request.headers.authorization.split(" ")[1];
        } else {

            token = request.headers.authorization
        }

       
        console.log(token);
        if (!token) {
            return res.status(401).json({ error: true, message: 'User is Un-Authorized' });

        }
        console.log(token)

        Jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {

            console.log(user)
            if (error) return res.status(401).json({ error: true, message: "Forbidden" });
            //User - > userId -> uid
            request.user = user;
            next()
        })

    } catch (error) {
        next(error)

    }
}

