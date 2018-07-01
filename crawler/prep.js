const fs = require('fs')

var obj = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

var tmp = JSON.parse(fs.readFileSync('image.json', 'utf8'));

tarr = []
for(var i = 0 ; i < tmp.length; i++) {
    tarr.push(tmp[i].country)
}
// console.log(tarr)

arr = []
for(var i = 0 ; i < obj.length; i ++) {
    // console.log(obj[i])
    var t = obj[i]
    var index = tarr.indexOf(t.name.common)
    // console.log(t.name.common)
    if(index == -1){
        console.log('error...')
    }
    // console.log(index)
    t.image = tmp[index].image
    arr.push(t)
    // console.log(t)
    // break
}
console.log(JSON.stringify(arr))