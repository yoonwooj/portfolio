// <![CDATA[
onload = function() {
  // console.log('js'); contents
  const options = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.5,  // 50%가 viewport에 들어와 있어야 callback 실행
  }
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, options);
  
  const innerList = document.querySelectorAll('.inner');
  innerList.forEach(el => observer.observe(el));  
  innerList.forEach((el, idx) => el.classList.add(`inner__${idx + 1}`));

  // for (var i = 0; i < innerList.length; i++) { 
  //   var inner2 = innerList[2];
  //   if(inner2.classList.contains("active")) {
  //     inner2.classList.remove('auto');
  //     continue;
  //   }
  //   inner2.classList.add('auto');  
  // }

  // wheel scroll  
  const scrollArea = document.querySelector('.contents'); 
  // let page = 0; 
  // const lastPage = innerList.length - 1;   
  
  // window.addEventListener('wheel',(e)=>{
  //   e.preventDefault();
  //   if(e.deltaY > 0){
  //       page++;
  //   }else if(e.deltaY < 0){
  //       page--;
  //   }
  //   if(page < 0){
  //       page = 0;
  //   }else if(page > lastPage){
  //       page = lastPage;
  //   } 
  //   else if(page == 2){   
  //     console.log('3');
  //   }
  //   // console.log(page)
  //   positionY(page);
  //   anchors(page);

  //   btns.forEach((page) => page.classList.remove('active'));
  //   btns[page].classList.add('active');

    
  //   if(page > 0){
  //     header.classList.add('smaller');
  //   } else{
  //     header.classList.remove('smaller');
  //   }
  // },{
  //   // capture: false,
  //   // once: false,
  //   passive:false
  // }); 
  // 디폴트 기능 제거 - 스크롤
  
  // makeHeader();
  // makeAnchor(); 
  let btns = document.querySelectorAll('.btn__menu');
  let btnAnchor = document.querySelectorAll('.btn__anchor');
  // btns[0].classList.add('active');
  
  function addClick(ele, callback) {
    for (let i = 0; i < ele.length; i++) {
      ele[i].addEventListener('click', function() {
        positionY(i);
        anchors(i);
        callback(i);
      });
    }
  }

  function popClick(el, call){
    for (let i = 0; i < el.length; i++) {
      el[i].addEventListener('click', function() {
        call(i);
      });
    }
  }

  // 상단 메뉴 클릭
  addClick(btns, (index)=>{    
    btns.forEach((index) => index.classList.remove('active'));
    btns[index].classList.add('active');
  });

  // 우측 메뉴 클릭
  addClick((btnAnchor), (index)=>{
    console.log(index);
  });
 
  const header = document.querySelector('.header');
  const wrap = document.querySelector('.wrap');
  
  function makeHeader(){
    let header = document.createElement('div');  
    header.classList.add('header');
    let headerUl = document.createElement('ul');
    headerUl.classList.add('header__menu');
    wrap.prepend(header);
    header.appendChild(headerUl);

    let headerList = ['지우개','b','c','d'];    
    for(g = 0; g < headerList.length; g++){
      headerUl.innerHTML += `<li><button class="btn btn__menu">${headerList[g]}</button></li>`; 
    }
  }
  // contents position
  function positionY(p){
    scrollArea.style.transform = 'translateY(-' + p + '00vh)';
  }
  // btn__anchor 
  function anchors(n){
    btnAnchor.forEach((n) => n.classList.remove('active'));
    btnAnchor[n].classList.add('active');
  }

  // 
  function makeAnchor(){
    const wrap = document.querySelector('.wrap');
    const pageList = document.createElement('div');
    const pageUl = document.createElement('ul');
    pageList.classList.add('pageList');       
    wrap.appendChild(pageList);
    pageList.append(pageUl);

    for(let i = 0; i < innerList.length; i++){
      pageUl.innerHTML += `<li><button class="btn btn__anchor ${i == 0 ? 'active': ''}"><span class="blind">${i + 1 + 'page'}</span></button></li>`;
    }
  }  

  // makeDimm();
  function makeDimm(){
    const dimm = document.createElement('div');
    dimm.classList.add('dimm');
    wrap.appendChild(dimm);
  }

  const btnTop = document.querySelector('.btn__top')
  btnTop.addEventListener('click', function(){
    wrap.scrollTo({
      left:0, 
      top:0, 
      behavior:'smooth'
    })
  });

  // 가로스크롤
  document.querySelectorAll(".horizon__scroll").forEach(el => {
    el.addEventListener("wheel", e => {
        // 스크롤 좌,우 확인
        const endLeft = (el.scrollLeft === 0);
        const endRight = (el.scrollLeft + el.offsetWidth >= el.scrollWidth);
        const scrollUp = (e.deltaY < 0);
        const scrollDown = (e.deltaY > 0);

        // 스크롤이 좌우 끝에 도달했을 때
        if ((endLeft && scrollUp) || (endRight && scrollDown)) {
            return;
        }

        const scrollWrap = document.querySelector('.horizon__scroll');; 
        const horizons = scrollWrap.querySelectorAll('.horizon__inner');
        const scrollAmount = scrollWrap.offsetWidth; 

        // 위쪽으로 스크롤 시 horizon__scroll 오른쪽으로, 아래로 스크롤 시 horizon__scroll 왼쪽으로
        if (scrollUp) {
          scrollWrap.scrollLeft -= scrollAmount;
        } else if (scrollDown) {
          scrollWrap.scrollLeft += scrollAmount;
        }

        e.preventDefault(); // 기본 스크롤 방지
      });
  });

  popupMove();
  function popupMove(){
    const popupWrap = document.querySelector('.popup__wrap');
    const slide = document.querySelectorAll('.popup__slide');
    let totalSlides = slide.length;
    const slideWidth = 300;
    const prevBtn = document.querySelector('.popup__prev');
    const nextBtn = document.querySelector('.popup__next');

    let currentSlideIndex = 0;
    let count = 0;

    const openBtn = document.querySelectorAll('.btn__popupOpen');
     
    popClick((openBtn), (i)=>{
      count = i;    
      showSlide(i + 1);
      slideResize(i);      
    });    

    prevBtn.addEventListener('click', function (){
      count--;
      if(count < 0){
        count = totalSlides - 1;
        popupWrap.style.transform = 'translateX(-' + (totalSlides * slideWidth) - slideWidth + 'px)';
      } 
      
      currentSlideIndex = count;
      currentSlideIndex = (currentSlideIndex === -1) ? totalSlides : currentSlideIndex + 1;
      showSlide(currentSlideIndex);
      slideResize(count);
    });

    nextBtn.addEventListener('click', function (){
      count++;
      if(count >= totalSlides){
        count = 0;
        popupWrap.style.transform = 'translateX(' + count + 'px)';
      }      
      currentSlideIndex = count;
      currentSlideIndex = (currentSlideIndex === totalSlides) ? 1 : currentSlideIndex + 1;
      showSlide(currentSlideIndex);     
      slideResize(count);
    });
    
    window.addEventListener('resize', function(){
      if(window.innerWidth < 1023){
        popupWrap.style.transform = 'translateX(0px)';
      } else {
        popupWrap.style.transform = 'translateX(-' + count * slideWidth + 'px)';      
      }
      slideResize(count);
    });

    function showSlide(idx) {
      document.querySelectorAll('.popup__slide').forEach(slide => {
          slide.classList.remove('active');
      });
      const activeSlide = document.querySelector(`.popup__slide:nth-child(${idx})`);
      activeSlide.classList.add('active');
    }  

    function slideResize(n){
      if(window.innerWidth < 1023){
        popupWrap.style.transform = 'translateX(0px)';
      } else {
        popupWrap.style.transform = 'translateX(-' + n * slideWidth + 'px)';
      }
    }
  }

  const accBtns = document.querySelectorAll('.accordion__btn');
  accBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
          const accordian = btn.parentNode.parentNode;
          accordian.classList.toggle('close');

          if (accordian.classList.contains('close')) {
              btn.innerText = '열기';
          } else {
              btn.innerText = '닫기';
          }
      });
  });

  let birthDate = new Date('1981-04-15');
  let age = calculateAge(birthDate);

  function calculateAge(birthDate) {
    // 생년월일
    let birthYear = birthDate.getFullYear();
    let birthMonth = birthDate.getMonth();
    let birthDay = birthDate.getDate();
  
    // 현재 날짜
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();
  
    // 만 나이
    let age = currentYear - birthYear;
  
    // 현재 월과 생일의 월을 비교
    if (currentMonth < birthMonth) {
      age--;
    }
    // 현재 월과 생일의 월이 같은 경우, 현재 일과 생일의 일을 비교
    else if (currentMonth === birthMonth && currentDay < birthDay) {
      age--;
    }
    
    document.querySelector('.myage').innerText = age;
    return age;
  }

  
} // e
// ]]>