$(function () {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const navMenuItems = document.querySelectorAll('.nav__menu-item');
  const submenuLists = document.querySelectorAll('.nav__submenu');

  if (nav && hamburger) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    nav.addEventListener('click', (event) => {
      const isNavMenuLink = event.target.classList.contains('nav__menu-item-link');
      const isNavSubmenuLink = event.target.classList.contains('nav__submenu-item-link');
      const isNavLogo = event.target.classList.contains('nav__logo-image');
      const isNavContactsLink = event.target.classList.contains('nav__contacts-link');
      const isNavClose = event.target.classList.contains('nav__close');

      if (isNavMenuLink || isNavSubmenuLink || isNavLogo || isNavContactsLink || isNavClose) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }

  navMenuItems.forEach((navMenuItem) => {
    navMenuItem.addEventListener('click', (event) => {
      const submenu = event.currentTarget.querySelector('.nav__submenu');

      if (event.target === event.currentTarget && submenu) {
        if (submenu.style.maxHeight) {
          submenu.style.maxHeight = null;
        } else {
          submenuLists.forEach((submenuList) => (submenuList.style.maxHeight = null));
          submenu.style.maxHeight = submenu.scrollHeight + 'px';
        }
      }
    });
  });

  $('.openImgModal').on('click', function () {
    openImgModal($(this));
  });

  function openImgModal(btn) {
    $('.cert-modal').stop().fadeIn();
    $('.cert-modal img').attr('src', btn.attr('data-open'));
  }

  $(document).mousedown(function (e) {
    var container = $('.cert-modal img'),
      modal = $('.modal form'),
      formMsg = $('.response .text');

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('.cert-modal')
        .stop()
        .fadeOut(function () {
          $('.cert-modal img').attr('src', '');
        });
    }
    if (!formMsg.is(e.target) && formMsg.has(e.target).length === 0) {
      clearTimer(timer);
      $('.response').removeClass('active').stop().fadeOut();
    }
    if (!modal.is(e.target) && modal.has(e.target).length === 0) {
      $('.modal')
        .stop()
        .fadeOut(function () {
          $('.modal').removeClass('download opened');
          modal.find('input.error').removeClass('error');
          modal.find('label input').val('');
          modal.show();
        });
    }
  });

  $('.modal .close-btn').on('click', function () {
    $('.modal').removeClass('opened').stop().fadeOut();
  });
  $('.response .close-btn').on('click', function () {
    clearTimer(timer);
    $(this).parents('.response').stop().fadeOut();
  });
  $('.callback').on('click', function () {
    var modal = $('.form-1');
    modal.addClass('opened').stop().fadeIn();
  });
  $('.request').on('click', function () {
    var modal = $('.form-2');
    modal.addClass('opened').stop().fadeIn();
  });
  $('.request-kp').on('click', function () {
    var modal = $('.form-4');
    modal.addClass('opened').stop().fadeIn();
  });
  $('.request-price').on('click', function () {
    var cost = $(this).attr('data-cost');
    var volts = $(this).attr('data-volts');
    var pack = $(this).attr('data-pack');
    $('.hidden-price').attr('value', `Цeна: ${cost} \nВольты: ${volts} \nПакет: ${pack}`);
    var modal = $('.form-3');
    modal.addClass('opened').stop().fadeIn();
  });

  var prevArrow =
    '<button class="prev-btn">\n' +
    '                    <svg width="15" height="21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
    '                         viewBox="0 0 492.004 492.004" style="enable-background:new 0 0 492.004 492.004;" xml:space="preserve">\n' +
    '                        <path fill="#299064" d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12\n' +
    '                            c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028\n' +
    '                            c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265\n' +
    '                            c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"/>\n' +
    '                    </svg>\n' +
    '                </button>';
  var nextArrow =
    '<button class="next-btn">\n' +
    '                    <svg width="15" height="21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
    '                         viewBox="0 0 492.004 492.004" style="enable-background:new 0 0 492.004 492.004;" xml:space="preserve">\n' +
    '                        <path fill="#299064" d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12\n' +
    '                            c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028\n' +
    '                            c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265\n' +
    '                            c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"/>\n' +
    '                    </svg>\n' +
    '                </button>';
  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    appendArrows: $('.slider-wrapper .btn-row'),
    prevArrow: prevArrow,
    nextArrow: nextArrow,
  });

  $('.certs-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          variableWidth: false,
          centerMode: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          variableWidth: false,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
          centerMode: true,
        },
      },
    ],
  });

  var certsBlock = $('.certificate-block .certificate .flex-wrapper');

  var slickInitialized = false;

  // Debounce-function:
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  var slickReinit = debounce(function () {
    if (!slickInitialized && $(window).width() < 768) {
      slickSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 768,
            settings: 'unslick',
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              prevArrow: prevArrow,
              nextArrow: nextArrow,
            },
          },
        ],
      };
      certsBlock.slick(slickSettings);
      slickInitialized = true;
      certsBlock.on('destroy', function () {
        slickInitialized = false;
      });
      $(window).off('resize.slickReinit');
    }
    $(window).on('resize.slickReinit', slickReinit);
  }, 250);

  slickReinit();

  $('.download-block .count-price').on('click', function () {
    $('.modal')
      .addClass('download')
      .find('#download-file')
      .attr('disabled', false)
      .val($(this).attr('data-file-name'));
  });

  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    if ($.attr(this, 'href').length > 1 && $($.attr(this, 'href')).length > 0) {
      $('html, body').animate(
        {
          scrollTop: $($.attr(this, 'href')).offset().top,
        },
        500
      );
    }
  });

  // $('.toggle-list').on('click', function () {
  // 	$(this).parents('.document-list-block').toggleClass('active').find('.document-list.hidden').stop().slideToggle();
  // });

  $('.toggle-list').on('click', function () {
    var ths = $(this).attr('data-tog');
    $(this)
      .parents('.faq-block')
      .toggleClass('active')
      .find(`.document-list.${ths}.hidden`)
      .stop()
      .slideToggle();
  });

  $('.sbmt-btn').on('click', function (e) {
    e.preventDefault();

    var form = $(this).parents('.form');

    if (validateForm(form)) sendForm(form);
  });

  $('.download-btn').on('click', function (e) {
    e.preventDefault();
    var fileList = ['./assets/download/kp.pdf'];
    var fileNameList = ['KP.pdf'];
    var form = $(this).parents('.form');

    if ($(this).parents('.modal').hasClass('download')) {
      var downloadAttr = $('button[data-file-name=' + $('#download-file').val() + ']').attr(
        'data-download'
      );
      var extensionType = downloadAttr.substring(downloadAttr.lastIndexOf('.'));
      fileList.push(downloadAttr);
      fileNameList.push($('#download-file').val() + extensionType);
    }

    if (validateForm(form)) {
      var email = $(this).parents('.form').find('input[name="email"]').val();
      sendMultipleFiles(fileList, fileNameList, email);
      sendForm(form);
    }
  });

  $('.bot-send-btn').on('click', function (e) {
    e.preventDefault();
    var fileList = ['./assets/download/Instruction a4 qr.png'];
    var fileListName = [
      'Пошаговая инструкция для подачи заявки на сдачу квалификационного экзамена.png',
    ];
    var form = $(this).parents('.form');
    var email = $(this).parents('.form').find('input[name="email"]').val();

    if (validateForm(form)) {
      sendMultipleFiles(fileList, fileListName, email);
      sendForm(form);
    }
  });

  $('.bot-send-btn-II').on('click', function (e) {
    e.preventDefault();
    var fileList = ['./assets/download/список документов для регистрации работодателя.pdf'];
    var fileListName = ['список документов для регистрации работодателя.pdf'];
    var form = $(this).parents('.form');
    var email = $(this).parents('.form').find('input[name="email"]').val();

    if (validateForm(form)) {
      sendMultipleFiles(fileList, fileListName, email);
      sendForm(form);
    }
  });

  $('.form label input').on('keyup', function () {
    $(this).removeClass('error');
  });

  var timer;
  function sendForm(form) {
    $.ajax({
      type: 'POST',
      url: 'send.php',
      data: form.serialize(),
      success: function (data) {
        var success = $('.success');
        if (form.hasClass('quiz-form')) {
          $('.last-step .failure').hide();
          $('.last-step .success').show();
          form.parents('.modal').stop().fadeOut();

          $('.how-much-block .next-btn').text('Заново');
          moveToNextStep();
          return;
        }
        if (!form.hasClass('in-form')) {
          form.parents('.modal').stop().fadeOut();
          timer = setTimeout(function () {
            success.removeClass('active').stop().fadeOut();
          }, 5000);
        }
        success.fadeIn();
      },
      error: function (data) {
        var failure = $('.failure');
        if (form.hasClass('quiz-form')) {
          $('.last-step .success').hide();
          $('.last-step .failure').show();
          form.parents('.modal').stop().fadeOut();
          $('.how-much-block .next-btn').text('Заново');
          moveToNextStep();
          return;
        }
        if (!form.hasClass('in-form')) {
          form.parents('.modal').stop().fadeOut();
          timer = setTimeout(function () {
            failure.removeClass('active').stop().fadeOut();
          }, 5000);
        }
        failure.fadeIn();
      },
      complete: function () {
        form.find('label input').val('');
      },
    });
  }

  function sendMultipleFiles(fileList, fileListName, email) {
    $.ajax({
      type: 'POST',
      url: 'sendFiles.php',
      data:
        'email=' +
        email +
        '&files=' +
        JSON.stringify(fileList) +
        '&fileNames=' +
        JSON.stringify(fileListName),
    });
  }

  function sendMultipleFilesII(fileList, fileListName, email) {
    $.ajax({
      type: 'POST',
      url: 'sendFilesII.php',
      data:
        'email=' +
        email +
        '&files=' +
        JSON.stringify(fileList) +
        '&fileNames=' +
        JSON.stringify(fileListName),
    });
  }

  function validateForm(form) {
    function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email.trim());
    }

    function validatePhone(phone) {
      var re = /^\+?[0-9]+$/;
      return re.test(phone.trim());
    }

    form.find('label input').each(function () {
      if ($(this).val() === '' && this.name !== 'hidden-captcha') {
        $(this).addClass('error');
      } else if (this.name === 'hidden-captcha' && $(this).val() !== '') {
        // Anti-robots trick
        $(this).addClass('error');
      } else if (this.name === 'email' && !validateEmail($(this).val())) {
        $(this).addClass('error');
      } else if (this.name === 'phone' && !validatePhone($(this).val())) {
        $(this).addClass('error');
      } else {
        $(this).removeClass('error');
      }
    });

    return form.find('.error').length === 0;
  }

  function clearTimer(timer) {
    timer && clearTimeout(timer);
  }

  $('.how-much-block .next-btn').on('click', function () {
    var currentStep = $('.steps-content .step.active'),
      currentStepInput = currentStep.find('input'),
      steps = $('.steps-content .step'),
      index = getCurrentIndex('.steps-content .step');

    if (index < steps.length - 2) {
      for (var i = 0; i < currentStepInput.length; i++) {
        if (currentStepInput.eq(i).prop('checked')) {
          moveToNextStep(currentStepInput[i].value);
          break;
        }
      }
    } else if (index === steps.length - 2) {
      var modal = $('.form-3');
      $('.steps-content input:checked').each(function () {
        $('.form-3 input[name=' + $(this).attr('name') + ']').val($(this).val());
      });
      if ($('.steps-content .step.active').find('input:checked').length === 1) {
        modal.addClass('opened').stop().fadeIn();
      }
    } else if (index === steps.length - 1) {
      $('.steps .step').removeClass('active current');
      $('.steps .step').eq(0).addClass('active current');
      $('.steps-content .step').removeClass('active');
      $('.steps-content .step').eq(0).addClass('active');
      $('.how-much-block .next-btn').text('Дальше');
    }
  });

  function moveToNextStep(check) {
    var current = $('.step.active.current'),
      currentContent = $('.steps-content .step.active'),
      steps = $('.steps-content .step');
    $('.step').removeClass('current');
    if (current.next().hasClass('mobile-break')) {
      current.next().next().addClass('current active');
    } else {
      current.next().addClass('current active');
    }
    steps.removeClass('active');
    currentContent.next().addClass('active');

    const customSums = (check) => {
      // different sums for different SROs
      const sroStroy = $('.stroy');
      const sroOther = $('.proekt-izisk');
      if (check === 'CPO строителей') {
        sroStroy.removeClass('off');
        sroOther.addClass('off');
      } else {
        sroOther.removeClass('off');
        sroStroy.addClass('off');
      }
    };

    customSums(check);
  }

  function getCurrentIndex(arr) {
    return $(arr).index($(arr + '.active'));
  }

  $('input[name=phone]').inputmask('+79999999999');
});
