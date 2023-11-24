const {crawlExPage, crawlInPage} = require('./crawl.js')
const {printReport} =require('./report.js')
async function main(){
    if(process.argv<3){
        console.log(`Provide website url to run`)
    }
    if(process.argv>3){
        console.log(`Command more than needed`)
    }
    try{
    let website = process.argv[2]
    if (!website.endsWith('/')){
        website += '/'
    }
    let currentURL = website
  
    // let inPages = await crawlInPage(website, currentURL, {})
    // let inLabel = 'Internal links'
    // printReport(inPages, inLabel)
    // let exPages = await crawlExPage(website, currentURL, {})
    // let exLabel = 'External links'
    // printReport(exPages, exLabel)
let urlsToCheckList = [];
let checkedUrl = [];
let externalLinksList = [];
let emailList = [];
let externalLinks = await crawlExPage(website, currentURL, urlsToCheckList, checkedUrl, externalLinksList, emailList);

    

    
    }catch(err){
        console.log(err.message)
    }
  
    
  }
  
  main()
  