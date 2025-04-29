
let productList = [3250391256150, 3294580102019, 3270190118862, 3183280012875, 3166296204267,  3760189580850, 3154230802280, 3144550004761]

let plist = document.getElementById("productList");

for(let p in productList){

	
	fetch("https://world.openfoodfacts.net/api/v2/product/"+productList[p]+"?fields=product_name,nutriscore_grade,nutriscore_score,image_front_small_url", { crossorigin: 'anonymous'})
	// alternative pour travailler avec des JSON sur le même serveur (et non ceux d'OFF)
	//fetch(productList[p]+".json")
	.then((response) => {
		if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
			return response.json();
		})
	.then((data) => {
		addIngredient(data.code, data.product);
	})
	 .catch(function () {
       this.dataError = true;
   });
}

const addIngredient = function(pcode, pproduct){
	const content  = document.createElement("div");
	const nutriScore = pproduct.nutriscore_grade || "unknown";
	content.setAttribute("class", "col-lg-4");
	content.innerHTML = `
			<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>${pproduct.product_name}</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text><image href="${pproduct.image_front_small_url}" height="100%" width="100%" /></svg>
			<h2 class="fw-normal">${pproduct.product_name}</h2>
			<p><img src="https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${nutriScore}.svg" style="height:72px;float:right;margin-left:0.5rem;"/></p>
		`;
		plist.appendChild(content);
}