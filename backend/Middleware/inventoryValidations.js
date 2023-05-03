const inventroyValidator = (req, res, next) => {
    const data = req.body;

    if(!data.name || !data.price || !data.description){
        return res.status(400).send({msg: `Please provide all the fields for inventory`});
    }
    return next();
}
module.exports={
    inventroyValidator
}