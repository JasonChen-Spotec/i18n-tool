import resolveCwd  from './resolveCwd';

const entry = {
  index: [
    "core-js/stable",
    "regenerator-runtime/runtime",
    resolveCwd('src/index.jsx')
  ],
}

export default entry;
