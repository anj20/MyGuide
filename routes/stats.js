const fs = require('fs');
const getUsageData = require('../helpers/getUsageData');
const router = require('express').Router();

/* Graphing and stats Routes */

router.get('/', (req, res) => {
  res.redirect('/stats/usage');
});
router.get('/usage', (req, res) => {
  res.render('stats-graphUsage', { page: 'usage' });
});
router.get('/repeatUsers', (req, res) => {
  // res.send('Test');
  res.render('stats-graphRepeats', { page: 'repeatUsers' });
});

router.get('/usageData', (req, res) => {
  // set default params
  let increment = req.query.increment || 'month';
  if (!req.query.startDate) {
    req.query.startDate = '2021-09-02';
  }

  // get data
  data = getUsageData();
  let usageReport = require('../helpers/reportUsage');
  let stats = usageReport(data, increment, req.query);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(stats));
});

router.get('/subjectData', (req, res) => {
  data = getUsageData();
  let getSubjectStats = require('../helpers/getSubjectStats');
  let stats = getSubjectStats(data, req.query);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ stats }));
});

router.get('/subjects', (req, res) => {
  res.render('stats-graphSubjects', { page: 'subjectGraph' });
});

router.get('/repeatData', async (req, res) => {
  data = getUsageData();
  let repeatUsers = require('../helpers/getRepeatUsers');
  let repeatData = repeatUsers(data, req.query);

  // let allSummary = repeatUsers(data, {
  //   startDate: '2021-09-02',
  //   breakpoint: 10,
  // });
  // let facSummary = repeatUsers(data, {
  //   population: 'faculty',
  //   startDate: '2021-09-02',
  // });
  // let staffSummary = repeatUsers(data, {
  //   population: 'staff',
  //   startDate: '2021-09-02',
  // });
  // let stuSummary = repeatUsers(data, {
  //   population: 'student',
  //   startDate: '2021-09-02',
  // });
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      repeatData,
      // student: stuSummary,
      // faculty: facSummary,
      // staff: staffSummary,
      // all: allSummary,
    })
  );
});

module.exports = router;
