/* eslint-disable no-restricted-syntax */
import express from 'express';
import isFuction from 'lodash/isFunction';
import colors from 'colors';
import React from 'react';
import cors from 'cors';
import ReactDOMServer from 'react-dom/server';
import ApiList from './ApiList';
import mockEnum from '../index';

const mockUrlConfig = {
  port: 4001,
  host: 'localhost'
};

const { port, host } = mockUrlConfig;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const apiListData = [];

// eslint-disable-next-line guard-for-in
for(const key in mockEnum){
  const [ method, api, title ] = key.split(' ');
  const mockReq = mockEnum[key];
  let callback = function(_req, res){
    res.json(mockReq);
  };
  if (isFuction(mockReq)){
    callback = mockReq;
  }
  apiListData.push({ method, api, title });
  app[method.toLowerCase()](api, callback);
}

app.get('/', (res, req) => {
  req.send(ReactDOMServer.renderToString(<ApiList apiListData={apiListData} />));
});

app.listen(port, host, () => {
  console.log(colors.random('mock host:\n'));
  console.log(colors.green(`http://${host}:${port}!`));
});
