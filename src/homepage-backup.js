function switchDeviceIcons() {
  const hideClass = 'hide';
  $('.hero-devices .hero-box_inner').each(function () {
    const icons = $(this).find('.hero-box_icon');

    const visibleIcon = icons.not('.' + hideClass);
    const nextIndex = visibleIcon.index() >= icons.length - 1 ? 0 : visibleIcon.index() + 1;
    icons.addClass(hideClass);
    icons.eq(nextIndex).removeClass(hideClass);
  });
}

// Base Hero Elements
const baseDuration = 1.2;
const heroLabel = '#heroLabel';
const heroHeading = '#heroHeading';
const heroHeadingBox = '.header_highlight-head';
const heroButtons = '#heroButtons .button';
const modularBox = '#modularBox';
const heroBox = '.hero-box';
const heroBoxInner = '.hero-box_inner';
const brandBox = modularBox + ' ' + heroBoxInner;

const brandLogo = '#brandLogo';
const heroBoxesLeft = heroBox + '[box-direction=left] ' + heroBoxInner;
const heroBoxesRight = heroBox + '[box-direction=right] ' + heroBoxInner;
const metadata = '.hero-box_metadata-mask';
const iconBoxArrow = '.hero-dashboard_arrow';
const cloudBorder = '.hero-devices_border';

// Dashboard Elements
const dashboard = '#dashboard';
const dashboardInner = dashboard + ' .hero-dashboard_inner';
const dashboardCode = dashboard + ' .hero-dashboard_code';
const closeCircles = dashboard + ' .hero-dashboard_close circle';
const dashboardTitle = dashboard + ' .hero-dashboard_head-label';
const langTab = dashboard + ' .hero-dashboard_tab';
const pythonTab = dashboard + ' .hero-dashboard_tab-inner.python';
const mojoTab = dashboard + ' .hero-dashboard_tab-inner.mojo';
const pythonCode = dashboard + ' .hero-dashboard_code-block.python';
const mojoCode = dashboard + ' .hero-dashboard_code-block.mojo';

// Graphs
const graphs = '.hero-dashboard_graphs';
const graphHead = '.hero-dashboard_graph-head';
const graphBox = '.hero-dashboard_graph-box';
const graphLabel = '.hero-dashboard_graph-label';
const graphNumberLabel = '.hero-dashboard_graph-number-label';
const graphNumber = '.hero-dashboard_graph-number';
const graphLegend = '.hero-dashboard_graph-legend';

// Animation
const main = gsap.timeline({ delay: 0.5, ease: Power2.easeOut, paused: true });

$(document).ready(function () {
  function updateNavigation(index) {
    let items = $('.hero-navigation_item');
    items.removeClass('active');
    items.eq(index).addClass('active');
  }

  // Initial Reveal
  main
    .addLabel('Platform')
    .addLabel('Start')
    .call(updateNavigation(0))
    .add(letterAnimation(heroLabel, 0.01))
    .add(letterAnimation(heroHeading, 'heading'), '<')
    .call(() => {
      $(brandLogo).trigger('click');
    })
    .from(heroButtons, { opacity: 0, stagger: 0.1, duration: baseDuration }, '<0.1')
    .fromTo(
      $(modularBox),
      { width: '19em', opacity: 0 },
      { width: '12.2em', opacity: 1, duration: 1 },
      'Start'
    )
    .fromTo($(brandBox), { opacity: 0 }, { opacity: 1 }, 'Start+=0.3')
    .call(() => {
      $(brandBox).addClass('border');
    })
    .add(letterAnimation($(modularBox).find(metadata).find('div'), 0.15), '-=1.15');

  // Hero Boxes Coming
  main
    .addLabel('heroBoxes')
    .from(heroBoxesLeft, { opacity: 0, x: '-12em', stagger: 0.15, duration: 1.2 }, 'heroBoxes')
    .from(heroBoxesRight, { opacity: 0, x: '12em', stagger: 0.15, duration: 1.2 }, '<');

  // Hero Boxes Texts
  main
    .addLabel('heroBoxesText')
    .add(
      letterAnimation($(heroBoxesLeft).closest(heroBox).find(metadata).children(), 'label'),
      'heroBoxesText'
    )
    .add(
      letterAnimation(
        $(heroBoxesRight).closest('.hero-devices_box').find(metadata).children(),
        'label'
      ),
      '<'
    );

  // Arrows + Border
  main
    .addLabel('arrowsAndBorder')
    .to(iconBoxArrow, { opacity: 1, duration: baseDuration }, 'arrowsAndBorder');

  // Loop Devices
  main.addLabel('loopDevices');
  let staggerDuration = (index) => {
    return 2 - 0.15 * index;
  };
  const CloudsSwitch = gsap
    .timeline()
    .to(heroBoxesRight, {
      opacity: 0,
      duration: 0.15,
    })
    .set(heroBoxesRight, {
      x: '3em',
    })
    .call(switchDeviceIcons)
    .to(heroBoxesRight, {
      opacity: 1,
      x: '0',
      duration: (index) => {
        return staggerDuration(index);
      },
      stagger: 0.15,
    });

  const repeatedCloudsSwitch = gsap.timeline().add(CloudsSwitch).delay(1).repeat(1).repeatDelay(1);
  main.add(repeatedCloudsSwitch, 'loopDevices');

  // Expand the Square
  main
    .addLabel('expandSquare')
    .fromTo(
      modularBox,
      { width: '12.2em', height: '12.2em' },
      { width: '90.4em', height: '37.2em', duration: 1 }
    )
    .to(
      [brandLogo, heroBoxesLeft, heroBoxesRight, metadata, iconBoxArrow, cloudBorder],
      { opacity: 0, duration: baseDuration },
      'expandSquare+=0.4'
    );

  // Show Dashboard
  main.addLabel('Inference Engine');
  addLabel('show Dashboard')
    .fromTo(
      [dashboard, dashboardInner],
      { opacity: 0, display: 'none' },
      { opacity: 1, display: 'flex' },
      '<'
    )
    .to(closeCircles, { opacity: 1, stagger: 0.1, duration: baseDuration }, '<')
    .add(letterAnimation(dashboardTitle + ' div', 'label'), '<')
    .to([dashboardTitle, langTab], { opacity: 1, duration: baseDuration, stagger: 0.2 }, '<')
    .to(dashboardCode, { opacity: 1, duration: baseDuration }, '<');

  // Update Heading
  main
    .addLabel('headingUpdate1')
    .to(heroHeading, { opacity: 0, y: '2em', duration: 0.2 })
    .call(() => {
      $(heroHeading).html(
        'A <span class="word-highlight">new language</span> that <span class="word-highlight">extends</span> <span class="word-highlight">Python</span> but thats <span class="word-highlight">as fast as C</span>'
      );
      wrapLetters(heroHeading);
      $(heroHeadingBox).css('width', '80%');
      updateNavigation(1);
    })
    .to(heroHeading, { opacity: 1, y: '0em', duration: 0.2 });

  // Animate the Python Code
  main.addLabel('pythonCode').add(codeAnimation(pythonCode), 'pythonCode+0.3');

  // Switch Code Tabs
  main
    .addLabel('switchCodeTabs')
    .to(pythonTab, { opacity: 0, duration: baseDuration / 2 }, 'switchCodeTabs')
    .to(mojoTab, { opacity: 1, display: 'flex', duration: baseDuration }, '<')
    .set(pythonCode, { display: 'none' }, '<')
    .set(mojoCode, { display: 'block' }, '<');

  // Animate the Mojo Code
  main.add(codeAnimation(mojoCode), 'mojoCode+0.3').addLabel('mojoCode');

  // Transition Code
  const firstGraph = $(graphBox).eq(0);
  main
    .set(firstGraph, { width: '100%' })
    .set($(graphBox).not(':first-child'), { scaleY: 0 })

    // Update Heading
    .addLabel('Mojo')
    .addLabel('headingUpdate2')
    .to(heroHeading, { opacity: 0, y: '2em', duration: 0.2 })
    .call(() => {
      $(heroHeading).html(
        'The <span class="word-highlight">fastest unified AI inference</span> <span class="word-highlight">engine</span> in the world.'
      );
      wrapLetters(heroHeading);
      updateNavigation(2);
    })
    .to(heroHeading, { opacity: 1, y: '0em', duration: 0.2 });

  // Show Graphs
  main
    .addLabel('showGraph')
    .to(
      [dashboardCode, firstGraph],
      {
        width: () => {
          return '33.33%';
        },
        duration: baseDuration,
      },
      'showGraphs'
    )
    .fromTo(
      graphs,
      { opacity: 0, display: 'none' },
      { opacity: 1, display: 'flex', duration: baseDuration },
      '<'
    )
    .to(dashboardInner, { opacity: 0, display: 'none' }, '<');

  // Animate Graphs
  const animateLabel = (element, time) => {
    let duration = time;
    let tl = gsap.timeline();
    if (!time) {
      duration = 'label';
    }
    main.set(element, { opacity: 1 });
    tl.add(letterAnimation(element, duration));

    return tl;
  };
  const animateGraph = (parent) => {
    let tl = gsap.timeline();
    tl.add(animateLabel($(graphHead).children(), 0.05), '<')
      .add(animateLabel($(parent).find(graphLabel).children()), '<+=0.3')
      .add(animateLabel($(parent).find(graphNumberLabel).children()), '<+=0.3')
      .set($(parent).find(graphNumber), { yPercent: 10, opacity: 0 }, '<')
      .to(
        $(parent).find(graphNumber),
        { yPercent: 0, opacity: 1, duration: baseDuration },
        '<+=0.15'
      )
      .add(animateLabel($(parent).find(graphLegend).children()), '<+=0.3');

    return tl;
  };
  main.addLabel('animateGraph1').add(animateGraph($(graphBox).eq(0)), 'showGraph+=0.2');
  main
    .to($(graphBox).eq(1), { scaleY: 1, duration: baseDuration }, '-=0.2')
    .addLabel('animateGraph2')
    .add(animateGraph($(graphBox).eq(1)), '-=0.2');
  main
    .to($(graphBox).eq(2), { scaleY: 1, duration: baseDuration }, '-=1')
    .addLabel('animateGraph3')
    .add(animateGraph($(graphBox).eq(2)), '-=0.4');
});
