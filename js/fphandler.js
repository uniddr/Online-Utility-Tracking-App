const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const Client_Id = '303128577902-l890bun9s67um4qdik7sa75ccbu0e05k.apps.googleusercontent.com';
const Client_Secret = 'idq2b-HUR_gc0OyUP_CyAPv6';
const Redirect_Uri = 'https://developers.google.com/oauthplayground';
const Refresh_Token = '1//044kldLvIxLBlCgYIARAAGAQSNwF-L9Ir2H2s108SIS1VSwm-L8yVBBYmx79U5lkEpjXKYIzVEsXcMRfPjnymyHzSH003OZz9yuY'; 
//the above value might need to be renewed after certain periods
const oauth2client = new google.auth.OAuth2(Client_Id, Client_Secret, Redirect_Uri);
oauth2client.setCredentials({ refresh_token : Refresh_Token });

async function sendmail(emailaddress, pass)
{
    try{
        const Access_Token = await oauth2client.getAccessToken();

        const transporter = nodemailer.createTransport(
            {
                service : 'gmail',
                auth : {
                    type : 'OAuth2',
                    user : 'ddrtestingapp@gmail.com',
                    clientId : Client_Id,
                    clientSecret : Client_Secret,
                    refreshToken : Refresh_Token,
                    accessToken : Access_Token
                }
            }
        );
        const mail_info = {
            from : 'UtilityTracker✨ <ddrtestingapp@gmail.com>',
            to : emailaddress,
            subject : 'Your Request For Password',
            text : `Here's your password: ${pass}. Use this to login`,
            html : `Here's your password: <h3>${pass}</h3>Use this to login`
        };
        console.log('Wait....')
        const rs = await transporter.sendMail(mail_info);
        return rs;
    } catch(error) {
        return error;
    }
}

module.exports = sendmail;