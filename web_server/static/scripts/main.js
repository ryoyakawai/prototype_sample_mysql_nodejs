"use strict";

(async () => {

  const BASE_URL = `${window.location.protocol}//${window.location.host}`
     const call_api = async (data) => {
       let fetch_options = {
         method: 'POST',
         mode: 'cors',
         cache: 'no-cache',
         credentials: 'same-origin', // include, *same-origin, omit
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
       }
       let response = {}
       try {
         response = await fetch(`${BASE_URL}/api/v1/query`, fetch_options)
         if(response.ok) {
           let results = await response.json()
           let result_area = document.querySelector("#result-area")
           results.data.forEach( (val, key) => {
             let div = document.createElement("div")
             let span00 = document.createElement("span")
             span00.innerHTML = `${val["merchandise_type_master_seq"]}. `
             div.appendChild(span00)

             let span01 = document.createElement("span")
             span01.innerHTML = `${val["merchandise_type_name"]}`
             div.appendChild(span01)

             let span02 = document.createElement("span")
             span02.innerHTML = ` (${val["merchandise_color"]})`
             div.appendChild(span02)

             result_area.appendChild(div)
           })
         } else {
           throw new Error(response)
         }
       } catch (e) {
         console.log(e)
       }
     }

     let post_body = { query: 'SELECT * FROM merchandise_type_master ORDER BY merchandise_type_master_seq ASC'}
     call_api( post_body )

})()
