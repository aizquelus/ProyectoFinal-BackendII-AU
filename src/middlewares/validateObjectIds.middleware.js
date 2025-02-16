import { isValidObjectId } from "mongoose";

export const validateObjectIds = (paramNames) => {
    return (req, res, next) => {
        for (const paramName of paramNames) {
            const id = req.params[paramName];
            if (!isValidObjectId(id)) {
                return res.status(400).json({ error: `El ID ${paramName} no tiene un formato válido.` });
            }
        }
        next();
    };
};
