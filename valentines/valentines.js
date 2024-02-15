messages =  [ "U2FsdGVkX1+U6g0JFmwzeOqXB60pPNrpQ3RYyoStBIYom2/E3pWcKpcd/h36BuxN03cL6O/DtYxDnUw1v/OrZR4EFH6UGMTKojlmdOtygc8=", "U2FsdGVkX18G5ISCLevLpa8TaKBoNmV4gFNPoYhLDatbNJ6QvGc4G4rZ+bUx98zJaxBZy7D+PDSHEANFrOzYeA==", "U2FsdGVkX19o8kGRSGd+BFKAsV7kiNX1zeVWtRF61U8CMMC86dC4aplf4sPx1TziSJB8yWbEPrKBfyhM8UXGlQ==", "U2FsdGVkX18kUs984CUr5zMYTQjpV2tj9hNUhqz1fSusu7BRqylZ4Mft+RsXtAqQMa3m8GHy1VLPSgvDSZnzgeS1MT9nhZxIVTWMmJp7En4=" ]

password = new URLSearchParams(window.location.search).get('password')

messages = messages.map((string, i) => CryptoJS.AES.decrypt( string, password))

message = messages.find((string) => string.toString(CryptoJS.enc.Utf8).substr(0,8) == 'VALIDATE')

splt = message.toString(CryptoJS.enc.Utf8).substr(8).split(',')

document.getElementById('name').textContent = splt[0]
document.getElementById('msg').textContent = splt[1]
document.getElementById('title').textContent = splt[2]