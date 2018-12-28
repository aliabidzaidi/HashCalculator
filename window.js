
$(() => {
  console.clear()
  console.log('Jquery Loaded Successfully!')
  const crypto = require('crypto')

  $('#jsonSubmit').click(function () {
    const json = document.getElementById("text-input").value

    try {
      const request = JSON.parse(json);
      console.log('Valid JSON')
      const sortedList = {};
      Object.keys(request).sort().forEach(function (key) {
         if(key != "pp_SecureHash")
            sortedList[key] = request[key] 
        })
      
      console.log(sortedList)
      var finalString = document.getElementById('integrityText').value + '&'

      var integ = '0123456789'
      integ = document.getElementById('integrityText').value
      Object.keys(sortedList).forEach(function(key){
        finalString = finalString.concat(sortedList[key])
        if(sortedList[key] != null && sortedList[key] != "")
          finalString = finalString.concat('&')
      })

      //if(finalString.indexOf(finalString.length - 1) == '&')
      finalString = finalString.substr(0,finalString.length-1)
      console.log('Calculating Hash of"'+ finalString +'"')

      console.log(integ)

      var hmac256 = crypto.createHmac('sha256', integ)
                   .update(finalString)
                   .digest('hex')
                   .toUpperCase()
      console.log(hmac256)

      // const sha256 = crypto.createHash('sha256').update(finalString, 'utf8').digest('hex')
      $('#sha256-output').text(hmac256)
  
      // const sha512 = crypto.createHash('sha512').update(finalString, 'utf8').digest('hex')
      // $('#sha512-output').text(sha512)

      // const md5 = crypto.createHash('md5').update(finalString, 'utf8').digest('hex')
      // $('#md5-output').text(md5)

      // const sha1 = crypto.createHash('sha1').update(finalString, 'utf8').digest('hex')
      // $('#sha1-output').text(sha1)

    } catch (e) {
      console.log('Error: '+e.message)
    }

  })

  // $('#text-input').bind('input propertychange', function () {
  //   const text = this.value

  //   const md5 = crypto.createHash('md5').update(text, 'utf8').digest('hex')
  //   $('#md5-output').text(md5)

  //   const sha1 = crypto.createHash('sha1').update(text, 'utf8').digest('hex')
  //   $('#sha1-output').text(sha1)

  //   const sha256 = crypto.createHash('sha256').update(text, 'utf8').digest('hex')
  //   $('#sha256-output').text(sha256)

  //   const sha512 = crypto.createHash('sha512').update(text, 'utf8').digest('hex')
  //   $('#sha512-output').text(sha512)
  // })

  $('#text-input').focus() // focus input box
})
