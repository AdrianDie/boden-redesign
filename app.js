// Opticom — redesign interactivity
(function(){
  "use strict";

  /* ---------------- Mobile drawer ---------------- */
  var hamburgerBtn = document.getElementById("hamburgerBtn");
  var drawerCloseBtn = document.getElementById("drawerCloseBtn");
  var drawer = document.getElementById("mobileDrawer");
  var scrim = document.getElementById("drawerScrim");

  function openDrawer(){
    drawer.classList.add("open");
    scrim.classList.add("open");
    hamburgerBtn.setAttribute("aria-expanded","true");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer(){
    drawer.classList.remove("open");
    scrim.classList.remove("open");
    hamburgerBtn.setAttribute("aria-expanded","false");
    document.body.style.overflow = "";
  }
  hamburgerBtn.addEventListener("click", openDrawer);
  drawerCloseBtn.addEventListener("click", closeDrawer);
  scrim.addEventListener("click", closeDrawer);
  drawer.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", closeDrawer);
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape") closeDrawer();
  });

  /* ---------------- Header solid-on-scroll ---------------- */
  var header = document.getElementById("siteHeader");
  var scrolledThreshold = 24;

  window.addEventListener("scroll", function(){
    header.classList.toggle("scrolled", window.scrollY >= scrolledThreshold);
  }, { passive: true });

  /* ---------------- Scroll reveals ---------------- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal-up");

  if(prefersReduced || !("IntersectionObserver" in window)){
    revealEls.forEach(function(el){ el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry, i){
        if(entry.isIntersecting){
          var el = entry.target;
          setTimeout(function(){ el.classList.add("in"); }, Math.min(i * 40, 240));
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function(el){ io.observe(el); });
  }

  /* ---------------- Cookie consent ---------------- */
  var COOKIE_KEY = "opticom-cookie-consent";
  var banner = document.getElementById("cookieBanner");
  var acceptAllBtn = document.getElementById("cookieAcceptAll");
  var necessaryBtn = document.getElementById("cookieNecessary");

  function getConsent(){
    try { return localStorage.getItem(COOKIE_KEY); } catch(e){ return null; }
  }
  function setConsent(value){
    try { localStorage.setItem(COOKIE_KEY, value); } catch(e){}
  }

  if(!getConsent()){
    setTimeout(function(){ banner.classList.add("visible"); }, 500);
  }
  acceptAllBtn.addEventListener("click", function(){
    setConsent("all");
    banner.classList.remove("visible");
  });
  necessaryBtn.addEventListener("click", function(){
    setConsent("necessary");
    banner.classList.remove("visible");
  });

})();
