const { app } = require('./express');
const bodyParser = require('body-parser');
const port = 6000;
const bcrypt = require("bcrypt");
const { createtoken } = require('./token')
const { emailValidate, passValidate } = require('./validator');
const { connection } = require('./connection');
const { sendEmail, sendEmail1 } = require('./sendEmail');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const { storage, upload} = require('./upload')
storage;
/// treating

app.get("/upload", (req, res) => {
    res.status(200).render("upload")
})

app.post("/upload", upload.single("inputUpload"), (request, response) => {
    let token = request.headers.cookie;
    filePath = `upload/${request.file.filename}`;
    if (token) {
        tokenIndex = token.indexOf("token=") + 1;
        token = token.substring((tokenIndex + 5),).split(";")[0];
        jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
            if (err) {
                // return /response.status(401).redirect("../login");
                return response.status(500).send(err)
            }
            connection.query("UPDATE `application` SET assignment=? where student_id = ?",
                [filePath, decoded.id], (err, data) => {
                    if (err) {
                        response.status(500).send(err);
                    }
                    response.status(200).redirect("../candidate-dashboard")
                })
        })

    }
    else {
        response.status(402).send("failed token")
    }
})

///

// app.post('/upload', upload.array('inputUpload'), (req, res) => {
//     console.log('upload');
//     return res.json({ status: 'OK', uploaded: req.files.length });
// });
//

app.use(cookieParser())

app.use(express.static(__dirname + '/public'));

/// we don't have to use this method because the default folder is views
//  app.set('views', path.join(__dirname, 'x')

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let parseBody = bodyParser.urlencoded({ extended: true });

app.post("/getemailsettings", (request, response) => {
    let email = request.body.email;
    let password = request.body.password;
    let token = request.cookies.token;
    if (!email || !password) {
        return response.status(400).send("fill data")
    }
    if (!emailValidate.validate(email)) {
        return response.status(401).send(emailValidate.validate(password, { list: true }))
    }
    if (token === 'null' || !token) {
        return response.status(401).redirect("../login");
    }
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(401).redirect("../login");
        }
        if (decoded.email.includes("@gmail.com")) {
            connection.query("SELECT email from `admin` where email = ?", [decoded.email],
                (err, result) => {
                    if (err) {
                        response.status(500).send(err);
                        return;
                    }
                    if (result.length == 0) {
                        return response.status(402).redirect("../login");
                    }

                    connection.query("SELECT * FROM `admin_setting` WHERE id=1",
                        (err, result1) => {
                            if (err) {
                                response.status(500).send(err);
                                return;
                            }
                            console.log(result1[0].email === null);


                            connection.query("UPDATE `admin_setting` SET email=?,password=?", [email, password],
                                (err, result) => {
                                    if (err) {
                                        return response.status(500).send(err);

                                    }
                                    response.status(201).send(result1[0])
                                });

                        })

                })
        }
        else {
            response.status(404).redirect("../login");
        }
    })

});

app.post('/chamsbotcamp/register', parseBody, (request, response) => {
    let { firstname, lastname, email, password } = request.body;

    if (!firstname || !lastname || !email || !password) {
        response.status(400).send("fill your information");
        return;
    }

    if (!emailValidate.validate(email)) {
        return response.status(401).send(emailValidate.validate(password, { list: true }))
    }

    let query = 'SELECT email FROM  `register` WHERE email= ?';

    connection.query(query, [email], (err, array) => {
        if (err) {
            response.status(500).send(err);
        }
        if (array.length > 0) {
            response.status(402).send("Email is already in use");
            return;
        }

        if (!passValidate.validate(password)) {
            response.status(401).send(passValidate.validate(password, { list: true }));
            return;
        }
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                response.status(500).send(err);
                return;
            }
            connection.query('INSERT INTO `register`(first_name,last_name,email,password,status_id) VALUES(?,?,?,?,6)', [firstname, lastname, email, hash],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        response.status(500).send(err);
                        return;
                    }
                    const token = createtoken(result.insertId, email, "1d");
                    response.cookie('token', token, { httpOnly: true });
                    response.status(201).send({ id: result.insertId, email, firstname, lastname, status_id: 6 });

                });
        });
    });
});


app.post("/chamsbotcamp/signin", parseBody, function (request, response) {
  
    let { email, password } = request.body;
  
    if (!email || !password) {
      return response.status(400).send("Please fill your Email and Password"); 
    }
  
    if (email.includes("@gmail.com")) {
      connection.query("SELECT * FROM admin WHERE email=?", [email],function (err, rows) {
        if (err) {
          return response.status(500).send(err);
        }
        let user = rows[0];
  
        if (!user) {
          response.status(401).send("email is wrong");
          return;
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            response.status(500).send("Auth Faill");
            return;
          }
          if (result == true) {
            const token = createtoken(user.id, user.email, "1d");
            response.cookie("token", token, { httpOnly: true, secure: true });
            response.status(200).send({ id: user.id, email: user.email, userName: user.user_name });
          } else {
            return response.status(401).send("Wrong password");
          }
        });
      });
      } else {
        connection.query("SELECT * FROM register WHERE email=?", [email], function (err, rows) {
          if (err) {
           return response.status(500).send(err);
          }
          var user = rows[0];
  
        if (!user) {
          response.status(401).send("email is wrong");
          return;
        }
  
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            response.status(500).send("Auth Faill");
            return;
          }
          if (result == true) {
            const token = createtoken(user.id, user.email, "1d");
            response.cookie("token", token, { httpOnly: true , Secure : true});
            response.status(200).send({ id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, status_id: user.status_id });
          } else {
            return response.status(401).send("Wrong password");
          }
        });
      });
    }
});

app.post('/chamsbotcamp/recoverypassword', parseBody, (request, response) => {
    const email = request.body.email;

    connection.query("SELECT * FROM register where email = ?", [email], (err, result) => {
        if (err) {
            response.status(500).send(err);
            return;
        }
        if (result[0]) {
            const token = createtoken(result[0].id, email, "1h");

            const link = `http://localhost:${port}/passwordreset?token=${token}`;

            sendEmail(
                email,
                "Reset Password",
                {
                    name: result[0].first_name,
                    url: link
                },
                "./emailTemplates/resetPasswordRequest.handlebars"
            );
            response.status(200).send("success");

        }
        else {
            response.status(404).send("sorry your email does not exist");
        }
    })

});

app.post("/chamsbotcamp/resetpassword", function (request, response) {
    let newPassword1 = request.body.password1;
    let newPassword2 = request.body.password2;

    if (!passValidate.validate(newPassword1)) {
        response.status(400).send(passValidate.validate(newPassword1, { list: true }));
        return;
    }
    if (newPassword1 !== newPassword2) {
        response.status(400).json(request.cookies.token);
    }
    bcrypt.hash(newPassword1, 10, (err, hash) => {
        if (err) {
            response.status(500).send(err);
            return;
        }
        const token = request.cookies.token;
        jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
            if (err) {
                return response.status(408).send('your time has expired');
            }
            connection.query('UPDATE `register` SET password=? WHERE id=? ', [hash, decoded.id],
                (err, result) => {
                    if (err) {
                        response.status(500).send(err);
                        return;
                    }
                    response.status(200).redirect('/login');
                })
        })

    })
});

app.get("/chamsbotcamp/tokenauth", function (request, response) {
    const token = request.cookies.token;

    // check if the token is exist
    if (token === 'null' || !token) { return response.status(401).send('Unauthorized request'); }

    // verify the token
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {


        if (err) {
            return response.status(500).send(err);
        }
        response.status(200).send(decoded);
    });
});

app.post("/chamsbootcamp/setting", (request, response) => {
    const bootCampName = request.body.bootCampName,
        startDate = request.body.startDate,
        endDate = request.body.endDate,
        applicationDeadline = request.body.applicationDeadline;

    let token = request.cookies.token;


    if (token) {

        connection.query('SELECT * FROM `admin_setting`', (err, array) => {
            if (err) {
                return response.status(500).send(err);
            }
            if (array.length > 0) {
                return response.status(402).send("the post is for one time :)");

            }

            jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
                if (err) {
                    return response.status(408).redirect("../login");
                }
                if (decoded.email.includes("@gmail.com")) {
                    if (!bootCampName || !startDate || !endDate || !applicationDeadline) {

                        return response.status(400).send("fill information");
                    }
                    connection.query('SELECT * FROM `admin` Where email=?', [decoded.email],
                        (err, admin) => {
                            if (err) {
                                console.log(decoded);
                                return response.status(500).send(err)
                            }
                            if (admin.length > 0) {
                                connection.query('INSERT INTO `admin_setting`(start_date,end_date,application_deadline,bootcamp_name) VALUES (?,?,?,?)',
                                    [startDate, endDate, applicationDeadline, bootCampName],
                                    (err, result) => {

                                        if (err) {
                                            return response.status(500).send(err);
                                        }
                                        else {
                                            response.status(200).send("add done");
                                        }
                                    });
                            }
                            else {
                                return response.status(400).send("user is not admin");
                            }
                        })

                }
                else {
                    return response.status(400).send("user is not admin");
                }
            });
        });
    }
    else {
        return response.status(404).redirect("../login");
    }

});

app.post("/chamsbootcamp/setting/edit", (request, response) => {
    let bootCampName = request.body.bootCampName,
        startDate = request.body.startDate,
        endDate = request.body.endDate,
        applicationDeadline = request.body.applicationDeadline;

    let token = request.cookies.token;

    if (token) {
        jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
            if (err) {
                return response.status(408).redirect("../login");
            }
            if (decoded.email.includes("@gmail.com")) {
                connection.query('SELECT * FROM `admin` Where email=?', [decoded.email],
                    (err, admin) => {

                        if (err) {
                            return response.status(500).send(err)
                        }
                        if (admin.length > 0) {
                            connection.query('UPDATE `admin_setting` SET start_date=?,end_date=?,application_deadline=?,bootcamp_name=? WHERE id=1',
                                [startDate, endDate, applicationDeadline, bootCampName],
                                (err, result) => {
                                    if (err) {
                                        return response.status(500).send(err);
                                    }
                                    response.status(201).send("update done");
                                })
                        }
                        else {
                            return response.status(400).send("user is not admin");
                        }
                    });
            }
            else {
                return response.status(400).send("user is not admin");
            }
        });
    }
    else {
        return response.status(404).redirect("../login");
    }

});

// app.get("/chamsbootcamp/candidate/dashboard", (request, response) => {
//     let token = request.headers.authorization;
//     token = token.split(" ")[1];
//     jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
//         if (err) {
//             return response.status(408).render("login");
//         }

//         connection.query('SELECT * `register` Where email=?', [decoded.email],
//             (err, student) => {
//                 if (err) {
//                     return response.status(500).send(err)
//                 }
//                 if (student.length == 0) {
//                     return response.status(400).send("email didnt find")
//                 }
//                 connection.query('SELECT * `application` WHERE student_id=?', [student[0].id],
//                     (err, result1) => {
//                         if (err) {
//                             return response.status(500).send(err)
//                         }
//                         if (result.length == 0) {
//                             connection.query('INSERT INTO `candidate_status`(candidate_id,status) VALUES(?,?)', [result1[0].id, "no_application"],
//                                 (err, result) => {
//                                     if (err) {
//                                         return response.status(500).send(err)
//                                     }
//                                     return response.status(200).send(result[0].status);

//                                 })


//                         }
//                         connection.query('SELECT * FROM `candidate_status` WHERE candidate_id=?', [result1[0].id],
//                             (err, result) => {
//                                 if (err) {
//                                     return response.status(500).send(err)
//                                 }
//                                 if (result.length == 0) {
//                                     connection.query('INSERT INTO `candidate_status`(candidate_id,status) VALUES(?,?)', [result1[0].id, "app_pending"],
//                                         (err, result2) => {
//                                             if (err) {
//                                                 return response.status(500).send(err)
//                                             }
//                                             return response.status(200).send(result2[0].status);

//                                         })
//                                 }
//                                 return response.status(200).send(result[0].status);
//                             });

//                     });
//             });
//     });
// });


app.get("/candidates", (request, response) => {
    let token = request.cookies.token;

    if (token === 'null' || !token) {
        return response.status(402).send("empty token");
    }
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(402).send("failed token");
        }
        if (decoded.email.includes("@gmail.com")) {
            // check if the email exist in your database
            connection.query(`
            SELECT application.*,register.id,email,first_name,last_name,
            status_id FROM application 
            RIGHT JOIN register 
            ON application.student_id  = register.id
            `, (err, result) => {
                if (err) {
                    return response.status(500).send(err);
                }
                response.status(200).send(result);
            })
        }
    })
});


app.get("/users", (request, response) => {
    let token = request.cookies.token;

    if (token === 'null' || !token) {
        return response.status(404).send("empty token");
    }
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(404).send("failed token");
        }
        if (decoded.email.includes("@gmail.com")) {
            connection.query(`SELECT id,email FROM register`, (err, result) => {
                if (err) {
                    return response.status(500).send(err);
                }
                response.status(200).send(result);
            })
        }
    })
});


app.get("/user", (request, response) => {
    let token = request.cookies.token;

    if (token === 'null' || !token) {
        return response.status(404).send("empty token");
    }
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(404).send("failed token");
        }
        if (decoded.email.includes("@gmail.com")) {
            connection.query(`SELECT id,email FROM register where id = 4`, (err, result) => {
                if (err) {
                    return response.status(500).send(err);
                }
                response.status(200).send(result);
            })
        }
    })
});


app.delete("/chamsbootcamp/register/:id", (request, response) => {
    let token = request.cookies.token;


    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(408).redirect("../login");
        }
        if (decoded.email.includes("@gmail.com")) {
            connection.query('SELECT * from `admin` Where email=?', [decoded.email],
                (err, admin) => {

                    if (err) {

                        return response.status(500).send(err)
                    }
                    if (admin.length > 0) {
                        connection.query('delete from register where id = ?;', [request.params.id],
                            (err, result) => {
                                if (err) {
                                    return response.status(500).send(err);
                                }
                                else {
                                    return response.status(201).send(result);
                                }
                            })
                    }
                    else {
                        response.status(402).send("User not found");
                    }

                })
        }
    })
})

app.get("/chamsbootcamp/email-templates", (request, response) => {
    let token = request.cookies.token;


    if (token === 'null' || !token) {
        return response.status(404).send("empty token");
    }

    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(408).redirect("../login");
        }
        if (decoded.email.includes("@chams.com")) {
            connection.query('SELECT * from `admin` Where email=?', [decoded.email],
                (err, admin) => {
                    if (err) {

                        return response.status(500).send(err)
                    }
                    if (admin.length > 0) {
                        connection.query('SELECT * FROM `email_templates`', (err, result) => {
                            if (err) {
                                return response.status(500).send(err);
                            }
                            response.status(200).send(result);
                        })
                    }
                })
        }
    })
})

app.put('/chamsbootcamp/email-templates', (request, response) => {
    let { id, subject, message } = request.body;

    let token = request.cookies.token;


    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(408).redirect("../login");
        }
        if (decoded.email.includes("@chams.com")) {
            if (!subject || !message || !id) {
                return response.status(400).send("fill information");
            }
            connection.query('SELECT * from `admin` Where email=?', [decoded.email],
                (err, admin) => {
                    if (err) {

                        return response.status(500).send(err)
                    }
                    if (admin.length > 0) {
                        connection.query('UPDATE `email_templates` SET subject=?,message=? WHERE id=?',
                            [subject, message, id], (err, results) => {
                                if (err) {
                                    return response.status(500).send(err);
                                }
                                else {
                                    return response.status(200).send("tasks completed successfully");
                                }
                            })
                    }
                    else {
                        return response.status(401).send("failed to update");
                    }
                })

        }
    })
})

app.post("/chamsbootcamp/application-details/comment", (request, response) => {
    let { student_id, comment } = request.body;
    let token = request.cookies.token;
    if (token) {
        jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
            if (err) {
                return response.status(408).redirect("../login");
            }
            if (decoded.email.includes("@gmail.com")) {
                if (!student_id || !comment) {
                    return response.status(400).send("fill information");
                }
                connection.query('SELECT * from `admin` Where email=?', [decoded.email],
                    (err, admin) => {
                        if (err) {

                            return response.status(500).send(err)
                        }
                        if (admin.length > 0) {
                            connection.query('SELECT id from `register` where id = ?', [student_id], (err, result) => {
                                if (err) {
                                    return response.status(500).send(err);
                                }

                                else if (result.length > 0) {
                                    connection.query('INSERT into `admin_comments` (comment,student_id) VALUES (?, ?)',
                                        [comment, student_id], (err, results) => {
                                            if (err) {
                                                return response.status(500).send(err);
                                            }
                                            else {
                                                response.status(200).send(results);
                                            }
                                        })
                                }
                                else {
                                    return response.status(401).send("failed to update");
                                }
                            })
                        }
                        else {
                            return response.status(401).send("failed to update");
                        }
                    })
            }
        })
    }
    else {
        return response.status(402).send("failed token");
    }
})

// weird get
app.get("/chamsbootcamp/application-details/comment", (request, response) => {
    let token = request.cookies.token;
    if (token) {
        jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
            if (err) {
                return response.status(408).redirect("../login");
            }
            if (decoded.email.includes("@gmail.com")) {
                connection.query('SELECT * from `admin` Where email=?', [decoded.email],
                    (err, admin) => {
                        if (err) {
                            return response.status(500).send(err)
                        }
                        if (admin.length > 0) {
                            connection.query('SELECT id from `register` where id = ?', [student_id], (err, result) => {
                                if (err) {
                                    return response.status(500).send(err);
                                }

                                else if (result.length > 0) {
                                    connection.query('INSERT into `admin_comments` (comment,student_id) VALUES (?, ?)',
                                        [comment, student_id], (err, results) => {
                                            if (err) {
                                                return response.status(500).send(err);
                                            }
                                            else {
                                                response.status(200).send(results);
                                            }
                                        })
                                }
                                else {
                                    return response.status(401).send("failed to update");
                                }
                            })
                        }
                        else {
                            return response.status(401).send("failed to update");
                        }
                    })
            }
        })
    }
    else {
        return response.status(402).send("failed token");
    }
})
// check 

app.delete("/chamsbootcamp/application-details/comment/:id", (request, response) => {
    let token = request.cookies.token;
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(408).redirect("../login");
        }
        if (decoded.email.includes("@gmail.com")) {
            connection.query('SELECT * from `admin` Where email=?', [decoded.email],
                (err, admin) => {
                    if (err) {
                        return response.status(500).send(err)
                    }
                    if (admin.length > 0) {
                        connection.query('DELETE FROM admin_comments WHERE id=?',
                            [request.params.id], (err, results) => {
                                if (err) {
                                    return response.status(500).send(err);
                                }
                                else {
                                    response.status(201).send(results);
                                }

                            })
                    }
                    else {
                        return response.status(401).send("failed to delete");
                    }
                })
        }
    })
})


app.get("/chamsbootcamp/app-deadline", (request, response) => {
    let token = request.cookies.token;
    if (token) {
        jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
            if (err) {
                return response.status(408).redirect("../login");
            }
            if (decoded.email.includes("@gmail.com")) {
                connection.query('SELECT * from `admin` Where email=?', [decoded.email],
                    (err, admin) => {
                        if (err) {

                            return response.status(500).send(err)
                        }
                        if (admin.length > 0) {
                            connection.query('SELECT * from `admin_setting` where id = 1', (err, result) => {
                                if (err) {
                                    return response.status(500).send(err);
                                }
                                response.status(200).send(result);
                            })
                        }
                    })
            }
            else {
                connection.query('SELECT * from `register` Where email=?', [decoded.email],
                    (err, result) => {
                        if (err) {

                            return response.status(500).send(err)
                        }
                        if (result.length > 0) {
                            connection.query('SELECT * from `admin_setting` where id = 1', (err, result1) => {
                                if (err) {
                                    return response.status(500).send(err);
                                }
                                response.status(200).send(result1);
                            })
                        }
                    })
            }

        })
    }
    else {
        return response.status(402).send("token is not valid")
    }

})

app.post("/chamsbootcamp/candidate-application", (request, response) => {
    let token = request.cookies.token;
    if (token) {
        jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {

            if (err) {

                return response.status(408).redirect("../login");
            }

            const { student_id, nationality, nationality_number, date_of_birth, gender,
                unchr_number, marital_status, phone_number, address,
                field_of_study, employment_status, hearing_about_chams, candidate_background,
                programming_available, coding_experience, future_plans,application_date } = request.body;

            if (!student_id || !nationality || !date_of_birth || !gender ||
                !marital_status || !phone_number || !address ||
                !employment_status || !hearing_about_chams || !candidate_background ||
                !programming_available || !coding_experience || !future_plans) {
                response.status(400).send("fill your information");
                return;
            }
            connection.query("SELECT id from register where id = ?", [student_id], (err, result) => {
                if (err) {
                    return response.status(500).send(err)
                }
                connection.query(`INSERT INTO application (student_id,nationality,nationality_number,
                date_of_birth,gender,unchr_number,
                marital_status,phone_number,address,
                field_of_study,employment_status,hearing_about_chams,
                candidate_background,programming_available,coding_experience,future_plans,application_date) values 
                (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [student_id, nationality, nationality_number, date_of_birth, gender,
                        unchr_number, marital_status, phone_number, address,
                        field_of_study, employment_status, hearing_about_chams, candidate_background,
                        programming_available, coding_experience, future_plans, application_date],
                    (err, result) => {
                        if (err) {
                            return response.status(500).send(err);
                        }
                        connection.query("UPDATE `register` SET status_id=1 where id=?",
                        [decoded.id],(err, result) => {
                            if (err) {
                                return response.status(500).send(err);
                            }
                            response.status(200).send(result);
                        })
                        
                    })
            })
        })
    }
    else {
        return response.status(401).send("token is not valid");
    }

})

app.get("/chamsbootcamp/admin-comments/:id", (request, response) => {
    let token = request.cookies.token;
    if (token) {
        jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
            if (err) {
                return response.status(408).redirect("../login");
            }
            if (decoded.email.includes("@gmail.com")) {
                connection.query('SELECT * from `admin` Where email=?', [decoded.email],
                (err, admin) => {
                    if (err) {
                        return response.status(500).send(err)
                    }
                    if (admin.length > 0) {
                        connection.query('SELECT * from `admin_comments` where student_id = ?',[request.params.id], (err, result) => {
                            if (err) {
                                    return response.status(500).send(err);
                                }
                                response.status(200).send(result);
                            })
                        }
                    })
            }
        })
    }
    else {
        response.status(401).send("token is not valid")
    }

})

app.post("/chamsbootcamp/sending-email", (request, response) => {
    let email= request.body.email;
    let idStatus=request.body.id_status;
    console.log(email);
    console.log(idStatus);
    let query = "SELECT * FROM `register` WHERE email=?";
    connection.query(query, email, (err, result) => {
      if (err) {
        return response.status(500).send(err);
      }
      console.log('resu =',result);
      if (result.length > 0) {
        let token = request.cookies.token;
        console.log(token);
        jwt.verify(token, "jsfashlaekhe", function (err, decoded) {
          if (err) {
            return response.status(408).redirect("../login");
          }
          if (decoded.email.includes("@gmail.com")) {
            if (!idStatus || !email) {
              return response.status(400).send("fill information");
            }
              console.log(decoded.email);
              connection.query("SELECT * from `admin` Where email=?", [decoded.email], (err, admin) => {
                if (err) {
                  return response.status(500).send(err);
                }
                if (admin.length > 0) {
                  // sending email
                  console.log(admin.length);
                  console.log('id =',idStatus);
                  connection.query("SELECT * FROM `content_of_email` WHERE status_id=?", [idStatus],
                  (err, result1) => {
                    if (err) {
                      return response.status(500).send(err);
                    }else{
                      if (result1.length > 0) {
                        sendEmail1(email, result1[0].subject, result1[0].text_email);
                        console.log('re = ',result1);
                        return response.status(200).send("success");
                      }
                      else {
                        return response.status(402).send("this status dosent has any email");
                      }
                    }
                    })
                }
                else {
                  return response.status(401).send("failed to update");
                }
              });
          } else {
            return response.status(404).send("admin is not exist");
          }
        });
      }
      else{
      }
      return response.status(404).send("candidate is not exist");
    });
});

app.get("/get-assignments/:id", (request, response) => {
    let token = request.cookies.token;
    if (token) {
        jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
            if (err) {
                return response.status(408).redirect("../login");
            }
            if (decoded.email.includes("@gmail.com")) {
                connection.query('SELECT * from `admin` Where email=?', [decoded.email],
                (err, admin) => {
                    if (err) {
                        return response.status(500).send(err)
                    }
                    if (admin.length > 0) {
                        connection.query('SELECT assignment from `application` where student_id = ?',[request.params.id], (err, result) => {
                            if (err) {
                                    return response.status(500).send(err);
                                }
                                console.log('result = ',result[0]);
                                response.status(200).send(result);
                            })
                        }
                    })
            }
        })
    }
    else {
        response.status(401).send("token is not valid")
    }

})


app.get("/logout", (request, response) => {
    response.cookie(`token`, ``, { maxAge: 1 });
    response.redirect("../login");

})

app.get("/candidate-assignment", (request, response) => {
    let token = request.cookies.token;
    if (token) {
        jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
            if (err) {
                return response.status(401).redirect("../login");
            }
            connection.query("select assignment FROM application WHERE student_id = ?", [decoded.id],
                (err, result) => {
                    if (err) {
                        response.status(500).send(err);
                        return;
                    }
                    response.status(200).send(result);
                })
        })
    }
})

app.get("/candidatestatus", (request, response) => {
    let token = request.cookies.token;
    if (token) {
        jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
            if (err) {
                // return response.status(401).redirect("../login");
                return response.status(500).send("failed token")
            }
            connection.query(`
            select statuses.status,application.assignment FROM register 
            left join statuses on
            register.status_id = statuses.id
            left join application on
            register.id = application.student_id 
            WHERE register.id = ?
            `, [decoded.id],
                (err, result) => {
                    if (err) {
                        response.status(500).send(err);
                        return;
                    }
                    response.status(200).send(result);
                })
        })
    }
})

app.get("/chamsbootcamp/admin-email", (request, response) => {
    let token = request.cookies.token;
    if (token) {
        jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
            if (err) {
                return response.status(408).redirect("../login");
            }
            if (decoded.email.includes("@gmail.com")) {
                connection.query('SELECT * from `admin` Where email=?', [decoded.email],
                    (err, admin) => {
                        if (err) {
                            return response.status(500).send(err)
                        }
                        if (admin.length > 0) {
                            connection.query('SELECT email from `admin_setting` where id = 1', (err, result) => {
                                if (err) {
                                    return response.status(500).send(err);
                                }
                                response.status(200).send(result);
                            })
                        }
                    })
            }
        })
    }
    else {
        response.status(401).redirect("token is not valid")
    }

})

app.get("/chamsbootcamp/emails", (request, response) => {
    let token = request.cookies.token;
    if (token) {
        jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
            if (err) {
                return response.status(408).redirect("../login");
            }
            if (decoded.email.includes("@gmail.com")) {
                connection.query('SELECT * from `admin` Where email=?', [decoded.email],
                    (err, admin) => {
                        if (err) {
                            return response.status(500).send(err)
                        }
                        if (admin.length > 0) {
                            connection.query('SELECT * from `content_of_email`', (err, result) => {
                                if (err) {
                                    return response.status(500).send(err);
                                }
                                response.status(200).send(result);
                            })
                        }
                    })
            }
        })
    }
    else {
        response.status(401).redirect("token is not valid")
    }

})


// rendering each page is under this line
app.get("/login", (req, res) => {
    res.render('login');
});

app.get("/register", (req, res) => {
    res.render('register');
});


app.get("/passwordreset", (request, response) => {
    response.cookie("token", request.query.token, { httpOnly: true });
    const token = request.query.token;

    if (token === 'null' || !token) {
        return response.status(401).redirect("../recovery-password");
    }

    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(408).redirect("../recovery-password");
        }
        response.status(200).render("reset-password");
    });
});

app.get("/candidate-dashboard", (request, response) => {
    let token = request.cookies.token;

    if (token === 'null' || !token) {
        return response.status(401).redirect("../login");
    }
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(401).redirect("../login");
        }
        connection.query("SELECT email,status_id from `register` where id = ?", [decoded.id],
            (err, result) => {
                if (err) {
                    response.status(500).send(err);
                    return;
                }
                
                else if (result.length == 0) {
                    return response.status(402).redirect("../login");
                }
                else if (result[0].status_id != 6){
                    return response.status(200).render("candidate-dashboard");
                }
                return response.status(200).redirect("../application-page")
            })
    })
});

app.get("/application-page", (request, response) => {
    let token = request.cookies.token;

    if (token === 'null' || !token) {
        return response.status(401).redirect("../login");
    }
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(401).redirect("../login");
        }
        connection.query("SELECT email,status_id from `register` where email = ?", [decoded.email],
            (err, result) => {
                if (err) {
                    response.status(500).send(err);
                    return;
                }
                else if (result.length == 0) {
                    return response.status(402).redirect("../login");
                }
                else if (result[0].status_id == 6) {
                    return response.status(200).render("application");
                }
                return response.status(200).redirect("../candidate-dashboard");
            })
    })
});

// testing router
app.get("/putcookie", (request, response) => {
    
    response.send("do")
})
// the end of the testing router

app.get("/admin-dashboard", (request, response) => {
    let token = request.cookies.token;

    if (token === 'null' || !token) {
        return response.status(401).redirect("../login");
    }
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(401).redirect("../login");
        }
        if (decoded.email.includes("@gmail.com")) {
            connection.query("SELECT email from `admin` where email = ?", [decoded.email],
                (err, result) => {
                    if (err) {
                        response.status(500).send(err);
                        return;
                    }
                    if (result.length == 0) {
                        return response.status(402).redirect("../login");
                    }
                    response.status(200).render("admin-dashboard");
                })
        }
        else {
            response.status(404).redirect("../login");
        }
    })
});

app.get("/email-templates", (request, response) => {
    let token = request.cookies.token;

    if (token === 'null' || !token) {
        return response.status(401).redirect("../login");
    }
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(401).redirect("../login");
        }
        if (decoded.email.includes("@gmail.com")) {
            connection.query("SELECT email from `admin` where email = ?", [decoded.email],
                (err, result) => {
                    if (err) {
                        response.status(500).send(err);
                        return;
                    }
                    if (result.length == 0) {
                        return response.status(402).redirect("../login");
                    }
                    response.status(200).render("email-templates");
                })
        }
        else {
            response.status(404).redirect("../login");
        }
    })
});


app.get("/admin-settings", (request, response) => {
    let token = request.cookies.token;

    if (token === 'null' || !token) {
        return response.status(401).redirect("../login");
    }
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(401).redirect("../login");
        }
        if (decoded.email.includes("@gmail.com")) {
            connection.query("SELECT email from `admin` where email = ?", [decoded.email],
                (err, result) => {
                    if (err) {
                        response.status(500).send(err);
                        return;
                    }
                    if (result.length == 0) {
                        return response.status(402).redirect("../login");
                    }
                    // connection.query("SELECT * FROM `admin_setting` WHERE id=1",err,result=>{
                    //     if (err) {
                    //         response.status(500).send(err);
                    //         return;
                    //     }
                    //     response.status(200).send(result).render("admin-settings");
                    // })
                    response.status(200).render("admin-settings");
                })
        }
        else {
            response.status(404).redirect("../login");
        }
    })
});

app.get("/admin-user", (request, response) => {
    let token = request.cookies.token;

    if (token === 'null' || !token) {
        return response.status(401).redirect("../login");
    }
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(401).redirect("../login");
        }
        if (decoded.email.includes("@gmail.com")) {
            connection.query("SELECT email from `admin` where email = ?", [decoded.email],
                (err, result) => {
                    if (err) {
                        response.status(500).send(err);
                        return;
                    }
                    if (result.length == 0) {
                        return response.status(402).redirect("../login");
                    }
                    response.status(200).render("user-page");
                })
        }
        else {
            response.status(404).redirect("../login");
        }
    })
});

app.get("/admin-application-details", (request, response) => {
    let token = request.cookies.token;

    if (token === 'null' || !token) {
        return response.status(401).redirect("../login");
    }
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(401).redirect("../login");
        }
        if (decoded.email.includes("@gmail.com")) {
            connection.query("SELECT email from `admin` where email = ?", [decoded.email],
                (err, result) => {
                    if (err) {
                        response.status(500).send(err);
                        return;
                    }
                    if (result.length == 0) {
                        return response.status(402).redirect("../login");
                    }
                    response.status(200).render("admin-application-details");
                })
        }
        else {
            response.status(404).redirect("../login");
        }
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
