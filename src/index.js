import { codeAnimation, letterAnimation, typeText } from '$utils/globalFunctions';
import { swiperCarousel, tabCarousel } from '$utils/tabCarousel';

document.documentElement.classList.add('js-enabled');

$(document).ready(function () {
  // Register GSAP
  gsap.registerPlugin(ScrollTrigger);

  // #region Utilities

  // Hero - Copy to Clipboard
  let curlCopy = $('.curl_copy');
  let copyTimeout;

  if (curlCopy) {
    curlCopy.on('click', function (e) {
      e.preventDefault();

      let data = $(this).find('[data-copy]').text();
      copyTextToClipboard(data);

      amplitude.track('copyMojoDownload');
    });

    function copyTextToClipboard(text) {
      var textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');

        clearTimeout(copyTimeout);

        $('#copy-icon').hide();
        $('#copy-success').show();
        $('.curl_copy-tip-text').text('Copied!');

        copyTimeout = setTimeout(() => {
          $('#copy-icon').show();
          $('#copy-success').hide();
          $('.curl_copy-tip-text').text('Copy');
        }, 4000);
      } catch (err) {}
      document.body.removeChild(textArea);
    }
  }

  // Team has many images and does not appear to have problems when this is removed.
  if (window.location.pathname !== '/team') {
    // GSAP IMG SET
    $('img').each(function () {
      $(this).removeAttr('loading');
      ScrollTrigger.refresh();
    });
  }

  // RemoveScrollBar for all overflow elements
  function addNoScrollbarClass() {
    const allElements = document.querySelectorAll('*');

    for (const element of allElements) {
      // Exclude body and html elements
      if (element.tagName.toLowerCase() === 'body' || element.tagName.toLowerCase() === 'html') {
        continue;
      }

      const style = window.getComputedStyle(element);
      if (
        style.overflow === 'auto' ||
        style.overflow === 'scroll' ||
        style.overflowX === 'auto' ||
        style.overflowX === 'scroll' ||
        style.overflowY === 'auto' ||
        style.overflowY === 'scroll'
      ) {
        // Disable Scrollbar
        element.classList.add('no-scrollbar');
        // Fix for inner scroll inside swipers
        element.classList.add('swiper-no-swiping');
      }
    }
  }
  addNoScrollbarClass();

  // #endregion

  // #region Codes Animation
  // -- Code Blocks Animations to view
  $('.dashboard_inner[code-animation]').each(function () {
    const codeBlock = $(this).find('.dashboard_code-block');
    codeBlock.hide();

    ScrollTrigger.create({
      trigger: $(this),
      once: true,
      start: '50% bottom',
      invalidateOnRefresh: true,
      toggleActions: 'play null null null',
      onEnter: () => {
        codeBlock.show();
        codeAnimation($(this));
      },
    });
  });

  // #endregion

  // #region Menu

  // Base
  var menuOpenAnim = false;
  var dropdownOpen = false;
  const menuLinks = '.navbar_part.links';
  const menuLinksItems = '.navbar_link';
  const menuButton = '.navbar_menu-btn';
  const navLines = $('.navbar_ham-line');

  // Menu Animation
  let menuText = 'Close';
  function createNavReveal() {
    let navReveal = gsap
      .timeline({
        paused: true,
        onComplete: () => {
          disableScroll();
        },
      })
      .fromTo(navLines.eq(0), { y: '0px', rotate: '0deg' }, { y: '7px', rotate: '45deg' }, '<')
      .fromTo(navLines.eq(1), { opacity: 1 }, { opacity: 0 }, '<')
      .fromTo(navLines.eq(2), { y: '0px', rotate: '0deg' }, { y: '-7px', rotate: '-45deg' }, '<')
      .fromTo('.navbar_menu-close', { x: '0.4rem', opacity: 0 }, { x: '0', opacity: 1 }, '<')
      .fromTo(menuLinks, { display: 'none' }, { display: 'flex' }, '<')
      .fromTo(menuLinks, { yPercent: -100 }, { yPercent: 0 }, '<')
      .fromTo(
        [menuLinksItems, '.navbar_link-icon'],
        {
          y: '100%',
          opacity: 0,
        },
        {
          y: '0%',
          opacity: 1,
          stagger: {
            each: 0.05,
          },
        },
        '-=0.2'
      )
      .fromTo(menuLinksItems, { pointerEvents: 'none' }, { pointerEvents: 'auto' }, '<');
    return navReveal;
  }

  // Scroll Disabler
  let scrollPosition;
  const disableScroll = () => {
    if (!menuOpenAnim) {
      scrollPosition = $(window).scrollTop();
      $('html, body').scrollTop(0).addClass('overflow-hidden');
    } else {
      $('html, body').scrollTop(scrollPosition).removeClass('overflow-hidden');
    }
    menuOpenAnim = !menuOpenAnim;
  };

  let navReveal;

  // GSAP's matchMedia
  ScrollTrigger.matchMedia({
    '(max-width: 991px)': function () {
      // Apply the animation only on screens with a max-width of 991px
      navReveal = createNavReveal();
    },
  });

  // Actions
  // Open on Click
  $('.navbar_menu-btn').on('click', openMenu);

  // Functions
  function openMenu() {
    if (navReveal) {
      playMenuAnimation();
    }
  }

  function playMenuAnimation() {
    updateMenuText();

    if (!menuOpenAnim) {
      $('.navbar_menu-btn').addClass('open');
      navReveal.timeScale(1).play();
    } else {
      $('.navbar_menu-btn').removeClass('open');
      navReveal.timeScale(1.5).reverse();
      disableScroll();
    }
  }

  function updateMenuText() {
    menuText = menuOpenAnim ? 'Menu' : 'Close';
  }

  // Menu Dropdown Animation
  $('.navbar_dropdown').on('click', function () {
    if ($(window).width() < 992) {
      $('.navbar_dropdown').removeClass('is-active');
      $(this).addClass('is-active');
    }
  });

  // #endregion

  // #region Tabs
  if ($('.tabs.max-tab').length) {
    const activeClass = 'tab-active';
    const progressLine = '.tabs_block-progress-line';
    const duration = 4000;

    // Animates a card, by typing the text and filename.
    function cardAnimation(card) {
      return new Promise((resolve) => {
        card.addClass('active');
        resolve();
      });
    }
    // TABS 2
    tabCarousel({
      tabs: $('.tabs.max-tab .tabs_block-link-menu .tabs_block-link'),
      cards: $('.tabs.max-tab .max-products .max-products_grid-cell'),
      onCardLeave: (card) => {
        card.removeClass('active');
      },
      onTabLeave: (tab) => {
        tab.removeClass(activeClass);
        // If this is called mid animation (by a click) this will stop it.
        tab.find(progressLine).stop();
        tab.find(progressLine).css('width', '0');
      },
      onCardShow: cardAnimation,
      onTabShow: (tab) => {
        return new Promise((resolve) => {
          tab.addClass(activeClass);
          tab.find(progressLine).animate({ width: '100%' }, duration, resolve);
        });
      },
    });

    swiperCarousel({
      sliderSelector: '.tabs_slider.max-tab',
      // On init and when the swiper slides, we animate the progressbar and code
      // block, but only animate the code the first time it's shown.
      animateOnSlide(activeSlide) {
        // Set progressLine to 0 and then start an animation for it.

        activeSlide
          .find(progressLine)
          .stop(true, true)
          .css('width', '0')
          .animate({ width: '100%' }, duration);

        let cards = $('.tabs_slider.max-tab .max-products .max-products_grid-cell');

        cards.removeClass('active');
        cards.eq(activeSlide.index()).addClass('active');
      },
      onInit() {},
      duration,
    });
  }

  // #endregion

  // #region AmplitudeTrack
  function amplitudeTrack(anchorTag, trackTitle) {
    return () => {
      amplitude.track(trackTitle, {
        href: window.location.href,
        location: anchorTag.dataset.analyticsLocation,
      });
    };
  }

  // Delay these calls to avoid blocking main thread
  setTimeout(() => {
    [...document.querySelectorAll('a')]
      .filter((a) => a.href === 'https://docs.modular.com/')
      .forEach((a) => {
        a.onclick = amplitudeTrack(a, 'DownloadMaxClicked');
      });
  }, 100);

  setTimeout(() => {
    [...document.querySelectorAll('a')]
      .filter((a) => a.href === 'https://modular.com/enterprise#form')
      .forEach((a) => {
        a.onclick = amplitudeTrack(a, 'ContactSalesClicked');
      });
  }, 200);
  setTimeout(() => {
    [...document.querySelectorAll('[data-analytics-onclick]')].forEach((a) => {
      a.onclick = amplitudeTrack(a, a.dataset.analyticsOnclick);
    });
  }, 300);
  let timeStartedOnPage = new Date();

  function trackTimeOnPage(pathname) {
    if (!timeStartedOnPage) {
      return;
    }
    const durationInSeconds = Math.round(new Date().getTime() - timeStartedOnPage.getTime()) / 1000;
    amplitude.track('TimeOnPage', {
      duration: `${Math.round(durationInSeconds)}`,
      minutes: `${Math.round(durationInSeconds / 60)}`,
      pathname,
    });
  }

  function scrollPercentage() {
    const { documentElement } = document,
      { body } = document;

    return Math.round(
      ((documentElement.scrollTop || body.scrollTop) /
        ((documentElement.scrollHeight || body.scrollHeight) - documentElement.clientHeight)) *
        100
    );
  }

  let maxScroll = 0;

  setInterval(() => {
    const curScroll = scrollPercentage();
    if (curScroll > maxScroll) {
      maxScroll = curScroll;
    }
  }, 500);

  window.addEventListener('beforeunload', () => {
    const { pathname } = window.location;
    trackTimeOnPage(pathname);
    amplitude.track('MaxScrollPercentage', { maxScroll, pathname });
    return undefined;
  });

  // #endregion
});
