# functions

## local debugging
if you want to run the functions locally, start the emulator by

```$ firebase emulators:start --only functions```

Your function will then be reachable under

http://localhost:5001/project-name/function-region/function-name

(e. g. http://localhost:5001/project-polar-eda66/us-central1/getFriendlyName?inputSeed=abc)