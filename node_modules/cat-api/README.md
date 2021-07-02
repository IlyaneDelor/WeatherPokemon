# cat-api
Cat API. Get random cat

#Install
```bash
npm install cat-api
```

#Usage
```javascript
//server
const app = this.app = express();
app.use('/cat-api', catApi('/cat-api'));

//client
fetch('/cat-api').then((res) => res.json()).then(json => console.log(json)) 
// {url: "/cat-api/images/PAY-Hero-Cat.jpg"}
```

![Cat](https://github.com/MrCheater/cat-api/blob/master/images/370.jpg?raw=true)
