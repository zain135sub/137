status=""
Input=""
objects=[]
function setup(){
    canvas=createCanvas(480,380)
    canvas.center()
    video=createCapture(VIDEO)
    video.size(480,380)
    video.hide()
}

function draw(){
    image(video,0,0,480,380)

    if(status != ""){
        objectDetector.detect(video,gotResult)
        for(i=0;i<objects.lengths;i++){
            document.getElementById("status").innerHTML="Status:Objects Detected"
            document.getElementById("number_detected").innerHTML="Number of objects detected are:"+objects.length

            fill("#371ff0")
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15)
            noFill()
            stroke("#371ff0")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            if(objects[i].label==input){
                document.getElementById("item_found").innerHTML=input+"FOUND"
            }
        }
    }
}
function gotResult(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects=results
    }
}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modalLoaded)
    document.getElementById("status").innerHTML="status:detecting Objects"
    Input="input"
}
function modalLoaded(){
    console.log("Modal is loaded")
    status=true
}