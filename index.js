/**
 * @param {number} value
 * @returns {string}
 */
function pad(value) {
  return String(value).padStart(2, '0');
}


class CountdownTimer {
  /**
   * 
   *
   * @param {object} options 
   * @param {string} options.selector 
   * @param {Date} options.targetDate 
   */
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = this.getRefs(selector);
    this.intervalId = null;

    this.start();
  }

  /**
   * 
   *
   * @param {string} rootSelector
   * @returns {object} 
   */
  getRefs(rootSelector) {
    const rootEl = document.querySelector(rootSelector);
    const refs = {
      days: rootEl.querySelector('[data-value="days"]'),
      hours: rootEl.querySelector('[data-value="hours"]'),
      mins: rootEl.querySelector('[data-value="mins"]'),
      secs: rootEl.querySelector('[data-value="secs"]'),
    };
    return refs;
  }
    /**
   *
   * @param {number} time 
   */
  updateTimer(time) {
    if (time < 0) {
      this.stop();
      this.displayFinalState();
      return;
    }

    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    this.refs.days.textContent = days;
    this.refs.hours.textContent = pad(hours);
    this.refs.mins.textContent = pad(mins);
    this.refs.secs.textContent = pad(secs);
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const timeRemaining = this.targetDate.getTime() - currentTime;
      this.updateTimer(timeRemaining);
    }, 1000);
    const initialTime = this.targetDate.getTime() - Date.now();
    this.updateTimer(initialTime);
  }
  stop() {
    clearInterval(this.intervalId);
  }

  displayFinalState() {
    this.refs.days.textContent = '0';
    this.refs.hours.textContent = '00';
    this.refs.mins.textContent = '00';
    this.refs.secs.textContent = '00';
  }
}