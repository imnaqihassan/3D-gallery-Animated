window.onload=function () {
    var gallery=document.querySelector(".gallery")
    var previewImage=document.querySelector(".preview-img img")


    document.addEventListener("mousemove",function(event){
        const x=event.clientX
        const y=event.clientY

        const centerX=window.innerWidth/2;
        const centerY=window.innerHeight/2;

        const percentX=(x-centerX)/centerX;
        const percentY=(y-centerY)/centerY;

        const rotateX=55+percentY*10;
        const rotateY=percentX*10;

        gsap.to(gallery,{
            duration:1,
            ease:"power2.out",
            rotateX:rotateX,
            rotateY:rotateY,
            overwrite:"auto",
        })
    })

    for (let i = 0; i < 100; i++) {
        const item = document.createElement("div")
        item.className="item";

        const img=document.createElement("img")
        img.src="./assets/img"+((i%10)+1)+".jpg"
        item.appendChild(img)
        gallery.appendChild(item)
        
    }

    const items=document.querySelectorAll(".item")
    const numberOfItems=items.length;
    const angleIncrement=360/numberOfItems;
    const radius=400;

    items.forEach((item, index) => {
        const angle = index * angleIncrement;
        const angleRad = angle * Math.PI / 180;
        const xPosition = radius * Math.cos(angleRad); // X position in circle
        const yPosition = radius * Math.sin(angleRad); // Y position in circle
    
        // Use GSAP to set initial position to maintain transformations correctly
        gsap.set(item, {
            x: xPosition,
            y: yPosition,
            rotationY: angle,  // Adjust as necessary to point towards the center if needed
            transformOrigin: "50% 500px"  // Ensuring rotation origin is centered
        });
    
        item.addEventListener("mouseover", function () {
            const imgInsideItem = item.querySelector("img");
            previewImage.src = imgInsideItem.src;
    
            gsap.to(item, {
                scale: 1.2,
                z: 50,  // Move the item forward
                ease: "power2.out",
                duration: 0.5
            });
        });
    
        item.addEventListener("mouseout", function () {
            previewImage.src = "./assets/img1.jpg";
            gsap.to(item, {
                scale: 1,
                z: 0,  // Move the item back to its original plane
                ease: "power2.out",
                duration: 0.5
            });
        });
    });
    
    scrollTrigger.create({
        trigger:"body",
        start:"top top",
        end:"bottom bottom",
        scrub:2,
        onRefresh:setupRotation,
        onUpdate:(self)=>{
            const rotationProgress=self.progress*360*1;
            items.forEach((item,index)=>{
                const currentAngle=index* angleIncrement-90+rotationProgress;
                gsap.to(item,{
                    rotationZ:currentAngle,
                    duration:1,
                    ease:"power3.out",
                    overwrite:"auto",
                })
            })
        }
    })

}


function setupRotation() {
    
}