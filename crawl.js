const { JSDOM } = require('jsdom')

function normalizeURL(url){
    
   let my_url = new URL(url)
   let fullPath = `${my_url.host}${my_url.pathname}`
   if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}





function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const hrefElements = dom.window.document.querySelectorAll('a')
    for (const aElement of hrefElements){
        if (aElement.href.slice(0,1) === '/' ){
            try{
                urls.push(new URL(aElement.href, baseURL).href)
            }catch(err){
                console.log(`this error: '${err.message}' while pushing ${aElement.href}`)
            }

        }else{
            try{urls.push(new URL(aElement.href).href)
            }catch(err){
                console.log(`this error: '${err.message}' while pushing ${aElement.href}`)
            }
        }
    }
    
    return urls
  }


  async function crawlInPage(baseURL,currentURL,pages){
    
    let baseUrlObj = new URL(baseURL)
    let currentURLObj =new URL(currentURL)
    if (currentURLObj.hostname !== baseUrlObj.hostname){
        return pages
      }
    const normalizedURL = normalizeURL(currentURL)
    if(pages.hasOwnProperty(normalizedURL)&&pages[normalizedURL] > 0 ){
        pages[normalizedURL]++
        return pages
    }
   
    pages[normalizedURL] =1

    console.log(`lets crawl ${currentURL}`)
    let htmlBody =''
    try{
        let res = await fetch(currentURL)
        if(res.status !==200){
            console.log(`status code : ${res.status}`)
            return pages
        }
        let contentType = res.headers.get('content-type')
        if (!contentType.includes('text/html')){
            console.log(`not a text/html page, page is of type ${contentType}`)
            
            return pages
        }
        htmlBody = await res.text()
    
    }catch(err){
        console.log(`${err.message}`)

    }

    let nextUrls = getURLsFromHTML(htmlBody,baseURL)
    
    const newUrls = nextUrls.filter(url => !pages.hasOwnProperty(normalizeURL(url)));
    await Promise.all(newUrls.map(url => crawlInPage(baseURL, url, pages)));
    return pages
    




    
   
  }


  async function crawlExPage(baseURL,currentURL,externalURL,pages){
    
    
    return pages  
   
  }












module.exports ={
    normalizeURL, getURLsFromHTML, crawlInPage, crawlExPage
}