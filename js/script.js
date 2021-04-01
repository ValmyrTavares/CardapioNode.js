class OpenSession{
    constructor(){
        this.target = document.querySelectorAll('.toggle')      
    }
    
    addEvent(){
        this.target.forEach((item, index) => [
            item.addEventListener('click',()=>{
                this.showHide(index)
            })
        ])
        this.target.forEach(item => {
        item.nextElementSibling.classList.add("hide")
    })
    }

    showHide(index){            
    const teste1 = this.target[index].nextElementSibling.classList.toggle('hide')      
    }   

    init(){
        this.addEvent()                     
    }
}

class ShowModal{
    constructor(){
        this.produto = document.querySelectorAll(".card")
        this.modal = document.querySelector(".modal-window")
        this.closeModal = document.querySelector(".hidden")
    }

    addEvent(){
        this.produto.forEach((item,index) =>{
            item.addEventListener('click',()=>{
                this.showDetail(index)
            })                    
        })
        this.closeModal.addEventListener('click',()=>{
            this.hideModal()
        })
    }

    hideModal(){                
        this.modal.classList.remove("show")
        this.div.innerHTML = "";           
    }

    showDetail(index){
       this.modal.classList.add("show")
      const titleModal = document.createElement('h1')
      const textModal = document.createElement('p')
      const imgModal = document.createElement('img')
      const priceModal = document.createElement('p')
      this.div = document.createElement('div')           

      titleModal.innerText = this.produto[index].children[0].innerHTML;
      textModal.innerText = this.produto[index].children[2].innerHTML;              
      imgModal.setAttribute('src', this.produto[index].children[3].innerHTML)
      priceModal.innerText = this.produto[index].children[4].innerHTML;          
   
      this.div.appendChild(titleModal)
      this.div.appendChild(imgModal)
      this.div.appendChild(textModal)
      this.div.appendChild(priceModal)
      this.modal.appendChild(this.div)             
    }

    init(){               
        this.addEvent();
    }
}

class Slide{
    constructor(){
        this.container = document.querySelectorAll(".carrossel-container") 
        this.index = 0
    }
    show(){
        const teste = this.container.length -1;
        setInterval(()=>{
            
        this.container.forEach(item=>{
            item.classList.remove('show')
        })                
        this.container[this.index].classList.add('show')
        this.index++
        if(this.index>teste) this.index = 0
        console.log(this.index)
        },2000)   
    }

    init(){               
        this.show();
    }
}

const open = new OpenSession();
const show = new ShowModal()
const slide = new Slide()

open.init();
show.init();
slide.init();