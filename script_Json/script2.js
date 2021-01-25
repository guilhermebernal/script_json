const fs = require("fs")
        
function sortObj(data) {
    let ordenado = {}
    if(typeof data === "object") {
        Object.keys(data).sort().forEach((key) => {
            ordenado[key] = sortObj(data[key])
        })
    } else{
        ordenado = data
    }            
    return ordenado
}

function repetidos (data) {

    const teste = {}

    function recursao(data, path) {            
        if(typeof data === "object") {
            Object.keys(data).forEach((key) => {
                recursao(data[key], path ? `${path}.${key}` : key)
            })
        } else {
            if(teste[data]) {
                teste[data] = { ...teste[data], quantidade: teste[data].quantidade + 1, path: [...teste[data].path, path]  }
            } else {
                teste[data] = {
                    quantidade: 1,
                    path: [path]
                }
            } 
        }
    }

    function remove(obj) {
        return Object.keys(obj).filter(o => obj[o].quantidade > 1).reduce((prev, curr) => ({ ...prev, [curr]: obj[curr] }), {})
    }

    recursao(data)
    return remove(teste)
}

        
const file = fs.readFileSync('translations.json')
const obj = JSON.parse(file.toString())
const ordenado = sortObj(obj)
const rep = repetidos(obj)

fs.writeFileSync('ordenado.json', JSON.stringify(ordenado, null, 2))
fs.writeFileSync('repetidos.json', JSON.stringify(rep, null, 2))