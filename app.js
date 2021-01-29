var express = require('express');
var exphbs  = require('express-handlebars');
const mercadopago = require ('mercadopago');
var port = process.env.PORT || 3001
mercadopago.configure({
    access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
});

    const token = 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181'
    const integrator_id= 'dev_24c65fb163bf11ea96500242ac130004'


var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {

    console.log(req.query)
let preference =
    {
    "collector_id":617633181,
        "items": [
            {
                "id": "item-ID-1234",
                "title": req.query.title,
                "unit_price": parseInt(req.query.price),
                "quantity": parseInt(req.query.unit),
                "picture_url": req.query.img,
                "description": req.query.title,
                "external_reference": "dorgasc@protonmail.com"
            }
        ],

    "back_urls": {
        "success": "https://danielo928-mp-ecommerce-nodejs.herokuapp.com/",
        "failure": "https://danielo928-mp-ecommerce-nodejs.herokuapp.com/",
        "pending": "https://danielo928-mp-ecommerce-nodejs.herokuapp.com/"
    },
    "auto_return": "approved",
    "payer": {
        "id": "617633181",
        "name": "Lalo",
        "surname": "Landa",
        "email": "test_user_81131286@testuser.com",
        "date_created": "2015-06-02T12:58:41.425-04:00",
        "phone": {
            "area_code": "52",
            "number": 5549737300
        },
        "address": {
            "street_name": "Insurgentes Sur",
            "street_number": 1602,
            "zip_code": "03940"
        }
    },
    "payment_methods": {
        "excluded_payment_methods": [
            {
                "id": "amex"
            }
        ],
        "excluded_payment_types": [
            {
                "id": "atm"
            }
        ],
        "installments": 6,
    },
        "notification_url": "https://danielo928-mp-ecommerce-nodejs.herokuapp.com/Webhook",
};



    /*
        const post = await axios({
            url: "https://api.mercadopago.com/checkout/preferences",
            headers: {Authorization: `Bearer ${token}`},
            method: 'post',
            body:
        {
            "collector_id":617633181,
            "items": [
            {
                "id": "item-ID-1234",
                "title": req.query.title,
                "unit_price": req.query.price,
                "quantity": req.query.unit,
                "picture_url": req.query.img,
                "description": req.query.title,
                "external_reference": "dorgasc@protonmail.com"
            }
        ],

            "back_urls": {
            "success": "https://danielo928-mp-ecommerce-nodejs.herokuapp.com/",
                "failure": "https://danielo928-mp-ecommerce-nodejs.herokuapp.com/",
                "pending": "https://danielo928-mp-ecommerce-nodejs.herokuapp.com/"
        },
            "auto_return": "approved",
            "payer": {
            "id": "617633181",
                "name": "Lalo",
                "surname": "Landa",
                "email": "test_user_81131286@testuser.com",
                "date_created": "2015-06-02T12:58:41.425-04:00",
                "phone": {
                "area_code": "52",
                    "number": 5549737300
            },
            "address": {
                "street_name": "Insurgentes Sur",
                    "street_number": 1602,
                    "zip_code": "03940"
            }
        },
            "payment_methods": {
            "excluded_payment_methods": [
                {
                    "id": "amex"
                }
            ],
                "excluded_payment_types": [
                {
                    "id": "atm"
                }
            ],
                "installments": 6,
        },
            "notification_url": "https://danielo928-mp-ecommerce-nodejs.herokuapp.com/Webhook",
        }

        })
    */
    mercadopago.preferences.create(preference)
        .then(function(response){
            console.log(preference)
            global.id = response.body.id;
            console.log(global.id)
        }).catch(function(error){
        console.log(error);
    });

    console.log(req.query)
    res.render('detail', req.query);
});


/*
let preference =
    {
    "collector_id":617633181,
    "items": [
        {
            "id": "item-ID-1234",
            "title": 'Mi producto',
            "unit_price": 100,
            "quantity": 1,
            "picture_url": "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
            "description": "Item description",
            "external_reference": "dorgasc@protonmail.com"
        }
    ],

    "back_urls": {
        "success": "https://danielo928-mp-ecommerce-nodejs.herokuapp.com/",
        "failure": "https://danielo928-mp-ecommerce-nodejs.herokuapp.com/",
        "pending": "https://danielo928-mp-ecommerce-nodejs.herokuapp.com/"
    },
    "auto_return": "approved",
    "payer": {
        "id": "617633181",
        "name": "Lalo",
        "surname": "Landa",
        "email": "test_user_81131286@testuser.com",
        "date_created": "2015-06-02T12:58:41.425-04:00",
        "phone": {
            "area_code": "52",
            "number": 5549737300
        },
        "address": {
            "street_name": "Insurgentes Sur",
            "street_number": 1602,
            "zip_code": "03940"
        }
    },
    "payment_methods": {
        "excluded_payment_methods": [
            {
                "id": "amex"
            }
        ],
        "excluded_payment_types": [
            {
                "id": "atm"
            }
        ],
        "installments": 6,
    },
    "notification_url": "https://www.your-site.com/Webhook",
};

*/

/*mercadopago.preferences.create(preference)
    .then(function(response){
        console.log(preference)
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
        global.id = response.body.id;
        console.log(global.id)
    }).catch(function(error){
    console.log(error);
});*/

app.listen(port);
