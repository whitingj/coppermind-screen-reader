window.onload = () => {
  //remove the spoiler notice
  console.log("Spoiler notice")
  document.getElementById('summary-spoiler-notice').remove()

  //remove the big set of links at the bottom
  // console.log("Remove links")
  // for (const elem of document.getElementsByClassName('hide-for-print')) {
  //   elem.remove()
  // }
  
  console.log("Remove character sections")
  let dts = document.getElementsByTagName('dt')
  console.log(dts)
  for (const dt of dts) {
    console.log('dt', dt.textContent, dt.textContent == 'Characters')
    if (dt.textContent == 'Characters') {
      //we found characters section, lets remove
      const characterHeader = dt.parentElement
      const characterList = characterHeader.nextElementSibling
      characterHeader.remove()
      characterList.remove()
    }
  }
}