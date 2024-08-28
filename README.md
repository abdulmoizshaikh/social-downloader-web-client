## Repository Url:

https://github.com/abdulmoizshaikh/social-downloader-web-client

# Live URLs

## BE

### [Visit -> Social-downloader-Node-App](https://social-downloader-node-cg1oasa4k.vercel.app/)

## FE

### [Visit -> YouTube Video Downloader](https://abdulmoizshaikh.github.io/social-downloader-web-client/)

# Guide:

## How to deploy my react app to github pages

Deploying your React app to GitHub Pages is straightforward. Here’s a step-by-step guide to help you through the process:

### 1. Prepare Your Project

1. **Install `gh-pages` package**:
   You’ll need the `gh-pages` package to easily deploy your app. Install it as a development dependency:

   ```bash
   npm install gh-pages --save-dev
   ```

2. **Update `package.json`**:
   Add the following properties to your `package.json` file:

   - **`homepage`**: Specify the URL where your app will be deployed. If you’re deploying to a user or organization page, it will be `https://<username>.github.io/<repo-name>`. For project pages, it will be `https://<username>.github.io`.

     ```json
     "homepage": "https://<username>.github.io/<repo-name>"
     ```

   - **Add deployment scripts**: Add the following scripts to your `package.json`:

     ```json
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
     ```

### 2. Create a GitHub Repository

1. **Create a new repository** on GitHub if you don’t have one already.
2. **Push your code** to this repository if it’s not already pushed. You can do this using the following commands:

   ```bash
   git remote add origin https://github.com/<username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```

### 3. Deploy Your App

1. **Run the deploy script**:

   ```bash
   npm run deploy
   ```

   This script will create a `build` directory, deploy it to GitHub Pages, and set up the necessary GitHub Pages branch (`gh-pages`).

2. **Check your deployment**:
   After running the deploy script, your app should be available at the URL specified in the `homepage` field of your `package.json`.

---

## References.

Tried these but these won't work on FE (eventually I had to setup backend server becasue videos weren't downloading from FE directly its voilating youtube T&CS and its blocking)

### Building a YouTube Video Downloader with React.js with TechLearn India

https://blog.techlearnindia.com/building-a-youtube-video-downloader-with-reactjs-with-techlearn-india
