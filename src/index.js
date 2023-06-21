import "./styles.css";

const tbl = document.getElementById("populationTbl");
const tblBody = document.getElementById("tblBody");
let dataArr = [];

getdata();

async function getdata() {
  let url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  let dataPromise = await fetch(url);
  let dataJSON = await dataPromise.json();

  const municipalities = Object.values(
    dataJSON.dataset.dimension.Alue.category.label
  );
  let id = 0;
  municipalities.forEach((mun) => {
    let obj = { city: mun, value: 0, theId: id, rate: 0, erate: 0};
    dataArr.push(obj);
    id++;
  });

  const values = Object.values(dataJSON.dataset.value);
  id = 0;
  values.forEach((val) => {
    dataArr[id].value = val;
    id++;
  });

  url = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
  dataPromise = await fetch(url);
  dataJSON = await dataPromise.json();

  const rates = Object.values(dataJSON.dataset.value);
  id = 0;
  let erate = 0
  rates.forEach((r) => {
    dataArr[id].rate = r;
    erate = r/dataArr[id].value*100
    erate = erate.toFixed(2)
    dataArr[id].erate = erate
    
    id++;
  });
  
  id = 1;
  dataArr.forEach((obj) => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    td1.innerText = obj.city;
    td2.innerText = obj.value;
    td3.innerText = obj.rate;
    td4.innerText = obj.erate;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    if (id % 2 == 0) {
      tr.setAttribute("class", "even");
    }
    tr.appendChild(td4);
    if (obj.erate > 45) {
      tr.setAttribute("class", "green")
    } else if (obj.erate < 25) {
      tr.setAttribute("class", "red")
    }
    tblBody.appendChild(tr);
    id++;
  });

}



