let messages =  [ "172167734a3e226b08799ac0e1e0c36ca1/HiX2eYo+B5J1pQ/WnLpH3XPbD/EdHXtZNnFas+TtVZO36OnMqHPPRxXIyO5xHt1jzkkI49n0xY6Kbo4QDdgL+wVbfTvtb3q1qWorn95E=","ec67f10621d70583f4cbf31af0cebb70PcoBdNy9uPH/oSONn8cWH+jWAnjzSc6xxyMT0Bu1mYPr9gw7lxO2H7QV6Qg2jue1jBwhrkrD5wAKJtTPqIHZQ31ahV04gz23I9P66CPLPe2GpONvdLC7b40gjIJvcAsN","2f9aff8e6098807f355151d14f5d4d1cQoY3N6XWFml9amZmLjsWazTQ4+5UzrHUstbb+QbErROt2OECjkthx8Xrt+vhquulFiDZ6B3pb5fyXYrO/lhsNJLiJwEIk4gnyzJTmm43uHbhATFnXJhPZjj7qNrtoHM0OtGPyyCB77lV474ZyHN70vANhMtKizs8TB5kiaE7V7fLC7nbmYEzGm9OXp4tLr6E","c9b63331ec7f436d1076d14f0a2090f704Z1xRxXJzyo2eUWW8KvijWz/h7Nd9/jOEk7TdBozJYqWahqTGQZW7WJAzmEdF4/4EZ/GwoTaFiQCktY0GR/1IJYHklvfBEPTOrohlutc+PsNeEDRRCLfAal8q2DLMAS1yON6mciP6pMF9ccV0WuxfjmHxQSYDwvdp1oABYX2VxspLHsV1jBN7FQnXokvgRimSzz6jevqGtMKiLzd6jTpg==","0e81d7c1d5c528a6050efb445e7ef6caC9refZYh/Hetiy5m1MU2ZcNJTeFifKBAH1ZRlu+yIqPBsD4bSXEujkaQE2hMA1e2nEuWLeQmkU9szCfj9NxS2/Zo3MgEmyNK6IRmoNgFPVs=","fd275e925135c954d80fc5154e93414daF6cSzdVbAm48zIwzeMprlWPEbRyQb9VSvdLJkjE46Ou9SD5YCVWg/73YLXJ2J1BjUbWwnH/gMqX9QrDnz/STfOuvmyMYLH4UWS0lx8UwOE=","85611d1e57d1a3587208f0692d919bfbH2YkSszwcFQo5kT2lSM8roYqseAgyb3aspsubcQ0BH8EWIH+Poea2Mffx86QMGFwYQ1PXJiEeT67yH2hbhEMqQ==","48d81dc16ad9e557cd67abc11b50288fQ15EJ6/POWZmVVA7h/Qrn2HoAshk9ean7pTsj2+4GH/w6GxIyTYDTgSOA/7h0FeYBBbw168vAtY2c2GGSuXTTOBi0x18GQYvrBvX/O9UpK0=","51cae642196291c160f62876e3623548AjA7K7xMkvJOZLsN0WnYGcAmvp/xAxUdpZXdj9XCGz5vv+bdBpsr9Y3SwtPE83u9llnFeAZSh34GgxpFa5py4w==","b5e2c69d791b2ccb7a76ad84394cf0e2U1Mh2HpSSG/ronGCoduJc5jRn724LCezY1kWRb0medXLq2UN5bUA4e5SgWusFqcD","39f2b1716f807b0c2e116db749b1ae98hLUKl8HaqFXJ50rSD5c35qCIXMpOJ9kYE/wIgQvhA6YOQXlGHAMgQhK2/kv+GjkX","b3c2172a68bd3d10f1f3a75530e95cbbPp1xewBpnoiRAMoiU8ejL1ZE1CICZZC7mQC8Vnko58VCq3/bKKbaPNX1dh426HIGd3dr33dPqId+rY6H1gfqGA=="]

// from https://medium.com/@marco.tylus24/native-cross-platform-aes-encryption-decryption-in-javascript-and-php-212f6d77bf48
async function encrypt(plaintext, password) {
    const ptUtf8 = new TextEncoder().encode(plaintext);
    const pwUtf8 = new TextEncoder().encode(password);
    const pwHash = await window.crypto.subtle.digest('SHA-256', pwUtf8);

    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const alg = { name: 'AES-CBC', iv: iv };
    const key = await window.crypto.subtle.importKey('raw', pwHash, alg, false, ['encrypt']);

    const ctBuffer = await window.crypto.subtle.encrypt(alg, key, ptUtf8);
    const ctArray = new Uint8Array(ctBuffer);
    const ctBase64 = btoa(String.fromCharCode(...ctArray));

    const ivHex = Array.from(iv).map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return ivHex + ctBase64;
}

async function decrypt(ciphertext, password) {
    try {
        const ivHex = ciphertext.slice(0, 32);
        const ctBase64 = ciphertext.slice(32);
    
        const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    
        const ctStr = atob(ctBase64);
        const ctArray = new Uint8Array(ctStr.split('').map(c => c.charCodeAt(0)));
    
        const pwUtf8 = new TextEncoder().encode(password);
        const pwHash = await window.crypto.subtle.digest('SHA-256', pwUtf8);
    
        const alg = { name: 'AES-CBC', iv: iv };
        const key = await window.crypto.subtle.importKey('raw', pwHash, alg, false, ['decrypt']);
    
        const ptBuffer = await window.crypto.subtle.decrypt(alg, key, ctArray);
        const plaintext = new TextDecoder().decode(ptBuffer);
    
        return plaintext;
    } catch (error) {
        return ''
    }
    
}
/* let c = ''
function print_c(v) {
    c = c + '"' + v + '",'
}

async function do_business() {

    to_encrypt.map(async (p) => await encrypt("VALIDATE2025" + p[0], p[1]).then(print_c))
    old.map(async (p) => await encrypt(p[0], p[1]).then(print_c))
}

do_business() */

function update_window(message) {
    if (message.slice(0, 8) != "VALIDATE"){
        return
    }
    document.getElementById('lmvd').textContent = "happy last minute valentine's day"
    document.querySelector('svg').style = ""
    if (message.slice(8,12) == "2025") {
        const splt = message.slice(12).split('::')
    
        document.getElementById('shadow').textContent = splt[0]
        document.getElementById('nametext').textContent = splt[0]
        document.getElementById('title').textContent = splt[1] 
        document.getElementById('msg').textContent = splt[2]
        document.getElementById('era').textContent = 'a remastered 2025 e-valentine for my '
        
    } else {
        const splt = message.slice(8).split(',')
    
        document.getElementById('nametext').textContent = splt[0]
        document.getElementById('msg').textContent = splt[1]
        document.getElementById('title').textContent = splt[2] 
        document.getElementById('era').textContent = 'a cool e-valentine for my '
    }
}
try {

const password = new URLSearchParams(window.location.search).get('password')

messages = messages.map((string, i) => decrypt(string, password).then(update_window))

} catch (error) {
    console.log(error)
    document.getElementById('content').innerHTML = 'This website is not for you. You do not have a valid password.'
}