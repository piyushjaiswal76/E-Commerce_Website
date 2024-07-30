import express from "express";
import bcrypt from "bcrypt";
import stripe from 'stripe';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ getFirestore, doc, collection, setDoc, getDoc, updateDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxT8qX01C2TULs-H7FE-4RWQ-MfAKLcF4",
  authDomain: "e-commerce-website-m.firebaseapp.com",
  projectId: "e-commerce-website-m",
  storageBucket: "e-commerce-website-m.appspot.com",
  messagingSenderId: "329334196013",
  appId: "1:329334196013:web:fc67bac4ac1a1864e175a4"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

//init server
const app = express();

//middlewares
app.use(express.static("public"));
app.use(express.json()) //enables form sharing



//home route
app.get('/',(req, res) => {
    res.sendFile("index.html",{ root : "public" })
})


//Add-Product
app.get('/add-product', (req, res) => {
    res.sendFile('add-product.html', { root : "public" })
})

//dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile("dashboard.html", { root : "public" })
})

//product
app.get('/product', (req, res) => {
    res.sendFile("product.html", { root : "public" })
})

//search
app.get('/search', (req, res) => {
    res.sendFile("search.html", { root : "public" })
})

//seller
app.get('/seller', (req, res) => {
    res.sendFile("seller.html", { root : "public" })
})

//cart
app.get('/cart', (req, res) => {
    res.sendFile("cart.html", { root : "public" })
})

//checkout
app.get('/checkout', (req, res) => {
    res.sendFile("checkout.html", { root : "public" })
})

app.get('/signup', (req, res) => {
    res.sendFile("signup.html", {root : "public" })
})

app.post('/signup', (req, res) => {
    const{ name, email, password, number, tac } = req.body;  

    //form validation
    if(name.length < 3){
        res.json({'alert' : 'name must be 3 letters long'});
    } else if(!email.length){
        res.json({'alert' : 'enter your email'});
    } else if(password.length < 8){
        res.json({'alert' : 'password must be 8 letters long'});
    } else if(!Number(number) || number.length < 10){
        res.json({'alert' : 'Invalid number, please enter valid one'});
    } else if(!tac){
        res.json({'alert' : 'you must agree to our terms and condition'});
    } else{
        //store the data in db
        const users = collection(db, "users");

        getDoc(doc(users, email)).then(user => {
            if(user.exists()){
                return res.json({ 'alert' : 'email already exists' });
            } else{
                //encrypt the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        req.body.seller = false;

                        //set the doc
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller,
                            })
                        })
                    })
                })
            }
        })

    }
})

app.get('/login', (req, res) => {
    res.sendFile("login.html", {root : "public" })
})

app.post('/login', (req, res) => {
    let{email, password } = req.body;

    if(email.length || password.length){
        res.json({ 'alert' : 'fill all the inputs'})
    }

    const users = collection(db, "users");

    getDoc(doc(users, email))
    .then(user => {
        if(!user.exists()){
            return res.json({'alert': 'email does not exists'});
        } else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result) {
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller
                    })
                } else{
                    return res.json({'alert': 'password is incorrect'})
                }
            })
        }
    })
})

//stripe payment
let stripeGateway = stripe(process.env.stripe_key);

let DOMAIN = process.env.DOMAIN;

app.post('/stripe-checkout', async(req, res) => {
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types:["card"],
        mode: "payment",
        success_url: '${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}&order=${JSON.stringify(req.body)}',
        cancel_url: '${DOMAIN}/checkout',
        line_items:req.body.items.map(item =>{
            return{
                price_data: {
                    currency: "usd",
                    product_data:{
                        name: item.name,
                        description: item.shortDes,
                        images: [item.image]
                    },
                    unit_amount: item.price*100
                },
                quantity: item.item
            }
        })
    })
    res.json(session.url)
})

app.get('/success', async (req, res)=>{
    let {order, session_id} = req.query;

    try{
        const session = await stripeGateway.checkout.session.retrieve(session_id);
        const custome = await stripeGateway.customers.retrieve(session.customer);

        let date = new Date();

        let orders_collection = collection(db, "orders");
        let docname = '${customer.email}-order-${date.getTIME()}';

        SetDoc(doc(orders_collection, docName), JSON.parse(order))
        .then(data =>{
            res.redirect('/checkout?payment=done')
        })
    }catch{
        res.redirect("/404");
    }
})

//seller route
app.get('/seller',(req, res) => {
    res.sendFile("seller.html", { root : "public"})
})

app.post('/seller', (req, res) => {
    let { name,address, about, number, email } = req.body;

    if(!name.length || !address.length || !about.length || number.length <10 || !Number(number)){
        return res.json({'alert': 'some information(s) is/are incorrect'});
    } else{
        //u[date a seller status
        const sellers = collection(db, "sellers");
        setDoc(doc(sellers,email), req.body)
        .then(data =>{
            const users = collection(db, "users");
            updateDoc(doc(users, email), {
                seller: true
            })
            .then(data => {
                res.json({'seller': true})
            })

        })
    }

})

app.get('/products/:id', (req, res) => {
    res.sendFile('product.html', {root: "public"});
})

app.get('/search/:key', (req, res) => {
    res.sendFile('search.html', {root: "public"});
})
app.post('/search', (req, res) => {
    let{search } = req.body;
})
//404 route
app.get('/404', (req, res) => {
    res.sendFile("404.html", {root : "public"})
})

app.use((req, res) =>{
    res.redirect('/404')
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})