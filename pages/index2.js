import React from 'react';
import YouTube from 'react-youtube';


const Example = (props) => {
  const opts = {
    height: '200',
    width: '300',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  let ref = React.createRef();
  let ref2 = React.createRef();
  var player, embedCode;
  const callReady = (event) =>{
    player = event.target;
    embedCode = event.target.getIframe();
      console.log('acho q deu certo');
  }
  var iframe;
  function playFullscreen (){
    console.log('acho q deu certo2');
    console.log(ref);
    console.log(ref.current);
   
    iframe = ref.current;
    iframe.style.display = "block";
    player.playVideo();
    console.log(ref2)
    console.log(ref2.current)
    console.log(embedCode)
    var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
    if (requestFullScreen) {
      requestFullScreen.bind(embedCode)();
    }

    console.log(requestFullScreen);
  }

  return (
    <div>
    <button onClick={playFullscreen}>
      PLAY FULL
    </button>
    
      <div style={{display:"none"}}  onClick={playFullscreen} ref={ref} >
      <YouTube  ref={ref2} videoId="YjF85_E4p70" opts={opts} onReady={callReady} />;
      </div>
  </div>
  
  );
}

export default Example;