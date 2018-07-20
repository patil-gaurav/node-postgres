const faker = require('faker');

var usersArray = [];

for (var i = 1; i <= 5; i++) {
  var user = {};

  user['email'] = faker.internet.email();
  user['password'] = '123456';
  user['firstName'] = faker.name.firstName();
  user['lastName'] = faker.name.lastName();
  user['gender'] = ['male', 'female'][Math.floor(Math.random() * ['male', 'female'].length)];
  user['country'] = 'India';
  user['state'] = 'Maharashtra';
  user['pincode'] = Math.floor(100000 + Math.random() * 900000);
  user['isConfirmed'] = true;
  user['educationDetail'] = {};
  // user['educationDetail']['marks'] = generateMarks(20, 40);
  var smks = generateSSCMarks();
  
  user['educationDetail']['sscMarksTotal'] = smks.total;
  user['educationDetail']['sscMarksOutof'] = smks.outoff;
  user['educationDetail']['sscPercentage'] = smks.percentage;
  // user['educationDetail']['sscPassingYear']

  var hmks = generateHSCMarks();
  user['educationDetail']['hscPhysics'] = hmks.phy
  user['educationDetail']['hscChemistry'] = hmks.che
  user['educationDetail']['hscMathematics'] = hmks.mth
  user['educationDetail']['hscBiology'] = hmks.bio
  user['educationDetail']['hscMarksTotal'] = hmks.total
  user['educationDetail']['hscMarksOutof'] = hmks.outoff
  user['educationDetail']['hscPercentage'] = hmks.percentage
  // user['educationDetail']['hscPassingYear']

  var cmks = generateCETMarks();
  user['educationDetail']['cetPhysics'] = cmks.phy
  user['educationDetail']['cetChemistry'] = cmks.che
  user['educationDetail']['cetMathematics'] = cmks.mth
  user['educationDetail']['cetBiology'] = cmks.bio
  user['educationDetail']['cetPCMMarksTotal'] = cmks.pcm
  user['educationDetail']['cetPCBMarksTotal'] = cmks.pcb
  user['educationDetail']['cetMarksOutof'] = cmks.outoff
  // user['educationDetail']['cetPassingYear']

  usersArray.push(user);
}
for (var j = 0; j < usersArray.length; j++) {
  console.log(usersArray[j]);
}

function generateMarks(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generateSSCMarks() {
  var sscTotal = generateMarks(350, 550);
  var sscPercentage = parseFloat(((sscTotal/600) * 100).toFixed(2));
  return { total: sscTotal, percentage: sscPercentage, outoff: 600 }
}

function generateHSCMarks() {
  var phy = generateMarks(45, 70);
  var che = generateMarks(55, 75);
  var mth = generateMarks(50, 75);
  var bio = generateMarks(45, 80);

  var total = phy + che + mth + bio + 150;
  var hscPercentage = parseFloat(((total/600) * 100).toFixed(2));
  return { total: total, percentage: hscPercentage, outoff: 600, phy: phy, che: che, mth: mth, bio: bio }
}

function generateCETMarks() {
  var phy = generateMarks(10, 40);
  var che = generateMarks(10, 40);
  var mth = generateMarks(20, 60);
  var bio = generateMarks(20, 70);

  var pcm = phy + che + mth;
  var pcb = phy + che + bio;
  return { pcm: pcm, pcb: pcb, outoff: 200, phy: phy, che: che, mth: mth, bio: bio }
}

