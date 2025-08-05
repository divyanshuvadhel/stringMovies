// function loadComponent

 async function loadComponent(path,elementId){
	try {
		const placeholder = document.getElementById(elementId);
		if(!placeholder) return console.log(`element not found ${elementId}`);

		const html=await fetch(path).then((res)=>res.text()); 
		if(!html) return console.log(`component not found at this path ${path}`)
		
		placeholder.innerHTML=html;
		
	} catch (error) {
		console.log(`err at loadcoponent ${error}`);
	}
}

	loadComponent('/src/components/nav.html','nav-placeholder');
	loadComponent('/src/components/footer.html','footer-placeholder');
