const courses = document.querySelectorAll('.course')

let colors = ['rgb(255, 255, 255)' , 'rgb(0, 0, 0)' , 'rgb(142, 202, 230)' , 'rgb(33, 158, 188)'  , 'rgb(255, 183, 3)']


courses.forEach(course => {
    course.style.backgroundColor ='rgb(255, 255, 255)'
    course.addEventListener('click',changeColor =>{
        
        console.log(course.style.backgroundColor)
        if (course.style.backgroundColor == colors[0]){
            course.style.backgroundColor = colors[1]
        }
        else if(course.style.backgroundColor == colors[1] ){
            course.style.backgroundColor = colors[2]
        }
        else if(course.style.backgroundColor == colors[2] ){
            course.style.backgroundColor = colors[3]
        }
        else if(course.style.backgroundColor == colors[3] ){
            course.style.backgroundColor = colors[4]
        }
        else if(course.style.backgroundColor == colors[4] ){
            course.style.backgroundColor = colors[0]
        }

    
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

