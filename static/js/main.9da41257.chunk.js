(this["webpackJsonpms2109-player"]=this["webpackJsonpms2109-player"]||[]).push([[0],{12:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(6),c=n.n(i),s=(n(12),n(2)),o=n.n(s),u=n(5),p=n(4),d=n(7),l=n.n(d),f=n(1),v=[{width:1920,height:1080,frameRate:60},{width:1920,height:1080,frameRate:25}];function h(){return g.apply(this,arguments)}function g(){return(g=Object(p.a)(o.a.mark((function e(){var t,n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.navigator.mediaDevices.getUserMedia({video:!0,audio:!0});case 2:t=e.sent,n=Object(u.a)(t.getTracks());try{for(n.s();!(r=n.n()).done;)r.value.stop()}catch(a){n.e(a)}finally{n.f()}case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(e,t,n,r){return e.find((function(e){return e.kind===t&&e.label.endsWith("(".concat(n.toLowerCase(),":").concat(r.toLowerCase(),")"))}))}var w=function(){var e=Object(r.useCallback)(function(){var e=Object(p.a)(o.a.mark((function e(t){var n,r,a,i,c,s,p,d,l,f,g;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=44;break}return e.next=3,h();case 3:return e.next=5,window.navigator.mediaDevices.enumerateDevices();case 5:n=e.sent,r=m(n,"videoinput","534d","2109"),a=m(n,"audioinput","534d","2109"),i=Object(u.a)(v),e.prev=9,i.s();case 11:if((c=i.n()).done){e.next=36;break}return s=c.value,e.prev=13,e.next=16,window.navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:r.deviceId},width:{exact:s.width},height:{exact:s.height},frameRate:{exact:s.frameRate}}});case 16:return p=e.sent,t.srcObject=p,e.next=20,window.navigator.mediaDevices.getUserMedia({audio:{groupId:{exact:a.groupId},sampleRate:96e3,sampleSize:16}});case 20:return d=e.sent,l=new AudioContext({sampleRate:96e3}),f=l.createMediaStreamSource(d),e.next=25,l.audioWorklet.addModule("data:application/javascript;charset=utf8,"+encodeURIComponent("\n            class SplitProcessor extends AudioWorkletProcessor {\n              process (inputs, outputs, parameters) {\n                const input = inputs[0][0];\n                const leftOutput = outputs[0][0];\n                const rightOutput = outputs[0][1];\n\n                let i = 0;\n                while (i < input.length) {\n                  leftOutput[i] = input[i + 1];\n                  leftOutput[i + 1] = input[i + 1];\n\n                  rightOutput[i] = input[i];\n                  rightOutput[i + 1] = input[i];\n\n                  i += 2;\n                }\n\n                return true;\n              }\n            }\n\n            registerProcessor('split-processor', SplitProcessor)\n          "));case 25:return g=new AudioWorkletNode(l,"split-processor",{numberOfInputs:1,numberOfOutputs:1}),f.connect(g),g.connect(l.destination),e.abrupt("break",36);case 31:e.prev=31,e.t0=e.catch(13),console.error(e.t0);case 34:e.next=11;break;case 36:e.next=41;break;case 38:e.prev=38,e.t1=e.catch(9),i.e(e.t1);case 41:return e.prev=41,i.f(),e.finish(41);case 44:case"end":return e.stop()}}),e,null,[[9,38,41,44],[13,31]])})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(f.jsx)("video",{className:l.a.video,ref:e,autoPlay:!0})},x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),i(e),c(e)}))};c.a.render(Object(f.jsx)(a.a.StrictMode,{children:Object(f.jsx)(w,{})}),document.getElementById("root")),x()},7:function(e,t,n){e.exports={video:"App_video__33LfF"}}},[[15,1,2]]]);
//# sourceMappingURL=main.9da41257.chunk.js.map