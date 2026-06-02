
export const validateQuery = (schema) => {
    return (req, res, next) => {
        const validationResult = schema.validate(req.query);
        if(validationResult.error) {
            return res.status(400).json({error: validationResult.error.details[0].message });
        }
    }
}


export const validateBody = (schema) => {
    return (req, res, next) => {
        const validationResult = schema.validate(req.body);
        if(validationResult.error) {
            return res.status(400).json({error: validationResult.error.details[0].message });
        }
    }
}

export const validateParams = (schema) => {
    return (req, res, next) => {
        const validationResult = schema.validate(req.params);
        if(validationResult.error) {
            return res.status(400).json({error: validationResult.error.details[0].message });
        }
    }
}