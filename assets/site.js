/* Suivi de progression léger (localStorage) — partagé par toutes les pages. */
var CR = (function(){
  var KEY = 'cyber-reflexes-progression';
  function lire(){
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch(e){ return {}; }
  }
  function ecrire(p){
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch(e){}
  }
  return {
    marquer: function(cle){
      var p = lire(); p[cle] = true; ecrire(p);
    },
    estFait: function(cle){ return !!lire()[cle]; },
    tout: lire,
    reinitialiser: function(){ try { localStorage.removeItem(KEY); } catch(e){} }
  };
})();
