export default class TimeoutError {
  constructor() {
    Error.call(this);
    this.stack = Error().stack;
    this.message = 'Timeout';
  }
}
