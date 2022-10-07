var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer((req, res) => {
  let shortUrl = req.url.slice(5);
  let nombreBeatle = beatles.filter(beatle => beatle.name.replace(' ', '%20') === shortUrl);
  let findBeatle = req.url.split('/').pop();
  let foundBeatle = beatles.find((b) => findBeatle === encodeURI(b.name));
  if(req.url === '/api') {
    res.writeHead(200, { 'Content-Type':'application/json' });
	  res.end( JSON.stringify(beatles) );
  }
  else if(nombreBeatle[0]) {
    res.writeHead(200, { 'Content-Type':'application/json' });
    res.end( JSON.stringify(nombreBeatle[0]) );
  }
  else if(req.url === '/') {
    res.writeHead(200, { 'Content-Type':'text/html' });
    let index = fs.readFileSync(`${__dirname}/index.html`, 'utf-8');
    res.end(index);
  }
  else if(foundBeatle){
    res.writeHead(200, { 'Content-Type':'text/html' });
    let beatleProfile = fs.readFileSync(`${__dirname}/beatle.html`, 'utf-8');
    beatleProfile = beatleProfile.replace(/{name}/g, foundBeatle.name);
    beatleProfile = beatleProfile.replace('{birth}', foundBeatle.birthdate);
    beatleProfile = beatleProfile.replace('{profilePic}', foundBeatle.profilePic);
    res.end(beatleProfile);
  }
  else {
    res.writeHead(404);
    res.end('Error, page not found!');
  }
}).listen(3300, '127.0.0.1');