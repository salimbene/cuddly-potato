# Crossmint Coding Challenge

## Secret phrase:

> Parkour to the moon!

## Installation

To install and run the Crossmint Coding Challenge, follow these steps:

# Megaverse App

This Node.js application is designed to interact with the Megaverse API and perform various tasks, such as drawing shapes and logos on a matrix.

## Installation

1. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/your-username/megaverse-app.git
cd megaverse-app
```

2. Install the dependencies:

```bash
npm install
```

## Configuration

Before running the application, make sure to configure the necessary settings in the `config/default.json` file. Update the following properties:

- `MEGAVERSE_API_BASE_URI`: The base URI of the Megaverse API.
- `CANDIDATE_ID`: Your candidate ID for the Megaverse challenge.

## Usage

### Drawing an X Shape

To draw an X shape on the matrix, run the following command:

```bash
# to simple execute the app
npm start
# or
node app.js
# or tu run in development mode
npm run dev
```

This will use the default values (2 and 8) for the starting and ending coordinates of the X shape.

If you want to specify custom coordinates, you can pass them as command-line arguments:

```bash
node app.js <x1> <x2>
```

Replace `<x1>` and `<x2>` with the desired starting and ending coordinates, respectively.

For example, to draw an X shape from (3, 3) to (9, 9):

```bash
node app.js 3 9
```

### Drawing the Logo

To draw the logo on the matrix, run the following command:

```bash
node app.js
```

This will fetch the logo from the Megaverse API and draw it on the matrix using the provided API endpoints.

## Testing

This project includes unit and integration tests written using the Jest testing framework. To run the tests, execute the following command:

```bash
npm test
```

## Run in docker

To run the application in a Docker container, follow these steps:

```bash
docker build -t megaverse-app .
```

This command builds the Docker image and tags it with the name megaverse-app.
After the image is built, you can run the container with the following command:

```bash
docker run megaverse-app
```
