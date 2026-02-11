(function(){
  const fsBtn = document.getElementById('fsBtn');
  const viewer = document.getElementById('viewer');

  function isFs(){
    return !!document.fullscreenElement;
  }

  async function enterFs(){
    // 1) CSS full-bleed mode (works everywhere)
    document.body.classList.add('full-bleed');

    // 2) Try native fullscreen where supported (may fail on iOS Safari)
    try{
      if (!isFs() && viewer.requestFullscreen){
        await viewer.requestFullscreen();
      }
    }catch(e){
      // ignore
    }
  }

  async function exitFs(){
    document.body.classList.remove('full-bleed');
    try{
      if (isFs() && document.exitFullscreen){
        await document.exitFullscreen();
      }
    }catch(e){
      // ignore
    }
  }

  async function toggle(){
    const on = document.body.classList.contains('full-bleed') || isFs();
    if(on) await exitFs();
    else await enterFs();
    fsBtn.textContent = on ? 'Full screen' : 'Exit full screen';
  }

  if(fsBtn){
    fsBtn.addEventListener('click', toggle);
  }

  // Mobile auto-hint: keep viewer as large as possible
  // (No forced fullscreen to avoid browser restrictions)
})();
