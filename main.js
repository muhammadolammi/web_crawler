const {crawlExPage, crawlInPage} = require('./crawl.js')
const {printReport} =require('./report.js')
async function main(){
    if(process.argv<4){
        console.log(`Provide website url to run`)
    }
    if(process.argv>4){
        console.log(`Command more than needed`)
    }
    try{
    let website = process.argv[2]
    if (!website.endsWith('/')){
        website += '/'
    }
    let currentURL = website
  
    let inPages = await crawlInPage(website, currentURL, {})
    let inLabel = 'Internal links'
    
    let exLabel = 'External links'
    let obj = {}
    let checkedUrls =new Set()
    let obJ =await  crawlExPage(website,currentURL,checkedUrls,obj)
    
    if(process.argv[3]== internal){
        printReport(inPages, inLabel)
    }
    if(process.argv[3]== external){
        printReport(obJ, exLabel)
    }
    

    

    
    }catch(err){
        console.log(err.message)
    }
  
    
  }
  
  main()
  