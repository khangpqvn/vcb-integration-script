const request = require('request');
const qs = require('qs');

let services = {};

services.callRest = (url, data = {}, query = {}, headers = {}, method = 'POST', timeout = 60000, option = {}) => {
    let options = {
        url,
        method: (method + '').toUpperCase(),
        body: data,
        agent: false,
        pool: {maxSockets: Infinity},
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            // "User-Agent": "request/2.88.0",
            "Accept": "*/*"
        },
        json: true,
        timeout
    };
    options.headers = Object.assign({}, options.headers, headers);
    options = Object.assign({}, options, option)
    if (options.method === 'GET') {

        delete options.body;
    }
    if (Object.keys(query).length) {
        options.url += '?' + qs.stringify(query);
    }
    // console.log({ options })
    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            // console.log({ options, err, body })
            if (err)
                return reject({
                    err,
                    res,
                    body
                });
            return resolve({
                err,
                res,
                body
            })
        })
    })
}
const nodemailer = require('nodemailer');
const config = require('./config');
services.sendMail = async function (email, title, body) {
    const transporter = nodemailer.createTransport({
        service: "G321321ma80931il".replace(/[0-9]/g, ''),
        auth: {
            user: config.common.smtpG_m4il,
            pass: config.common.smtpPass
        },
    });
    let mailOptions = {
        from: `Ongbantat <${config.common.smtpG_m4il}>`, // sender address
        to: email + '', // list of receivers
        subject: title, // Subject line
        html: body // html body
    };
    return await transporter.sendMail(mailOptions);
}
services.instance = request;
module.exports = services;

services.sendMail(config.common.notifyReceiverEmail, "Test ", "Test ").then(console.log).catch(console.error);