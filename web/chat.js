import { spawn } from 'child_process';

var
  messages = [],
  lastUserMessage = "",
  botMessage = ""

function response() {

  // send lastUserMessage to gpt4all
  // send gpt4all response to translation
  // botMessage = translated text
  console.log(lastUserMessage)
  const sensor = spawn('python', [lastUserMessage, './translator.py']);
  sensor.stdout.on('data', function(data) {
    botMessage = parseFloat(data);
});

}

function entry() {
  if (document.getElementById("chatbox").value != "") {
    lastUserMessage = document.getElementById("chatbox").value;
    document.getElementById("chatbox").value = "";
    messages.push(lastUserMessage);
    response();
    messages.push("<b>Akari:</b> " + botMessage);
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

document.onkeydown = key;
function key(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    entry();
  }
}