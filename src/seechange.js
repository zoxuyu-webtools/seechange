var seeChange = {};
seeChange.callback = function (scid, cb, cbdist) {
  verified = false;
  sc = document.getElementById(scid);

  sc.style.margin = "5px 0";
  sc.style.maxWidth = "300px";
  sc.style.border = "1px solid #ddd";
  sc.style.padding = "10px";

  sc.innerHTML = "<h1 style='font-family: Arial; font-size: 25px; margin-bottom: 10px; padding-bottom: 5px; margin-top: 0; border-bottom: 1px solid #ddd;'>seeChange Schutz</h1><div data-sc-id='verify' style='font-family: Arial; font-size: 20px; padding: 10px; cursor: pointer; background-color: #eaa; max-width: 200px; text-align: center; margin: 2px auto;'>Verifizieren</div><p style='text-align: center; margin: 5px 0; font-family: Arial; font-size: 14px;'>Bitte klicken Sie auf den Knopf &quot;Verifizieren&quot;, um den seeChange-Schutz zu bestehen.</p>";

  verify = sc.querySelector('[data-sc-id="verify"]')

  zahl1 = 0;
  zahl2 = 0;
  ergebnis = 0;

  verify.addEventListener("click", function sett (e) {
    zahlen = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf"];
    x1 = Math.floor(Math.random() * zahlen.length);
    x2 = Math.floor(Math.random() * zahlen.length)
    zahl1 = zahlen[x1];
    zahl2 = zahlen[x2];
    ops = ["mal", "plus", "minus"];
    res = [x1*x2,x1+x2,x1-x2];
    i = Math.floor(Math.random()*3);
    op = ops[i];
    ergebnis = res[i];
    sc.innerHTML = "<h1 style='font-family: Arial; font-size: 25px; margin-bottom: 10px; padding-bottom: 5px; margin-top: 0; border-bottom: 1px solid #ddd;'>seeChange Schutz</h1><p style='margin: 5px 0; font-family: Arial; font-size: 14px;'>Bitte geben Sie das Ergebnis der Rechnung <i>"+zahl1+" "+op+" "+zahl2+"</i> als Zahl ein.</p><input style='width: 100%;box-sizing: border-box; padding: 5px; font-family: Arial; font-size: 20px; margin-bottom: 2px;' data-sc-id='question'><p style='margin: 5px 0; font-family: Arial; font-size: 14px;'>Zu schwer? <a href='#!' style='color: #666; text-decoration: none; cursor: pointer;' data-sc-id='reload'>Neues Rätsel</a></p>";

    sc.querySelector('[data-sc-id="reload"]').addEventListener("click", sett);

    question = sc.querySelector('[data-sc-id="question"]');
    question.addEventListener("keyup", function () {
      if(question.value == String(ergebnis)) {
        window.setTimeout(function () {
          sc.innerHTML = "<h1 style='font-family: Arial; font-size: 25px; margin-bottom: 10px; padding-bottom: 5px; margin-top: 0; border-bottom: 1px solid #ddd;'>seeChange Schutz</h1><p style='margin: 5px 0; font-family: Arial; font-size: 14px;'>Sie wurden erfolgreich verifiziert.</p><div data-sc-id='verify' style='font-family: Arial; font-size: 20px; padding: 10px; cursor: pointer; background-color: #eaa; max-width: 200px; text-align: center; margin: 2px auto;'>Weiter geht's.</div>";
          verify = sc.querySelector('[data-sc-id="verify"]');
          verify.style.pointerEvents = "none";
          verify.style.transition = "all .75s ease";
          window.setTimeout(function () {
            verify.style.backgroundColor = "#aea";
            verified = true;
            window.setTimeout(function () {
              cb();
            }, cbdist||1000);
          }, 10);
        }, 100);
      }
    })
  })
}


seeChange.form = function (scid) {
  sc = document.getElementById(scid);
  form = document.getElementById(sc.getAttribute("data-formid"));
  action = form.action;
  form.removeAttribute("action");

  form.addEventListener("submit", function (e) {
    verify = sc.querySelector('[data-sc-id="verify"]')
    if(verify.style.backgroundColor != "rgb(170, 238, 170)") {
      e.preventDefault();
    }
  });

  seeChange.callback(scid, function () {
    form.action = action;
  }, 10);
}

seeChange.show = function (scid, showelid) {
  sc = document.getElementById(scid);
  showel = document.getElementById(showelid);

  pn = showel.parentNode;

  showel.remove()

  seeChange.callback(scid, function () {
    pn.appendChild(showel);
  },100);
}
