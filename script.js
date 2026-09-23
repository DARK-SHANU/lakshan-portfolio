(function(){
  "use strict";

  function ready(fn){
    if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, {once:true});
    else fn();
  }

  ready(function(){
    /* Intro screen is CSS-driven, so the page never depends on JS to become visible. */

    var nav = document.getElementById("mainNav");
    var menu = document.getElementById("menuToggle");
    if(menu && nav){
      menu.addEventListener("click", function(){ nav.classList.toggle("open"); });
      nav.querySelectorAll("a").forEach(function(a){
        a.addEventListener("click", function(){ nav.classList.remove("open"); });
      });
    }

    var theme = document.getElementById("themeToggle");
    if(theme){
      theme.addEventListener("click", function(){
        document.body.classList.toggle("light");
        theme.textContent = document.body.classList.contains("light") ? "☾" : "☼";
      });
    }

    var typed = document.getElementById("typedText");
    var words = ["digital experiences","AI workflows","trading systems","creative projects"];
    var wi = 0, ci = 0, deleting = false;

    function typeLoop(){
      if(!typed) return;
      var word = words[wi];
      if(deleting){ ci--; } else { ci++; }
      typed.textContent = word.slice(0, Math.max(0, ci));

      var delay = deleting ? 45 : 85;
      if(!deleting && ci >= word.length){ deleting = true; delay = 1200; }
      else if(deleting && ci <= 0){ deleting = false; wi = (wi + 1) % words.length; delay = 300; }
      window.setTimeout(typeLoop, delay);
    }
    typeLoop();

    var revealItems = document.querySelectorAll(".reveal");
    if("IntersectionObserver" in window){
      var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting) entry.target.classList.add("visible");
        });
      }, {threshold:0.12});
      revealItems.forEach(function(el){ observer.observe(el); });
    }else{
      revealItems.forEach(function(el){ el.classList.add("visible"); });
    }

    var top = document.getElementById("backTop");
    window.addEventListener("scroll", function(){
      if(top) top.classList.toggle("show", window.scrollY > 500);
    }, {passive:true});
    if(top) top.addEventListener("click", function(){ window.scrollTo({top:0,behavior:"smooth"}); });

    var addTrade = document.getElementById("addTrade");
    var rows = document.getElementById("tradeRows");
    if(addTrade && rows){
      addTrade.addEventListener("click", function(){
        var row = document.createElement("div");
        row.className = "trade-row";
        row.innerHTML = "<span>XAUUSD</span><b class='buy'>BUY</b><span>+96</span>";
        rows.appendChild(row);
        addTrade.textContent = "Demo Trade Added ✓";
        addTrade.disabled = true;
      });
    }

    /* Smooth internal links */
    document.querySelectorAll('a[href^="#"]').forEach(function(link){
      link.addEventListener("click", function(event){
        var id = link.getAttribute("href");
        if(id && id !== "#"){
          var target = document.querySelector(id);
          if(target){
            event.preventDefault();
            target.scrollIntoView({behavior:"smooth",block:"start"});
          }
        }
      });
    });
  });
})();