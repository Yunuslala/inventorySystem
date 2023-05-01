const loginvalidator = (req, res, next) => {
    const data = req.body;

    if(!data.email || !data.password){
        return res.status(400).send({msg: `Please provide email & password`});
    }
    return next();
}

module.exports = {loginvalidator};