function execute(PLfile) {
var req = new XMLHttpRequest();
req.responseType = "arraybuffer";
req.open("GET", PLfile ,true);
 req.send();
 allset();
 req.onreadystatechange = function () {
  if (req.readyState == 4) {
   PLD = req.response;
   var payload_buffer = chain.syscall(477, 0, PLD.byteLength*4 , 7, 0x1002, -1, 0);
   var pl = p.array_from_address(payload_buffer, PLD.byteLength*4);
   var padding = new Uint8Array(4 - (req.response.byteLength % 4) % 4);
   var tmp = new Uint8Array(req.response.byteLength + padding.byteLength);
   tmp.set(new Uint8Array(req.response), 0);
   tmp.set(padding, req.response.byteLength);
   var shellcode = new Uint32Array(tmp.buffer);
   pl.set(shellcode,0);
   var pthread = p.malloc(0x10);
   chain.call(libKernelBase.add32(OFFSET_lk_pthread_create), pthread, 0x0, payload_buffer, 0);
  }
 };
}
function allset() {
    ShowMSG = "You're all Set!";
    loadmsg();
    setTimeout(ani2, 4000);
}
function exploit_done() {
  ShowMSG = "Jailbreak Done !! Now load payload :)";
  loadmsg();
}

function CalcTime(dur) {
  hrs = Math.floor(dur/1000/60/60);
  min=Math.floor(dur/1000/60-hrs*60);
  sec=Math.floor(dur/1000-min*60);
  mil=dur.toString().slice(-3);
  if (min!=0) {
    ShowDuration = " - Webkit Exploited In : " + min + " minute" + (min==1?"":"s") + ", " + sec + " second" + (sec==1?"":"s");
  }else {
    ShowDuration = " - WK Exploited In: " + sec + " second" + (sec==1?"":"s");
  }
}
function StartTimer() {
  StartTime = Date.now();
  ShowMSG = "Insert USB.";
  loadmsg();
}
function EndTimer() {
  EndTime = Date.now();
  CalcTime(EndTime=Date.now()-StartTime);
  top.document.title += ShowDuration;
}
function disableUSB() {
  var getpl = new XMLHttpRequest();
  getpl.open("POST", "./usboff", true);
  getpl.send(null);
}        
function enableUSB() {
  var getpl = new XMLHttpRequest();
  getpl.open("POST", "./usbon", true);
  getpl.send(null);
}    
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}    
function jbdone() {
goldhen();
}    
function HenSet() {
  ShowMSG = "You're all Set!"
  loadmsg()
  setTimeout(ani2, 5000);
}
function goldhen(){
  ShowMSG = "USB Exfat_hax Loaded Successfully! Jailbreak Done."
  loadmsg()
  setTimeout(loadBIN, 100);
}