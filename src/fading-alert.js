class FadingAlert {
  constructor(styleObj = {}) {
    this.div = document.getElementById('alertBoxDiv');

    if (!this.div) {
      this.div = document.createElement('div');
      this.div.id = 'alertBoxDiv';

      this.div.style.opacity = 0;
      this.div.style.pointerEvents = 'none';
      this.div.style.transition = 'none';

      document.body.appendChild(this.div);
    }
    
    this.textEl = this.div.querySelector('.fading-alert-text');
    if (!this.textEl) {
      this.textEl = document.createElement('span');
      this.textEl.className = 'fading-alert-text';
      this.div.appendChild(this.textEl);
    }

    const s = this.div.style;
    Object.assign(s, styleObj);

    s.position ||= 'fixed';
    s.top ||= '25%';
    if (!s.left) {
      s.left = '50%';
      s.transform ||= 'translateX(-50%)';
    }
    s.width ||= '250px';
    s.textAlign ||= 'center';
    s.padding ||= '2px';
    s.color ||= 'black';
    s.backgroundColor ||= 'pink';
    s.border ||= '0';
    s.overflow = 'hidden';
    s.wordBreak ||= 'break-word';
    s.whiteSpace ||= 'normal';

    this.div.addEventListener('click', () => {
      this.fadeOut();
    });
  }

  log_(func = console.log, ...txt) {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    if (this.spinnerEl) {
      this.spinnerEl.textContent = '';
    }

    if (txt.length === 0 || !txt[0]) {
      if (this.div.style.opacity == 1) this.fadeOut();
    } else {
      this.textEl.textContent = txt.join(' ');
      this.div.style.transition = '';
      this.div.style.opacity = 1;
      this.div.style.pointerEvents = 'auto';
      func(...txt);
    }
  }

  log(...txt) {
    this.log_(console.log, ...txt);
  }

  show(...txt) {
    this.log_(() => {},    ...txt);
  }

  spin(...txt) {
    this.log_(console.log, ...txt);

    this.spinnerEl ||= this.div.querySelector('.fading-alert-spinner');
    if (!this.spinnerEl) {
      this.spinnerEl = document.createElement('span');
      this.spinnerEl.className = 'fading-alert-spinner';
      this.spinnerEl.style.fontFamily = "'Courier New', monospace";
      this.spinnerEl.style.marginLeft = '8px';
      this.div.appendChild(this.spinnerEl);
    }

    const spinner = ['|', '/', '-', '\\'];
    let i = 0;

    this.spinnerEl.textContent = spinner[0];

    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.spinnerEl.textContent = spinner[i++ % spinner.length];
    }, 100);
  }

  fadeOut() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    if (this.spinnerEl) {
      this.spinnerEl.textContent = '';
    }

    this.div.style.transition = '';
    this.div.style.opacity = 1;

    void this.div.offsetWidth;  //강제 reflow

    this.div.style.transition = 'opacity 3s ease-in';
    this.div.style.opacity = 0;
    this.div.style.pointerEvents = 'none';

    const onEnd = (e) => {
      this.textEl.textContent = '';
      this.div.style.transition = '';
    };

    this.div.addEventListener('transitionend', onEnd, { once: true });
  }
}
