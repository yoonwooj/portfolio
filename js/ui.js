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
  
  // wheel   
  const scrollArea = document.querySelector('.contents'); 
  let page = 0; 
  const lastPage = innerList.length - 1;   
  
  window.addEventListener('wheel',(e)=>{
    e.preventDefault();
    if(e.deltaY > 0){
        page++;
    }else if(e.deltaY < 0){
        page--;
    }
    if(page < 0){
        page = 0;
        header.classList.remove('smaller');
    }else if(page > lastPage){
        page = lastPage;
    }

    else if(page === 1){
      wrap.classList.add('notScroll');
    }
    // console.log(page)
    positionY(page);
    anchors(page);

    btns.forEach((page) => page.classList.remove('active'));
    btns[page].classList.add('active');
    
    if(page > 0){
      header.classList.add('smaller');
    }
  },{
    // capture: false,
    // once: false,
    passive:false
  }); // 디폴트 기능 제거 - 스크롤
  
  makeHeader();
  makeAnchor(); 
  
  let btns = document.querySelectorAll('.btn__menu');
  let btnAnchor = document.querySelectorAll('.btn__anchor');
  btns[0].classList.add('active');
  
  function addClick(ele, callback) {
    for (let i = 0; i < ele.length; i++) {
      ele[i].addEventListener('click', function() {
        positionY(i);
        anchors(i);
        callback(i);
      });
    }
  }
  
  // 상단 메뉴 클릭
  addClick(btns, (index)=>{    
    btns.forEach((index) => index.classList.remove('active'));
    btns[index].classList.add('active');
  });

  // 우측 메뉴 클릭
  addClick((btnAnchor), (index)=>{});

  const header = document.querySelector('.header');
  function makeHeader(){
    let wrap = document.querySelector('.wrap');
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
  
  // 
  function makeAnchor(){
    let wrap = document.querySelector('.wrap');
    let pageList = document.createElement('div');
    let pageUl = document.createElement('ul');
    pageList.classList.add('pageList');       
    wrap.appendChild(pageList);
    pageList.append(pageUl);

    for(let i = 0; i < innerList.length; i++){
      pageUl.innerHTML += `<li><button class="btn btn__anchor ${i == 0 ? 'active': ''}"><span class="blind">${i + 1 + 'page'}</span></button></li>`;
    }
  }  
  // btn__anchor 
  function anchors(n){
    btnAnchor.forEach((n) => n.classList.remove('active'));
    btnAnchor[n].classList.add('active');
  }  

  // top 
  const btnTop = document.querySelector('.btn__top')
  btnTop.addEventListener('click',function(){
    positionY(0);
    anchors(0);
  })
  

  


} // e
// ]]>