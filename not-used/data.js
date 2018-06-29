const fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./static/world-50m.json', 'utf8'));
arr = obj['objects']['units']['geometries']

id_list = []
for(var i = 0; i < arr.length; i++) {
    // console.log(arr[i]['properties']['name'])
    // console.log(arr[i]['id'])
    id_list.push(arr[i]['id'])
}
// console.log(id_list.length)

var id_list2 = []
var data = []
var obj = JSON.parse(fs.readFileSync('./static/countries.json', 'utf8'));
for(var i = 0; i < obj.length; i++) {
    // if(obj[i]['name']['common'] === 'Taiwan'){
    //     console.log(obj[i]['flag'])
    //     console.log(obj[i]['name']['common'])
    //     console.log(obj[i]['capital'])
    //     console.log(obj[i]['region'])
    //     console.log(obj[i]['latlng'])
    //     console.log(obj[i]['cca3']) // 國家代碼
    //     break
    // }
    id_list2.push(obj[i]['cca3'])
    data.push(obj[i])
}
var obj = JSON.parse(fs.readFileSync('./static/countries_extra.json', 'utf8'));
for(var i = 0; i < obj.length; i++) {
    id_list2.push(obj[i]['cca3'])
    data.push(obj[i])
}
// console.log(id_list2.length)
// ALD
// CNM
// CYN
// ESB
// KAB
// KAS
// XKX
// PSX
// SOL
// USG
// WSB
var final = []
for(var i = 0; i < id_list.length; i++) {
    var index = id_list2.indexOf(id_list[i])
    if(index == -1){
        console.log('error...')
    }
    final.push(data[index])
}
console.log(JSON.stringify(final))