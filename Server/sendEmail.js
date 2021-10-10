const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { connection } = require('./connection');
const { response } = require('express');

// const {getemailsetting}=require('./server')


// console.log(getemailsetting);

const sendEmail = async (email, subject, payload, emailTemplates) => {
    try {
        // create reusable transporter object using the default SMTP transport
        let email1, password;
        connection.query("SELECT * FROM `admin_setting` WHERE id=1",
            (err, result1) => {
                console.log("testing result1 for reset ");
                if (err) {
                    return err;

                }
                email1 = result1[0].email;
                password = result1[0].password;
                const transporter = nodemailer.createTransport({
                    host: 'mail.gmx.com',
                    auth: {
                        user: email1,
                        pass: password
                    },
                });
                const source = fs.readFileSync(path.join(__dirname, emailTemplates), "utf8");
                const compiledTemplate = handlebars.compile(source);
                const options = () => {
                    return {
                        from: email1,
                        to: email,
                        subject: subject,
                        html: compiledTemplate(payload),
                    };
                };
                transporter.sendMail(options(), (error, info) => {

                    if (error) {
                        console.log(error);
                        return error;
                    } else {
                        console.log("info ", info);
                        return info;
                    }
                });

            })
    } catch (error) {
        return error;
    }
};

// send email 2


const sendEmail2 = async (email, subject, payload, emailTemplates) => {
    try {
        // create reusable transporter object using the default SMTP transport
        let email1, password;
        connection.query("SELECT * FROM `admin_setting` WHERE id=1",
            (err, result1) => {
                console.log("testing result1 for reset ");
                if (err) {
                    return err;

                }
                email1 = result1[0].email;
                password = result1[0].password;
                const transporter = nodemailer.createTransport({
                    host: 'mail.gmx.com',
                    auth: {
                        user: email1,
                        pass: password
                    },
                });
                const source = fs.readFileSync(path.join(__dirname, emailTemplates), "utf8");
                const compiledTemplate = handlebars.compile(source);
                const options = () => {
                    return {
                        from: email1,
                        to: email,
                        subject: subject,
                        html: compiledTemplate(payload),
                    };
                };
                transporter.sendMail(options(), (error, info) => {

                    if (error) {
                        console.log(error);
                        return error;
                    } else {
                        console.log("info ", info);
                        return info;
                    }
                });

            })
    } catch (error) {
        return error;
    }
};

// ending of sending email 2

const sendEmail1 = async (email, subject, payload) => {
    try {
        // create reusable transporter object using the default SMTP transport
        let email1, password;
        console.log("testing from mail");
        connection.query("SELECT * FROM `admin_setting` WHERE id=1",
            (err, result1) => {
                console.log("testing result1");
                if (err) {
                    return err;
                }
                email1 = result1[0].email;
                password = result1[0].password;
                const transporter = nodemailer.createTransport({
                    host: 'mail.gmx.com',
                    auth: {
                        user: email1,
                        pass: password
                    },
                });

                const options = () => {
                    return {
                        from: email1,
                        to: email,
                        subject: subject,
                        html: payload,
                    };
                };
                transporter.sendMail(options(), (error, info) => {
                    if (error) {
                        console.log(error);
                        return error;
                    } else {
                        console.log("info ", info);
                        return info;
                    }
                });

            })


    } catch (error) {
        return error;
    }
};
module.exports = { sendEmail, sendEmail1, sendEmail2};