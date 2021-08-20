prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 320,
    height: 300,
    image_format: 'png',
    flip_horiz: true
})

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='snapshot' src="+data_uri+">";
    })
}

console.log(ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/JvdWn2eHx/model.json" , model_loaded);

function model_loaded() {
    console.log("Yay!!!!! Model Loaded !!!! :D")
}

function speech() {
    var synth = window.speechSynthesis;
    var speak_1 = "Prediction 1 is " + prediction_1;
    var speak_2 = "Prediction 2 is " + prediction_2;
    var utter_this = new SpeechSynthesisUtterance(speak_1 + speak_2);
    synth.speak(utter_this);
}

function check() {
    img = document.getElementById("snapshot");
    classifier.classify(img, got_results)
}

function got_results(error,results) {
    if(error){
        console.error(error)
    }else{
        console.log(results)
       prediction_1 = results[0].label;
       prediction_2 =  results[1].label;
       document.getElementById("result_emotion_name").innerHTML = prediction_1;
       document.getElementById("result_emotion_name2").innerHTML = prediction_2;
       speech();
       if(prediction_1 == "Best"){
        document.getElementById("result_emoji").innerHTML = "&#128077";
       }
       if(prediction_1 == "Amazing"){
        document.getElementById("result_emoji").innerHTML = "&#128076";
       }
       if(prediction_1 == "Thumbs Down"){
        document.getElementById("result_emoji").innerHTML = "&#128078";
       }
       if(prediction_1 == "Bye!!!"){
        document.getElementById("result_emoji").innerHTML = "&#128075";
       }
       if(prediction_1 == "Fingers Crossed"){
        document.getElementById("result_emoji").innerHTML = "&#129310";
       }
       if(prediction_2 == "Best"){
        document.getElementById("result_emoji2").innerHTML = "&#128077";
       }
       if(prediction_2 == "Amazing"){
        document.getElementById("result_emoji2").innerHTML = "&#128076";
       }
       if(prediction_2 == "Thumbs Down"){
        document.getElementById("result_emoji2").innerHTML = "&#128078";
       }
       if(prediction_2 == "Bye!!!"){
        document.getElementById("result_emoji2").innerHTML = "&#128075";
       }
       if(prediction_2 == "Fingers Crossed"){
        document.getElementById("result_emoji2").innerHTML = "&#129310";
       }

    }
}