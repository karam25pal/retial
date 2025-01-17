var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? !0
      : !1;
  var Scrollbar = window.Scrollbar;
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.BackToTop();
      Init.preloader();
      Init.header();
      Init.categoryToggle();
      Init.quantityHandle();
      Init.filterSearch();
      Init.cartSidebar();
      Init.dropdown();
      Init.filterToggle();
      Init.priceRangeSlider();
      Init.slick();
      Init.countdownInit(".countdown", "2025/11/11");
      Init.formValidation();
      Init.contactForm();
    },

    BackToTop: function () {
      var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
      var rootElement = document.documentElement;
      function handleScroll() {
        var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        if (rootElement.scrollTop / scrollTotal > 0.05) {
          scrollToTopBtn.classList.add("showBtn");
        } else {
          scrollToTopBtn.classList.remove("showBtn");
        }
      }
      function scrollToTop() {
        rootElement.scrollTo({ top: 0, behavior: "smooth" });
      }
      scrollToTopBtn.addEventListener("click", scrollToTop);
      document.addEventListener("scroll", handleScroll);
    },
    preloader: function () {
      setTimeout(function () {
        $("#preloader").fadeOut("slow");
      }, 2400);
    },

    w: function (e) {
      if (isMobile) {
        $("body").addClass("is-mobile");
      }
    },

    // Header
    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }

      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }

      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".mobile-nav__container"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".sticky-header__content"
        );
        mobileNavContainer.innerHTML = navContent;
      }

      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }

      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }

      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
    },
    categoryToggle: function () {
      if ($(".main-menu__right").length) {
        $(".profile").click(function (event) {
          event.stopPropagation();
          $(".menu").toggleClass("active");
        });
        $(document).click(function (event) {
          if (!$(event.target).closest(".profile, .menu").length) {
            $(".menu").removeClass("active");
          }
        });
        $(".menu").click(function (event) {
          event.stopPropagation();
        });
      }
    },
    // Quantity Controller
    quantityHandle: function () {
      $(".decrement").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        if (qtyVal > 0) {
          qtyInput.val(qtyVal - 1);
        }
      });
      $(".increment").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        qtyInput.val(parseInt(qtyVal + 1));
      });
    },

    // Cart Sidebar
    cartSidebar: function () {
      $(".cart-button").on("click", function () {
        $("#sidebar-cart").css("right", "0");
        $("#sidebar-cart-curtain")
          .fadeIn(0)
          .css("display", "block")
          .animate({ opacity: 1 }, 200);
      });

      $(".close-popup").on("click", function () {
        $("#sidebar-cart").css("right", "-101%");
        $("#sidebar-cart-curtain").animate({ opacity: 0 }, 200, function () {
          $(this).css("display", "none");
        });
      });
    },
    // filter search
    filterSearch: function () {
      if ($(".logo-icon").length) {
        $("#magnifying-btn").on("click", function (event) {
          event.stopPropagation();
          $(".input-search").slideDown("fast");
        });

        $(document).on("click", function (event) {
          if (!$(event.target).closest(".search-block").length) {
            $(".input-search").slideUp("fast");
          }
        });

        $(".search-block").on("click", function (event) {
          event.stopPropagation();
        });
      }
    },

    dropdown: function () {
      const selectedAll = document.querySelectorAll(".wrapper-dropdown");

      selectedAll.forEach((selected) => {
        const optionsContainer = selected.children[2];
        const optionsList = selected.querySelectorAll(
          "div.wrapper-dropdown li"
        );

        selected.addEventListener("click", () => {
          let arrow = selected.children[1];

          if (selected.classList.contains("active")) {
            handleDropdown(selected, arrow, false);
          } else {
            let currentActive = document.querySelector(
              ".wrapper-dropdown.active"
            );

            if (currentActive) {
              let anotherArrow = currentActive.children[1];
              handleDropdown(currentActive, anotherArrow, false);
            }

            handleDropdown(selected, arrow, true);
          }
        });

        // update the display of the dropdown
        for (let o of optionsList) {
          o.addEventListener("click", () => {
            selected.querySelector(".selected-display").innerHTML = o.innerHTML;
          });
        }
      });

      // check if anything else ofther than the dropdown is clicked
      window.addEventListener("click", function (e) {
        if (e.target.closest(".wrapper-dropdown") === null) {
          closeAllDropdowns();
        }
      });

      // close all the dropdowns
      function closeAllDropdowns() {
        const selectedAll = document.querySelectorAll(".wrapper-dropdown");
        selectedAll.forEach((selected) => {
          const optionsContainer = selected.children[2];
          let arrow = selected.children[1];

          handleDropdown(selected, arrow, false);
        });
      }

      // open all the dropdowns
      function handleDropdown(dropdown, arrow, open) {
        if (open) {
          arrow.classList.add("rotated");
          dropdown.classList.add("active");
        } else {
          arrow.classList.remove("rotated");
          dropdown.classList.remove("active");
        }
      }
    },
    // Filter Toggle Button
    filterToggle: function () {
      $(".category-block .title").on("click", function () {
        var count = $(this).data("count");
        var $icon = $(".category-block.box-" + count + " span i");
        var $content = $(".category-block.box-" + count + " .content-block");

        // Toggle content visibility
        $content.slideToggle("slow");

        // Toggle rotate/no-rotate classes
        if ($icon.hasClass("no-rotate")) {
          $icon.removeClass("no-rotate").addClass("rotate");
        } else {
          $icon.removeClass("rotate").addClass("no-rotate");
        }
      });

      if ($(".logo-icon").length) {
        $("#magnifying-btn").on("click", function (event) {
          event.stopPropagation();
          $(".input-search").slideDown("fast");
        });

        $(document).on("click", function (event) {
          if (!$(event.target).closest(".search-block").length) {
            $(".input-search").slideUp("fast");
          }
        });

        $(".search-block").on("click", function (event) {
          event.stopPropagation();
        });
      }
      if ($(".toggle-sidebar").length) {
        $(".blog-filter").on("click", function () {
          $(".toggle-sidebar").animate({ left: "0" }, 300);
          $(".shop-sidebar-overlay").fadeIn(300);
          $("body").addClass("no-scroll"); // Disable scroll
        });

        $(".shop-sidebar-overlay").on("click", function () {
          $(".toggle-sidebar").animate({ left: "-800px" }, 300);
          $(this).fadeOut(300);
          $("body").removeClass("no-scroll"); // Enable scroll
        });
      }
      if ($(".feature-products").length) {
        $(".tab-link").click(function () {
          var tabID = $(this).attr("data-tab");

          $(this).addClass("active").siblings().removeClass("active");
          $("#tab-" + tabID)
            .addClass("active")
            .siblings()
            .removeClass("active");

          var currentSlider = $("#tab-" + tabID).find(".product-slider");

          if (currentSlider.hasClass("slick-initialized")) {
            currentSlider.slick("setPosition");
          } else {
            currentSlider.slick();
          }
        });
      }
    },
    priceRangeSlider: function () {
      const priceGap = 1000;

      $(".price-input input").on("input", function () {
        let minPrice = parseInt($(".price-input .input-min").val()),
          maxPrice = parseInt($(".price-input .input-max").val());

        if (
          maxPrice - minPrice >= priceGap &&
          maxPrice <= $(".range-input .range-max").attr("max")
        ) {
          if ($(this).hasClass("input-min")) {
            $(".range-input .range-min").val(minPrice);
            $(".slider .progress").css(
              "left",
              (minPrice / $(".range-input .range-min").attr("max")) * 100 + "%"
            );
          } else {
            $(".range-input .range-max").val(maxPrice);
            $(".slider .progress").css(
              "right",
              100 -
                (maxPrice / $(".range-input .range-max").attr("max")) * 100 +
                "%"
            );
          }
        }
      });

      $(".range-input input").on("input", function () {
        let minVal = parseInt($(".range-input .range-min").val()),
          maxVal = parseInt($(".range-input .range-max").val());

        if (maxVal - minVal < priceGap) {
          if ($(this).hasClass("range-min")) {
            $(".range-input .range-min").val(maxVal - priceGap);
          } else {
            $(".range-input .range-max").val(minVal + priceGap);
          }
        } else {
          $(".price-input .input-min").val(minVal);
          $(".price-input .input-max").val(maxVal);
          $(".slider .progress").css(
            "left",
            (minVal / $(".range-input .range-min").attr("max")) * 100 + "%"
          );
          $(".slider .progress").css(
            "right",
            100 -
              (maxVal / $(".range-input .range-max").attr("max")) * 100 +
              "%"
          );
        }
      });
    },
    slick: function () {
      $(document).ready(function () {
        if ($(".feature-slider").length) {
          $(".feature-slider").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            variableWidth: false,
            draggable: true,
            arrows: false,
            dots: true,
            lazyLoad: "linear",
            speed: 900,
            autoplaySpeed: 2000,
            responsive: [
              {
                breakpoint: 821,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  autoplaySpeed: 3000,
                },
              },
            ],
          });

          $('a[data-bs-toggle="tab"]').on("shown.bs.tab", function () {
            $(".feature-slider").slick("setPosition");
          });
        }
      });

      if ($(".product-deal-slider").length) {
        $(".product-deal-slider").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          variablewidth: false,
          draggable: true,
          arrows: true,
          dots: false,
          lazyLoad: "linear",
          speed: 900,
          autoplaySpeed: 2000,
          responsive: [
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplaySpeed: 3000,
              },
            },
            {
              breakpoint: 821,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplaySpeed: 3000,
              },
            },
            {
              breakpoint: 821,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplaySpeed: 3000,
              },
            },
          ],
        });
      }
      if ($(".brands-slider").length) {
        $(".brands-slider").slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          autoplay: true,
          variablewidth: false,
          draggable: true,
          arrows: false,
          dots: false,
          lazyLoad: "linear",
          speed: 900,
          autoplaySpeed: 2000,
          responsive: [
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplaySpeed: 3000,
              },
            },
            {
              breakpoint: 821,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplaySpeed: 3000,
              },
            },
            {
              breakpoint: 540,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                autoplaySpeed: 3000,
              },
            },
          ],
        });
      }
      if ($(".testemonial-slider").length) {
        $(".testemonial-slider").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          variablewidth: false,
          draggable: true,
          arrows: false,
          dots: false,
          lazyLoad: "linear",
          speed: 900,
          autoplaySpeed: 2000,
          responsive: [
            {
              breakpoint: 1399,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplaySpeed: 3000,
              },
            },
            {
              breakpoint: 821,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                autoplaySpeed: 3000,
              },
            },
            {
              breakpoint: 540,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplaySpeed: 3000,
              },
            },
          ],
        });
      }

      if ($(".product-detail-slider").length) {
        $(".product-detail-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: true,
          infinite: true,
          asNavFor: ".product-slider-asnav",
        });
      }
      if ($(".product-slider-asnav").length) {
        $(".product-slider-asnav").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: ".product-detail-slider",
          dots: false,
          arrows: true,
          centerMode: false,
          focusOnSelect: true,
          infinite: true,
        });
      }

      $(".btn-prev").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickPrev");
      });
      $(".btn-next").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickNext");
      });
    },
    // Countdown Timer
    countdownInit: function (countdownSelector, countdownTime, countdown) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          $(this).html(
            e.strftime(
              "<li><h6>%D</h6><p>Days</p></li>\
          <li><h6>%H</h6><p>Hrs</p></li>\
          <li><h6>%M</h6><p>Mins</p></li>\
          <li><h6>%S</h6><p>Secs</p></li>"
            )
          );
        });
      }
    },

    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
      if ($(".login-form").length) {
        $(".login-form").validate();
      }
    },
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-ter mt-16 mb-16'>Email Sent Successfully</h5>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h5 class='color-ter mt-16 mb-16'>There is an error</h5>";
              }
              $("#messages").show("slow");
              $("#messages").slideDown("slow");
              setTimeout(function () {
                $("#messages").slideUp("hide");
                $("#messages").hide("slow");
              }, 4000);
            },
          });
        } else {
          return !1;
        }
      });
    },
  };
  Init.i();
})(window, document, jQuery);
