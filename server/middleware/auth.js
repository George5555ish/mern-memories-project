import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = async (req, res, next) => {

    try {
        
        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = token.length < 500;

        let decodeData;

        if (token && isCustomAuth){
            decodeData = jwt.verify(token, process.env.SECRET_URL);

            req.userId = decodeData?.id;
        } else {
            decodeData = jwt.decode(token);
            req.userId = decodeData?.sub;
        }

        next();
    } catch (error) {

        console.log(error);
    }
}