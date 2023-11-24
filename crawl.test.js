const { test, expect } = require('@jest/globals')
const { normalizeURL , getURLsFromHTML} = require('./crawl.js')


test('normalizeURL protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL http', () => {
    const input = 'http://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })


  test('getUrlFromHtml absolute', ()=>{
    const baseUrl = 'https://wixforum.com/'
    const html = '<html><body><a href="https://wixforum.com"><span>Wix Forum></span></a></body> </html>'
    const expected =[ 'https://wixforum.com/']
    const actual = getURLsFromHTML(html,baseUrl)
    expect(actual).toEqual(expected)
  })

  
  

  test('getUrlFromHtml relative', ()=>{
    const baseUrl = 'https://wixforum.com/'
    const html = '<html><body><a href="/how-to-make-sure-dns-records-on-ezoic-and-host-tallies"><span>Boot.dev></span></a></body> </html>'
    const expected =[ 'https://wixforum.com/how-to-make-sure-dns-records-on-ezoic-and-host-tallies']
    const actual = getURLsFromHTML(html,baseUrl)
    expect(actual).toEqual(expected)

  })
  test('getUrlFromHtml both', ()=>{
    const baseUrl = 'https://wixforum.com/'
    const html = '<html><body><a href="/how-to-make-sure-dns-records-on-ezoic-and-host-tallies"><span>HOW TO MAKE SURE DNS RECORDS ON EZOIC AND HOST TALLIES></span></a><a href="https://wixforum.com"><span>Wix Forum></span></a></body> </html>'
    const expected =[ 'https://wixforum.com/how-to-make-sure-dns-records-on-ezoic-and-host-tallies','https://wixforum.com/']
    const actual = getURLsFromHTML(html,baseUrl)
    expect(actual).toEqual(expected)
  })

  test('getUrlFromHtml handle-errpr', ()=>{
    const baseUrl = 'https://wixforum.com/'
    const html = '<html><body><a href="how-to-make-sure-dns-records-on-ezoic-and-host-tallies"><span>HOW TO MAKE SURE DNS RECORDS ON EZOIC AND HOST TALLIES></span></a><a href="https://wixforum.com"><span>Wix Forum></span></a></body> </html>'
    const expected =['https://wixforum.com/' ]
    const actual = getURLsFromHTML(html,baseUrl)
    expect(actual).toEqual(expected)
  })



