import handler from "./auth";
import User from "@/models/User";

handler.post('/register', async(req, res)=> {
    const { username, password } = req.body;
    try {
    const user = new User({username});
    const newUser = await User.register(user, password);
    console.log(newUser);
    
    res.status(201).send('User registered successfully');

    res.redirect('/posts');
    } catch(error) {
        if (error.name === 'UserExistsAlready') {
            return res.status(409).send('user already exists')
        }
        console.error(error);
        res.status(500).send('registration failed')
    }   
})