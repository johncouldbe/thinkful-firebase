const functions = require('firebase-functions');
const express   = require('express')
const cors      = require('cors')
const sgMail    = require('@sendgrid/mail');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
let app = express();

app.use(cors());

app.post('/finished', (req, res) => {

sgMail.setApiKey(functions.config().sendgrid.key);

const credentials = req.body.data.credentials
const profile = req.body.data.prof

const text = `Hello Aaron,
${credentials.firstName} ${credentials.lastName} has finished filling out their profile.
Their email address is: ${credentials.email}, their phone number is: ${credentials.phone}.
linkedIn: ${profile.linkedIn},
location: ${profile.location},
experience coding: ${profile.experience},
goal: ${profile.goal},
what we should know: : ${profile.shouldKnow},
How did they hear about us: ${profile.how}.
`

const htmltext = `Hello Aaron,<br /><br />

<strong>${credentials.firstName} ${credentials.lastName}</strong> has finished filling out their profile.<br /><br />
Their email address is: ${credentials.email}, their phone number is: ${credentials.phone}.<br /><br />
<strong>linkedIn</strong>: ${profile.linkedIn},<br />
<strong>location</strong>: ${profile.location},<br />
<strong>experience coding</strong>: ${profile.experience},<br />
<strong>goal</strong>: ${profile.goal},<br />
<strong>what we should know</strong>: ${profile.shouldKnow},<br />
<strong>How did they hear about us</strong>: ${profile.how}.`

const msg = {
  to: 'aaron.lamphere@thinkful.com',
  from: 'profilecomplete@thinkful.com',
  subject: `${credentials.firstName} ${credentials.lastName} Has Finished Their Profile`,
  text: text,
  html: htmltext,
};
sgMail.send(msg);
res.send(200)
});

// ================================
// ================================
// ================================
// ================================
// ================================

app.post('/login', (req, res) => {
  sgMail.setApiKey(functions.config().sendgrid.key);
  const credentials = req.body.data.credentials
  const channel = req.body.data.channel

  const text = `Hello,
  From channel ${channel}.
  New sign up by ${credentials.fullName}.
  Their email address is: ${credentials.email}
  Their phone number is: ${credentials.phone}
  Their location is: ${credentials.location}`

  const htmltext = `Hello,<br /><br />
  From channel ${channel}.<br /><br />
  New sign up by <strong>${credentials.fullName}</strong>.<br /><br />
  Their <strong>email address</strong> is: ${credentials.email}<br /><br />
  Their phone number is: ${credentials.phone}<br /><br />
  Their location is: ${credentials.location}`

  const msg = {
    to: 'trialweb@thinkful.com',
    from: 'newsignup@thinkful.com',
    subject: `${credentials.fullName} Has Created a Login`,
    text: text,
    html: htmltext,
  };

  sgMail.send(msg);
  res.send(200)
})

app.post('/scheduled', (req, res) => {

  sgMail.setApiKey(functions.config().sendgrid.key);
  const credentials = req.body.data.credentials
  const time = req.body.data.time
  const channel = req.body.data.channel

  //MSG TO AARON
  const text = `Hello,
  From channel ${channel}.
  ${credentials.fullName} has scheduled a time.
  They would like to meet on ${time.parent} at ${time.time}`

  const htmltext = `Hello,<br /><br />
  From channel ${channel}.<br /><br />
  <strong>${credentials.fullName}</strong> has scheduled a time.<br /><br />
  They would like to meet on ${time.parent} at ${time.time}.`

  const msg = {
    to: 'trialweb@thinkful.com',
    from: 'newscheduled@thinkful.com',
    subject: `${credentials.fullName} Has Scheduled a Session`,
    text: text,
    html: htmltext,
  };

  sgMail.send(msg);

  //MSG TO SIGNEE
  const text2 = `Hello ${credentials.fullName},

  Thank you for signing up for the 2-week Web Development Fundamental Trial with Thinkful [http://www.thinkful.com/]. My name is Aaron and I’ll be your Program Manager during your trial period. Your account will be ready for you 48 hours before your orientation session and a notification will be sent to you. Your username will be ${credentials.email} and password will be "Thinkful18!". On ${time.parent}  at ${time.time} we'll get together via videochat to go over the course, dashboard and resources for the 2-week trial.

  In the meantime let's review your experience in the 2-week trial. During the trial you get access to the first sequence of the Full Stack Flex course [https://www.thinkful.com/bootcamp/web-development/flexible/]. This sequence teaches you the Fundamentals of Web Development which covers HTML, CSS, JavaScript & jQuery.

  You’ll work directly through our student platform. Here you’ll be able to find the course material and resources such as live group mentoring sessions.  Here students get a chance join online Q&As, workshops and info sessions. Lastly you’ll also be added to thinkful-students Slack group where you’ll find all kinds of like minded people somewhere along their coding journey.

  While you wait around for your account to be set up check out stacktrends.io to see latest trends in programming and read here [https://medium.com/newsonthebloc/how-to-succeed-in-an-online-coding-program-9e3e8b8a8b83] how to learn online effectively. If you have any questions please feel free to reach out.


  Happy Coding,
  Aaron
`

  const htmltext2 = `Hello ${credentials.fullName},<br /><br />

  Thank you for signing up for the 2-week Web Development Fundamental Trial with <a href="http://www.thinkful.com/" target="_blank">Thinkful</a>. My name is Aaron and I’ll be your Program Manager during your trial period. Your account will be ready for you 48 hours before your orientation session and a notification will be sent to you. Your username will be ${credentials.email} and password will be "Thinkful18!". On ${time.parent}  at ${time.time} we'll get together via videochat to go over the course, dashboard and resources for the 2-week trial. <br /><br />

  In the meantime let's review your experience in the 2-week trial. During the trial you get access to the first sequence of the <a href="https://www.thinkful.com/bootcamp/web-development/flexible/" target="_blank">Full Stack Flex</a> course. This sequence teaches you the Fundamentals of Web Development which covers HTML, CSS, JavaScript & jQuery.<br /><br />

  You’ll work directly through our student platform. Here you’ll be able to find the course material and resources such as live group mentoring sessions.  Here students get a chance join online Q&As, workshops and info sessions. Lastly you’ll also be added to thinkful-students Slack group where you’ll find all kinds of like minded people somewhere along their coding journey.<br /><br />

  While you wait around for your account to be set up check out <a href="http://www.stacktrends.io/overview" target="_blank">stacktrends.io</a> to see latest trends in programming and <a href="https://medium.com/newsonthebloc/how-to-succeed-in-an-online-coding-program-9e3e8b8a8b83" target="_blank">read here</a> how to learn online effectively. If you have any questions please feel free to reach out.<br /><br /><br />

Happy Coding,<br />
Aaron`
  const msg2 = {
    to: `${credentials.email}`,
    from: 'aaron.lamphere@thinkful.com',
    subject: `${credentials.fullName}, thank you for signing up!`,
    text: text2,
    html: htmltext2,
  };
  sgMail.send(msg2);
  res.send(200)
});


exports.sendgrid = functions.https.onRequest(app);
