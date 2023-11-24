const {crawlPage} = require('./crawl.js')
const {printReport} =require('./report.js')
async function main(){
    if(process.argv<3){
        console.log(`Provide website url to run`)
    }
    if(process.argv<3){
        console.log(`Command more than needed`)
    }
    try{
    let website = process.argv[2]
    if (!website.endsWith('/')){
        website += '/'
    }
    let currentURL = website
  
    let pages = await crawlPage(website, currentURL, {})
    printReport(pages)
    

    
    }catch(err){
        console.log(err.message)
    }
  
    
  }
  
  main()
  