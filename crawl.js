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
                console.log(`this error: '${err.message}' while pushing ${aElement.href} into urls func getURLsFromHTML`)
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
    for(let url of newUrls){
        await crawlInPage(baseURL,url,pages)
    }
    return pages
    




    
   
  }


  async function crawlExPage(baseURL,currentURL,checkedUrls, obj){
    //write the base 
    if(checkedUrls.has(currentURL)){
        return obj
    }

    console.log(`lets crawl ${currentURL}`)
    let htmlBody =''
    //get html body
    try{
        let res = await fetch(currentURL)
        if(res.status !==200){
            console.log(`status code : ${res.status}`)
            return obj
        }
        let contentType = res.headers.get('content-type')
        if (!contentType.includes('text/html')){
            console.log(`not a text/html page, page is of type ${contentType}`)
            
            return obj
        }
        htmlBody = await res.text()
    
    }catch(err){
        console.log(`${err.message}`)

    }

  let urlsOnPage = getURLsFromHTML(htmlBody,baseURL)
  let nextUrls =[]
  for(let pageUrl of urlsOnPage){
   let urlObj = new URL(pageUrl)
   let baseUrlObj = new URL(baseURL)
   //add external links to object
   if(urlObj.hostname !== baseUrlObj.hostname){
     if(!obj.hasOwnProperty(urlObj.href)){
        obj[urlObj.href] =1
        
     }else{obj[urlObj.href] ++}
     
   }
   //push internal links to next urls
   else{
    if(!urlObj.hash){
        nextUrls.push(urlObj.href)
        
    }
    
   }
    
  }

 checkedUrls.add(currentURL)
// for(let url of nextUrls){
//     if(!checkedUrls.includes(url)){
//         obj = await crawlExPage(baseURL,url,checkedUrls,obj)
//     }
    
// }
//filter the n

const newUrls = nextUrls.filter(url => !checkedUrls.has(url));
for (let nextUrl of newUrls) {
    await crawlExPage(baseURL, nextUrl,checkedUrls,obj);
}




return obj
   
  }

  


  // write a crawl ex page r function that takes only base url and current url as input then recursively call the crawlExpage function












module.exports ={
    normalizeURL, getURLsFromHTML, crawlInPage, crawlExPage
}