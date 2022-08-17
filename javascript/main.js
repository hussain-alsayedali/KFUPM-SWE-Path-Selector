
window.jsPDF = window.jspdf.jsPDF

const courses = document.querySelectorAll('.course')
const courseText = Array.from(courses).map(x=> x.querySelector('h2').innerText)


let coursePdfHour = Array.from(courses).find(x=> x.querySelector('h2').innerText === 'Math 101') 

let colors = ['rgb(255, 255, 255)' , 'rgb(181, 126, 220)' , 'rgb(142, 202, 230)' , 'rgb(2, 195, 154)'  , 'rgb(255, 183, 3)']

let hours  ={
    notYetHours:128,
    finishedHours:0,
    firstTermHours:0,
    secondeTermHours:0,
    thirdTermHours:0,
}

let coursesSelected = {
    notYetCourses :[],
    finishedCourses : [],
    termOneCourses:[],
    termTwoCourses:[],
    termThreeCourses:[],
}
coursesSelected['notYetCourses'] = courseText

let two = []
const notYetH = document.querySelector('.notYetH')
const finishedH = document.querySelector('.finishedH')
const firstTermH = document.querySelector('.firstTermH')
const secondeTermH = document.querySelector('.secondTermH')
const thirdTermH = document.querySelector('.thirdTermH')

courses.forEach(course => {
    course.style.backgroundColor ='rgb(255, 255, 255)'
    course.addEventListener('click',changeColor =>{
        
       const i = course.querySelector('h2').innerText
       const indexOfCourse = coursesSelected['notYetCourses'].indexOf(i)
        if (course.style.backgroundColor == colors[0]){
            coursesSelected['notYetCourses'].splice(indexOfCourse,1)
            coursesSelected['finishedCourses'].push(i)


            course.style.backgroundColor = colors[1]
            two = checkForHours(course , hours.notYetHours , hours.finishedHours)
            hours.notYetHours = two[0]
            hours.finishedHours = two[1]

        }
        else if(course.style.backgroundColor == colors[1] ){
            course.style.backgroundColor = colors[2]
            coursesSelected['finishedCourses'].splice(coursesSelected['finishedCourses'].indexOf(i),1)
            coursesSelected['termOneCourses'].push(i)
            two = checkForHours(course , hours.finishedHours , hours.firstTermHours)
            hours.finishedHours=two[0]
            hours.firstTermHours = two[1]


            
        }
        else if(course.style.backgroundColor == colors[2] ){
            course.style.backgroundColor = colors[3]
            coursesSelected['termOneCourses'].splice(coursesSelected['termOneCourses'].indexOf(i),1)
            coursesSelected['termTwoCourses'].push(i)
            two = checkForHours(course , hours.firstTermHours , hours.secondeTermHours)
            hours.firstTermHours = two[0]
            hours.secondeTermHours = two[1]

            
        }
        else if(course.style.backgroundColor == colors[3] ){
            course.style.backgroundColor = colors[4]
            coursesSelected['termTwoCourses'].splice(coursesSelected['termTwoCourses'].indexOf(i),1)
            coursesSelected['termThreeCourses'].push(i)
            two = checkForHours(course , hours.secondeTermHours , hours.thirdTermHours)
            hours.secondeTermHours = two[0]
            hours.thirdTermHours = two[1]

           
        }
        else if(course.style.backgroundColor == colors[4] ){
            course.style.backgroundColor = colors[0]
            coursesSelected['termThreeCourses'].splice(coursesSelected['termThreeCourses'].indexOf(i),1)
            coursesSelected['notYetCourses'].push(i)
            two = checkForHours(course , hours.thirdTermHours , hours.notYetHours)
            hours.thirdTermHours = two[0]
            hours.notYetHours = two[1]


        }
        
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
    
    const arrYear = year.value.toString() 
    firstTerm.textContent =  arrYear + 1
    secondTerm.textContent =  arrYear + 2
    thirdTerm.textContent =  arrYear + 3
   
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
    
    return [from , to]
}

document.querySelector('#tutorialButton').addEventListener('click',hideContent =>{
    document.querySelector('.tutorial').style.display = 'none'

})


let imgButton = document.querySelector('#exportImg')

imgButton.addEventListener('click' ,()=>{

    const elementToSave = document.querySelector(".gridContainer");
       
    html2canvas(elementToSave, {
        allowTaint: true,
        foreignObjectRendering: true,
        scale : 3
    }).then(canvas =>{
                const a = document.createElement("a");
                a.href = canvas.toDataURL("image/jpeg");
                a.download = "Plan.jpeg";
                a.click();
            })})


let pdfButton = document.querySelector('#exportPdf')

pdfButton.addEventListener('click' , makePdf)

var textLiner1 = 2
var textLiner2 = 10
var textLiner3 = 15

async function makePdf(){
    const newDoc = await new jsPDF()
    pdfWrite(newDoc,'termOneCourses' , 'first term' , 'firstTermHours' , textLiner1 )
  
    pdfWrite(newDoc,'termTwoCourses' , 'second term' , 'secondeTermHours' , textLiner2)

    pdfWrite(newDoc,'termThreeCourses' , 'third term' , 'thirdTermHours' , textLiner3)
    newDoc.addPage()

    pdfWrite(newDoc,'finishedCourses' , 'finished courses' , 'finishedHours')
    newDoc.addPage()
    
    pdfWrite(newDoc,'notYetCourses' , 'not yet courses' , 'notYetHours')
    
    

    newDoc.save('new.pdf')
}


function findHour(course){
    let coursePdf = Array.from(courses).find(x=> x.querySelector('h2').innerText === `${course}`)
    let hour = 0
    if(coursePdf.classList.contains('fourPoints')){
        hour = 4
    }
    else if(coursePdf.classList.contains('threePoints')){
        hour = 3
    }
    else if(coursePdf.classList.contains('twoPoints')){
        hour = 2
    }
    else if(coursePdf.classList.contains('onePoint')){
        hour = 1
    }
    return hour
}
async function pdfWrite(pdfName , term ,headerText , termHours , textLiner = 2 ){
    
    let j = 10
    pdfName.text(`${headerText} : ` , 10 ,textLiner*10)
    textLiner++
    coursesSelected[`${term}`].forEach((x,i) => {
        pdfName.text(`${x}\n`,j , 10*(textLiner))
        pdfName.text(`${findHour(x)}`,j+30,10*(textLiner))
    
        // textLiner++
        j += 50
        if(j === 160){
            j =10
            textLiner++
        }
   

    })
    pdfName.text(`sum of hours = ${hours[termHours]} ` ,10,10*(textLiner+1))
    
}
function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }


