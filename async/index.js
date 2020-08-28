const fs = require('fs')
const axios = require('axios/index')
const {
     Console
} = require('console')

const readFilePro = file => {
     return new Promise((resolve, reject) => {
          fs.readFile(file, (err, data) => {
               if (err) reject('I could not find that file')
               resolve(data);
          })
     })
}

const writeFilePro = (file, data) => {
     return new Promise((resolve, reject) => {
          fs.writeFile(file, data, (err) => {
               if (err) reject('Could not write!');
               resolve('Success!')
          })
     })
}

const getDogPic = async () => {

     try {
          //add promise here
          const data = await readFilePro(`${__dirname}/dog.txt`);
          console.log(`Breed: ${data}`)

          const res = await axios.get(`https://dog.ceo/api/breed/${data}/images/random`)
          console.log(res.data.message);

          await writeFilePro('dog-img.txt', res.data.message)
          console.log('Random dog saved to file!')

     } catch (err) {
          //catch error
          console.log(err)
          throw err
     }

     return 'Retrieved dog picture!'

}

//call function right away!
(async () => {
     try {
          console.log('1: I will get dog pics!')
          const x = await getDogPic();
          console.log(x)
          console.log('Done getting dog pics!')
     } catch (err) {
          console.log('Error!')
     }
})();

console.log("Retrieving..")
getDogPic().then(x => {
     console.log(x)
     console.log("Done getting dog pics!")
}).catch(err => {
     console.log(`error! ${err}`)
})

//using axios
readFilePro(`${__dirname}/dog.txt`)
     .then(data => {
          console.log(`Breed: ${data}`)
          return axios.get(`https://dog.ceo/api/breed/${data}/images/random`)
     })
     .then(res => {
          console.log(res.data.message);
          return writeFilePro('dog-img.txt', res.data.message);
     })
     .then(() => {
          console.log('Random dog saved to file!')
     }).catch(err => {
          console.log(err.reason)
     })