//checking for service worker support
if('serviceWorker' in navigator ){
    
    window.addEventListener("load", ()=>{

        navigator.serviceWorker.register("../sw_cached_pages.js")
        .then((rejObj)=>{

            console.log(rejObj);

        })
        .catch((err)=>{
            throw err
        })

    })

}