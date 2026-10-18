// Serves the background music. The mp3 is stored as base64 across a few files so the repo stays text only.
const B=Buffer.from(require('./_music1.js')+require('./_music2.js')+require('./_music3.js')+require('./_music4.js'),'base64');
module.exports=(req,res)=>{res.setHeader('Content-Type','audio/mpeg');res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Accept-Ranges','bytes');res.setHeader('Cache-Control','public, max-age=86400, s-maxage=31536000');
  const r=req.headers&&req.headers.range;if(r){const m=/bytes=(\d*)-(\d*)/.exec(r);let s=m&&m[1]?parseInt(m[1],10):0,e=m&&m[2]?parseInt(m[2],10):B.length-1;if(e>=B.length)e=B.length-1;res.statusCode=206;res.setHeader('Content-Range','bytes '+s+'-'+e+'/'+B.length);res.setHeader('Content-Length',e-s+1);res.end(B.subarray(s,e+1));return;}
  res.setHeader('Content-Length',B.length);res.statusCode=200;res.end(B);};
