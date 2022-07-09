const Queue = require('bull');
const fs = require('fs')
const es = require('event-stream')
const path = require('path')

const lineQueue = new Queue('line_queue', 'redis://redis:6380');

lineQueue.process((job, done) => {
  setTimeout(() => {
    const {data} = job
    console.log(data)
    done()
  }, 2000)
})


const PATH_FILE = path.join(__dirname, 'data','epa_hap_daily_summary.csv')

const mainFunction = () => {

    fs.createReadStream(PATH_FILE ,"utf-8")
    .pipe(es.split())
    .on('data', (data) => {

      lineQueue.add({data}, {
        attempts:1
      })

    })

  // fs.readFile(PATH_FILE, "utf-8", (err, data) => {
  //   let counter = 0;
  //   if(!err){
  //       console.log(Buffer.byteLength(data))
  //   }else{
  //     console.log('ERROR',err)
  //   }
  // })

}


mainFunction()
