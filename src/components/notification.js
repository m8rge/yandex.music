import { net, Notification, nativeImage } from 'electron';

function displayNotification (artist, title, imageUrl)
{
  let displayNotification = (artist, title, image) => {
    new Notification({
      title: title,
      body: artist,
      silent: true,
      icon: image
    }).show()
  }

  net.request(imageUrl).on('response', (response) => {
    let buffers = [];
    response.on('data', (chunk) => {
      buffers.push(chunk);
    }).on('end', () => {
      let buf = Buffer.concat(buffers);
      let im = nativeImage.createFromBuffer(buf);

      displayNotification(artist, title, im)
    })
  }).on('error', function() {
    displayNotification(artist, title)
  }).end()
}

export default displayNotification;