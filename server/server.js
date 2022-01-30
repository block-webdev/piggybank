const config = require('./config');
const mysql = require('mysql');
const bodyparser = require('body-parser');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var md5 = require('md5');
const filestore = require("session-file-store")(session);



var store = new session.MemoryStore;

const oneDay = 1000 * 60 * 60 * 24;

var app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});


io.on('connection', (client) => {

    client.on('event', data => {
        console.log("user event", data);
    });

    client.on('hello', data => {
        console.log("server received msg: ", data);
        data.msg_time = new Date();
        client.broadcast.emit("hello", data);
    });


    client.on('disconnect', () => {
        console.log("user disconnected ");
    });

    console.log("user connected!");
});

app.use(cors({ origin: "*" }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(session({ secret: "PIGGY_BANK_KEY" }));
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
    // store: new filestore()
}));

var db_conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    charset: 'utf8mb4'
});


app.post('/signup', function (req, res) {
    var params = req.body.params;
    db_conn.query("SELECT * FROM users WHERE email = ?", [params.email], function (err, result, field) {
        if (!err) {
            if (result.length == 0) {
                db_conn.query("INSERT INTO users(name, email, create_time, password, username) VALUES (?, ?, ?, ?, ?)",
                    [params.name, params.email, new Date(), md5(params.password), params.username],
                    function (err, ret) {
                        if (!err) {
                            db_conn.query("SELECT * FROM users WHERE email = ?", [params.email], function (e, ret) {
                                if (!e) {
                                    var uinfo = ret[0];
                                    delete uinfo['password'];
                                    req.session.USERINFO = uinfo;
                                    res.json({ code: 0, user_info: uinfo });  //success
                                } else {
                                    res.json({ code: 1 }) //insert db err
                                }
                            });
                        } else {
                            res.json({ code: 1 });  //insert db error
                        }
                    });
            } else {
                res.json({ code: 2 }); //already registered
            }
        } else {
            res.json({ code: 3 });  //get info error
        }
    });
})

app.get('/signin', function (req, res) {
    var param = req.query;
    if (param.email == "" || param.email == null) {
        res.json({ code: 100 });
        return;
    }

    db_conn.query("SELECT * FROM admin LIMIT 1", [], function (err, res_admin, fields) {
        let isAdmin = false;
        if (!err) {
            if (res_admin.length > 0) {
                isAdmin = true;
            }
        }

        db_conn.query("SELECT * FROM users WHERE email = ?", [param.email], function (err, result, fields) {
            if (err) {
                res.json({ code: 100 });
            } else {
                if (result.length == 0) {
                    res.json({ code: 1 }); //not registered.
                } else {
                    if (result[0].password == md5(param.password)) {
                        var uinfo = result[0];
                        delete uinfo['password'];
                        req.session.USERINFO = uinfo;
                        // req.session.save();
                        console.log("req.sesion = ", req.session);
                        uinfo.isAdmin = isAdmin;
                        uinfo.admin_wallet = res_admin[0].wallet_addr;

                        res.json({ code: 0, user_info: uinfo }); //success
                    } else {
                        res.json({ code: 2 }); //password not match
                    }
                }
            }
        });
    });


});




app.get('/signout', function (req, res) {
    req.session.destroy();
    res.json({ code: 100 });
})



app.post("/check_signed", function (req, res) {

    var param = req.body.token;
    db_conn.query("SELECT * FROM users WHERE email = ? and password = ?", [param.email, md5(param.password)], function (err, result, fields) {
        if (err) {
            res.json({ code: 100 });
        } else {
            if (result.length == 0) {
                res.json({ code: 100 });
            } else {
                db_conn.query("SELECT * FROM admin LIMIT 1", [], function (err, res_admin, fields) {
                    let uinfo = result[0];
                    let isAdmin = false;
                    if (!err) {
                        if (res_admin.length > 0 && res_admin[0].user_id === result[0].id) {
                            isAdmin = true;
                        }
                    }
                    uinfo.isAdmin = isAdmin;
                    uinfo.admin_wallet = res_admin[0].wallet_addr;

                    res.json({ code: 0, user_info: uinfo });
                });
            }
        }
    });
});



app.get('/', function (req, res) {
    db_conn.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(null);
        }
    });
});

app.post("/:id/:count", async function (req, res, next) {
    console.log("param1", req.params.id);
    console.log("param2", req.params.count);
    res.json({ code: 0 });
})

app.post("/invest-list", function (req, res) {
    db_conn.query("SELECT Count(*) as cnt FROM invests WHERE withdraw_time IS NULL", (err, rows, fields) => {
        db_conn.query("SELECT invests.*, users.name FROM invests INNER JOIN users ON invests.user_id = users.id ORDER BY deposit_time DESC LIMIT ?, ? ", [req.body.startNum, req.body.count], (err1, rows1, fields1) => {
            if (!err1) {
                res.send({ totalCount: rows[0].cnt, curDate: new Date(), data: rows1 });
            } else {
                console.log(err1);
                res.send(null);
            }
        });
    });
});

app.post("/invest", function (req, res) {
    db_conn.query("INSERT INTO invests(user_id, amount, deposit_time, deposit_period, coin_id) VALUES (?,?,?,?,?) ",
        [req.body.user_id, req.body.amount, new Date(), req.body.deposit_period, req.body.coin_id],
        (err, rows, fields) => {
            if (!err) {
                res.json({ code: 0 });
            } else {
                console.log(err);
                res.json({ code: 1 });
            }
        });
});

app.post("/withdraw", function (req, res) {
    console.log('server-withdraw');
    db_conn.query("UPDATE invests SET withdraw_time = ? WHERE id = ?",
        [new Date(), req.body.id],
        (err, rows, fields) => {
            if (!err) {
                res.json({ code: 0 });
            } else {
                console.log(err);
                res.json({ code: 1 });
            }
        });
});


app.post("/get-channel", function (req, res) {
    const user_id = req.body.user_id;
    db_conn.query("SELECT messages.*, users.name FROM messages INNER JOIN users ON messages.from_user_id = users.id WHERE messages.from_user_id = ? ORDER BY messages.create_time DESC LIMIT 0, 1", [user_id], (err2, rows2, fields1) => {
        if (!err2) {
            res.send(rows2[0]);
        } else {
            console.log(err2);
            res.send(null);
        }
    });
});

app.post("/channel-list", function (req, res) {
    db_conn.query("SELECT * FROM admin LIMIT 1", (err1, rows1, fields1) => {
        if (!err1) {
            const admin_user_id = rows1[0].user_id;
            db_conn.query("SELECT messages.*, users.name FROM messages INNER JOIN users ON messages.from_user_id = users.id WHERE messages.id IN (SELECT MAX(id) FROM messages WHERE from_user_id != ? AND (ISNULL(read_users) OR read_users = 0) GROUP BY from_user_id)", [admin_user_id], (err2, rows2, fields1) => {
                if (!err1) {
                    res.send(rows2);
                } else {
                    console.log(err2);
                    res.send(null);
                }
            });
        } else {
            console.log(err1);
            res.send(null);
        }
    });
});


app.post("/channel-content", function (req, res) {
    db_conn.query("SELECT * FROM admin LIMIT 1", (err1, rows1, fields1) => {
        if (!err1) {
            const admin_user_id = rows1[0].user_id;
            db_conn.query("SELECT * FROM messages WHERE from_user_id = ? OR (from_user_id = ? AND to_user_id = ?) ORDER BY create_time ASC", [req.body.user_id, admin_user_id, req.body.user_id], (err2, rows2, fields1) => {
                if (!err2) {
                    res.send({ data: rows2, admin_user_id: admin_user_id });
                } else {
                    console.log(err2);
                    res.send(null);
                }
            });
        } else {
            console.log(err1);
            res.send(null);
        }
    });
});

app.post("/message-list", function (req, res) {
    db_conn.query("SELECT messages.*, users.name FROM messages INNER JOIN users ON messages.user_id = users.id ORDER BY messages.create_time DESC LIMIT 0, 50", (err1, rows1, fields1) => {
        if (!err1) {
            res.send(rows1);
        } else {
            console.log(err1);
            res.send(null);
        }
    });
});


app.post("/message-send", function (req, res) {
    db_conn.query("SELECT * FROM admin LIMIT 1", (errAdmin, rowsAdmin, fieldsAdmin) => {
        if (!errAdmin) {
            const to_user_id = req.body.to_user_id != -1 ? req.body.to_user_id : rowsAdmin[0].user_id;
            db_conn.query("INSERT INTO messages(content, create_time, from_user_id, to_user_id) VALUES (?,?,?,?) ",
                [req.body.text, new Date(), req.body.from_user_id, to_user_id],
                (err, rows, fields) => {
                    if (!err) {
                        db_conn.query("UPDATE messages SET read_users = 0 WHERE from_user_id = ? AND to_user_id = ?",
                            [to_user_id, req.body.from_user_id],
                            (err1, rows1, fields1) => {
                                if (!err1) {
                                    res.json({ code: 0, msg_time: new Date() });
                                } else {
                                    console.log(err1);
                                    res.json({ code: 0, msg_time: new Date() });
                                }
                            });
                    } else {
                        console.log(err);
                        res.json({ code: 1 });
                    }
                });
        } else {

        }
    });
});


// app.listen(config.server_port, () => console.log(`Listening on port ${config.server_port}..`));
server.listen(process.env.PORT || config.server_port, () => console.log(`Listening on port ${config.server_port}..`));
// db_conn.end();
