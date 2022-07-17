


const courses = document.querySelectorAll('.course')

let colors = ['rgb(255, 255, 255)' , 'rgb(0, 0, 0)' , 'rgb(142, 202, 230)' , 'rgb(2, 195, 154)'  , 'rgb(255, 183, 3)']

let hours  ={
    notYetHours:128,
    finishedHours:0,
    firstTermHours:0,
    secondeTermHours:0,
    thirdTermHours:0,
}
let two = []
const notYetH = document.querySelector('.notYetH')
const finishedH = document.querySelector('.finishedH')
const firstTermH = document.querySelector('.firstTermH')
const secondeTermH = document.querySelector('.secondTermH')
const thirdTermH = document.querySelector('.thirdTermH')

courses.forEach(course => {
    course.style.backgroundColor ='rgb(255, 255, 255)'
    course.addEventListener('click',changeColor =>{
        
       
        if (course.style.backgroundColor == colors[0]){

            course.style.backgroundColor = colors[1]
            two = checkForHours(course , hours.notYetHours , hours.finishedHours)
            hours.notYetHours = two[0]
            hours.finishedHours = two[1]
            console.log(two)

        }
        else if(course.style.backgroundColor == colors[1] ){
            course.style.backgroundColor = colors[2]

            two = checkForHours(course , hours.finishedHours , hours.firstTermHours)
            hours.finishedHours=two[0]
            hours.firstTermHours = two[1]

            
        }
        else if(course.style.backgroundColor == colors[2] ){
            course.style.backgroundColor = colors[3]

            two = checkForHours(course , hours.firstTermHours , hours.secondeTermHours)
            hours.firstTermHours = two[0]
            hours.secondeTermHours = two[1]
            
        }
        else if(course.style.backgroundColor == colors[3] ){
            course.style.backgroundColor = colors[4]

            two = checkForHours(course , hours.secondeTermHours , hours.thirdTermHours)
            hours.secondeTermHours = two[0]
            hours.thirdTermHours = two[1]
           
        }
        else if(course.style.backgroundColor == colors[4] ){
            course.style.backgroundColor = colors[0]

            two = checkForHours(course , hours.thirdTermHours , hours.notYetHours)
            hours.thirdTermHours = two[0]
            hours.notYetHours = two[1]

        }
        console.log(hours)
        notYetH.innerText = hours.notYetHours
        finishedH.innerText = hours.finishedHours
        firstTermH.innerText = hours.firstTermHours
        secondeTermH.innerText = hours.secondeTermHours
        thirdTermH.innerText = hours.thirdTermHours

    
    }) 
})

const year = document.querySelector('#years')
const firstTerm = document.querySelector('#firstTerm')
const secondTerm = document.querySelector('#secondTerm')
const thirdTerm = document.querySelector('#thirdTerm')

year.addEventListener('change', changeTerm)

function changeTerm(){
    
    const arrYear = year.value 
    firstTerm.textContent = ":  " + arrYear + 1
    secondTerm.textContent = ":  " + arrYear + 2
    thirdTerm.textContent = ":  " + arrYear + 3
   
}

function checkForHours(course , from , to){
    if(course.classList.contains('fourPoints')){
        to += 4
        from -=4 
    }
    else if(course.classList.contains('threePoints')){
        to += 3
        from -=3
    }
    else if(course.classList.contains('twoPoints')){
        to += 2
        from -= 2 
    }
    else if(course.classList.contains('onePoint')){
        to += 1
        from -= 1 
    }
    console.log(`from = ${from} to = ${to}`)
    return [from , to]
}

document.querySelector('#tutorialButton').addEventListener('click',hideContent =>{
    document.querySelector('.tutorial').style.display = 'none'

})


let imgbutton = document.querySelector('#exportImg')

imgbutton.addEventListener('click' ,_ =>{


    html2canvas(document.body).then((canvas) => {
        let a = document.createElement("a");
        a.download = "ss.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
      }); 
  });
