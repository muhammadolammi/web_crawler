function printReport(pages){
    console.log('starting report........')
    
    let pagesArray = Object.entries(pages);
  
    pagesArray.sort((a, b) => b[1] - a[1]);
          
    for (let i=0; i<pagesArray.length; i++){
        
        console.log(`found ${pagesArray[i][0]} internal links to ${pagesArray[i][1]}`)
    }
    console.log(`internal links total counts : ${pagesArray.length}`)
}


module.exports ={
    printReport
}