# Step 1: Use an official Node.js image as a base image
FROM node:18-alpine AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Build the Vite project for production
RUN npm run build

# Step 7: Use an official Nginx image to serve the content
FROM nginx:alpine

# Step 8: Copy the build output from the previous stage to the Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose the port that Nginx will serve on
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
