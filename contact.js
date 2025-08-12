(function(){
  const toggle=document.getElementById('mobileToggle');
  const navMenu=document.getElementById('navMenu');
  const navContent=document.getElementById('navContent');
  if(toggle){toggle.addEventListener('click',()=>{navMenu.classList.toggle('active');navContent.classList.toggle('active');toggle.classList.toggle('active');});}
  const form=document.getElementById('contactForm');
  if(form){form.addEventListener('submit',e=>{e.preventDefault();alert('Thanks for reaching out! We will contact you shortly.');form.reset();});}
  const dropdownToggles=document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach((t)=>{t.addEventListener('click',(e)=>{e.preventDefault();t.closest('.dropdown').classList.toggle('open');});});
})(); 