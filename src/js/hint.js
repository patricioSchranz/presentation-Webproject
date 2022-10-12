const
    width = window.innerWidth,
    height = window.innerHeight

console.log(width, height)

if(width < 1366 && height < 768){
   window.open('./hint.html', '_self')
}