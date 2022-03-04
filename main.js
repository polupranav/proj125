song = "";
song_variable='';
scoreleftWrist = 0;
scorerightWrist = 0;

LeftWristX = 0;
LeftWristY = 0;

RightWristX = 0;
RightWristY = 0;


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center;

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(result) {
    if (result.length > 0) {
        console.log(result);

        scoreleftWrist = result[0].pose.keypoints[9].score;
        console.log("scoreleftWrist is equal to " + scoreleftWrist);

        LeftWristX = result[0].pose.leftWrist.x;
        LeftWristY = result[0].pose.leftWrist.y;
        console.log("leftWristX = " + LeftWristX, "leftWristY = " + LeftWristY);

        RightWristX = result[0].pose.rightWrist.x;
        RightWristY = result[0].pose.rightWrist.y;
        console.log("RightWristX = " + RightWristX, "RightWristY = " + RightWristY);
    }

}

function modelLoaded() {
    console.log("posenet is initialized");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw() {
    image(video, 0, 0, 600, 500);

    score = "song1";

    fill('red');
    stroke('blue');
    if (song_variable > 0.2) {
        circle(LeftWristX, LeftWristY, 20);

        song2 = song_variable.stop("music2.mp3");

        if (song_variable == false) {
            song_variable.isPlaying("music.mp3");

        }
    }

}

function preload() {
    song = loadSound("music.mp3", "music2.mp3");
}