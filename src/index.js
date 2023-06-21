import "./styles.css";

const tbl = document.getElementById("populationTbl")
const tblBody = document.getElementById("tblBody")
let dataArr = []

getdata()

async function getdata() {
  const url = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff"
  const dataPromise = await fetch(url)
  const dataJSON = await dataPromise.json()

  const municipalities = Object.values(dataJSON.dataset.dimension.Alue.category.label)
  let id = 0
  municipalities.forEach((mun) => {
    let obj = {city: mun, value: 0, theId: id}
    dataArr.push(obj)
    id++
  })

  const values = Object.values(dataJSON.dataset.value)
  id = 0
  values.forEach((val) => {
    dataArr[id].value = val
    id++
  })

  console.log(dataArr)
  
  id = 1
  dataArr.forEach((obj) => {
    let tr = document.createElement("tr")
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    td1.innerText = obj.city
    td2.innerText = obj.value
    tr.appendChild(td1)
    tr.appendChild(td2)
    if (id%2 == 0) {
      tr.setAttribute("class", "even")
    }
    tblBody.appendChild(tr)
    id++
  })







}