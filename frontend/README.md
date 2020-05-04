## `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Docker Setup

To set up docker for development navigate to the frontend directory through the docker terminal

Run the command:
docker build -t sample:dev -f ./Dockerfile.txt .

After the image is done building, run the command:
docker run -it --rm -v ${pwd}:/app -v /app/node_modules -p 3001:3000 sample:dev

Then you can access the page at
http://192.168.99.100:3001/ or http://localhost:3001/