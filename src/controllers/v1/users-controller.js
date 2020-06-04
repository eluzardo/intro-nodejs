const bcrypt = require('bcrypt');
const Users = require('../../mongo/models/users');
const jwt = require ('jsonwebtoken');
const expiresIn = 60*10;
const login = async (req,res)=> {
    try {
        const {email, password}= req.body;
        const user = await Users.findOne({email});
        if (user){
            const isOk = await bcrypt.compare(password, user.password);
            if (isOk){
                const token = jwt.sign(
                    {userId: /*user.Id*/user._id, role: user.role},
                    process.env.JWT_SECRET,
                    {expiresIn});
                res.send({status: 'OK', data :{token, expiresIn}});
            }else{
                res.status(403).send({status: 'invalid_password', message: 'no existe'});    
            }
        }else{
            res.status(401).send({status: 'user not found', message: 'no existe'});
        }
    } catch (error) {
        res.status(500).send({ status:'ERROR pass', message: error.message});
    }
};

const createUser = async (req,res)=>{
    try{
        
        const {username, email, data, password} = req.body;
        const hash= await bcrypt.hash(password, 15);
        /*await Users.create({
            username, //=username:username
            email,
            data,
            password: hash
        });*/

        const user = new Users();
        user.username = username;
        user.email = email;
        user.password = hash;
        user.data = data;

        await user.save();
        res.send({status: 'OK', message: 'user created'});
    } catch (error){ 
        if(error.code && error.code ===1000){
            res
                .status(400)
                .send({status: 'DUPLICATED_VALUES', message: error.keyValue});
            return;
        }
        //console.log('error create user', error);
        res.status(500).send({status: 'ERRORrrrr', message: error.message});
    }
};

const deleteUser= (req,res) => {};

const getUser = (req,res) => {};

const updateUser = async (req,res) => {
    try {
        const {username, email, data, userId} = req.body; 
        await Users.findByIdAndUpdate(userId, {
            username,
            email
        });
        res.send({status: 'OK', message: 'user updated'});
    } catch (error) {
        if(error.code && error.code ===1000){
            res
                .status(400)
                .send({status: 'DUPLICATED_VALUES', message: error.keyValue});
            return;
        }
        //console.log('error create user', error);
        res.status(500).send({status: 'ERRORrrrr', message: error.message});
    }
};

module.exports = {createUser,deleteUser, getUser, updateUser, login};