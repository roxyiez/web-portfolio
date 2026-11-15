// scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)});
document.getElementById('yr').textContent=new Date().getFullYear();

const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(!calm&&matchMedia('(pointer:fine)').matches){
  // sparkle cursor trail
  let last=0;
  addEventListener('pointermove',e=>{
    const n=Date.now();if(n-last<70)return;last=n;
    const s=document.createElement('div');s.className='trail';
    s.innerHTML='<svg><use href="#star"/></svg>';
    s.style.left=e.clientX+(Math.random()*14-7)+'px';s.style.top=e.clientY+(Math.random()*14-7)+'px';
    document.body.appendChild(s);setTimeout(()=>s.remove(),900);
  });
  // 3D tilt on project cards
  document.querySelectorAll('.card').forEach(c=>{
    c.addEventListener('pointermove',e=>{
      const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      c.style.transform=`perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px)`;
    });
    c.addEventListener('pointerleave',()=>c.style.transform='');
  });
}

// lightbox sertifikat
const lb=document.getElementById('lb'),lbImg=document.getElementById('lb-img');
const closeLb=()=>{lb.hidden=true;document.body.style.overflow=''};
document.querySelectorAll('.cert-img').forEach(b=>b.addEventListener('click',()=>{
  lbImg.src=b.dataset.full;lbImg.alt=b.querySelector('img').alt;lb.hidden=false;document.body.style.overflow='hidden';
}));
lb.addEventListener('click',closeLb);
addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)closeLb()});
