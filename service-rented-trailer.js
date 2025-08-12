(function(){
  // Reuse dropdown tap for mobile (in case script.js not loaded first)
  const toggle=document.getElementById('mobileToggle');
  const navMenu=document.getElementById('navMenu');
  const navContent=document.getElementById('navContent');
  if(toggle && !toggle.dataset.bound){
    toggle.dataset.bound='1';
    toggle.addEventListener('click',()=>{navMenu.classList.toggle('active');navContent.classList.toggle('active');toggle.classList.toggle('active');});
  }
  const dropdownToggles=document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach((t)=>{t.addEventListener('click',(e)=>{e.preventDefault();t.closest('.dropdown').classList.toggle('open');});});

  // Optional: highlight sidebar anchor when scrolling (simple)
  const blocks=document.querySelectorAll('.service-block');
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){ entry.target.classList.add('visible'); }
    });
  },{threshold:0.15});
  blocks.forEach((b)=>observer.observe(b));
})(); 