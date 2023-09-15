import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

let port = 3000;

let main = express();
mongoose.connect('mongodb://127.0.0.1:27017/todo');

var todaySchema = new mongoose.Schema({
    name: String
});

let today = mongoose.model("today",todaySchema);

var workSchema = new mongoose.Schema({
    name: String
});

let work = mongoose.model("work",workSchema);

main.use(express.static('public'));
main.set('view engine', 'ejs');
main.use(bodyParser.urlencoded({extended: true}));

let date = new Date();

let month1 = date.getMonth();
let day1 = date.getDay();
let date1 = date.getDate();

main.get('/', async(req, res) => {
    let find1 = await today.find({});
    res.render('today.ejs',{
        day: day[day1],
        month: month[month1],
        date : date1,
        today : find1,
    });
})

main.post("/deltoday",async(req,res)=>{
    let id = req.body.id;
    await today.findByIdAndDelete(id);
    res.redirect("/today");
});

main.post("/delwork", async(req,res)=>{
    let id = req.body.id;
    await work.findByIdAndDelete(id);
    res.redirect("/work");
})

main.post('/todayadd', (req, res) => {

    var newToday = new today({
        name: req.body.new
    });
    newToday.save();
    res.redirect('/today');
})

main.post("/workadd",(req,res)=>{
    var newWork = new work({
        name: req.body.new
    });
    newWork.save();
    res.redirect("/work");
})

main.get('/today', async (req, res) => {
    let find1 = await today.find({});
    res.render('today.ejs',{
        day: day[day1],
        month: month[month1],
        date : date1,
        today : find1,
    });
});

main.get('/work', async(req, res) => {
    var list = await work.find({});
    res.render('work.ejs',{
        work1 : "workList",
        work : list,
    });
})


main.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


let month =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November","December"];
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];