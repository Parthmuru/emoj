prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:300,
    height:300,
    image_format: 'jpeg',
    jpeg_quality:90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function capture(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/as1HhNeuS/model.json",modelLoaded);

function modelLoaded(){
    console.log("model has Loaded")
}

function talk (){
    var synth = window.speechSynthesis;
    speak_data_1 = "the first prediction is " + prediction_1;
    speak_data_2 = "and the second prediction is " + prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterthis);
}

function Identify(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if (error){
        console.error();
    }
    else{
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        talk();
        document.getElementById("result_emotion_name").innerHTML = prediction_1;
        document.getElementById("result_emotion_name2").innerHTML = prediction_2;
        
        if (prediction_1 == "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;"
        }
        else if (prediction_1 == "Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;"
        }
        else if (prediction_1 == "Angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545;"
        }

        if (prediction_2 == "Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522;"
        }
        else if (prediction_2 == "Sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;"
        }
        else if (prediction_2 == "Angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;"
        }
    }
}
