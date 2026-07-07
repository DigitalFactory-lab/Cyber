/* Suivi de progression léger (localStorage) — partagé par toutes les pages.
   Réinitialisation automatique au changement de date : chaque nouveau jour
   (donc chaque nouvelle session d'atelier) repart d'une progression vierge. */
var CR = (function(){
  var KEY = 'cyber-reflexes-progression';
  var DKEY = 'cyber-reflexes-date';
  function today(){
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
  }
  function lire(){
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch(e){ return {}; }
  }
  function ecrire(p){
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch(e){}
  }
  // Nouveau jour → on efface le suivi de la veille et on mémorise la date.
  try {
    if (localStorage.getItem(DKEY) !== today()){
      localStorage.removeItem(KEY);
      localStorage.setItem(DKEY, today());
    }
  } catch(e){}
  return {
    marquer: function(cle){
      var p = lire(); p[cle] = true; ecrire(p);
      try { localStorage.setItem(DKEY, today()); } catch(e){}
    },
    estFait: function(cle){ return !!lire()[cle]; },
    tout: lire,
    reinitialiser: function(){ try { localStorage.removeItem(KEY); } catch(e){} }
  };
})();
