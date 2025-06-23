import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenSetCookie from "../utils/generateToken.js";

//signup controller 
export const signUp = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        if (!email || !password || !fullName) {
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const user = await User.findOne({email});

        if (user) {
            return res.status(400).json({message: "User already exists"});
        }

        //hash password and save user to database 
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({email, password: hashedPassword, fullName});
        if(newUser){
            //generate token and set cookie
            generateTokenSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({message: "User created successfully"});
        }
    } catch (error) {
        console.log(`Error in signUp Controller: ${error}`);
        res.status(500).json({message: error}); 
    }
}

//login controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: "User does not exist"});
        }

        //check if password matches with the hashed password in database 
        const isPasswordMatch = await bcrypt.compare(password, user.password || "");

        if (!isPasswordMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        if(isPasswordMatch){
            //generate token and set cookie
            generateTokenSetCookie(user._id, res);
            res.status(200).json({message: "Login successful"});
        }

    } catch (error) {
        console.log(`Error in login Controller: ${error}`);
        res.status(500).json({message: error});
    }
}

//logout controller
export const logout =async (req , res)=>{
    try{
     //clear cookie with jwt token    
     res.cookie("jwt" ,"" , {maxAge :0})
     res.status(200).json( { message : "Logout Success"})
       
    }catch(error){
     console.log("Error in Logout controller",error.message)
     res.status(500).json( { error : "Internal Server Error "})
    }
 }

//getMe controller
export const getMe = async (req, res) => {
	try {
        //get user details except password
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};