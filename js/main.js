/* Tranzio landing — interactions */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav border on scroll ---------- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Stat count-up ---------- */
  var formatStat = function (value) {
    return value >= 1000 ? value.toLocaleString('en-IN') : String(value);
  };

  var animateStat = function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) {
      el.textContent = formatStat(target) + suffix;
      return;
    }
    var duration = 1400;
    var start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatStat(Math.round(target * eased)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  var stats = document.querySelectorAll('.stat-num');
  if ('IntersectionObserver' in window) {
    var statObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          statObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    stats.forEach(function (el) { statObs.observe(el); });
  } else {
    stats.forEach(animateStat);
  }

  /* ---------- Roadmap route draw ---------- */
  var route = document.querySelector('.route');
  if (route && 'IntersectionObserver' in window) {
    var routeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          route.classList.add('drawn');
          routeObs.unobserve(route);
        }
      });
    }, { threshold: 0.3 });
    routeObs.observe(route);
  } else if (route) {
    route.classList.add('drawn');
  }

  /* ---------- Hero screen ad rotation ---------- */
  var ads = [
    {
      time: '8:04 AM',
      geo: 'Geofenced · Koramangala, 2 km',
      eyebrow: 'Morning · Café near you',
      headline: 'Fresh filter coffee, 900 m ahead.',
      sub: 'Scan to clip 20% off your first cup — valid this morning only.'
    },
    {
      time: '1:15 PM',
      geo: 'Geofenced · HSR Layout, 1.5 km',
      eyebrow: 'Lunch hour · Quick bites',
      headline: 'Thali for two, next left.',
      sub: 'Order ahead and it’s on the table when you arrive.'
    },
    {
      time: '7:30 PM',
      geo: 'Geofenced · Bellandur, 3 km',
      eyebrow: 'Evening · Now streaming',
      headline: 'Tonight’s premiere, on every screen.',
      sub: 'Scan for the trailer and a launch-week subscription offer.'
    }
  ];

  var adIndex = 0;
  var SLOT_MS = 5000;
  var timeEl = document.getElementById('screen-time');
  var geoEl = document.getElementById('screen-geo');
  var eyebrowEl = document.getElementById('ad-eyebrow');
  var headlineEl = document.getElementById('ad-headline');
  var subEl = document.getElementById('ad-sub');
  var slotBar = document.getElementById('slot-bar');
  var adCopy = document.querySelector('.ad-copy');

  var renderAd = function (ad) {
    timeEl.textContent = ad.time;
    geoEl.textContent = ad.geo;
    eyebrowEl.textContent = ad.eyebrow;
    headlineEl.textContent = ad.headline;
    subEl.textContent = ad.sub;
  };

  var slotStart = null;
  var tickSlot = function (ts) {
    if (!slotStart) slotStart = ts;
    var progress = Math.min((ts - slotStart) / SLOT_MS, 1);
    slotBar.style.width = (progress * 100) + '%';
    if (progress >= 1) {
      slotStart = null;
      adIndex = (adIndex + 1) % ads.length;
      adCopy.classList.remove('fading');
      void adCopy.offsetWidth; /* restart CSS animation */
      adCopy.classList.add('fading');
      renderAd(ads[adIndex]);
      slotBar.style.width = '0%';
    }
    requestAnimationFrame(tickSlot);
  };

  if (timeEl && slotBar) {
    renderAd(ads[0]);
    if (!reduceMotion) {
      requestAnimationFrame(tickSlot);
    } else {
      slotBar.style.width = '65%';
    }
  }

  /* ---------- Notify form (mailto handoff — no backend yet) ---------- */
  var form = document.getElementById('notify-form');
  var hint = document.getElementById('notify-hint');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('notify-email').value.trim();
      if (!email || email.indexOf('@') < 1) {
        hint.textContent = 'Please enter a valid email address.';
        return;
      }
      var subject = encodeURIComponent('Notify me — Tranzio launch');
      var body = encodeURIComponent('Please notify me when Tranzio launches.\n\nEmail: ' + email);
      window.location.href = 'mailto:hello@tranzioindia.com?subject=' + subject + '&body=' + body;
      hint.textContent = 'Opening your mail app to complete signup…';
    });
  }
})();
