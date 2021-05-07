const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const csvtojsonV2 = require('csvtojson');

function resolveCwd(...args) {
  args.unshift(process.cwd());
  return path.join(...args);
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, resolveCwd('/app/uploads'));
  },
  filename(req, file, cb) {
    console.log('file', file);
    cb(null,`${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const app = express();

app.use(upload.any()); // 任何

app.use(cors());
// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const extractCsv = path => new Promise((resolve, reject) => {
  csvtojsonV2()
    .fromFile(path)
    .then(messageList => {
      console.log('messageList', messageList);
      resolve(messageList);
    })
    .catch(error => {
      console.log(error.toString().red);
      reject(error);
    });
});

app.post('/parseData', upload.single('csv'), async(req, res) => {
  const list = await extractCsv(req.files[0].path);
  const resultList = list.map(({ key, zhValue, enValue }) => ({ key, zhValue, enValue }));
  res.json({ body: { list: resultList }, header: { code: '0000' } });
});

app.post('/toCSV', (req, res) => {
  console.log('req', req.body);

  res.json({ body: { list: [] }, header: { code: '0000' } });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
